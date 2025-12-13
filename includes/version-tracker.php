<?php

/**
 * Changeloger Version Tracking System
 *
 * Handles version tracking, comparison, and monitoring for changelog updates
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class Changeloger_Version_Tracker {

    /**
     * Meta key prefix for storing version data per block
     */
    const META_PREFIX = 'cha_version_tracking_';
    const META_SEEN_PREFIX = 'cha_version_seen_';
    const META_HISTORY_PREFIX = 'cha_version_history_';

    /**
     * Build meta key with prefix and unique_id
     *
     * @param string $prefix Meta key prefix
     * @param string $unique_id Block unique ID
     * @param string $suffix Optional suffix
     *
     * @return string Complete meta key
     */
    private static function get_meta_key( $prefix, $unique_id, $suffix = '' ) {
        return $prefix . $unique_id . ( ! empty( $suffix ) ? $suffix : '' );
    }

    // ...existing code...

    /**
     * Get version tracking data for a specific block
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     *
     * @return array|false Parsed changelog array or false if not found
     */
    public static function get_tracked_changelog( $post_id, $unique_id ) {
        $data = get_post_meta( $post_id, self::get_meta_key( self::META_PREFIX, $unique_id ), true );
        return ! empty( $data ) ? maybe_unserialize( $data ) : false;
    }

    /**
     * Save initial parsed changelog for a block
     *
     * @param int    $post_id               Post ID
     * @param array  $block_attrs           Block attributes containing unique_id and other settings
     * @param string $rendered_info_wrapper Rendered changelog info wrapper HTML
     * @param string $rendered_version_tree Rendered version tree HTML
     * @param bool   $is_pro_user           Whether user is a pro user
     * @param string $url                   Optional URL for the changelog source
     *
     * @return bool|WP_Error True on success, WP_Error on failure
     */
    public static function save_initial_changelog( int $post_id, array $block_attrs,$raw_changelog, string $rendered_info_wrapper, string $rendered_version_tree, $is_pro_user = false, string $url = '' ) {
		if ( ! $post_id || ! is_array( $block_attrs ) ) {
            return new WP_Error( 'invalid_data', __( 'Invalid data provided', 'changeloger' ) );
        }
        $unique_id = isset( $block_attrs['unique_id'] ) ? $block_attrs['unique_id'] : '';
	    $has_version_tree = ! empty( $block_attrs['enableVersions'] );

        // Parse the raw changelog to get the array format
        require_once dirname( __FILE__ ) . '/class-changelog-renderer.php';
        $renderer = new Changelog_Renderer();
        $parsed_array = $renderer->parse( $raw_changelog );

        // Save parsed changelog array to post meta for version tracking
        $meta_key = self::get_meta_key( self::META_PREFIX, $unique_id );
        update_post_meta( $post_id, $meta_key, maybe_serialize( $parsed_array ) );

        $url_key = self::get_meta_key( self::META_PREFIX, $unique_id, '_url' );

        if ( ! empty( $url ) ) {
            update_post_meta( $post_id, $url_key, $url );
        }

        // Get the post object to update content
        $post = get_post( $post_id );
        if ( ! $post ) {
            return new WP_Error( 'post_not_found', __( 'Post not found', 'changeloger' ) );
        }


        $post_content = $post->post_content;
        // Replace changelog info wrapper content
        $post_content = self::replace_content_between_markers(
            $post_content,
            'data-changeloger-content',
            $rendered_info_wrapper
        );

		// Replace version tree content only if enabled
	    if ( $has_version_tree ) {
		    $post_content = self::replace_content_between_markers(
			    $post_content,
			    'data-changeloger-version',
			    $rendered_version_tree
		    );
	    }
	    $post_content = self::replace_changelog_in_content(
		    $post_content,
		    $raw_changelog
	    );


        // Update post content
	    global $wpdb;
	    $updated = $wpdb->update(
		    $wpdb->posts,
		    array('post_content' => $post_content),
		    array('ID' => $post_id),
		    array('%s'),
		    array('%d')
	    );

	    if ( $updated === false ) {
		    // Check for database error
		    if ( $wpdb->last_error ) {
			    return false;
		    }
		    return false;
	    } else {
		    return true;
	    }
    }

    /**
     * Replace content between start and end markers in post content
     *
     * @param string $post_content The post content
     * @param string $marker_name The marker name (e.g., 'data-changeloger-content')
     * @param string $replacement_content The content to insert
     *
     * @return string Updated post content
     */
    private static function replace_content_between_markers( $post_content, $marker_name, $replacement_content ) {
	    // Pattern to find: <span data-marker-name="start"></span> ...anything... <span data-marker-name="end"></span>
	    $pattern = '/<span\s+[^>]*' . preg_quote( $marker_name, '/' ) . '\s*=\s*["\']start["\'][^>]*><\/span>.*?<span\s+[^>]*' . preg_quote( $marker_name, '/' ) . '\s*=\s*["\']end["\'][^>]*><\/span>/is';

        // Replace with the new content wrapped in start/end markers
        $replacement = '<span ' . $marker_name . '="start"></span>' . $replacement_content . '<span ' . $marker_name . '="end"></span>';

        // Perform replacement with count
        $updated_content = preg_replace( $pattern, $replacement, $post_content, -1, $count );

        // If no replacement happened (markers not found), try to insert markers and content
        // This handles the case where the block was just created or markers don't exist yet
        if ( $count === 0 ) {
            // Search for the block by looking for the changeloger-info-inner-wrapper or changeloger-version-list-container
            if ( $marker_name === 'data-changeloger-content' ) {
                // Try to find and replace the changeloger-info-inner-wrapper
                $wrapper_pattern = '/(<div class="changeloger-info-inner-wrapper">)(.*?)(<\/div>)/is';
                $wrapper_replacement = '$1' . $replacement . '$3';
                $updated_content = preg_replace( $wrapper_pattern, $wrapper_replacement, $post_content, 1, $wrapper_count );

                if ( $wrapper_count === 0 ) {
                    // Markers still not found, return original content
                    return $post_content;
                }
            } elseif ( $marker_name === 'data-changeloger-version' ) {
                // Try to find and replace the VersionsTree component or its container
                $version_pattern = '/(<div class="changeloger-version-list-container[^"]*">.*?<h6[^>]*>Versions<\/h6>)(.*?)(<\/div>)/is';
                $version_replacement = '$1' . $replacement . '$3';
                $updated_content = preg_replace( $version_pattern, $version_replacement, $post_content, 1, $version_count );

                if ( $version_count === 0 ) {
                    // Markers still not found, return original content
                    return $post_content;
                }
            }
        }

        return $updated_content;
    }
	private static function replace_changelog_in_content($content, $new_changelog) {
		// Pattern to match "changelog":"..." accounting for escaped characters
		$pattern = '/"changelog"\s*:\s*"((?:[^"\\\\]|\\\\.)*)"/s';

		// Format: Convert actual line breaks to literal \n (4 backslashes to get \\n in result)
		$formatted = preg_replace("/\r\n|\r|\n/", "\\\\\\\\n", $new_changelog);

		// Escape quotes only
		$escaped_changelog = str_replace('"', '\\"', $formatted);

		// Replace with new changelog value
		$replacement = '"changelog":"' . $escaped_changelog . '"';

		$updated_content = preg_replace($pattern, $replacement, $content);

		return $updated_content;
	}
    /**
     * Get highest version from changelog array
     *
     * @param array $changelog Parsed changelog array
     *
     * @return string|null Highest version string or null if not found
     */
    private static function get_highest_version_from_changelog( $changelog ) {
        if ( ! is_array( $changelog ) || empty( $changelog ) ) {
            return null;
        }

        // The parsed changelog from parser.js returns entries in the order they appear in the text
        // Changelogs are typically written newest first, so the first entry is the latest version
        if ( isset( $changelog[0]['version'] ) ) {
            return $changelog[0]['version'];
        }

        return null;
    }


    /**
     * Check if a new version has been added
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param array  $new_changelog New parsed changelog array
     * @param bool   $is_pro_user Whether user is a pro user
     *
     * @return array Result with keys: has_new_version (bool), old_version (string|null), new_version (string|null), error (string|null)
     */
    public static function check_for_new_version( $post_id, $unique_id, $new_changelog, $is_pro_user = false ) {
        $result = array(
            'has_new_version' => false,
            'old_version'     => null,
            'new_version'     => null,
            'error'           => null,
        );

        // Validate inputs
        if ( ! is_array( $new_changelog ) || empty( $new_changelog ) ) {
            $result['error'] = __( 'Invalid changelog data', 'changeloger' );
            return $result;
        }

        // Get highest version from new changelog
        $new_highest = self::get_highest_version_from_changelog( $new_changelog );
        if ( ! $new_highest ) {
            $result['error'] = __( 'No valid versions found in changelog', 'changeloger' );
            return $result;
        }

        // Check if this version has already been notified (critical check)
        if ( self::is_version_notified( $post_id, $unique_id, $new_highest ) ) {
            // This version was already notified, so it's not "new" anymore
            $result['has_new_version'] = false;
            $result['new_version']     = $new_highest;
            return $result;
        }

        // Get previous changelog
        $prev_changelog = self::get_tracked_changelog( $post_id, $unique_id );

        if ( $prev_changelog === false ) {
            // No previous data, this is the first save
            $result['has_new_version'] = true;
            $result['new_version']     = $new_highest;
            return $result;
        }

        // Get highest version from previous changelog
        $prev_highest = self::get_highest_version_from_changelog( $prev_changelog );

        if ( ! $prev_highest ) {
            // Previous had no valid versions
            $result['has_new_version'] = true;
            $result['new_version']     = $new_highest;
            return $result;
        }

        // Compare highest versions using native WordPress version_compare
        if ( version_compare( $new_highest, $prev_highest, '>' ) ) {
            $result['has_new_version'] = true;
            $result['old_version']     = $prev_highest;
            $result['new_version']     = $new_highest;
        }

        return $result;
    }

    /**
     * Update last seen version
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $version Version string
     *
     * @return bool Success status
     */
    public static function update_last_seen_version( $post_id, $unique_id, $version ) {
        $meta_key = self::get_meta_key( self::META_SEEN_PREFIX, $unique_id );
        if ( update_post_meta( $post_id, $meta_key, $version ) ) {
            self::log_version_event( $post_id, $unique_id, 'version_seen', [ 'version' => $version ] );
            return true;
        }
        return false;
    }

    /**
     * Get last seen version
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     *
     * @return string|false Version string or false if not set
     */
    public static function get_last_seen_version( $post_id, $unique_id ) {
        return get_post_meta( $post_id, self::get_meta_key( self::META_SEEN_PREFIX, $unique_id ), true );
    }

    /**
     * Get changelog URL for a block
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     *
     * @return string|false URL string or false if not set
     */
    public static function get_changelog_url( $post_id, $unique_id ) {
        return get_post_meta( $post_id, self::get_meta_key( self::META_PREFIX, $unique_id, '_url' ), true );
    }

    /**
     * Add to version history
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $version Version string
     * @param array  $metadata Additional metadata
     *
     * @return bool Success status
     */
    public static function add_to_version_history( $post_id, $unique_id, $version, $metadata = array() ) {
        $meta_key = self::get_meta_key( self::META_HISTORY_PREFIX, $unique_id );
        $history = get_post_meta( $post_id, $meta_key, true );
        $history = is_array( $history ) ? $history : array();

        $entry = array(
            'version'   => $version,
            'timestamp' => current_time( 'mysql' ),
            'notified'  => false,
        ) + $metadata;

        $history[] = $entry;

        if ( update_post_meta( $post_id, $meta_key, maybe_serialize( $history ) ) ) {
            self::log_version_event( $post_id, $unique_id, 'version_history_added', $entry );
            return true;
        }

        return false;
    }

    /**
     * Get version history
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     *
     * @return array Version history array
     */
    public static function get_version_history( $post_id, $unique_id ) {
        $history = get_post_meta( $post_id, self::get_meta_key( self::META_HISTORY_PREFIX, $unique_id ), true );
        return is_array( $history ) ? $history : array();
    }

    /**
     * Mark version as notified to subscribers
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $version Version string
     * @param int    $notification_count Number of notifications sent
     *
     * @return bool Success status
     */
    public static function mark_version_notified( $post_id, $unique_id, $version, $notification_count = 0 ) {
        $meta_key = self::get_meta_key( self::META_HISTORY_PREFIX, $unique_id );
        $history = get_post_meta( $post_id, $meta_key, true );
        $history = is_array( $history ) ? $history : array();

        foreach ( $history as $key => $entry ) {
            if ( isset( $entry['version'] ) && $entry['version'] === $version ) {
                $history[ $key ]['notified'] = true;
                $history[ $key ]['notification_count'] = $notification_count;
                $history[ $key ]['notified_timestamp'] = current_time( 'mysql' );

                if ( update_post_meta( $post_id, $meta_key, maybe_serialize( $history ) ) ) {
                    self::log_version_event( $post_id, $unique_id, 'version_notified', [
                        'version' => $version,
                        'notification_count' => $notification_count,
                        'timestamp' => current_time( 'mysql' ),
                    ] );
                    return true;
                }
                break;
            }
        }

        return false;
    }

    /**
     * Check if a version has already been notified
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $version Version string
     *
     * @return bool True if version was already notified, false otherwise
     */
    public static function is_version_notified( $post_id, $unique_id, $version ) {
        $history = get_post_meta( $post_id, self::get_meta_key( self::META_HISTORY_PREFIX, $unique_id ), true );
        $history = is_array( $history ) ? $history : array();

        foreach ( $history as $entry ) {
            if ( isset( $entry['version'] ) && $entry['version'] === $version ) {
                return isset( $entry['notified'] ) && $entry['notified'] === true;
            }
        }

        return false;
    }

    /**
     * Get all changeloger blocks in a post
     *
     * @param int $post_id Post ID
     *
     * @return array Array of block metadata with unique_ids
     */
    public static function get_post_blocks( $post_id ) {
        $post = get_post( $post_id );

        if ( ! $post || empty( $post->post_content ) ) {
            return array();
        }

        $blocks = parse_blocks( $post->post_content );
        $changeloger_blocks = array();

        self::extract_changeloger_blocks( $blocks, $changeloger_blocks );

        return $changeloger_blocks;
    }

    /**
     * Recursively extract changeloger blocks
     *
     * @param array $blocks Blocks array
     * @param array &$changeloger_blocks Reference to accumulate changeloger blocks
     */
    private static function extract_changeloger_blocks( $blocks, &$changeloger_blocks ) {
        foreach ( $blocks as $block ) {
            if ( isset( $block['blockName'] ) && 'cha/changeloger' === $block['blockName'] ) {
                if ( isset( $block['attrs']['uniqueId'] ) && ! empty( $block['attrs']['uniqueId'] ) ) {
                    $changeloger_blocks[] = array(
                        'unique_id'  => $block['attrs']['uniqueId'],
                        'block_name' => 'cha/changeloger',
                        'attrs'      => $block['attrs'],
                    );
                }
            }

            // Recursively check inner blocks
            if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) ) {
                self::extract_changeloger_blocks( $block['innerBlocks'], $changeloger_blocks );
            }
        }
    }

    /**
     * Log notification trigger event
     * Saves logs to wp_options with a maximum of 10 entries
     * Columns: Timestamp, Post ID, Block ID, Version
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $version Version that triggered notification
     *
     * @return void
     */
    public static function log_notification_trigger( $post_id, $unique_id, $version ) {
        $log_key = 'cha_notification_triggers';
        $logs = get_option( $log_key, array() );
        if ( ! is_array( $logs ) ) {
            $logs = array();
        }

        // Create new log entry with required columns only
        $logs[] = [
            'timestamp' => current_time( 'mysql' ),
            'post_id'   => absint( $post_id ),
            'block_id'  => sanitize_text_field( $unique_id ),
            'version'   => sanitize_text_field( $version ),
        ];

        // Keep only last 10 entries (memory limit)
        if ( count( $logs ) > 10 ) {
            $logs = array_slice( $logs, -10 );
        }

        update_option( $log_key, $logs );
    }

    /**
     * Get all notification trigger logs
     *
     * @return array Array of notification trigger logs
     */
    public static function get_notification_logs() {
        $logs = get_option( 'cha_notification_triggers', array() );
        return is_array( $logs ) ? $logs : array();
    }

    /**
     * Clear all notification trigger logs
     *
     * @return bool Success status
     */
    public static function clear_notification_logs() {
        return delete_option( 'cha_notification_triggers' );
    }

    /**
     * Log version events for debugging and auditing
     *
     * @param int    $post_id Post ID
     * @param string $unique_id Block unique ID
     * @param string $event Event type
     * @param array  $data Event data
     *
     * @return void
     */
    public static function log_version_event( $post_id, $unique_id, $event, $data = array() ) {
        // ...existing code...
        // Keep only general event logging, notification triggers go to separate log
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
            error_log( sprintf(
                '[Changeloger] Event: %s | Post: %d | Block: %s',
                $event,
                $post_id,
                $unique_id
            ) );
        }
    }
}
