/**
 * Changeloger Subscription Frontend Script
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        const changelogerContainer = $('.changeloger-container');

        if (changelogerContainer.length === 0) {
            return;
        }

        // Inject subscription button and form into changeloger container
        injectSubscriptionUI();

        // Initialize subscription events
        initSubscriptionEvents();

        // Handle subscription confirmation from URL params
        handleSubscriptionConfirmation();

        // Handle unsubscription confirmation from URL params
        handleUnsubscriptionConfirmation();
    });

    /**
     * Inject subscription button and form into the changeloger container
     */
    function injectSubscriptionUI() {
        // Handle multiple changeloger blocks - each has its own unique ID templates
        $('[id^="cha-subscription-button-template-"]').each(function() {
            const $template = $(this);
            const buttonHtml = $template.html();

            // Extract the unique ID from the template ID (e.g., "cha-subscription-button-template-abc123" -> "abc123")
            const uniqueId = $template.attr('id').replace('cha-subscription-button-template-', '');

            // Find the corresponding form template
            const $formTemplate = $('#cha-subscription-form-template-' + uniqueId);
            if ($formTemplate.length === 0) {
                return;
            }

            const formHtml = $formTemplate.html();

            // Find the container for this block
            const $containers = $('.changeloger-container');
            if ($containers.length === 0) {
                return;
            }

            // For each container, inject button and form
            $containers.each(function() {
                const $container = $(this);
                const $buttonContainer = $container.find('.cha-subscription-button-container').first();

                if ($buttonContainer.length > 0) {
                    // Insert button
                    $buttonContainer.prepend(buttonHtml);

                    // Insert form after container
                    $container.after(formHtml);
                }
            });
        });
    }

    /**
     * Initialize subscription event handlers
     */
    function initSubscriptionEvents() {
        // Subscribe button click
        $(document).on('click', '.cha-subscription-btn.subscribe', function(e) {
            e.preventDefault();

            const $btn = $(this);
            const postId = $btn.attr('data-post-id');
            const blockUnique = $btn.attr('data-block-unique');

            if (!postId || !blockUnique) {
                return;
            }

            const formWrap = $('#cha-subscription-' + postId + '-' + blockUnique);

            if (formWrap.length > 0) {
                formWrap.addClass('active');

                // Close on background click
                $(document).one('click', function(event) {
                    if (!$(event.target).closest('.cha-subscription-inner').length &&
                        !$(event.target).hasClass('cha-subscription-btn')) {
                        formWrap.removeClass('active');
                    }
                });
            }
        });

        // Close button click
        $(document).on('click', '.cha-subscription-close, .cha-subscription-cancel', function(e) {
            e.preventDefault();
            $(this).closest('.cha-subscription-form-wrap').removeClass('active');
        });

        // Form submission
        $(document).on('submit', '.cha-subscription-form', function(e) {
            e.preventDefault();

            const $form = $(this);
            const $submitBtn = $form.find('.cha-subscription-submit');
            const originalBtnText = $submitBtn.text();

            // Get block unique ID from form
            const blockUnique = $form.find('input[name="cha_block_unique"]').val();

            // Get product name and ending message from the button template
            const $buttonTemplate = $('#cha-subscription-button-template-' + blockUnique);
            const productName = $buttonTemplate.attr('data-product-name') || '';
            const endingMessage = $buttonTemplate.attr('data-ending-message') || '';

            const formData = {
                action: 'cha_subscription_form',
                cha_subscription_id: $form.find('input[name="cha_subscription_id"]').val(),
                cha_block_unique: blockUnique,
                cha_subscription_name: $form.find('input[name="cha_subscription_name"]').val(),
                cha_subscription_email: $form.find('input[name="cha_subscription_email"]').val(),
                cha_product_name: productName,
                cha_ending_message: endingMessage,
            };

            // Validate name for special characters
            if (/[#$%^&*()+={}\[\];:'",<>\/?@]/.test(formData.cha_subscription_name)) {
                showFormAlert($form, 'error', 'Special characters are not allowed in the name field.');
                return;
            }

            // Show loading state
            $submitBtn.text('Sending...').prop('disabled', true);

            $.ajax({
                type: 'POST',
                url: changeloger_local_object.ajax_url,
                data: formData,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        showFormAlert($form, 'success', response.data);
                        // Reset form
                        setTimeout(() => {
                            $form[0].reset();
                            $form.closest('.cha-subscription-form-wrap').removeClass('active');
                        }, 2000);
                    } else {
                        showFormAlert($form, 'error', response.data);
                    }
                },
                error: function() {
                    showFormAlert($form, 'error', 'An error occurred. Please try again.');
                },
                complete: function() {
                    $submitBtn.text(originalBtnText).prop('disabled', false);
                }
            });
        });

        // Unsubscribe button (subscribed users)
        $(document).on('click', '.cha-subscription-btn.subscribed', function(e) {
            e.preventDefault();

            const $btn = $(this);
            const token = $btn.attr('data-token');
            const postId = $btn.attr('data-post-id');
            const blockUnique = $btn.attr('data-block-unique');

            if (!token || !postId || !blockUnique) {
                return;
            }

            // Show confirmation modal
            showConfirmationModal({
                title: 'Unsubscribe',
                message: 'Are you sure you want to unsubscribe from changelog updates?',
                confirmText: 'Yes, Unsubscribe',
                cancelText: 'Cancel',
                onConfirm: function() {
                    unsubscribeUser(token, postId, blockUnique, $btn);
                }
            });
        });

        // Logged-in user subscribe button
        $(document).on('click', '.cha-subscription-btn.logged-user', function(e) {
            e.preventDefault();

            const $btn = $(this);
            const postId = $btn.attr('data-post-id');
            const blockUnique = $btn.attr('data-block-unique');

            if (!postId || !blockUnique) {
                return;
            }

            if ($btn.hasClass('subscribed')) {
                // Unsubscribe
                const token = $btn.attr('data-token');
                if (!token) {
                    return;
                }

                showConfirmationModal({
                    title: 'Unsubscribe',
                    message: 'Are you sure you want to unsubscribe from changelog updates?',
                    confirmText: 'Yes, Unsubscribe',
                    cancelText: 'Cancel',
                    onConfirm: function() {
                        unsubscribeUser(token, postId, blockUnique, $btn);
                    }
                });
            } else {
                // Show subscription form
                const formWrap = $('#cha-subscription-' + postId + '-' + blockUnique);
                if (formWrap.length > 0) {
                    formWrap.addClass('active');
                }
            }
        });
    }

    /**
     * Handle subscription confirmation from URL params
     */
    function handleSubscriptionConfirmation() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('cha_token');
        const tokenId = urlParams.get('cha_token_id');
        const blockUnique = urlParams.get('cha_block');

        if (!token || !tokenId || !blockUnique) {
            return;
        }

        // Show loading state
        showNotification('confirming', 'Confirming your subscription...');

        $.ajax({
            type: 'POST',
            url: changeloger_local_object.ajax_url,
            data: {
                action: 'cha_confirm_subscription',
                token: token,
                token_id: tokenId,
                block_unique: blockUnique
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update button state - target button with matching post ID and block unique ID
                    $('.cha-subscription-btn[data-post-id="' + tokenId + '"][data-block-unique="' + blockUnique + '"]')
                        .removeClass('subscribe logged-user')
                        .addClass('subscribed')
                        .attr('data-token', token);

                    // Update button text
                    const $btn = $('.cha-subscription-btn[data-post-id="' + tokenId + '"][data-block-unique="' + blockUnique + '"]');
                    $btn.html($btn.html().replace('Subscribe', 'Unsubscribe'));

                    showNotification('success', 'Your subscription has been confirmed!');

                    // Clean URL
                    setTimeout(() => {
                        window.history.pushState({}, document.title, window.location.pathname);
                    }, 2000);
                } else {
                    showNotification('error', 'Failed to confirm subscription.');
                }
            },
            error: function() {
                showNotification('error', 'An error occurred while confirming your subscription.');
            }
        });
    }

    /**
     * Handle unsubscription confirmation from URL params
     */
    function handleUnsubscriptionConfirmation() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('cha_unsubscribe_token');
        const tokenId = urlParams.get('cha_token_id');
        const blockUnique = urlParams.get('cha_block');

        if (!token || !tokenId || !blockUnique) {
            return;
        }

        // Show confirmation and unsubscribe
        showConfirmationModal({
            title: 'Unsubscribe',
            message: 'You are about to unsubscribe from changelog updates. Continue?',
            confirmText: 'Unsubscribe',
            cancelText: 'Keep Subscribed',
            onConfirm: function() {
                unsubscribeUser(token, tokenId, blockUnique, $('.cha-subscription-btn[data-post-id="' + tokenId + '"][data-block-unique="' + blockUnique + '"]'));
                setTimeout(() => {
                    window.history.pushState({}, document.title, window.location.pathname);
                }, 1500);
            }
        });
    }

    /**
     * Unsubscribe user
     */
    function unsubscribeUser(token, postId, blockUnique, $btn) {
        $btn.prop('disabled', true).text('Unsubscribing...');

        $.ajax({
            type: 'POST',
            url: changeloger_local_object.ajax_url,
            data: {
                action: 'cha_unsubscription_create',
                token: token,
                token_id: postId,
                cha_block_unique: blockUnique
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update button state
                    $btn.removeClass('subscribed')
                        .addClass('logged-user')
                        .removeAttr('data-token')
                        .prop('disabled', false);

                    // Update button text
                    $btn.html($btn.html().replace('Unsubscribe', 'Subscribe'));

                    showNotification('success', 'You have been unsubscribed successfully.');
                } else {
                    showNotification('error', 'Failed to unsubscribe.');
                    $btn.prop('disabled', false);
                }
            },
            error: function() {
                showNotification('error', 'An error occurred while unsubscribing.');
                $btn.prop('disabled', false);
            }
        });
    }

    /**
     * Show form alert message
     */
    function showFormAlert($form, type, message) {
        // Remove previous alerts
        $form.find('.cha-form-alert').remove();

        // Create alert element
        const alertClass = type === 'success' ? 'cha-form-alert-success' : 'cha-form-alert-error';
        const $alert = $('<p class="cha-form-alert ' + alertClass + '">' + message + '</p>');

        // Insert after form
        $form.append($alert);

        // Auto-remove after 5 seconds (unless success - then 2 seconds)
        const timeout = type === 'success' ? 2000 : 5000;
        setTimeout(() => {
            $alert.fadeOut('slow', function() {
                $(this).remove();
            });
        }, timeout);
    }

    /**
     * Show confirmation modal
     */
    function showConfirmationModal(options) {
        const $modal = $('<div class="cha-confirmation-modal">')
            .append(
                $('<div class="cha-confirmation-modal-overlay"></div>'),
                $('<div class="cha-confirmation-modal-content">')
                    .append(
                        $('<h3>').text(options.title),
                        $('<p>').text(options.message),
                        $('<div class="cha-modal-actions">')
                            .append(
                                $('<button class="cha-modal-confirm">')
                                    .text(options.confirmText)
                                    .on('click', function() {
                                        $modal.remove();
                                        options.onConfirm();
                                    }),
                                $('<button class="cha-modal-cancel">')
                                    .text(options.cancelText)
                                    .on('click', function() {
                                        $modal.remove();
                                    })
                            )
                    )
            );

        $('body').append($modal);

        // Close on overlay click
        $modal.find('.cha-confirmation-modal-overlay').on('click', function() {
            $modal.remove();
        });
    }

    /**
     * Show notification
     */
    function showNotification(type, message) {
        const notificationClass = 'cha-notification-' + type;
        const $notification = $('<div class="cha-notification ' + notificationClass + '">')
            .text(message)
            .append($('<span class="cha-notification-close">&times;</span>'));

        $('body').append($notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            $notification.fadeOut('slow', function() {
                $(this).remove();
            });
        }, 5000);

        // Close on click
        $notification.on('click', '.cha-notification-close', function() {
            $notification.fadeOut('slow', function() {
                $(this).remove();
            });
        });
    }

})(jQuery);

