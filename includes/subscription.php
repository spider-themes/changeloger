<?php

/**
 * Changeloger Subscription System
 *
 * Handles email subscriptions for changelog updates
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}


/**
 * Send version update email to a subscriber
 *
 * @param int   $post_id Post ID
 * @param array $subscriber Subscriber data with email, name, and token
 * @param string $version Optional version number that was released
 * @param string $changelog Optional changelog content
 * @param string $product_name Optional product name (block-specific)
 * @param string $ending_message Optional ending message (block-specific)
 * @return bool Whether email was sent successfully
 */
function cha_send_version_update_email( $post_id, $subscriber, $version = '', $changelog = '', $product_name = '', $ending_message = '' ) {
    // Use block-specific settings if provided, otherwise fall back to global settings
    if ( empty( $product_name ) || empty( $ending_message ) ) {
        // Get subscription settings from global options as fallback
        $subscription_settings = get_option('changeloger_subscription_settings', [
            'enable_subscription' => 0,
            'product_name' => '',
            'email_ending_message' => '',
        ]);

        if ( empty( $product_name ) ) {
            $product_name = !empty($subscription_settings['product_name'])
                ? $subscription_settings['product_name']
                : get_the_title( $post_id );
        }

        if ( empty( $ending_message ) ) {
            $ending_message = $subscription_settings['email_ending_message'] ?? '';
        }
    }

    $to = $subscriber['email'];
    $post_title = get_the_title( $post_id );

    // Use product name from settings if available, otherwise use post title
    $product_display_name = !empty($product_name) ? $product_name : $post_title;

    // Email subject: {name} v{version} Is Released!
    $subject = sprintf( __( '%s v%s Is Released!', 'changeloger' ), $product_display_name, $version );
    $blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );

    $message = "<div style='font-family: Arial, sans-serif;'>";
    $message .= "<div style='border:1px solid #e3e3e3;border-top:none;width:100%;max-width:550px;background-color: #fff;padding: 30px;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, .1);border-top: 5px solid #525df9'>";

    // {name} v{version} has officially rolled out!
    $message .= "<h2 style='font-size: 24px;line-height: 1.3;color: #606060;margin: 0 0 20px;'>";
    $message .= sprintf( esc_html__( '%s v%s has officially rolled out!', 'changeloger' ), esc_html( $product_display_name ), esc_html( $version ) );
    $message .= "</h2>";

    // This version introduces lots of new features and updates.
    $message .= "<p style='font-size: 16px;line-height: 1.5;color: #666;margin: 0 0 20px;'>";
    $message .= esc_html__( 'This version introduces lots of new features and updates.', 'changeloger' );
    $message .= "</p>";

    // What's new in {name} v{version}?
    $message .= "<h3 style='font-size: 18px;line-height: 1.3;color: #606060;margin: 0 0 15px;'>";
    $message .= sprintf( esc_html__( 'What\'s new in %s v%s?', 'changeloger' ), esc_html( $product_display_name ), esc_html( $version ) );
    $message .= "</h3>";

    // {all the changes in the version}
    if ( ! empty( $changelog ) ) {
        $message .= "<div style='font-size: 14px;line-height: 1.6;color: #666;margin: 0 0 20px;'>";
        $message .= wp_kses_post( $changelog );
        $message .= "</div>";
    }

    // and much more!
    $message .= "<p style='font-size: 14px;line-height: 1.5;color: #666;margin: 0 0 20px;'>";
    $message .= esc_html__( 'and much more!', 'changeloger' );
    $message .= "</p>";

    // {name} v{version} {ending message}
    $message .= "<p style='font-size: 16px;line-height: 1.5;color: #666;margin: 0 0 20px;'>";
    if ( ! empty( $ending_message ) ) {
        // Replace {name} placeholder with product name and version
        $ending_message_replaced = str_replace(
            ['{name}'],
            [$product_display_name . ' v' . $version],
            $ending_message
        );
        $message .= wp_kses_post( $ending_message_replaced );
    } else {
        $message .= sprintf(
            esc_html__( '%s v%s brings you the latest features. Update today!', 'changeloger' ),
            esc_html( $product_display_name ),
            esc_html( $version )
        );
    }
    $message .= "</p>";

    // {view changelog button}
    $message .= "<a href='" . esc_url( get_permalink( $post_id ) ) . "' style='display: inline-block;padding: 12px 24px;background-color: #525df9;color: #fff;font-size: 16px;line-height: 1.5;text-decoration: none;border-radius: 4px;margin: 0;font-weight: 500;'>" . esc_html__( 'View Changelog', 'changeloger' ) . "</a>";

    $message .= "</div>";
    $message .= "<div style='text-align: center;font-size: 12px;line-height: 19px;margin: 20px 0;max-width: 550px;'>";
    $message .= "<p style='margin: 0;'>" . esc_html( $blogname ) . "<br>";
    $message .= sprintf( esc_html__( 'You received this email because you subscribed to %s changelog updates.', 'changeloger' ), esc_html( $product_display_name ) ) . "<br>";

    // Add unsubscribe link
    if ( ! empty( $subscriber['token'] ) ) {
        $unsubscribe_url = add_query_arg( array(
            'cha_unsubscribe_token' => $subscriber['token'],
            'cha_token_id' => $post_id
        ), get_permalink( $post_id ) );
        $message .= "<a href='" . esc_url( $unsubscribe_url ) . "' style='text-decoration: none; color: #525df9;'>" . esc_html__( 'Unsubscribe', 'changeloger' ) . "</a>";
    }

    $message .= "</p></div></div>";

    $wp_email = 'wordpress@' . preg_replace( '#^www\.#', '', strtolower( $_SERVER['SERVER_NAME'] ) );
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        "From: \"{$blogname}\" <{$wp_email}>"
    );

    return wp_mail( $to, wp_specialchars_decode( $subject ), $message, $headers );
}

/**
 * Display subscription button(s) for each changeloger block in the current post.
 * Supports multiple blocks with per-block subscriptions.
 */
add_action( 'wp_footer', 'cha_display_subscription_button' );
function cha_display_subscription_button() {
    global $post;

    if ( ! $post || ! isset( $post->ID ) ) {
        return;
    }

    // Check if subscription feature is enabled
    $subscription_settings = get_option( 'changeloger_subscription_settings', array(
        'enable_subscription' => 0,
        'product_name' => '',
        'email_ending_message' => '',
    ) );

    if ( ! $subscription_settings['enable_subscription'] ) {
        return;
    }
    $blocks = Changeloger_Version_Tracker::get_post_blocks( $post->ID );

    if ( empty( $blocks ) ) {
        return;
    }

    // Output a template per block, keyed by block unique id so subscriptions are per-block
    foreach ( $blocks as $block ) {
        $unique_id = isset( $block['unique_id'] ) ? $block['unique_id'] : '';
        if ( empty( $unique_id ) ) {
            continue;
        }

        $post_id = $post->ID;

        // Use per-block meta keys
        $confirmed_meta_key = 'cha_subscription_confirmed_' . $unique_id;
        $subscription_meta_key = 'cha_subscription_data_' . $unique_id;

        $cha_subscription_data = get_post_meta( $post_id, $confirmed_meta_key, true );
        $subscribedMails = array();

        if ( ! empty( $cha_subscription_data ) ) {
            $cha_subscription_data = maybe_unserialize( $cha_subscription_data );
            $unique_data = array_map( "unserialize", array_unique( array_map( "serialize", $cha_subscription_data ) ) );
            $cha_subscription_data = array_values( $unique_data );

            if ( is_array( $cha_subscription_data ) && ! empty( $cha_subscription_data ) ) {
                foreach ( $cha_subscription_data as $subscription ) {
                    $subscribedMails[] = $subscription['email'];
                }
                wp_reset_postdata();
            }
        }

        // Check current user email in array
        $current_user = wp_get_current_user();
        $current_user_email = $current_user->user_email;
        $search = array_search( $current_user_email, $subscribedMails );

        // Get subscription settings
        $subscriptions_btn = __( 'Subscribe', 'changeloger' );
        $unsubscriptions_btn = __( 'Unsubscribe', 'changeloger' );

        if ( $search !== false ) {
            $subscriptionBtn = $unsubscriptions_btn;
            $subscriptionBtnClass = 'subscribed';
        } else {
            $subscriptionBtn = $subscriptions_btn;
            $subscriptionBtnClass = is_user_logged_in() ? 'logged-user' : 'subscribe';
        }

        $token = ( $search !== false ) ? $cha_subscription_data[ $search ]['token'] : '';

        // Template ids include the unique id so JS can target specific block (and so each block modal is separate)
        $btn_template_id = 'cha-subscription-button-template-' . esc_attr( $unique_id );
        $form_template_id = 'cha-subscription-form-template-' . esc_attr( $unique_id );

        // Get block-specific subscription settings from block attrs
        $block_product_name = isset( $block['attrs']['subscriptionProductName'] ) ? $block['attrs']['subscriptionProductName'] : '';
        $block_ending_message = isset( $block['attrs']['emailEndingMessage'] ) ? $block['attrs']['emailEndingMessage'] : '';

        echo '<script type="text/template" id="' . $btn_template_id . '" 
                data-product-name="' . esc_attr( $block_product_name ) . '" 
                data-ending-message="' . esc_attr( $block_ending_message ) . '">
            <button class="cha-subscription-btn ' . esc_attr( $subscriptionBtnClass ) . '" 
                    data-post-id="' . esc_attr( $post_id ) . '" 
                    data-block-unique="' . esc_attr( $unique_id ) . '"' .
             ( $search !== false ? ' data-token="' . esc_attr( $token ) . '"' : '' ) . '>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8337 17.5V12.5M13.3337 15H18.3337M10.0003 12.5H6.66699C5.11385 12.5 4.33728 12.5 3.72471 12.7537C2.90795 13.092 2.25904 13.741 1.92073 14.5577C1.66699 15.1703 1.66699 15.9469 1.66699 17.5M12.917 2.7423C14.1386 3.23679 15.0003 4.43443 15.0003 5.83333C15.0003 7.23224 14.1386 8.42988 12.917 8.92437M11.2503 5.83333C11.2503 7.67428 9.75794 9.16667 7.91699 9.16667C6.07604 9.16667 4.58366 7.67428 4.58366 5.83333C4.58366 3.99238 6.07604 2.5 7.91699 2.5C9.75794 2.5 11.2503 3.99238 11.2503 5.83333Z" stroke="#ffffff" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                ' . esc_html( $subscriptionBtn ) . '
            </button>
        </script>';

        echo '<script type="text/template" id="' . $form_template_id . '">
            <div class="cha-subscription-form-wrap" id="cha-subscription-' . esc_attr( $post_id ) . '-' . esc_attr( $unique_id ) . '">
                <div class="cha-subscription-inner">
                    <h2>' . esc_html__( 'Subscribe for Updates', 'changeloger' ) . '</h2>
                    <span class="cha-subscription-close">&times;</span>
                    
                    <form action="#" method="POST" class="cha-subscription-form">
                        <input type="hidden" name="cha_subscription_id" value="' . esc_attr( $post_id ) . '">
                        <input type="hidden" name="cha_block_unique" value="' . esc_attr( $unique_id ) . '">
                        
                        <label>' . esc_html__( 'Name', 'changeloger' ) . '</label>
                        <input required type="text" name="cha_subscription_name" placeholder="' . esc_attr__( 'Enter your name', 'changeloger' ) . '">
                        
                        <label>' . esc_html__( 'Email', 'changeloger' ) . '</label>
                        <input required type="email" name="cha_subscription_email" placeholder="' . esc_attr__( 'Enter your email', 'changeloger' ) . '">
                        
                        <button type="submit" class="cha-subscription-submit">' . esc_html__( 'Subscribe', 'changeloger' ) . '</button>
                        
                    </form>
                </div>
            </div>
        </script>';
    }
}

/**
 * AJAX handler for subscription form submission (per-block)
 */
add_action( 'wp_ajax_cha_subscription_form', 'cha_subscription_form' );
add_action( 'wp_ajax_nopriv_cha_subscription_form', 'cha_subscription_form' );

function cha_subscription_form() {
    $cha_subscription_id = isset( $_POST['cha_subscription_id'] ) ? absint( $_POST['cha_subscription_id'] ) : 0;
    $cha_block_unique = isset( $_POST['cha_block_unique'] ) ? sanitize_text_field( $_POST['cha_block_unique'] ) : '';
    $cha_subscription_name = sanitize_text_field( $_POST['cha_subscription_name'] ?? '' );
    $cha_subscription_email = sanitize_email( $_POST['cha_subscription_email'] ?? '' );
    $cha_product_name = sanitize_text_field( $_POST['cha_product_name'] ?? '' );
    $cha_ending_message = sanitize_textarea_field( $_POST['cha_ending_message'] ?? '' );

    if ( ! $cha_subscription_id || empty( $cha_block_unique ) ) {
        wp_send_json_error( __( 'Invalid post or block ID', 'changeloger' ) );
    }

    if ( empty( $cha_subscription_email ) || empty( $cha_subscription_name ) ) {
        wp_send_json_error( __( 'Please fill in all required fields', 'changeloger' ) );
    }

    // Use per-block meta keys
    $pending_meta_key = 'cha_subscription_data_' . $cha_block_unique;
    $confirmed_meta_key = 'cha_subscription_confirmed_' . $cha_block_unique;

    // Check if email already exists in pending subscriptions
    $existing_data = get_post_meta( $cha_subscription_id, $pending_meta_key, true );
    $existing_data = ! empty( $existing_data ) ? maybe_unserialize( $existing_data ) : array();

    foreach ( $existing_data as $data ) {
        if ( $data['email'] === $cha_subscription_email ) {
            wp_send_json_error( __( 'A confirmation email has already been sent to this address. Please check your inbox.', 'changeloger' ) );
        }
    }

    // Check if email already exists in confirmed subscriptions
    $confirmed_data = get_post_meta( $cha_subscription_id, $confirmed_meta_key, true );
    $confirmed_data = ! empty( $confirmed_data ) ? maybe_unserialize( $confirmed_data ) : array();

    foreach ( $confirmed_data as $data ) {
        if ( $data['email'] === $cha_subscription_email ) {
            wp_send_json_error( __( 'This email is already subscribed and confirmed.', 'changeloger' ) );
        }
    }

    // Generate confirmation token
    $confirmation_token = wp_generate_password( 32, false );

    // Add new subscription (pending)
    $new_data = array(
        'name' => $cha_subscription_name,
        'email' => $cha_subscription_email,
        'token' => $confirmation_token,
    );

    $existing_data[] = $new_data;

    // Save to post meta (per-block)
    if ( ! empty( $existing_data ) ) {
        update_post_meta( $cha_subscription_id, $pending_meta_key, maybe_serialize( $existing_data ) );
    }

    // Send confirmation email (include block identifier in confirmation link)
    $subject = __( 'Confirm your subscription', 'changeloger' );
    $blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
    $post_title = get_the_title( $cha_subscription_id );

    // Use block-specific product name if provided, otherwise fall back to post title
    $product_display_name = ! empty( $cha_product_name ) ? $cha_product_name : $post_title;

    $confirm_url = add_query_arg( array(
        'cha_token' => $confirmation_token,
        'cha_token_id' => $cha_subscription_id,
        'cha_block' => $cha_block_unique,
    ), get_permalink( $cha_subscription_id ) );

    $message = "<div style='font-family: Arial, sans-serif;'>";
    $message .= "<div style='border:1px solid #e3e3e3;border-top:none;width:100%;max-width:550px;background-color: #fff;padding: 30px;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, .1);border-top: 5px solid #525df9'>";
    $message .= "<h2 style='font-size: 27px;line-height: 1.2;color: #606060;margin: 0 0 22px;'>" . esc_html__( 'Confirm Your Subscription', 'changeloger' ) . "</h2>";
    $message .= "<p style='font-size: 16px;line-height: 1.5;color: #666;margin: 0 0 15px;'>" . sprintf( esc_html__( 'Thank you for subscribing to %s changelog updates!', 'changeloger' ), esc_html( $product_display_name ) ) . "</p>";
    $message .= "<a href='" . esc_url( $confirm_url ) . "' style='display: inline-block;padding: 10px 20px;background-color: #525df9;color: #fff;font-size: 16px;line-height: 1.5;text-decoration: none;border-radius: 4px;margin: 0;font-weight: 500;'>" . esc_html__( 'Confirm Subscription', 'changeloger' ) . "</a>";
    $message .= "<p style='font-size: 16px;line-height: 1.5;color: #666;margin: 20px 0 0;'>" . esc_html__( 'If you received this email by mistake, you can ignore it. You will not be subscribed if you do not click the confirmation link.', 'changeloger' ) . "</p>";
    $message .= "</div>";
    $message .= "<div class='cha-subscription-mail-footer' style='text-align: center;font-size: 12px;line-height: 19px;margin: 20px 0;max-width: 550px;'>";
    $message .= "<p style='margin: 0;'>" . esc_html( $blogname ) . "<br>" . sprintf( esc_html__( 'You\'re receiving this email because you signed up for changelog updates from %s', 'changeloger' ), esc_html( $product_display_name ) ) . "</p>";
    $message .= "</div></div>";

    $wp_email = 'wordpress@' . preg_replace( '#^www\.#', '', strtolower( $_SERVER['SERVER_NAME'] ) );
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        "From: \"{$blogname}\" <{$wp_email}>"
    );


    wp_mail( $cha_subscription_email, wp_specialchars_decode( $subject ), $message, $headers );

    wp_send_json_success( __( 'Confirmation email sent. Please check your email to confirm your subscription.', 'changeloger' ) );
}

/**
 * AJAX handler for confirming subscription (per-block)
 */
add_action( 'wp_ajax_cha_confirm_subscription', 'cha_confirm_subscription' );
add_action( 'wp_ajax_nopriv_cha_confirm_subscription', 'cha_confirm_subscription' );

function cha_confirm_subscription() {
    $token = isset( $_REQUEST['token'] ) ? sanitize_text_field( $_REQUEST['token'] ) : '';
    $token_id = isset( $_REQUEST['token_id'] ) ? absint( $_REQUEST['token_id'] ) : 0;
    $block_unique = isset( $_REQUEST['block_unique'] ) ? sanitize_text_field( $_REQUEST['block_unique'] ) : ( isset( $_REQUEST['cha_block'] ) ? sanitize_text_field( $_REQUEST['cha_block'] ) : '' );

    if ( empty( $token ) || ! $token_id || empty( $block_unique ) ) {
        wp_send_json_error( __( 'Invalid confirmation token or block', 'changeloger' ) );
    }

    $pending_meta_key = 'cha_subscription_data_' . $block_unique;
    $confirmed_meta_key = 'cha_subscription_confirmed_' . $block_unique;

    $cha_subscription_data = get_post_meta( $token_id, $pending_meta_key, true );

    if ( empty( $cha_subscription_data ) ) {
        wp_send_json_error( __( 'No subscription found', 'changeloger' ) );
    }

    $existing_data = maybe_unserialize( $cha_subscription_data );
    $unique_data = array_map( "unserialize", array_unique( array_map( "serialize", $existing_data ) ) );
    $existing_data = array_values( $unique_data );

    // Find matching subscription by token
    $matched_data = array_filter(
        $existing_data,
        function ( $subscription ) use ( $token ) {
            return isset( $subscription['token'] ) && $subscription['token'] === $token;
        }
    );

    if ( empty( $matched_data ) ) {
        wp_send_json_error( __( 'Subscription not found', 'changeloger' ) );
    }

    $matched_subscription = reset( $matched_data );

    // Check if already confirmed to prevent duplicates
    $cha_subscription_confirmed = get_post_meta( $token_id, $confirmed_meta_key, true );
    $confirmed_data = ! empty( $cha_subscription_confirmed ) ? maybe_unserialize( $cha_subscription_confirmed ) : array();

    // Check if this email is already confirmed
    foreach ( $confirmed_data as $confirmed ) {
        if ( $confirmed['email'] === $matched_subscription['email'] ) {
            wp_send_json_error( __( 'This email is already confirmed.', 'changeloger' ) );
        }
    }

    // Add to confirmed subscriptions (per-block)
    $confirmed_data[] = $matched_subscription;

    if ( ! empty( $confirmed_data ) ) {
        update_post_meta( $token_id, $confirmed_meta_key, maybe_serialize( $confirmed_data ) );
    }

    // Remove from pending subscriptions after confirmation
    cha_remove_subscription_data( $token_id, $pending_meta_key, $token );

    wp_send_json_success( __( 'Subscription confirmed!', 'changeloger' ) );
}

/**
 * AJAX handler for unsubscribing (per-block)
 */
add_action( 'wp_ajax_cha_unsubscription_create', 'cha_unsubscription_create' );
add_action( 'wp_ajax_nopriv_cha_unsubscription_create', 'cha_unsubscription_create' );

function cha_unsubscription_create() {
    $token = isset( $_POST['token'] ) ? sanitize_text_field( $_POST['token'] ) : '';
    $token_id = isset( $_POST['token_id'] ) ? absint( $_POST['token_id'] ) : 0;
    $block_unique = isset( $_POST['cha_block_unique'] ) ? sanitize_text_field( $_POST['cha_block_unique'] ) : '';

    if ( empty( $token ) || ! $token_id || empty( $block_unique ) ) {
        wp_send_json_error( __( 'Invalid unsubscription request', 'changeloger' ) );
    }

    // Build per-block meta keys
    $pending_meta_key = 'cha_subscription_data_' . $block_unique;
    $confirmed_meta_key = 'cha_subscription_confirmed_' . $block_unique;

    // Remove from subscription_data (pending) and subscription_confirmed (confirmed)
    $subscription_removed = cha_remove_subscription_data( $token_id, $pending_meta_key, $token );
    $confirmed_removed = cha_remove_subscription_data( $token_id, $confirmed_meta_key, $token );

    if ( $subscription_removed || $confirmed_removed ) {
        wp_send_json_success( __( 'You have been unsubscribed successfully', 'changeloger' ) );
    } else {
        wp_send_json_error( __( 'No matching subscription found', 'changeloger' ) );
    }
}

/**
 * Helper function to remove subscription data from a specific meta key
 *
 * @param int    $post_id Post ID
 * @param string $meta_key Meta key to remove from (now per-block keys expected)
 * @param string $token Token to match and remove
 * @return bool
 */
function cha_remove_subscription_data( $post_id, $meta_key, $token ) {
    $subscription_data = get_post_meta( $post_id, $meta_key, true );

    if ( empty( $subscription_data ) ) {
        return false;
    }

    $existing_data = maybe_unserialize( $subscription_data );
    $updated_data = array_filter( $existing_data, function( $subscription ) use ( $token ) {
        return ! ( isset( $subscription['token'] ) && $subscription['token'] === $token );
    });

    // Update meta if data changed
    if ( count( $existing_data ) !== count( $updated_data ) ) {
        update_post_meta( $post_id, $meta_key, maybe_serialize( array_values( $updated_data ) ) );
        return true;
    }

    return false;
}

/**
 * Get subscription meta key for a block
 *
 * @param string $unique_id Block unique ID
 * @param string $type 'data' or 'confirmed'
 *
 * @return string Meta key
 */
function cha_get_subscription_meta_key( $unique_id, $type = 'confirmed' ) {
    return 'cha_subscription_' . $type . '_' . $unique_id;
}

