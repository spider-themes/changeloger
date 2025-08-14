<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Changeloger Dashboard Admin Page
 */
class Changeloger_Dashboard {

	public function __construct() {
		// Constructor can be used for hooks specific to dashboard
	}

	/**
	 * Render the dashboard page
	 */
	public function render_page() {
		echo '<div class="wrap">';
		echo '<h1>' . __( 'Changeloger Dashboard', 'changeloger' ) . '</h1>';
		echo '<div class="changeloger-dashboard">';

		// Statistics cards
		echo '<div class="changeloger-stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">';

		// Total usage card
		$total_usage = $this->get_total_usage();
		echo '<div class="changeloger-stat-card" style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">';
		echo '<h3 style="margin: 0 0 10px 0; color: #2271b1;">' . __( 'Total Usage', 'changeloger' ) . '</h3>';
		echo '<p style="font-size: 24px; font-weight: bold; margin: 0; color: #1d2327;">' . $total_usage . '</p>';
		echo '<p style="margin: 5px 0 0 0; color: #646970;">' . __( 'Posts and pages using Changeloger blocks', 'changeloger' ) . '</p>';
		echo '</div>';

		// Block types card
		$block_stats = $this->get_block_statistics();
		echo '<div class="changeloger-stat-card" style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">';
		echo '<h3 style="margin: 0 0 10px 0; color: #2271b1;">' . __( 'Block Types', 'changeloger' ) . '</h3>';
		echo '<p style="margin: 5px 0; color: #1d2327;"><strong>' . __( 'Changeloger:', 'changeloger' ) . '</strong> ' . $block_stats['changeloger'] . '</p>';
		echo '<p style="margin: 5px 0; color: #1d2327;"><strong>' . __( 'Tabbed Changeloger:', 'changeloger' ) . '</strong> ' . $block_stats['tabbed'] . '</p>';
		echo '</div>';

		echo '</div>';

		// Quick actions
		echo '<div class="changeloger-quick-actions" style="margin: 30px 0;">';
		echo '<h2>' . __( 'Quick Actions', 'changeloger' ) . '</h2>';
		echo '<div style="display: flex; gap: 15px; flex-wrap: wrap;">';
		echo '<a href="' . admin_url( 'admin.php?page=changeloger-usage' ) . '" class="button button-primary">' . __( 'View Usage Table', 'changeloger' ) . '</a>';
		echo '<a href="' . admin_url( 'admin.php?page=changeloger-settings' ) . '" class="button button-secondary">' . __( 'Settings', 'changeloger' ) . '</a>';
		echo '<a href="' . admin_url( 'post-new.php' ) . '" class="button button-secondary">' . __( 'Create New Post', 'changeloger' ) . '</a>';
		echo '</div>';
		echo '</div>';

		// Recent usage
		echo '<div class="changeloger-recent-usage" style="margin: 30px 0;">';
		echo '<h2>' . __( 'Recent Usage', 'changeloger' ) . '</h2>';
		$recent_items = $this->get_recent_usage(5);
		if (!empty($recent_items)) {
			echo '<div class="changeloger-recent-list" style="background: #fff; border: 1px solid #ddd; border-radius: 8px;">';
			foreach ($recent_items as $item) {
				echo '<div style="padding: 15px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">';
				echo '<div>';
				echo '<strong><a href="' . $item['edit_link'] . '">' . esc_html($item['title']) . '</a></strong>';
				echo '<br><small style="color: #646970;">' . esc_html($item['post_type']) . ' • ' . esc_html($item['block_name']) . '</small>';
				echo '</div>';
				echo '<div style="text-align: right; color: #646970; font-size: 12px;">';
				echo date('M j, Y', strtotime($item['date']));
				echo '</div>';
				echo '</div>';
			}
			echo '</div>';
		} else {
			echo '<p>' . __( 'No recent usage found.', 'changeloger' ) . '</p>';
		}
		echo '</div>';

		echo '</div>';
		echo '</div>';
	}

	/**
	 * Get total usage count
	 */
	private function get_total_usage() {
		global $wpdb;

		$sql = "SELECT COUNT(DISTINCT p.ID)
				FROM {$wpdb->posts} p
				WHERE (p.post_content LIKE '%wp:cha/changeloger%' OR p.post_content LIKE '%wp:cha/tabbed-changeloger%')
				AND p.post_status IN ('publish', 'draft', 'private', 'pending')";

		return $wpdb->get_var($sql) ?: 0;
	}

	/**
	 * Get block type statistics
	 */
	private function get_block_statistics() {
		global $wpdb;

		$sql = "SELECT p.post_content
				FROM {$wpdb->posts} p
				WHERE (p.post_content LIKE '%wp:cha/changeloger%' OR p.post_content LIKE '%wp:cha/tabbed-changeloger%')
				AND p.post_status IN ('publish', 'draft', 'private', 'pending')";

		$results = $wpdb->get_results($sql);

		$stats = ['changeloger' => 0, 'tabbed' => 0];

		foreach ($results as $result) {
			if (strpos($result->post_content, 'wp:cha/changeloger') !== false && strpos($result->post_content, 'wp:cha/tabbed-changeloger') === false) {
				$stats['changeloger']++;
			}
			if (strpos($result->post_content, 'wp:cha/tabbed-changeloger') !== false) {
				$stats['tabbed']++;
			}
		}

		return $stats;
	}

	/**
	 * Get recent usage items
	 */
	private function get_recent_usage($limit = 5) {
		global $wpdb;

		$sql = "SELECT p.ID, p.post_title, p.post_type, p.post_date, p.post_content
				FROM {$wpdb->posts} p
				WHERE (p.post_content LIKE '%wp:cha/changeloger%' OR p.post_content LIKE '%wp:cha/tabbed-changeloger%')
				AND p.post_status IN ('publish', 'draft', 'private', 'pending')
				ORDER BY p.post_date DESC
				LIMIT %d";

		$results = $wpdb->get_results($wpdb->prepare($sql, $limit));

		$data = [];
		foreach ($results as $result) {
			$block_names = [];

			if (strpos($result->post_content, 'wp:cha/changeloger') !== false) {
				$block_names[] = 'Changeloger';
			}
			if (strpos($result->post_content, 'wp:cha/tabbed-changeloger') !== false) {
				$block_names[] = 'Tabbed Changeloger';
			}

			$data[] = [
				'title' => $result->post_title ?: __('(no title)', 'changeloger'),
				'post_type' => ucfirst($result->post_type),
				'block_name' => implode(', ', $block_names),
				'date' => $result->post_date,
				'edit_link' => get_edit_post_link($result->ID),
			];
		}

		return $data;
	}
}
