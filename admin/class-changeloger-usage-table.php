<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * Changeloger Usage Table Class
 */
class Changeloger_Usage_Table extends WP_List_Table {

	public function __construct() {
		parent::__construct( [
			'singular' => __( 'Usage', 'changeloger' ),
			'plural'   => __( 'Usages', 'changeloger' ),
			'ajax'     => false
		] );
	}

	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$per_page     = 20;
		$current_page = $this->get_pagenum();
		$total_items  = $this->record_count();

		$this->set_pagination_args( [
			'total_items' => $total_items,
			'per_page'    => $per_page
		] );

		$data = $this->table_data( $per_page, $current_page );

		$this->_column_headers = [ $columns, $hidden, $sortable ];
		$this->items           = $data;
	}

	public function get_columns() {
		$columns = [
			'cb'         => '<input type="checkbox" />',
			'title'      => __( 'Title', 'changeloger' ),
			'post_type'  => __( 'Post Type', 'changeloger' ),
			'block_name' => __( 'Block Name', 'changeloger' ),
			'date'       => __( 'Date', 'changeloger' ),
			'status'     => __( 'Status', 'changeloger' )
		];

		return $columns;
	}

	public function get_hidden_columns() {
		return [];
	}

	public function get_sortable_columns() {
		return [
			'title'     => [ 'title', false ],
			'post_type' => [ 'post_type', false ],
			'date'      => [ 'date', true ],
			'status'    => [ 'status', false ]
		];
	}

	private function table_data( $per_page = 20, $page_number = 1 ) {
		global $wpdb;

		$orderby = ! empty( $_GET['orderby'] ) ? esc_sql( $_GET['orderby'] ) : 'post_date';
		$order   = ! empty( $_GET['order'] ) ? esc_sql( $_GET['order'] ) : 'DESC';

		// Map frontend column names to actual database column names
		$column_mapping = [
			'title'     => 'post_title',
			'post_type' => 'post_type',
			'date'      => 'post_date',
			'status'    => 'post_status'
		];

		// Use mapped column name if available
		if ( isset( $column_mapping[ $orderby ] ) ) {
			$orderby = $column_mapping[ $orderby ];
		}

		$offset = ( $page_number - 1 ) * $per_page;

		// Query to find posts that contain changeloger blocks
		$sql = "SELECT p.ID, p.post_title, p.post_type, p.post_date, p.post_status, p.post_content
				FROM {$wpdb->posts} p
				WHERE (p.post_content LIKE '%wp:cha/changeloger%' OR p.post_content LIKE '%wp:cha/tabbed-changeloger%')
				AND p.post_status IN ('publish', 'draft', 'private', 'pending')
				ORDER BY p.{$orderby} {$order}
				LIMIT %d OFFSET %d";

		$results = $wpdb->get_results( $wpdb->prepare( $sql, $per_page, $offset ) );

		$data = [];
		foreach ( $results as $result ) {
			$block_names = [];

			// Check which blocks are used
			if ( strpos( $result->post_content, 'wp:cha/changeloger' ) !== false ) {
				$block_names[] = 'Changeloger';
			}
			if ( strpos( $result->post_content, 'wp:cha/tabbed-changeloger' ) !== false ) {
				$block_names[] = 'Tabbed Changeloger';
			}

			$data[] = [
				'ID'         => $result->ID,
				'title'      => $result->post_title ?: __( '(no title)', 'changeloger' ),
				'post_type'  => ucfirst( $result->post_type ),
				'block_name' => implode( ', ', $block_names ),
				'date'       => $result->post_date,
				'status'     => ucfirst( $result->post_status ),
				'edit_link'  => get_edit_post_link( $result->ID ),
				'view_link'  => get_permalink( $result->ID )
			];
		}

		return $data;
	}

	public function record_count() {
		global $wpdb;

		$sql = "SELECT COUNT(*)
				FROM {$wpdb->posts} p
				WHERE (p.post_content LIKE '%wp:cha/changeloger%' OR p.post_content LIKE '%wp:cha/tabbed-changeloger%')
				AND p.post_status IN ('publish', 'draft', 'private', 'pending')";

		return $wpdb->get_var( $sql );
	}

	public function no_items() {
		_e( 'No changeloger blocks found.', 'changeloger' );
	}

	protected function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case 'title':
			case 'post_type':
			case 'block_name':
			case 'status':
				return $item[ $column_name ];
			case 'date':
				return date( 'Y/m/d \a\t g:i A', strtotime( $item[ $column_name ] ) );
			default:
				return print_r( $item, true );
		}
	}

	protected function column_cb( $item ) {
		return sprintf(
			'<input type="checkbox" name="bulk-action[]" value="%s" />', $item['ID']
		);
	}

	protected function column_title( $item ) {
		$edit_link = $item['edit_link'];
		$view_link = $item['view_link'];
		$delete_link = get_delete_post_link( $item['ID'] );

		$actions = [
			'edit' => sprintf( '<a href="%s">%s</a>', $edit_link, __( 'Edit', 'changeloger' ) ),
			'trash' => sprintf( '<a href="%s" class="submitdelete" aria-label="%s">%s</a>',
				$delete_link,
				esc_attr( sprintf( __( 'Move &#8220;%s&#8221; to the Trash' ), $item['title'] ) ),
				__( 'Trash', 'changeloger' )
			),
			'view' => sprintf( '<a href="%s" target="_blank" aria-label="%s">%s</a>',
				$view_link,
				esc_attr( sprintf( __( 'View &#8220;%s&#8221;' ), $item['title'] ) ),
				__( 'View', 'changeloger' )
			)
		];

		// Remove actions based on post status and capabilities
		if ( ! current_user_can( 'delete_post', $item['ID'] ) ) {
			unset( $actions['trash'] );
		}

		if ( ! current_user_can( 'edit_post', $item['ID'] ) ) {
			unset( $actions['edit'] );
		}

		// Hide preview for published posts (show view instead)
		if ( get_post_status( $item['ID'] ) !== 'publish' ) {
			$actions['preview'] = sprintf( '<a href="%s" target="_blank" aria-label="%s">%s</a>',
				add_query_arg( 'preview', 'true', $view_link ),
				esc_attr( sprintf( __( 'Preview &#8220;%s&#8221;' ), $item['title'] ) ),
				__( 'Preview', 'changeloger' )
			);
			unset( $actions['view'] );
		}

		return sprintf( '<strong><a href="%s" class="row-title">%s</a></strong>%s',
			$edit_link,
			$item['title'],
			$this->row_actions( $actions )
		);
	}

	protected function get_bulk_actions() {
		$actions = [
			'bulk-delete' => __( 'Delete', 'changeloger' ),
			'bulk-edit'   => __( 'Edit', 'changeloger' )
		];

		return $actions;
	}
}

/**
 * Changeloger Usage Table Admin Page
 */
class Changeloger_Usage_Table_Admin {

	public function __construct() {
		// Constructor can be used for hooks specific to usage table
	}

	/**
	 * Render the usage table page
	 */
	public function render_page() {
		$usage_table = new Changeloger_Usage_Table();
		$usage_table->prepare_items();

		echo '<div class="wrap">';
		echo '<h1 class="wp-heading-inline">' . __( 'Changeloger Usage Table', 'changeloger' ) . '</h1>';
		echo '<hr class="wp-header-end">';

		$usage_table->views();

		echo '<form method="post">';
		$usage_table->display();
		echo '</form>';

		echo '</div>';
	}
}
