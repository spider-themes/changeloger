<?php

/**
 * Changeloger Version Notification Cron Job
 *
 * Handles daily checks for new versions and sends notifications to subscribers
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Schedule version check cron on plugin activation
 */
function cha_schedule_version_check_cron() {
    if ( ! wp_next_scheduled( 'cha_daily_version_check' ) ) {
        wp_schedule_event( time(), 'daily', 'cha_daily_version_check' );
    }
}


/**
 * Unschedule cron on plugin deactivation
 */
function cha_unschedule_version_check_cron() {
    wp_clear_scheduled_hook( 'cha_daily_version_check' );
}

/**
 * Daily version check cron job callback
 * Checks all posts for new versions in changeloger blocks
 * Fetches from URL if available and checks for updates
 */
add_action( 'cha_daily_version_check', 'cha_run_daily_version_check' );

function cha_run_daily_version_check(): array {
    require_once dirname( __FILE__ ) . '/class-changelog-renderer.php';

    // Get all posts and pages with changeloger blocks
    $args = array(
        'post_type'   => array( 'post', 'page' ),
        'post_status' => 'publish',
        'numberposts' => -1,
    );

    $posts = get_posts( $args );

    // Track overall summary
    $summary = array(
        'posts_checked' => 0,
        'blocks_checked' => 0,
        'versions_found' => 0,
        'emails_sent' => 0,
    );

    foreach ( $posts as $post ) {
        $summary['posts_checked']++;

        // Get all changeloger blocks in this post
        $blocks = Changeloger_Version_Tracker::get_post_blocks( $post->ID );

        if ( empty( $blocks ) ) {
            continue;
        }

        // Process each block independently
        foreach ( $blocks as $block ) {
            $summary['blocks_checked']++;
            $unique_id = isset( $block['unique_id'] ) ? $block['unique_id'] : '';
            $changelog = isset( $block['attrs']['changelog'] ) ? $block['attrs']['changelog'] : '';
            $text_url = isset( $block['attrs']['textUrl'] ) ? $block['attrs']['textUrl'] : '';

            if ( empty( $unique_id ) || empty( $changelog ) ) {
                continue;
            }

            // Build block_attrs with unique_id (underscore) for save_initial_changelog
	        $block_attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	        $block_attrs['unique_id'] = $unique_id;
	        $block_attrs['enableVersions'] = isset( $block['attrs']['enableVersions'] ) ? $block['attrs']['enableVersions'] : false;

            try {
                $renderer = new Changelog_Renderer();
                $is_pro_user = function_exists( 'cha_fs' ) && cha_fs()->is_premium();

                // If URL is available, fetch latest changelog from URL
                $current_raw_changelog = $changelog;
                $source = 'manual';

                if ( ! empty( $text_url ) ) {
                    $remote_changelog = cha_fetch_changelog_from_url( $text_url );

                    if ( $remote_changelog && ! is_wp_error( $remote_changelog ) ) {
                        $current_raw_changelog = $remote_changelog;
                        $source = 'url';
                    }
                }
                // Parse current changelog
                $current_parsed = $renderer->parse( $current_raw_changelog );

                // Create updated attributes with the NEW changelog for rendering
                $updated_attrs = $block['attrs'];
                $updated_attrs['changelog'] = $current_raw_changelog;

				$rendered_info_wrapper = $renderer->render( $updated_attrs );

	            $rendered_version_tree = $renderer->render_versiontree( $current_raw_changelog, $unique_id );

                if ( empty( $current_parsed ) ) {
                    Changeloger_Version_Tracker::log_version_event(
                        $post->ID,
                        $unique_id,
                        'cron_check_skipped',
                        array(
                            'reason' => 'Empty parsed changelog',
                        )
                    );
                    continue;
                }

                // Check for new version in THIS block
                $version_check = Changeloger_Version_Tracker::check_for_new_version(
                    $post->ID,
                    $unique_id,
                    $current_parsed,
                    $is_pro_user
                );

                if ( $version_check['has_new_version'] && ! empty( $version_check['new_version'] ) ) {
                    $summary['versions_found']++;

                    // CHECK IF VERSION WAS ALREADY NOTIFIED - Do this FIRST before any other action
                    $was_notified = Changeloger_Version_Tracker::is_version_notified(
                        $post->ID,
                        $unique_id,
                        $version_check['new_version']
                    );

                    if ( $was_notified ) {
                        // Version was already notified, skip everything
                        Changeloger_Version_Tracker::log_version_event(
                            $post->ID,
                            $unique_id,
                            'version_notification_skipped',
                            array(
                                'version' => $version_check['new_version'],
                                'reason' => 'Already notified',
                            )
                        );
                        continue; // Skip to next block
                    }

                    // Update last seen version for this block
                    Changeloger_Version_Tracker::update_last_seen_version(
                        $post->ID,
                        $unique_id,
                        $version_check['new_version']
                    );

                    // Add to version history for this block (mark as NOT notified initially)
                    Changeloger_Version_Tracker::add_to_version_history(
                        $post->ID,
                        $unique_id,
                        $version_check['new_version'],
                        array(
                            'old_version' => $version_check['old_version'],
                            'source' => $source,
                        )
                    );

                    // Save the parsed changelog for this block
                    Changeloger_Version_Tracker::save_initial_changelog(
                        $post->ID,
	                    $block_attrs,
	                    $current_raw_changelog,
	                    $rendered_info_wrapper,
                        $rendered_version_tree,
                        $is_pro_user
                    );


                    // Send notifications to THIS block's subscribers only
                    $confirmed_meta_key = 'cha_subscription_confirmed_' . $unique_id;
                    $cha_subscription_confirmed = get_post_meta( $post->ID, $confirmed_meta_key, true );

                    if ( ! empty( $cha_subscription_confirmed ) ) {
                        $confirmed_data = maybe_unserialize( $cha_subscription_confirmed );
                        $unique_data = array_map( "unserialize", array_unique( array_map( "serialize", $confirmed_data ) ) );
                        $confirmed_data = array_values( $unique_data );

                        if ( ! empty( $confirmed_data ) ) {
                            // Extract changelog content for the new version
                            $changelog_content = '';
                            if ( ! empty( $current_parsed ) && is_array( $current_parsed ) ) {
                                foreach ( $current_parsed as $version_item ) {
                                    if ( isset( $version_item['version'] ) && $version_item['version'] === $version_check['new_version'] ) {
                                        // Format the changes for the email
                                        if ( isset( $version_item['changes'] ) && is_array( $version_item['changes'] ) ) {
                                            foreach ( $version_item['changes'] as $change ) {
                                                if ( isset( $change['category'] ) && isset( $change['change'] ) ) {
                                                    $changelog_content .= '<p style="margin: 8px 0;"><strong>' . esc_html( $change['category'] ) . ':</strong> ' . wp_kses_post( $change['change'] ) . '</p>';
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            }

                            // Send emails to each subscriber of THIS block
                            foreach ( $confirmed_data as $subscriber ) {
                                // Get block-specific subscription settings
                                $product_name = isset( $block['attrs']['subscriptionProductName'] ) ? $block['attrs']['subscriptionProductName'] : '';
                                $ending_message = isset( $block['attrs']['emailEndingMessage'] ) ? $block['attrs']['emailEndingMessage'] : '';

                                $email_sent = cha_send_version_update_email(
                                    $post->ID,
                                    $subscriber,
                                    $version_check['new_version'],
                                    $changelog_content,
                                    $product_name,
                                    $ending_message
                                );

                                if ( $email_sent ) {
                                    $summary['emails_sent']++;
                                }
                            }

                            // Mark version as notified for THIS block (AFTER sending emails)
                            Changeloger_Version_Tracker::mark_version_notified(
                                $post->ID,
                                $unique_id,
                                $version_check['new_version'],
                                count( $confirmed_data )
                            );

                            // Log notification trigger event
                            Changeloger_Version_Tracker::log_notification_trigger(
                                $post->ID,
                                $unique_id,
                                $version_check['new_version']
                            );

                            Changeloger_Version_Tracker::log_version_event(
                                $post->ID,
                                $unique_id,
                                'emails_sent',
                                array(
                                    'version' => $version_check['new_version'],
                                    'subscriber_count' => count( $confirmed_data ),
                                )
                            );
                        } else {
                            // No subscribers, but mark as notified to avoid repeated checks
                            Changeloger_Version_Tracker::mark_version_notified(
                                $post->ID,
                                $unique_id,
                                $version_check['new_version'],
                                0
                            );

                            Changeloger_Version_Tracker::log_version_event(
                                $post->ID,
                                $unique_id,
                                'version_found_no_subscribers',
                                array(
                                    'version' => $version_check['new_version'],
                                )
                            );
                        }
                    } else {
                        // No subscribers, but mark as notified to avoid repeated checks
                        Changeloger_Version_Tracker::mark_version_notified(
                            $post->ID,
                            $unique_id,
                            $version_check['new_version'],
                            0
                        );

                        Changeloger_Version_Tracker::log_version_event(
                            $post->ID,
                            $unique_id,
                            'version_found_no_subscribers',
                            array(
                                'version' => $version_check['new_version'],
                            )
                        );
                    }
                }

                // Log the check for this block
                Changeloger_Version_Tracker::log_version_event(
                    $post->ID,
                    $unique_id,
                    'cron_check_performed',
                    array(
                        'check_type' => 'daily',
                        'source' => $source,
                        'new_version_detected' => $version_check['has_new_version'],
                        'version' => $version_check['has_new_version'] ? $version_check['new_version'] : null,
                    )
                );

            } catch ( Exception $e ) {
                Changeloger_Version_Tracker::log_version_event(
                    $post->ID,
                    $unique_id,
                    'cron_check_error',
                    array(
                        'error' => $e->getMessage(),
                    )
                );
            }
        }
    }

    // Store summary for reference
    update_option( 'cha_cron_last_summary', $summary );

    return $summary;
}

/**
 * Fetch changelog content from a URL
 *
 * @param string $url The URL to fetch from
 * @return string|WP_Error The changelog content or error
 */
function cha_fetch_changelog_from_url( $url ) {
    if ( empty( $url ) ) {
        return new WP_Error( 'empty_url', 'URL is empty' );
    }

    $response = wp_remote_get( $url );

    if ( is_wp_error( $response ) ) {
        return new WP_Error( 'fetch_failed', 'Failed to fetch changelog from URL' );
    }

    $status = wp_remote_retrieve_response_code( $response );
    if ( $status !== 200 ) {
        return new WP_Error( 'invalid_status', 'URL returned status ' . $status );
    }

    $body = wp_remote_retrieve_body( $response );

    if ( empty( $body ) ) {
        return new WP_Error( 'empty_content', 'URL content is empty' );
    }

    return $body;
}

/**
 * Get the last cron summary
 *
 * @return array Summary data
 */
function cha_get_last_cron_summary() {
    $summary = get_option( 'cha_version_check_cron_summary', array() );
    return is_array( $summary ) ? $summary : maybe_unserialize( $summary );
}

/**
 * Manually trigger version check for a specific post
 *
 * @param int $post_id Post ID
 * @return array Result summary
 */
function cha_trigger_manual_version_check( $post_id ) {
    // Load version tracker
    require_once dirname( __FILE__ ) . '/version-tracker.php';

    $post = get_post( $post_id );

    if ( ! $post ) {
        return array(
            'success' => false,
            'message' => __( 'Post not found', 'changeloger' ),
        );
    }

    // Get all changeloger blocks in this post
    $blocks = Changeloger_Version_Tracker::get_post_blocks( $post_id );

    if ( empty( $blocks ) ) {
        return array(
            'success' => true,
            'message' => __( 'No changeloger blocks found in this post', 'changeloger' ),
            'blocks_checked' => 0,
        );
    }

    $blocks_checked = 0;

    foreach ( $blocks as $block ) {
        $blocks_checked++;
        $unique_id = $block['unique_id'];

        // Store the version check event
        Changeloger_Version_Tracker::log_version_event(
            $post_id,
            $unique_id,
            'manual_check_performed',
            array(
                'triggered_at' => current_time( 'mysql' ),
            )
        );
    }

    return array(
        'success' => true,
        'message' => __( 'Manual version check completed', 'changeloger' ),
        'blocks_checked' => $blocks_checked,
    );
}

/**
 * Manual trigger for version check (for testing)
 * Use: wp cron event run cha_daily_version_check
 * Or access via: /wp-admin/?cha_test_cron=1 (if logged in)
 */
function cha_test_manual_version_check() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    if ( isset( $_GET['cha_test_cron'] ) && $_GET['cha_test_cron'] == '1' ) {
        $result = cha_run_daily_version_check();
        echo '<pre>';
        echo 'Cron Test Result: ' . date( 'Y-m-d H:i:s' ) . PHP_EOL;
        echo wp_json_encode( $result, JSON_PRETTY_PRINT );
        echo '</pre>';
        exit;
    }
}
add_action( 'admin_init', 'cha_test_manual_version_check' );

/**
 * Get version tracking status for debugging
 */
function cha_get_block_version_status( $post_id, $unique_id ) {

    $tracked = Changeloger_Version_Tracker::get_tracked_changelog( $post_id, $unique_id );
    $last_seen = Changeloger_Version_Tracker::get_last_seen_version( $post_id, $unique_id );
    $history = Changeloger_Version_Tracker::get_version_history( $post_id, $unique_id );

    $confirmed_meta_key = 'cha_subscription_confirmed_' . $unique_id;
    $subscribers = get_post_meta( $post_id, $confirmed_meta_key, true );
    $subscribers = ! empty( $subscribers ) ? maybe_unserialize( $subscribers ) : array();

    return array(
        'post_id' => $post_id,
        'block_unique_id' => $unique_id,
        'tracked_changelog_exists' => ! empty( $tracked ),
        'tracked_versions' => ! empty( $tracked ) ? count( $tracked ) : 0,
        'last_seen_version' => $last_seen ? $last_seen : 'None',
        'version_history_count' => count( $history ),
        'subscriber_count' => count( $subscribers ),
        'subscribers' => ! empty( $subscribers ) ? array_map( function( $sub ) {
            return array(
                'email' => $sub['email'] ?? 'N/A',
                'name' => $sub['name'] ?? 'N/A',
                'confirmed' => ! empty( $sub['token'] ),
            );
        }, $subscribers ) : array(),
    );
}

/**
 * Fallback heartbeat to trigger cron if WordPress loopback isn't working
 * This runs on admin pages to ensure cron executes even without loopback requests
 */
function cha_fallback_cron_heartbeat() {
    // Only run this fallback if we have a scheduled cron
    $cron_timestamp = wp_next_scheduled( 'cha_daily_version_check' );

    if ( ! $cron_timestamp ) {
        // Cron not scheduled, nothing to do
        return;
    }

    // Check if it's time to run the cron
    if ( $cron_timestamp <= time() ) {
        // Get the last successful run time
        $last_run = get_transient( 'cha_cron_last_run_time' );
        $current_time = time();

        // Only run if it hasn't run in the last 24 hours (to prevent duplicate runs)
        if ( ! $last_run || ( $current_time - $last_run ) > 86400 ) {
            // Mark that we're running this now
            set_transient( 'cha_cron_last_run_time', $current_time, 86400 );

            // Execute the cron job
            if ( function_exists( 'cha_run_daily_version_check' ) ) {
                cha_run_daily_version_check();

                // Re-schedule the cron hook with daily interval
                wp_schedule_event( time() + 86400, 'daily', 'cha_daily_version_check' );
            }
        }
    }
}

// Run the fallback heartbeat on admin pages to ensure cron executes
add_action( 'admin_init', 'cha_fallback_cron_heartbeat' );
