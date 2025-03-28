<?php
/**
 * Plugin Name: Changeloger
 * Description: A Gutenberg block to display changelog
 * Author: spider-themes
 * Requires at least: 6.0
 * Tested up to: 6.7.2
 * Requires PHP: 7.4
 * Version: 1.0.1
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text domain: changeloger
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


if ( ! function_exists( 'cha_fs' ) ) {
	// Create a helper function for easy SDK access.
	function cha_fs() {
		global $cha_fs;

		if ( ! isset( $cha_fs ) ) {
			// Activate multisite network integration.
			if ( ! defined( 'WP_FS__PRODUCT_18274_MULTISITE' ) ) {
				define( 'WP_FS__PRODUCT_18274_MULTISITE', true );
			}

			// Include Freemius SDK.
			require_once dirname( __FILE__ ) . '/vendor/fs/start.php';
			$cha_fs = fs_dynamic_init( array(
				'id'             => '18274',
				'slug'           => 'changeloger',
				'type'           => 'plugin',
				'public_key'     => 'pk_776f0d8257af65cd6c37c2b92c97b',
				'is_premium'     => false,
				'has_addons'     => false,
				'has_paid_plans' => false,
				'menu'           => array(
					'first-path' => 'plugins.php',
					'contact'    => false,
					'support'    => false,
				),
			) );
		}

		return $cha_fs;
	}

	// Init Freemius.
	cha_fs();
//	->add_filter( 'hide_freemius_powered_by', '__return_true' );
	// Signal that SDK was initiated.
	do_action( 'cha_fs_loaded' );
}


if ( ! class_exists( 'CHANGELOGER_BLOCKS_CLASS' ) ) {
	final class CHANGELOGER_BLOCKS_CLASS {
		private $enqueue_assets;


		public function __construct() {

			add_action( 'plugins_loaded', [ $this, 'changeloger_load_textdomain' ] );

			add_action( 'init',  [ $this, 'changeloger_create_block_init' ] );


			$this->core_includes();

			$this->enqueue_assets = new Changeloger_Block_Assets();
		}

		/**
		 * Initialize the plugin
		 */
		public static function init() {
			static $instance = false;
			if ( ! $instance ) {
				$instance = new self();
			}

			return $instance;
		}




		public function changeloger_load_textdomain() {
			load_plugin_textdomain( 'changeloger', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
		}

		public function core_includes(): void {
			require_once __DIR__ . '/includes/enqueue-assets.php';
		}

		public function changeloger_create_block_init() {
			register_block_type(
				__DIR__ . '/build',
				array( 'render_callback' =>  [ $this, 'changeloger_render' ] )
			);
		}



		/**
		 * Render block
		 *
		 * @param $attributes
		 * @param $content
		 * @param $instance
		 *
		 * @return false|string
		 */

		public function changeloger_style_declaration( $array ) {
			$styleDeclaration = '';

			foreach ( $array as $key => $value ) {
				$styleDeclaration .= sprintf( '%s: %s; ', $key, $value );
			}

			return $styleDeclaration;
		}

		public function changeloger_get_custom_style( $attributes, $category ) {

			$custom_colors = isset( $attributes['customLogTypeColors'] ) ? $attributes['customLogTypeColors'] : array();

			$has_custom_color = isset( $custom_colors[ $category ] );

			if ( false === $has_custom_color ) {
				return '';
			}

			$required_custom_color = $custom_colors[ $category ];

			return 'style="background-color:' . esc_attr($required_custom_color) . ';"';
		}

		public function changeloger_can_show_children( $versions, $childrens ) {
			$can_show = false;

			foreach ( $childrens as $children ) {
				$can_show_current = in_array( $children['version'], $versions, true );

				if ( $can_show_current ) {
					$can_show = true;
					break;
				}
			}

			return $can_show;
		}

		public function changeloger_version_tree( $versions, $paginated_changelog, $is_child = true ) {

			$available_versions = array_map( function ( $log ) {
				return $log['version'];
			}, $paginated_changelog );
			?>

			<ul class="<?php echo $is_child ? "changeloger-version-list-wrapper" : "" ?>">
				<?php
				foreach ( $versions as $version ) {
					if ( ( isset( $version['children'] ) && count( $version['children'] ) > 0 && $this->changeloger_can_show_children( $available_versions, $version['children'] ) ) || in_array( $version['version'], $available_versions, true )) { ?>
						<li class="<?php echo $is_child ? "changeloger-version-list-main-item" : "" ?>">
							<a href="#<?php echo esc_attr($version['version']) ?>">
								<?php esc_html_e('Version', 'changeloger'); ?> <?php echo esc_html($version['version']) ?>
							</a>
							<?php
							if ( isset( $version['children'] ) && count( $version['children'] ) > 0 ) {
								$this->changeloger_version_tree( $version['children'], $paginated_changelog, false );
							}
							?>
						</li>
						<?php
					}
				}
				?>
			</ul>
			<?php
		}

		public function changeloger_render( $attributes, $content, $instance ) {
			wp_register_style( 'changeloger', plugins_url( '/', __FILE__ ) . 'build/style-index.css' );


			if ( $attributes['enablePagination'] == '1' || $attributes['enableFilter'] == '1' ) {
				wp_enqueue_script( 'changeloger-filter' );
			}


			$data              = json_decode( $content, true );
			$changelog         = $data['changelog'] ?? array();
			$per_page          = $attributes['perPage'] ?? 100;
			$current_page      = isset( $_GET['cr-page'] ) ? absint( $_GET['cr-page'] ) : 1;
			$total_page        = ceil( count( $changelog ) / $per_page );
			$enable_pagination = $attributes['enablePagination'] ?? false;

			$data['props']['data-id'] = substr( md5( $content ), 0, 5 );

			$start_index         = ( $current_page - 1 ) * $per_page;
			$end_index           = $start_index + $per_page;
			$paginated_changelog = array_slice( $changelog, $start_index, $per_page );


			if ( isset( $data['props']['className'] ) ) {
				$data['props']['class'] = $data['props']['className'];
				unset( $data['props']['className'] );
			}

			if ( isset( $data['props']['style'] ) ) {
				$data['props']['style'] = $this->changeloger_style_declaration( $data['props']['style'] );
			}

			$pagination_type = $attributes['paginationType'] ?? '';

			$is_enable_pagination = true === $enable_pagination ? $paginated_changelog : $changelog;
			$versioned_changelog  = $changelog;

			if ( true === $enable_pagination ) {
				if ( 'numbered' === $pagination_type ) {
					$versioned_changelog = array_slice( $changelog, $start_index, $per_page );
				} else {
					$versioned_changelog = array_slice( $changelog, 0, $end_index );
				}
			}

			$wrapper_attributes = get_block_wrapper_attributes( $data['props'] );

			$custom_links = $attributes['customLinks'] ?? array();
			$version_name  = $attributes['versionName'] ?? array();

			$args = array(
				'base'               => '%_%',
				'format'             => '?cr-page=%#%',
				'total'              => $total_page,
				'current'            => $current_page,
				'show_all'           => false,
				'end_size'           => 1,
				'mid_size'           => 2,
				'prev_next'          => true,
				'prev_text'          => esc_html__( '&laquo; Previous', 'changeloger' ),
				'next_text'          => esc_html__( 'Next &raquo;', 'changeloger' ),
				'type'               => 'plain',
				'add_args'           => false,
				'add_fragment'       => '',
				'before_page_number' => '',
				'after_page_number'  => '',
			);

			$pagination_styles = $data['paginationStyles'] ?? array();
			$pagination_text   = $attributes['paginationLoadMoreText'] ?? esc_html__( 'Load More', 'changeloger' );

			$numberd_pagination         = paginate_links( $args );
			$load_more_button_markup    = 'load-more' === $attributes['paginationType'] ? '
        <a style="' . $this->changeloger_style_declaration( $pagination_styles ) . '" class="changeloger-pagination-button wp-block-button__link">' . $pagination_text
			                                                                              . '</a>' : "";
			$numbered_pagination_markup = 'numbered' === $attributes['paginationType'] ? $numberd_pagination : '';
			$version_position           = $attributes['versionsPosition'] ?? "right";
			$enable_versions            = ! isset( $attributes['enableVersions'] ) || $attributes['enableVersions'];
			$is_left                    = $enable_versions && $version_position === 'left';
			$is_right                   = $enable_versions && $version_position === 'right';

			ob_start();

			?>
			<div <?php echo $wrapper_attributes ?>
				data-total-page=" <?php echo esc_attr($total_page) ?>"
				data-per-page="<?php echo esc_attr($per_page) ?>"
				data-enable-pagination="<?php echo $attributes['enablePagination'] ? 'true' : 'false' ?>"
				data-pagination-type="<?php echo esc_attr($pagination_type) ?>">
				<div class="changelog-wrapper">
					<?php if ( $is_left ) { ?>
						<div class="changeloger-version-list-container changeloger-version-list-position-left">
							<h6 class="version-title"><?php esc_html_e('Version', 'changeloger'); ?></h6>
							<?php $this->changeloger_version_tree( $data['version'], $versioned_changelog ) ?>
						</div>
					<?php } ?>

					<div class="changeloger-info-inner-wrapper">
						<div class="changeloger-items">
							<?php
							if ( !empty($is_enable_pagination) ) {
								foreach ( $is_enable_pagination as $item ) {
									?>
									<div id="<?php echo esc_attr( $item['version'] ) ?>" class="changelog-info-item">
										<div class="date">
											<span><?php echo esc_html( $item['date'] ); ?></span>
											<?php if ( isset($version_name[$item['version']]) ) : ?>
												<span><?php echo esc_html( $version_name[ $item['version'] ] ) ?? ''; ?></span>
											<?php endif ?>
										</div>
										<div class="version">
											<span class="version-tag"><?php echo esc_html($item['version']); ?></span>
											<span class="line"></span>
										</div>
										<div class="content">
											<?php
											if ( !empty($item['changes']) ) {
												foreach ( $item['changes'] as $change ) {
													?>
													<p>
                                                <span class="<?php echo 'tag ' . str_replace( ' ', '-', esc_attr(strtolower( $change['category'] )) ) ?>"
                                                    <?php echo $this->changeloger_get_custom_style( $attributes, esc_attr(strtolower( $change['category'] )) ) ?>>
                                                    <?php echo esc_html($change['category']); ?>
                                                </span>
														<span class="change">
                                                    <?php echo html_entity_decode($change['change']) ?>
                                                </span>
													</p>
													<?php
												}
											}

											if ( isset( $custom_links[ $item['version'] ] ) ) { ?>
												<div class="changeloger-link-wrapper">
													<?php
													foreach ( $custom_links[ $item['version'] ] as $custom_link ) {
														if ( ! is_null( $custom_link ) ) {
															?>
															<div class="changeloger-link-item">
																<a href="<?php echo esc_url( $custom_link['link'] ) ?>" class="changeloger-custom-link" target="_blank">
																	<?php if ( ! empty( $custom_link['icon'] ) ):
																		?>
																		<span class="changeloger-custom-link-icon" style="-webkit-mask-image: url(<?php echo $custom_link['icon'] ?>)"></span>
																	<?php endif; ?>
																	<?php echo esc_html( $custom_link['name'] ) ?>
																</a>
															</div>
															<?php
														}
													}
													?>
												</div>
												<?php
											}
											?>
										</div>
									</div>
									<?php
								}
							}
							?>
						</div>

						<?php if ( $enable_pagination ) : ?>
							<div class="changeloger-pagination-wrapper">
								<?php echo wp_kses_post($load_more_button_markup) ?>
								<?php echo wp_kses_post($numbered_pagination_markup) ?>
							</div>
						<?php endif; ?>
					</div>

					<?php if ( $is_right ) { ?>
						<div class="changeloger-version-list-container changeloger-version-list-position-right">
							<h6 class="version-title"><?php esc_html_e('Version', 'changeloger'); ?></h6>
							<?php $this->changeloger_version_tree( $data['version'], $versioned_changelog ) ?>
						</div>
					<?php } ?>
				</div>

			</div>
			<?php

//			$content = ob_get_contents();

			ob_end_clean();
			ob_flush();

			return $content;
		}

	}
}


/**
 * Kickoff
 */
CHANGELOGER_BLOCKS_CLASS::init();
//
//
//function load_more_changelog(): void {
//	// Verify nonce for security
//	if ( ! isset( $_GET['nonce'] ) || ! wp_verify_nonce( $_GET['nonce'], 'changeloger_nonce' ) ) {
//		wp_send_json_error();
//	}
//
//	// Get the page number from the AJAX request
//	$page = isset( $_GET['page'] ) ? absint( $_GET['page'] ) : 1;
//	$per_page = 10; // Items per page
//
//	// Fetch changelog items for the requested page
//	$changelog = get_changelog_items($page, $per_page); // You will need to define this function
//	$items = [];
//
//	// Prepare the data to send back
//	foreach ($changelog as $item) {
//		$items[] = [
//			'version' => esc_html($item['version']),
//			'change'  => esc_html($item['change']),
//		];
//	}
//
//	// Check if there are more items to load
//	$total_items = get_changelog_total_count(); // You will need to define this function
//	$has_more = ($page * $per_page) < $total_items;
//
//	wp_send_json_success([
//		'items'    => $items,
//		'has_more' => $has_more,
//	]);
//}
//
//function get_changelog_items( int $page, int $per_page ) {
//
//}
//
//// Register the AJAX action
//add_action('wp_ajax_load_more_changelog', 'load_more_changelog');
//add_action('wp_ajax_nopriv_load_more_changelog', 'load_more_changelog');
