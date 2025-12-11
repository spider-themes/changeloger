<?php
/**
 * Core Requirement Notice
 * Activate the Changeloger
 *
 * @return void
 */

include_once ABSPATH . 'wp-admin/includes/plugin.php';
include_once __DIR__ . '/class-changeloger-core-requirement.php';
new Changeloger_Core_Requirement();

add_action( 'admin_notices', function(){

	$has_installed = get_plugins();
	$is_activated = is_plugin_active( 'changeloger/changeloger.php' );
	$button_text = isset( $has_installed['changeloger/changeloger.php'] ) ? __( 'Activate Now!', 'changeloger' ) : __( 'Install Now!', 'changeloger' );

	if( ! $is_activated ) :
		?>
        <div class="error notice is-dismissible">
            <p>
                <?php
                echo wp_kses_post( sprintf(
                    '<strong>%1$s</strong> %2$s <strong>%3$s</strong> %4$s',
                    __( 'Changeloger Pro', 'changeloger' ),
                    __( 'requires the', 'changeloger' ),
                    __( 'Changeloger', 'changeloger' ),
                    __( 'Free version plugin to be installed and activated. Please get the plugin now!', 'changeloger' )
                ) );
                ?>

                <button id="changeloger-install-core" class="button button-primary">
                    <?php echo esc_html($button_text); ?>
                </button>
            </p>
        </div>
		<script>
			jQuery(document).ready(function ($) {
				$('#changeloger-install-core').on('click', function (e) {
					var self = $(this);
					e.preventDefault();
					self.addClass('install-now updating-message');
					self.text('<?php echo esc_js( __( 'Installing...', 'changeloger' ) ); ?>');

					$.ajax({
						url: '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>',
						type: 'post',
						data: {
							action: 'changeloger_install_core',
							_wpnonce: '<?php echo esc_js( wp_create_nonce( 'changeloger_install_core' ) ); ?>',
						},
						success: function (response) {
							self.text('<?php echo esc_js( __( 'Installed', 'changeloger' ) ); ?>');
							window.location.href = '<?php echo esc_url( admin_url( 'plugins.php' ) ); ?>';
						},
						error: function (error) {
							self.removeClass('install-now updating-message');
							alert('<?php echo esc_js( __( 'Error installing plugin. Please try again manually.', 'changeloger' ) ); ?>');
						},
						complete: function () {
							self.attr('disabled', 'disabled');
							self.removeClass('install-now updating-message');
						}
					});
				});
			});
		</script>
	<?php
	endif;

});

