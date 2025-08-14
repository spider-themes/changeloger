<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Changeloger Settings Admin Page
 */
class Changeloger_Settings {

	public function __construct() {
		// Constructor can be used for hooks specific to settings
	}

	/**
	 * Render the settings page
	 */
	public function render_page() {
		// Handle form submission
		if (isset($_POST['submit'])) {
			check_admin_referer('changeloger_settings');

			// Save settings
			$settings = [
				'default_pagination' => sanitize_text_field($_POST['default_pagination'] ?? 'false'),
				'default_per_page' => absint($_POST['default_per_page'] ?? 10),
				'default_filter' => sanitize_text_field($_POST['default_filter'] ?? 'false'),
				'enable_version_tree' => sanitize_text_field($_POST['enable_version_tree'] ?? 'true'),
			];

			update_option('changeloger_settings', $settings);
			echo '<div class="notice notice-success"><p>' . __('Settings saved successfully!', 'changeloger') . '</p></div>';
		}

		// Get current settings
		$settings = get_option('changeloger_settings', [
			'default_pagination' => 'false',
			'default_per_page' => 10,
			'default_filter' => 'false',
			'enable_version_tree' => 'true',
		]);

		echo '<div class="wrap">';
		echo '<h1>' . __( 'Changeloger Settings', 'changeloger' ) . '</h1>';

		echo '<form method="post" action="">';
		wp_nonce_field('changeloger_settings');

		echo '<table class="form-table">';

		// Default pagination setting
		echo '<tr>';
		echo '<th scope="row">' . __( 'Default Pagination', 'changeloger' ) . '</th>';
		echo '<td>';
		echo '<label><input type="radio" name="default_pagination" value="true"' . checked($settings['default_pagination'], 'true', false) . '> ' . __( 'Enabled', 'changeloger' ) . '</label><br>';
		echo '<label><input type="radio" name="default_pagination" value="false"' . checked($settings['default_pagination'], 'false', false) . '> ' . __( 'Disabled', 'changeloger' ) . '</label>';
		echo '<p class="description">' . __( 'Enable pagination by default for new Changeloger blocks.', 'changeloger' ) . '</p>';
		echo '</td>';
		echo '</tr>';

		// Default per page setting
		echo '<tr>';
		echo '<th scope="row">' . __( 'Default Items Per Page', 'changeloger' ) . '</th>';
		echo '<td>';
		echo '<input type="number" name="default_per_page" value="' . esc_attr($settings['default_per_page']) . '" min="1" max="100" class="small-text">';
		echo '<p class="description">' . __( 'Default number of changelog items to show per page.', 'changeloger' ) . '</p>';
		echo '</td>';
		echo '</tr>';

		// Default filter setting
		echo '<tr>';
		echo '<th scope="row">' . __( 'Default Filter', 'changeloger' ) . '</th>';
		echo '<td>';
		echo '<label><input type="radio" name="default_filter" value="true"' . checked($settings['default_filter'], 'true', false) . '> ' . __( 'Enabled', 'changeloger' ) . '</label><br>';
		echo '<label><input type="radio" name="default_filter" value="false"' . checked($settings['default_filter'], 'false', false) . '> ' . __( 'Disabled', 'changeloger' ) . '</label>';
		echo '<p class="description">' . __( 'Enable filtering by default for new Changeloger blocks.', 'changeloger' ) . '</p>';
		echo '</td>';
		echo '</tr>';

		// Version tree setting
		echo '<tr>';
		echo '<th scope="row">' . __( 'Version Tree', 'changeloger' ) . '</th>';
		echo '<td>';
		echo '<label><input type="radio" name="enable_version_tree" value="true"' . checked($settings['enable_version_tree'], 'true', false) . '> ' . __( 'Enabled', 'changeloger' ) . '</label><br>';
		echo '<label><input type="radio" name="enable_version_tree" value="false"' . checked($settings['enable_version_tree'], 'false', false) . '> ' . __( 'Disabled', 'changeloger' ) . '</label>';
		echo '<p class="description">' . __( 'Show version tree navigation for Changeloger blocks.', 'changeloger' ) . '</p>';
		echo '</td>';
		echo '</tr>';

		echo '</table>';

		submit_button();
		echo '</form>';
		echo '</div>';
	}

	/**
	 * Get plugin settings
	 */
	public function get_settings() {
		return get_option('changeloger_settings', [
			'default_pagination' => 'false',
			'default_per_page' => 10,
			'default_filter' => 'false',
			'enable_version_tree' => 'true',
		]);
	}

	/**
	 * Update plugin settings
	 */
	public function update_settings($settings) {
		return update_option('changeloger_settings', $settings);
	}

	/**
	 * Get a specific setting value
	 */
	public function get_setting($key, $default = null) {
		$settings = $this->get_settings();
		return isset($settings[$key]) ? $settings[$key] : $default;
	}
}
