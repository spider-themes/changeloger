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
        const $template = $('#cha-subscription-button-template');
        const $formTemplate = $('#cha-subscription-form-template');
        const $container = $('.changeloger-container .cha-subscription-button-container').first();

        if ($template.length === 0 || $formTemplate.length === 0 || $container.length === 0) {
            return;
        }

        const buttonHtml = $template.html();
        const formHtml = $formTemplate.html();

        // Insert button at the top of the container
        $container.prepend(buttonHtml);

        // Insert form after container
        $container.after(formHtml);
    }

    /**
     * Initialize subscription event handlers
     */
    function initSubscriptionEvents() {
        // Subscribe button click
        $(document).on('click', '.cha-subscription-btn.subscribe', function(e) {
            e.preventDefault();

            const postId = $(this).attr('data-id');
            const formWrap = $('#cha-subscription-' + postId);

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

            const formData = {
                action: 'cha_subscription_form',
                cha_subscription_id: $form.find('input[name="cha_subscription_id"]').val(),
                cha_subscription_name: $form.find('input[name="cha_subscription_name"]').val(),
                cha_subscription_email: $form.find('input[name="cha_subscription_email"]').val(),
                cha_doc_id: $form.find('input[name="cha_doc_id"]').val(),
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
                url: cha_subscription_data.ajax_url,
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
            const postId = $btn.attr('data-id');

            if (!token) {
                return;
            }

            // Show confirmation modal
            showConfirmationModal({
                title: 'Unsubscribe',
                message: 'Are you sure you want to unsubscribe from changelog updates?',
                confirmText: 'Yes, Unsubscribe',
                cancelText: 'Cancel',
                onConfirm: function() {
                    unsubscribeUser(token, postId, $btn);
                }
            });
        });

        // Logged-in user subscribe button
        $(document).on('click', '.cha-subscription-btn.logged-user', function(e) {
            e.preventDefault();

            const $btn = $(this);
            const postId = $btn.attr('data-id');

            if ($btn.hasClass('subscribed')) {
                // Unsubscribe
                const token = $btn.attr('data-token');
                showConfirmationModal({
                    title: 'Unsubscribe',
                    message: 'Are you sure you want to unsubscribe from changelog updates?',
                    confirmText: 'Yes, Unsubscribe',
                    cancelText: 'Cancel',
                    onConfirm: function() {
                        unsubscribeUser(token, postId, $btn);
                    }
                });
            } else {
                // Show subscription form
                const formWrap = $('#cha-subscription-' + postId);
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

        if (!token || !tokenId) {
            return;
        }

        // Show loading state
        showNotification('confirming', 'Confirming your subscription...');

        $.ajax({
            type: 'POST',
            url: cha_subscription_data.ajax_url,
            data: {
                action: 'cha_confirm_subscription',
                token: token,
                token_id: tokenId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update button state
                    $('.cha-subscription-btn[data-id="' + tokenId + '"]')
                        .removeClass('subscribe logged-user')
                        .addClass('subscribed')
                        .attr('data-token', token)
                        .text('Unsubscribe');

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

        if (!token || !tokenId) {
            return;
        }

        // Show confirmation and unsubscribe
        showConfirmationModal({
            title: 'Unsubscribe',
            message: 'You are about to unsubscribe from changelog updates. Continue?',
            confirmText: 'Unsubscribe',
            cancelText: 'Keep Subscribed',
            onConfirm: function() {
                unsubscribeUser(token, tokenId, $('.cha-subscription-btn[data-id="' + tokenId + '"]'));
                setTimeout(() => {
                    window.history.pushState({}, document.title, window.location.pathname);
                }, 1500);
            }
        });
    }

    /**
     * Unsubscribe user
     */
    function unsubscribeUser(token, postId, $btn) {
        $btn.prop('disabled', true).text('Unsubscribing...');

        $.ajax({
            type: 'POST',
            url: cha_subscription_data.ajax_url,
            data: {
                action: 'cha_unsubscription_create',
                token: token,
                token_id: postId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update button state
                    $btn.removeClass('subscribed')
                        .addClass('logged-user')
                        .removeAttr('data-token')
                        .text('Subscribe')
                        .prop('disabled', false);

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

