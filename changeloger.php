<?php
/**
 * Plugin Name: Changeloger
 * Description: A Gutenberg block to display changelog
 * Author: spider-themes
 * Requires at least: 6.0
 * Tested up to: 6.7.2
 * Requires PHP: 7.4
 * Version: 1.2.0
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text domain: changeloger
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if ( ! function_exists( 'cha_fs' ) ) {
    // Create a helper function for easy SDK access.
    function cha_fs() {
        global $cha_fs;

        if ( ! isset( $cha_fs ) ) {
            // Include Freemius SDK.
            require_once dirname( __FILE__ ) . '/vendor/autoload.php';
            $cha_fs = fs_dynamic_init( array(
                    'id'                  => '18274',
                    'slug'                => 'changeloger',
                    'premium_slug'        => 'changeloger-pro',
                    'type'                => 'plugin',
                    'public_key'          => 'pk_776f0d8257af65cd6c37c2b92c97b',
                    'premium_suffix'      => 'pro',
                    'is_premium'          => true,
                    'has_addons'          => false,
                    'has_paid_plans'      => true,
                    'is_org_compliant'    => true,
                    'menu'                => array(
                            'slug'       => 'changeloger',
                            'first-path' => 'admin.php?page=changeloger',
                            'contact'    => false,
                            'support'    => false,
                    ),
                    'parallel_activation' => array(
                            'enabled'                  => true,
                            'premium_version_basename' => 'changeloger-pro/changeloger.php',
                    ),
            ) );
        }

        return $cha_fs;
    }

    // Init Freemius.
    cha_fs();

    // Add filter to hide the Freemius badge from the plugin page.
    add_filter( 'hide_freemius_powered_by', '__return_true' );

    // Signal that SDK was initiated.
    do_action( 'cha_fs_loaded' );
}


if ( ! class_exists( 'CHANGELOGER_BLOCKS_CLASS' ) ) {
    final class CHANGELOGER_BLOCKS_CLASS {
        private $enqueue_assets;
        private $register_blocks;

        /**
         * Class constructor
         *
         * Initializes core includes, hooks, and sets up block registration and assets.
         *
         * @return void
         */
        public function __construct() {
            $this->core_includes();

            $this->register_blocks = new Changeloger_Block_Register();
            add_action( 'init', [ $this->register_blocks, 'changeloger_create_block_init' ] );

            $this->enqueue_assets = new Changeloger_Block_Assets();
            // Add migration filter for block name change from 'block/changeloger' to 'cha/changeloger'.
            add_filter( 'content_save_pre', [ $this, 'migrate_block_name' ] );
            add_filter( 'the_post', [ $this, 'migrate_block_name_in_post' ] );

        }

        /**
         * Migrate old block name 'block/changeloger' to new name 'cha/changeloger' in post content.
         * This hook runs when content is about to be saved.
         *
         * @param string $content The post content.
         * @return string The migrated post content.
         */
        public function migrate_block_name( $content ): string {
            if ( ! is_string( $content ) || empty( $content ) ) {
                return $content;
            }

            // Replace old block comment with new block name.
            // Pattern: <!-- wp:block/changeloger ... --> becomes <!-- wp:cha/changeloger ... -->
            return preg_replace(
                    '/<!-- wp:block\/changeloger/',
                    '<!-- wp:cha/changeloger',
                    $content
            );
        }

        /**
         * Migrate old block name in post object when loaded from database.
         * This ensures the block editor sees the new name even for posts with old blocks.
         *
         * @param WP_Post $post The post object.
         * @return WP_Post The post object with migrated content.
         */
        public function migrate_block_name_in_post( $post ) {
            if ( ! isset( $post->post_content ) || empty( $post->post_content ) ) {
                return $post;
            }

            // Apply the same migration to the post_content.
            $post->post_content = $this->migrate_block_name( $post->post_content );

            return $post; 
        }

        /**
         * Initialize the plugin
         */
        public static function init() {
            static $instance = false;
            if ( ! $instance ) {
                $instance = new self();
            }

            return $instance;
        }

        /**
         * Includes core files required for functionality.
         *
         * @return void
         */
        public function core_includes(): void {
            require_once __DIR__ . '/includes/enqueue-assets.php';
            require_once __DIR__ . '/includes/register-blocks.php';
            require_once __DIR__ . '/includes/rest-api.php';
            require_once __DIR__ . '/includes/class-changelog-renderer.php';
            require_once __DIR__ . '/admin/class-changeloger-admin.php';
            require_once __DIR__ . '/includes/subscription.php';
            require_once __DIR__ . '/includes/version-tracker.php';
            require_once __DIR__ . '/includes/version-notification-cron.php';
        }

    }
}

/**
 * Plugin activation hook
 */
register_activation_hook( __FILE__, function() {
    if ( function_exists( 'cha_schedule_version_check_cron' ) ) {
        cha_schedule_version_check_cron();
    }
} );

/**
 * Plugin deactivation hook
 */
register_deactivation_hook( __FILE__, function() {
    if ( function_exists( 'cha_unschedule_version_check_cron' ) ) {
        cha_unschedule_version_check_cron();
    }
} );

/**
 * Kickoff
 */
CHANGELOGER_BLOCKS_CLASS::init();