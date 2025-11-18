/**
 * Frontend JavaScript for Tabbed Changeloger Block (jQuery Version)
 */
(function ($) {
    $(document).ready(function () {
        // Initialize all tabbed changeloger instances
        $('.changeloger-tabs-frontend').each(function () {
            initTabbedChangeloger($(this));
        });
    });

    function initTabbedChangeloger($container) {
        const $tabButtons = $container.find('.tab-button');
        const $tabContent = $container.find('.tabs-content');
        const $changelogerBlocks = $tabContent.find('.wp-block-cha-changeloger');

        // Create tab panels for each changeloger block
        if ($changelogerBlocks.length > 0) {
            // Wrap each changeloger block in a tab panel
            $changelogerBlocks.each(function (index) {
                const $block = $(this);
                const $panel = $('<div></div>')
                    .addClass(`tab-panel ${index === 0 ? 'active' : 'hidden'}`)
                    .attr('data-tab-index', index);

                // Move the changeloger block into the panel
                $block.before($panel);
                $panel.append($block);
            });
        }

        // Add click event listeners to tab buttons
        $tabButtons.each(function (index) {
            $(this).on('click', function () {
                switchTab($container, index);
            });
        });

        // Initialize with the active tab from data attribute
        const activeTabIndex = parseInt($container.data('active-tab')) || 0;
        switchTab($container, activeTabIndex);
    }

    function switchTab($container, targetIndex) {
        const $tabButtons = $container.find('.tab-button');
        const $tabPanels = $container.find('.tab-panel');

        // Remove active class from all tabs and panels
        $tabButtons.removeClass('active');
        $tabPanels.removeClass('active').addClass('hidden');

        // Add active class to target tab and panel
        $tabButtons.eq(targetIndex).addClass('active');
        $tabPanels.eq(targetIndex).addClass('active').removeClass('hidden');

        // Update container data attribute
        $container.data('active-tab', targetIndex);
    }

})(jQuery);