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
		private $register_blocks;

		public function __construct() {

			$this->core_includes();
			add_action( 'plugins_loaded', [ $this, 'changeloger_load_textdomain' ] );

			$this->register_blocks = new Changeloger_Block_Register();
			add_action( 'init', [ $this->register_blocks, 'changeloger_create_block_init' ] );


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
			require_once __DIR__ . '/includes/register-blocks.php';
			require_once __DIR__ . '/admin/class-changeloger-admin.php';
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

			return 'style="background-color:' . esc_attr( $required_custom_color ) . ';"';
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
					if ( ( isset( $version['children'] ) && count( $version['children'] ) > 0
					       && $this->changeloger_can_show_children( $available_versions, $version['children'] ) )
					     || in_array( $version['version'], $available_versions, true )
					) { ?>
                        <li class="<?php echo $is_child ? "changeloger-version-list-main-item" : "" ?>">
                            <a href="#<?php echo esc_attr( $version['version'] ) ?>">
								<?php esc_html_e( 'Version', 'changeloger' ); ?><?php echo esc_html( $version['version'] ) ?>
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
