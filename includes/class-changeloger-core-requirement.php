<?php
/**
 * Changeloger Core Requirement Class
 * Ensures that changeloger-pro plugin requires changeloger to be installed and activated
 */

if ( ! class_exists( 'Changeloger_Core_Requirement' ) ) :

	class Changeloger_Core_Requirement {

		/**
		 * Plugin basename for changeloger
		 */
		const CORE_PLUGIN_SLUG = 'changeloger';
		const CORE_PLUGIN_FILE = 'changeloger.php';

		/**
		 * Instantiate the class
		 */
		function __construct() {
			add_action( 'init', array( $this, 'init_hooks' ) );
		}

		/**
		 * Initialize the hooks
		 *
		 * @return void
		 */
		public function init_hooks() {
			add_action( 'wp_ajax_changeloger_install_core', array( $this, 'install_changeloger_core' ) );
		}

		/**
		 * Fail if plugin installation/activation fails
		 *
		 * @param Object $thing
		 *
		 * @return void
		 */
		public function fail_on_error( $thing ) {
			if ( is_wp_error( $thing ) ) {
				wp_send_json_error( $thing->get_error_message() );
			}
		}

		/**
		 * Install Changeloger Core
		 *
		 * @return void
		 */
		public function install_changeloger_core() {
			check_ajax_referer( 'changeloger_install_core' );
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( __( 'You don\'t have permission to install the plugins', 'changeloger' ) );
			}

			$cha_status = $this->install_plugin( self::CORE_PLUGIN_SLUG, self::CORE_PLUGIN_FILE );
			$this->fail_on_error( $cha_status );

			wp_send_json_success();
		}

		/**
		 * Install and activate a plugin
		 *
		 * @param string $slug
		 * @param string $file
		 *
		 * @return WP_Error|null
		 */
		public function install_plugin( $slug, $file ) {
			include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

			$plugin_basename = $slug . '/' . $file;

			// if exists and not activated
			if ( file_exists( WP_PLUGIN_DIR . '/' . $plugin_basename ) ) {
				return activate_plugin( $plugin_basename );
			}

			// seems like the plugin doesn't exists. Download and activate it
			$upgrader = new Plugin_Upgrader( new WP_Ajax_Upgrader_Skin() );

			$api    = plugins_api( 'plugin_information', array( 'slug' => $slug, 'fields' => array( 'sections' => false ) ) );
			$result = $upgrader->install( $api->download_link );

			if ( is_wp_error( $result ) ) {
				return $result;
			}

			return activate_plugin( $plugin_basename );
		}
	}

endif;

