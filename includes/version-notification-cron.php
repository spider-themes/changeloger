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
add_action( 'wp_loaded', 'cha_schedule_version_check_cron' );


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

function cha_run_daily_version_check() {
    // Load required files
    require_once dirname( __FILE__ ) . '/version-tracker.php';
    require_once dirname( __FILE__ ) . '/class-changelog-renderer.php';

    // Get all posts with changeloger blocks
    $args = array(
        'post_type'   => 'post',
        'post_status' => 'publish',
        'numberposts' => -1,
    );

    $posts = get_posts( $args );

    foreach ( $posts as $post ) {
        // Get all changeloger blocks in this post
        $blocks = Changeloger_Version_Tracker::get_post_blocks( $post->ID );

        if ( empty( $blocks ) ) {
            continue;
        }

        foreach ( $blocks as $block ) {
            $unique_id = $block['unique_id'];
            $changelog = isset( $block['attrs']['changelog'] ) ? $block['attrs']['changelog'] : '';
            $text_url = isset( $block['attrs']['textUrl'] ) ? $block['attrs']['textUrl'] : '';

            if ( empty( $changelog ) ) {
                continue;
            }

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

                // Get stored changelog
                $stored_changelog = Changeloger_Version_Tracker::get_tracked_changelog( $post->ID, $unique_id );

                // Check for new version
                $version_check = Changeloger_Version_Tracker::check_for_new_version(
                    $post->ID,
                    $unique_id,
                    $current_parsed,
                    $is_pro_user
                );

                if ( $version_check['has_new_version'] ) {
                    // Update last seen version
                    Changeloger_Version_Tracker::update_last_seen_version(
                        $post->ID,
                        $unique_id,
                        $version_check['new_version']
                    );

                    // Add to version history
                    Changeloger_Version_Tracker::add_to_version_history(
                        $post->ID,
                        $unique_id,
                        $version_check['new_version'],
                        array(
                            'old_version' => $version_check['old_version'],
                            'source' => $source,
                        )
                    );

                    // Send notifications to subscribers
                    $cha_subscription_confirmed = get_post_meta( $post->ID, 'cha_subscription_confirmed', true );

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

                            foreach ( $confirmed_data as $subscriber ) {
                                cha_send_version_update_email( $post->ID, $subscriber, $version_check['new_version'], $changelog_content );
                            }
                        }

                        // Mark version as notified
                        Changeloger_Version_Tracker::mark_version_notified(
                            $post->ID,
                            $unique_id,
                            $version_check['new_version'],
                            count( $confirmed_data )
                        );
                    }
                }

                // Log the check
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

    return array();
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
    require_once dirname( __FILE__ ) . '/version-comparison-helper.php';

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

