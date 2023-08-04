<?php

/**
 * Plugin Name:       Changeloger
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       changeloger
 *
 * @package           changeloger
 */

add_action( 'enqueue_block_editor_assets', function () {
	wp_register_style(
		'changeloger-style-css',
		plugins_url( '/', __FILE__ ) . 'build/style-index.css',
		array(),
		'initial'
	);
} );

function create_block_changeloger_block_init() {
	register_block_type(
		__DIR__ . '/build',
		array( 'render_callback' => 'changeloger_render' )
	);

	wp_register_script(
		'changeloger-frontend',
		plugins_url( '/', __FILE__ ) . 'script/frontend.js',
		array(),
		uniqid(),
		true
	);
}

add_action( 'init', 'create_block_changeloger_block_init' );

function changloger_convert_array_to_style_declaration( $array ) {
	$styleDeclaration = '';

	foreach ( $array as $key => $value ) {
		$styleDeclaration .= sprintf( '%s: %s; ', $key, $value );
	}

	return $styleDeclaration;
}

function changeloger_get_custom_style( $attributes, $category ) {

	$custom_colors = isset( $attributes['customLogTypeColors'] ) ? $attributes['customLogTypeColors'] : array();

	$has_custom_color = isset( $custom_colors[ $category ] );

	if ( false === $has_custom_color ) {
		return '';
	}

	$required_custom_color = $custom_colors[ $category ];

	return 'style="background-color:' . $required_custom_color . ';"';
}

function changelogger_can_show_children( $versions, $childrens ) {
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

function changeloger_version_tree( $versions, $paginated_changelog, $is_child = true ) {

	$available_versions = array_map( function ( $log ) {
		return $log['version'];
	}, $paginated_changelog );
	?>

    <ul class="<?php echo $is_child ? "changeloger-version-list-wrapper" : "" ?>">
		<?php foreach ( $versions as $version ) : ?>

			<?php if ( ( isset( $version['children'] ) && count( $version['children'] ) > 0
			             && changelogger_can_show_children( $available_versions, $version['children'] ) )
			           || in_array( $version['version'], $available_versions, true )
			) : ?>

                <li class="<?php echo $is_child ? "changeloger-version-list-main-item" : "" ?>">
                    <a href="#<?php echo $version['version'] ?>">
                        Version <?php echo $version['version'] ?>
                    </a>
					<?php
					if ( isset( $version['children'] ) && count( $version['children'] ) > 0 ) {
						changeloger_version_tree( $version['children'], $paginated_changelog, false );
					}
					?>
                </li>

			<?php endif; ?>
		<?php endforeach; ?>
    </ul>
	<?php
}


function changeloger_render( $attributes, $content, $instance ) {
	wp_register_style(
		'changeloger-style-css',
		plugins_url( '/', __FILE__ ) . 'build/style-index.css',
		array(),
		'initial'
	);

	$data              = json_decode( $content, true );
	$changelog         = isset( $data['changelog'] ) ? $data['changelog'] : array();
	$per_page          = isset( $attributes['perPage'] ) ? $attributes['perPage'] : 100;
	$current_page      = isset( $_GET['cr-page'] ) ? $_GET['cr-page'] : 1;
	$total_page        = ceil( count( $changelog ) / $per_page );
	$enable_pagination = isset( $attributes['enablePagination'] ) ? $attributes['enablePagination'] : false;

	$data['props']['data-id'] = substr( md5( $content ), 0, 5 );

	$start_index         = ( $current_page - 1 ) * $per_page;
	$end_index           = $start_index + $per_page;
	$paginated_changelog = array_slice( $changelog, $start_index, $per_page );


	if ( isset( $data['props']['className'] ) ) {
		$data['props']['class'] = $data['props']['className'];
		unset( $data['props']['className'] );
	}

	if ( isset( $data['props']['style'] ) ) {
		$data['props']['style'] = changloger_convert_array_to_style_declaration( $data['props']['style'] );
	}

	$pagination_type = isset( $attributes['paginationType'] ) ? $attributes['paginationType'] : '';

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

	$custom_links = isset( $attributes['customLinks'] ) ? $attributes['customLinks'] : array();
	$verion_name  = isset( $attributes['versionName'] ) ? $attributes['versionName'] : array();

	$args = array(
		'base'               => '%_%',
		'format'             => '?cr-page=%#%',
		'total'              => $total_page,
		'current'            => $current_page,
		'show_all'           => false,
		'end_size'           => 1,
		'mid_size'           => 2,
		'prev_next'          => true,
		'prev_text'          => __( '&laquo; Previous' ),
		'next_text'          => __( 'Next &raquo;' ),
		'type'               => 'plain',
		'add_args'           => false,
		'add_fragment'       => '',
		'before_page_number' => '',
		'after_page_number'  => '',
	);

	$pagination_styles = isset( $data['paginationStyles'] ) ? $data['paginationStyles'] : array();
	$pagination_text   = isset( $attributes['paginationLoadMoreText'] ) ? $attributes['paginationLoadMoreText'] : 'Load More';

	$numberd_pagination         = paginate_links( $args );
	$load_more_button_markup    = 'load-more' === $attributes['paginationType'] ? '
		<div class="wp-block-button">
			<a style="' . changloger_convert_array_to_style_declaration( $pagination_styles )
              . '" class="changeloger-pagination-button wp-block-button__link wp-element-button">'
              . $pagination_text . '</a>
		</div>
	' : "";
	$numbered_pagination_markup = 'numbered' === $attributes['paginationType'] ? $numberd_pagination : '';
	$version_position           = isset( $attributes['versionsPosition'] ) ? $attributes['versionsPosition'] : "right";
	$enable_versions            = isset( $attributes['enableVersions'] ) ? $attributes['enableVersions'] : true;
	$is_left                    = $enable_versions && $version_position === 'left';
	$is_right                   = $enable_versions && $version_position === 'right';

	ob_start();

	    ?>
        <div <?php echo $wrapper_attributes ?> data-total-page=" <?php echo $total_page ?>" data-per-page="<?php echo $per_page ?>"
                                               data-enable-pagination="<?php echo $attributes['enablePagination'] ? "true" : "false" ?>"
                                               data-pagination-type="<?php echo $pagination_type ?>">
            <div class="changelog-wrapper">
                <?php if ( $is_left ) { ?>
                    <div class="changeloger-version-list-container changeloger-version-list-position-left">
                        <h6 class="version-title">Version</h6>
                        <?php echo changeloger_version_tree( $data['version'], $versioned_changelog ) ?>
                    </div>
                <?php } ?>

                <div class="changeloger-info-inner-wrapper">
                    <?php foreach ( $is_enable_pagination as $item ) : ?>
                        <div id="<?php echo $item['version'] ?>" class="changelog-info-item">
                            <div class="date">
                                <span><?php echo $item['date']; ?></span>
                                <span><?php echo isset( $verion_name[ $item['version'] ] ) ? $verion_name[ $item['version'] ] : ''; ?></span>
                            </div>
                            <div class="version">
                                <span class="version-tag"><?php echo $item['version']; ?></span>
                                <span class="line"></span>
                            </div>
                            <div class="content">
                                <?php foreach ( $item['changes'] as $change ) : ?>
                                    <p>
                                        <span class="<?php echo 'tag ' . str_replace( " ", "-",
                                                strtolower( $change['category'] ) ) ?>" <?php echo changeloger_get_custom_style( $attributes,
                                            strtolower( $change['category'] ) ) ?>>
                                            <?php echo $change['category']; ?>
                                        </span>
                                        <?php echo $change['change']; ?>
                                    </p>
                                <?php endforeach; ?>

                                <div class="changeloger-link-wrapper">

                                    <?php if ( isset( $custom_links[ $item['version'] ] ) ) {
                                        foreach ( $custom_links[ $item['version'] ] as $custom_link ) : ?>
                                            <?php if ( ! is_null( $custom_link ) ): ?>
                                                <div class="changeloger-link-item">
                                                    <a target="_blank" href="<?php echo $custom_link['link'] ?>" class="changeloger-custom-link">
                                                        <?php if ( isset( $custom_link['icon'] ) && ! empty( $custom_link['icon'] ) ): ?>
                                                            <span class="changeloger-custom-link-icon"
                                                                  style="-webkit-mask-image: url(<?php echo $custom_link['icon'] ?>)"></span>
                                                        <?php endif; ?>
                                                        <?php echo $custom_link['name'] ?>
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                        <?php endforeach;
                                    } ?>

                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <?php if ( $is_right ) { ?>
                    <div class="changeloger-version-list-container changeloger-version-list-position-right">
                        <h6 class="version-title">Version</h6>
                        <?php echo changeloger_version_tree( $data['version'], $versioned_changelog ) ?>
                    </div>
                <?php } ?>
            </div>

            <?php if ( $enable_pagination ) : ?>
                <div class="changeloger-pagination-wrapper">
                    <?php echo $load_more_button_markup ?>
                    <?php echo $numbered_pagination_markup ?>
                </div>
            <?php endif; ?>

        </div>
        <?php

	$content = ob_get_contents();

	ob_end_clean();
	ob_flush();

	return $content;
}
