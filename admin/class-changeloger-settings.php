<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Changeloger Settings Admin Page
 */
class Changeloger_Settings {

	/**
	 * Render the settings page
	 */
	public function render_page() {
		// Handle form submission
		if (isset($_POST['submit'])) {
			check_admin_referer('changeloger_settings');
		}


	// Handle clear logs action
	if ( isset( $_POST['cha_clear_logs'] ) && check_admin_referer( 'cha_clear_logs' ) ) {
		if ( class_exists( 'Changeloger_Version_Tracker' ) ) {
			Changeloger_Version_Tracker::clear_notification_logs();
			echo '<div class="notice notice-success"><p>' . esc_html__( 'Notification logs cleared successfully.', 'changeloger' ) . '</p></div>';
		}
	}

		// Handle manual cron trigger
		if ( isset( $_POST['cha_trigger_cron'] ) && check_admin_referer( 'cha_trigger_cron' ) ) {
			if ( function_exists( 'cha_run_daily_version_check' ) ) {
				cha_run_daily_version_check();
				echo '<div class="notice notice-success"><p>' . esc_html__( 'Auto check executed successfully.', 'changeloger' ) . '</p></div>';
			} else {
				echo '<div class="notice notice-error"><p>' . esc_html__( 'Auto check function not found. Make sure version-notification-cron.php is loaded.', 'changeloger' ) . '</p></div>';
			}
		}

	echo '<div class="wrap">';
	echo '<h1>' . __( 'Changeloger Settings', 'changeloger' ) . '</h1>';

 	// Check if premium features are available
	$is_premium = class_exists( 'Changeloger_Version_Tracker' );

	// If not premium, disable any running cron jobs
	if ( ! $is_premium ) {
		$cron_timestamp = wp_next_scheduled( 'cha_daily_version_check' );
		if ( $cron_timestamp ) {
			wp_unschedule_event( $cron_timestamp, 'cha_daily_version_check' );
		}

		echo '<div class="notice notice-info"><p>';
		echo esc_html__( 'Version tracking and email notification features are available in the Pro version only.', 'changeloger' );
		echo '</p></div>';
	}

		// Get all logs
		$all_logs = get_option( 'cha_version_tracker_logs', array() );
		$all_logs = ! empty( $all_logs ) ? maybe_unserialize( $all_logs ) : array();
		$all_logs = is_array( $all_logs ) ? $all_logs : array();

		// Reverse to show newest first
		$all_logs = array_reverse( $all_logs );

		// Get cron schedules
		$cron_timestamp = wp_next_scheduled( 'cha_daily_version_check' );
		$cron_status = $cron_timestamp ? human_time_diff( $cron_timestamp, time() ) : __( 'Not scheduled', 'changeloger' );

	// Simplify interval display to daily
	$cron_interval = 'Daily';

	// Check if cron is actually running by checking if it runs via fallback heartbeat
	$fallback_working = function_exists( 'cha_fallback_cron_heartbeat' );

	// Check if premium features are available
	$is_premium = class_exists( 'Changeloger_Version_Tracker' );

	?>
	<?php if ( $is_premium ) : ?>
	<div class="card" style="max-width: 100%;">
		<h2><?php esc_html_e( 'Version Check Status', 'changeloger' ); ?></h2>
			<table class="widefat">
				<tr>
					<td><strong><?php esc_html_e( 'Cron Status:', 'changeloger' ); ?></strong></td>
					<td>
						<?php if ( $cron_timestamp ) : ?>
							<span style="color: green;">✓ <?php esc_html_e( 'Scheduled', 'changeloger' ); ?></span>
						<?php else : ?>
							<span style="color: red;">✗ <?php esc_html_e( 'Not scheduled', 'changeloger' ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<td><strong><?php esc_html_e( 'Interval:', 'changeloger' ); ?></strong></td>
					<td><?php echo esc_html( ucfirst( $cron_interval ) ); ?></td>
				</tr>
				<tr>
					<td><strong><?php esc_html_e( 'Next Check:', 'changeloger' ); ?></strong></td>
					<td>
						<?php if ( $cron_timestamp ) : ?>
							<?php
							$next_run = $cron_timestamp > time() ? __( 'in', 'changeloger' ) . ' ' . $cron_status : $cron_status . ' ' . __( 'ago', 'changeloger' );
							echo esc_html( $next_run );
							?>
							<br><small><?php echo esc_html( date_i18n( 'Y-m-d H:i:s', $cron_timestamp ) ); ?></small>
						<?php else : ?>
							<span style="color: red;"><?php esc_html_e( 'Not scheduled', 'changeloger' ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<td><strong><?php esc_html_e( 'Fallback Heartbeat:', 'changeloger' ); ?></strong></td>
					<td>
						<?php if ( $fallback_working ) : ?>
							<span style="color: green;">✓ <?php esc_html_e( 'Active (Cron will run on admin page loads)', 'changeloger' ); ?></span>
						<?php else : ?>
							<span style="color: orange;">⚠ <?php esc_html_e( 'Inactive', 'changeloger' ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<td><strong><?php esc_html_e( 'Total Logs:', 'changeloger' ); ?></strong></td>
					<td><?php echo esc_html( count( $all_logs ) ); ?></td>
				</tr>
			</table>
		</div>

		<br>

		<div style="display: flex; gap: 10px;">

			<form method="post" style="display: inline-block;">
				<?php wp_nonce_field( 'cha_trigger_cron' ); ?>
				<button type="submit" name="cha_trigger_cron" class="button button-primary">
					<?php esc_html_e( 'Send Email Now', 'changeloger' ); ?>
				</button>
			</form>

			<form method="post" style="display: inline-block;">
				<?php wp_nonce_field( 'cha_clear_logs' ); ?>
				<button type="submit" name="cha_clear_logs" class="button button-secondary"
						onclick="return confirm('<?php esc_attr_e( 'Are you sure you want to clear all logs?', 'changeloger' ); ?>');">
					<?php esc_html_e( 'Clear All Logs', 'changeloger' ); ?>
				</button>
			</form>
		</div>

		<br>

	<h2><?php esc_html_e( 'Version Tracking Event Logs', 'changeloger' ); ?></h2>

	<?php
	$all_logs = array();
	if ( $is_premium ) {
		$all_logs = Changeloger_Version_Tracker::get_notification_logs();
		// Display logs in descending order (newest first)
		$all_logs = array_reverse( $all_logs );
	}
	?>

	<?php if ( empty( $all_logs ) ) : ?>
		<div class="notice notice-info">
			<p><?php esc_html_e( 'No notification logs found. Logs will appear here when notifications are sent.', 'changeloger' ); ?></p>
		</div>
	<?php else : ?>
			<table class="wp-list-table widefat fixed striped">
				<thead>
					<tr>
						<th style="width: 180px;"><?php esc_html_e( 'Timestamp', 'changeloger' ); ?></th>
						<th style="width: 80px;"><?php esc_html_e( 'Post ID', 'changeloger' ); ?></th>
						<th style="width: 150px;"><?php esc_html_e( 'Block ID', 'changeloger' ); ?></th>
						<th style="width: 120px;"><?php esc_html_e( 'Version', 'changeloger' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $all_logs as $log ) : ?>
						<tr>
							<td><?php echo esc_html( $log['timestamp'] ?? '' ); ?></td>
							<td>
								<?php if ( ! empty( $log['post_id'] ) ) : ?>
									<a href="<?php echo esc_url( get_edit_post_link( $log['post_id'] ) ); ?>" target="_blank">
										<?php echo esc_html( $log['post_id'] ); ?>
									</a>
								<?php endif; ?>
							</td>
							<td>
								<small style="font-family: monospace;">
									<?php echo esc_html( substr( $log['block_id'] ?? '', 0, 20 ) ); ?>
								</small>
							</td>
							<td>
								<strong><?php echo esc_html( $log['version'] ?? '' ); ?></strong>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		<?php endif; ?>

		<style>
			details summary {
				color: #2271b1;
			}
			details summary:hover {
				color: #135e96;
			}
		</style>

	<?php endif; ?>

		<?php
		echo '</div>';
	}
}

