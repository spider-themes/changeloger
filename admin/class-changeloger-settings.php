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
		// Get active tab
		$active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'subscription';

		// Handle form submission
		if (isset($_POST['submit'])) {
			check_admin_referer('changeloger_settings');

			if ($active_tab === 'subscription') {
				// Save subscription settings
				$subscription_settings = [
					'enable_subscription' => isset($_POST['enable_subscription']) ? 1 : 0,
					'product_name' => sanitize_text_field($_POST['product_name'] ?? ''),
					'email_ending_message' => sanitize_textarea_field($_POST['email_ending_message'] ?? ''),
				];

				update_option('changeloger_subscription_settings', $subscription_settings);
				echo '<div class="notice notice-success"><p>' . __('Subscription settings saved successfully!', 'changeloger') . '</p></div>';
			}
		}

		echo '<div class="wrap">';
		echo '<h1>' . __( 'Changeloger Settings', 'changeloger' ) . '</h1>';

		// Render tabs
		$this->render_tabs($active_tab);

		// Render tab content
		switch ($active_tab) {
			case 'subscription':
				$this->render_subscription_settings_tab();
				break;
			case 'version_check':
				$this->render_version_check_tab();
				break;
		}

		echo '</div>';
	}

	/**
	 * Render tabs navigation
	 */
	private function render_tabs($active_tab) {
		$tabs = [
			'subscription' => __('Subscription', 'changeloger'),
			'version_check' => __('Auto Version Check', 'changeloger'),
		];

		echo '<h2 class="nav-tab-wrapper">';
		foreach ($tabs as $tab_key => $tab_name) {
			$active_class = ($active_tab === $tab_key) ? 'nav-tab-active' : '';
			$url = add_query_arg(['page' => 'changeloger-settings', 'tab' => $tab_key], admin_url('admin.php'));
			echo '<a href="' . esc_url($url) . '" class="nav-tab ' . $active_class . '">' . esc_html($tab_name) . '</a>';
		}
		echo '</h2>';
	}

	/**
	 * Render subscription settings tab content
	 */
	private function render_subscription_settings_tab() {
		// Get current subscription settings
		$subscription_settings = get_option('changeloger_subscription_settings', [
			'enable_subscription' => 0,
			'product_name' => '',
			'email_ending_message' => '',
		]);

		?>
		<form method="post" action="">
			<?php wp_nonce_field('changeloger_settings'); ?>

			<table class="form-table">
				<!-- Enable/Disable Subscription Feature -->
				<tr>
					<th scope="row"><?php _e('Subscription Feature', 'changeloger'); ?></th>
					<td>
						<label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
							<input type="checkbox"
									id="enable_subscription"
									name="enable_subscription"
									value="1"
									<?php checked($subscription_settings['enable_subscription'], 1); ?>
									onchange="toggleSubscriptionFields()">
							<span><?php _e('Enable Subscription Feature', 'changeloger'); ?></span>
						</label>
						<p class="description"><?php _e('Enable this to allow users to subscribe to changelog updates via email. When disabled, the subscription button will not appear.', 'changeloger'); ?></p>
					</td>
				</tr>

				<!-- Product Name -->
				<tr id="product_name_row" style="display: <?php echo $subscription_settings['enable_subscription'] ? 'table-row' : 'none'; ?>;">
					<th scope="row">
						<label for="product_name"><?php _e('Product Name', 'changeloger'); ?></label>
					</th>
					<td>
						<input type="text"
								id="product_name"
								name="product_name"
								value="<?php echo esc_attr($subscription_settings['product_name']); ?>"
								placeholder="<?php _e('e.g., Changeloger', 'changeloger'); ?>"
								class="regular-text">
						<p class="description"><?php _e('This name will be used in the notification emails to identify the product/service. Use {name} as a placeholder in the email message to display this value.', 'changeloger'); ?></p>
					</td>
				</tr>

				<!-- Email Ending Message -->
				<tr id="email_message_row" style="display: <?php echo $subscription_settings['enable_subscription'] ? 'table-row' : 'none'; ?>;">
					<th scope="row">
						<label for="email_ending_message"><?php _e('Email Ending Message', 'changeloger'); ?></label>
					</th>
					<td>
						<?php
						wp_editor(
							$subscription_settings['email_ending_message'],
							'email_ending_message',
							array(
								'textarea_name' => 'email_ending_message',
								'textarea_rows' => 8,
								'media_buttons' => false,
								'teeny' => true,
								'quicktags' => array('buttons' => 'strong,em,link,close'),
							)
						);
						?>
						<p class="description" style="margin-top: 10px;">
							<?php _e('This message will be shown before the "View Changes" button in notification emails. You can use <code>{name}</code> to display the product name.', 'changeloger'); ?>
						</p>
					</td>
				</tr>
			</table>

			<?php submit_button(__('Save Subscription Settings', 'changeloger')); ?>
		</form>

		<style>
			.form-table tr th {
				vertical-align: top;
				padding-top: 15px;
			}
		</style>

		<script>
			function toggleSubscriptionFields() {
				const checkbox = document.getElementById('enable_subscription');
				const productNameRow = document.getElementById('product_name_row');
				const emailMessageRow = document.getElementById('email_message_row');
				const previewSection = document.getElementById('preview_section');

				if (checkbox.checked) {
					productNameRow.style.display = 'table-row';
					emailMessageRow.style.display = 'table-row';
					previewSection.style.display = 'block';
				} else {
					productNameRow.style.display = 'none';
					emailMessageRow.style.display = 'none';
					previewSection.style.display = 'none';
				}
			}
		</script>
		<?php
	}

	/**
	 * Render logs tab content
	 */
	private function render_version_check_tab() {
		// Handle clear logs action
		if ( isset( $_POST['cha_clear_logs'] ) && check_admin_referer( 'cha_clear_logs' ) ) {
			delete_option( 'cha_version_tracker_logs' );
			echo '<div class="notice notice-success"><p>' . esc_html__( 'Logs cleared successfully.', 'changeloger' ) . '</p></div>';
		}

		// Handle manual cron trigger
		if ( isset( $_POST['cha_trigger_cron'] ) && check_admin_referer( 'cha_trigger_cron' ) ) {
			if ( function_exists( 'cha_run_daily_version_check' ) ) {
				cha_run_daily_version_check();
				echo '<div class="notice notice-success"><p>' . esc_html__( 'Email sent manually.', 'changeloger' ) . '</p></div>';
			} else {
				echo '<div class="notice notice-error"><p>' . esc_html__( 'Cron function not found. Make sure version-notification-cron.php is loaded.', 'changeloger' ) . '</p></div>';
			}
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

		?>
		<div class="card" style="max-width: 100%;">
			<h2><?php esc_html_e( 'Version Check Status', 'changeloger' ); ?></h2>
			<table class="widefat">
				<tr>
					<td><strong><?php esc_html_e( 'Daily Version Check:', 'changeloger' ); ?></strong></td>
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

		<?php if ( empty( $all_logs ) ) : ?>
			<div class="notice notice-info">
				<p><?php esc_html_e( 'No logs found. Logs will appear here when version tracking events occur.', 'changeloger' ); ?></p>
			</div>
		<?php else : ?>
			<?php
				// Extract all version numbers from logs to find the latest
				$all_versions = array();
				foreach ( $all_logs as $log ) {
					if ( isset( $log['data']['version'] ) && ! empty( $log['data']['version'] ) ) {
						$all_versions[] = $log['data']['version'];
					}
				}
				$latest_version = ! empty( $all_versions ) ? end( $all_versions ) : 'N/A';
			?>
			<table class="wp-list-table widefat fixed striped">
				<thead>
					<tr>
						<th style="width: 180px;"><?php esc_html_e( 'Timestamp', 'changeloger' ); ?></th>
						<th style="width: 80px;"><?php esc_html_e( 'Post ID', 'changeloger' ); ?></th>
						<th style="width: 120px;"><?php esc_html_e( 'Block ID', 'changeloger' ); ?></th>
						<th style="width: 150px;"><?php esc_html_e( 'Event', 'changeloger' ); ?></th>
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
									<?php echo esc_html( substr( $log['unique_id'] ?? '', 0, 15 ) ); ?>...
								</small>
							</td>
							<td>
								<strong><?php echo esc_html( $log['event'] ?? '' ); ?></strong>
							</td>
							<td>
								<?php echo esc_html( $latest_version ); ?>
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
		<?php
	}

}



