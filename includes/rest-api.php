<?php

class Changeloger_REST_API {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}


	public function register_routes() {
		// Track Version Endpoint (Version Tracking & Notification)
		register_rest_route( 'changeloger/v1', '/track-version', [
			'methods' => 'POST',
			'callback' => [ $this, 'track_version_callback' ],
			'permission_callback' => [ $this, 'check_edit_posts_nonce' ],
		] );

		// Cron Status Endpoint
		register_rest_route( 'changeloger/v1', '/diagnostics/cron-status', [
			'methods' => 'GET',
			'callback' => [ $this, 'diagnostics_cron_status_callback' ],
			'permission_callback' => [ $this, 'check_manage_options' ],
		] );
	}

	// ========== Permission Callbacks ==========

	public function check_manage_options() {
		return current_user_can( 'manage_options' );
	}

	public function check_edit_posts_nonce( $request ) {
		return current_user_can( 'edit_posts' ) || wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'changeloger_nonce' );
	}

	// ========== Track Version Endpoint ==========

	public function track_version_callback( $request ) {
		$params = $request->get_json_params();
		$post_id = isset( $params['post_id'] ) ? absint( $params['post_id'] ) : 0;
		$unique_id = isset( $params['unique_id'] ) ? sanitize_text_field( $params['unique_id'] ) : '';
		$parsed_changelog = isset( $params['parsed_changelog'] ) ? $params['parsed_changelog'] : array();
		$is_pro = isset( $params['is_pro'] ) ? (bool) $params['is_pro'] : false;
		$url = isset( $params['url'] ) ? esc_url_raw( $params['url'] ) : '';

		if ( ! $post_id || ! $unique_id || ! is_array( $parsed_changelog ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid parameters', 'changeloger' )
			], 400 );
		}

		// Check if premium version tracker is available
		if ( ! class_exists( 'Changeloger_Version_Tracker' ) ) {
			return new WP_REST_Response( [
				'success' => true,
				'message' => __( 'Changelog saved successfully (Premium features not available)', 'changeloger' ),
				'new_version_detected' => false
			] );
		}

		$save_result = Changeloger_Version_Tracker::save_initial_changelog( $post_id, $unique_id, $parsed_changelog, $is_pro, $url );

		if ( is_wp_error( $save_result ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => $save_result->get_error_message()
			], 500 );
		}

		$version_check = Changeloger_Version_Tracker::check_for_new_version( $post_id, $unique_id, $parsed_changelog, $is_pro );

		if ( $version_check['has_new_version'] && $version_check['new_version'] ) {
			Changeloger_Version_Tracker::update_last_seen_version( $post_id, $unique_id, $version_check['new_version'] );
			Changeloger_Version_Tracker::add_to_version_history( $post_id, $unique_id, $version_check['new_version'], [
				'old_version' => $version_check['old_version'],
				'source' => 'manual_save',
			] );

			return new WP_REST_Response( [
				'success' => true,
				'message' => sprintf( __( 'Version %s tracked successfully! Subscribers will be notified on the next scheduled check.', 'changeloger' ), $version_check['new_version'] ),
				'new_version_detected' => true,
				'version' => $version_check['new_version'],
				'notification_scheduled' => true
			] );
		}

		return new WP_REST_Response( [
			'success' => true,
			'message' => __( 'Changelog tracked successfully', 'changeloger' ),
			'new_version_detected' => false
		] );
	}

	/**
	 * Get detailed cron status information
	 */
	public function diagnostics_cron_status_callback( $request ): array {
		// Get cron timestamp
		$cron_timestamp = wp_next_scheduled( 'cha_daily_version_check' );

		// Get cron schedules
		$crons = _get_cron_array();
		$cron_interval = 'Not scheduled';

		if ( ! empty( $crons ) ) {
			foreach ( $crons as $time => $cron ) {
				if ( isset( $cron['cha_daily_version_check'] ) ) {
					foreach ( $cron['cha_daily_version_check'] as $data ) {
						$cron_interval = isset( $data['schedule'] ) ? $data['schedule'] : 'Unknown';
					}
				}
			}
		}

		// Check loopback capability
		$loopback_test = wp_remote_get( home_url( 'wp-cron.php' ), array(
			'blocking' => false,
			'sslverify' => apply_filters( 'https_local_ssl_verify', false ),
		) );
		$loopback_works = ! is_wp_error( $loopback_test );

		// Get last run time from transient
		$last_run = get_transient( 'cha_cron_last_run_time' );

		// Get last summary
		$last_summary = get_option( 'cha_cron_last_summary', array() );

		return array(
			'scheduled' => ! empty( $cron_timestamp ),
			'next_run_timestamp' => $cron_timestamp,
			'next_run_human' => $cron_timestamp ? human_time_diff( $cron_timestamp, time() ) . ' from now' : 'Not scheduled',
			'interval' => $cron_interval,
			'loopback_working' => $loopback_works,
			'fallback_heartbeat_active' => true,
			'last_fallback_run' => $last_run ? gmdate( 'Y-m-d H:i:s', $last_run ) : 'Never',
			'alternate_wp_cron_enabled' => defined( 'ALTERNATE_WP_CRON' ) && ALTERNATE_WP_CRON,
			'last_summary' => is_array( $last_summary ) ? $last_summary : maybe_unserialize( $last_summary ),
		);
	}
}

new Changeloger_REST_API();



