<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main Admin Class for Changeloger Plugin
 */
class Changeloger_Admin {

	private static $instance;
	private $dashboard;
	private $usage_table;
	private $settings;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		$this->includes();
		$this->init_admin_pages();
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
	}

	/**
	 * Include admin class files
	 */
	private function includes() {
		require_once __DIR__ . '/class-changeloger-dashboard.php';
		require_once __DIR__ . '/class-changeloger-usage-table.php';
		require_once __DIR__ . '/class-changeloger-settings.php';
	}

	/**
	 * Initialize admin page instances
	 */
	private function init_admin_pages() {
		$this->dashboard = new Changeloger_Dashboard();
		$this->usage_table = new Changeloger_Usage_Table_Admin();
		$this->settings = new Changeloger_Settings();
	}

	/**
	 * Add admin menu and submenus
	 */
	public function add_admin_menu() {
		// Add main Changeloger menu
		add_menu_page(
			__( 'Changeloger', 'changeloger' ),
			__( 'Changeloger', 'changeloger' ),
			'manage_options',
			'changeloger',
			[ $this->dashboard, 'render_page' ],
			'dashicons-list-view',
			30
		);

		// Add Usage Table submenu
		add_submenu_page(
			'changeloger',
			__( 'Usage Table', 'changeloger' ),
			__( 'Usage Table', 'changeloger' ),
			'manage_options',
			'changeloger-usage',
			[ $this->usage_table, 'render_page' ]
		);

		// Add Settings submenu
		add_submenu_page(
			'changeloger',
			__( 'Settings', 'changeloger' ),
			__( 'Settings', 'changeloger' ),
			'manage_options',
			'changeloger-settings',
			[ $this->settings, 'render_page' ]
		);
	}

	/**
	 * Get dashboard instance
	 */
	public function get_dashboard() {
		return $this->dashboard;
	}

	/**
	 * Get usage table instance
	 */
	public function get_usage_table() {
		return $this->usage_table;
	}

	/**
	 * Get settings instance
	 */
	public function get_settings() {
		return $this->settings;
	}
}

// Initialize the admin
Changeloger_Admin::get_instance();
