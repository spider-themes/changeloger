jQuery(document).ready(function($) {
    $('.changeloger-container').each(function() {
        let $container = $(this);
        let $paginationWrapper = $container.find('.changeloger-pagination-wrapper');
        let $prevButton = $paginationWrapper.find('.changeloger-prev-button');
        let $nextButton = $paginationWrapper.find('.changeloger-next-button');
        let $loadMoreButton = $container.find('.changeloger-pagination-button');
        let currentPage = 1;
        let changelogData = $container.find(".changelog-info-item").toArray();
        let perPage = parseInt($paginationWrapper.attr("data-per-page"), 10) || changelogData.length ;
        let totalPages = Math.ceil(changelogData.length / perPage);
        let loadedItems = perPage; // Initial value for loaded items (to load the first chunk)

        // Filter system
        let selectedFilters = new Set();

        const $filterButton = $container.find('.filter-button-group button');
        const $filterDropdownButton = $container.find('.changeloger-filter-popover-button').first();
        const $filterDropdown = $container.find('.changeloger-filter-popover').first();
        const $changelogerItem = $container.find('.changelog-info-item');

        // Toggle filter dropdown visibility
        $filterDropdownButton.on('click', function () {
            $(this).toggleClass('show')
            $filterDropdown.toggleClass('show');
        });

        // Close dropdown if clicked outside
        $(document).on('click', function (event) {
            if (
                !$filterDropdownButton.is(event.target) &&
                !$filterDropdown.is(event.target) &&
                $filterDropdown.has(event.target).length === 0 &&
                $filterDropdownButton.has(event.target).length === 0
            ) {
                $filterDropdown.removeClass('show');
                $filterDropdownButton.removeClass('show');
            }
        });

        // Apply filter
        $filterButton.on('click', function () {
            let filterValue = $(this).data('filter');

            // If the "all" filter is clicked
            if (filterValue === 'all') {
                // Clear the selected filters and mark "all" as active
                selectedFilters.clear();
                $filterButton.removeClass('active');
                $(this).addClass('active'); // Add active class to "all" button

                // Remove the cross icon and deactivate the dropdown button
                $filterDropdownButton.removeClass('active');
            } else {
                // Toggle the active state for other filters
                $(this).toggleClass('active');

                // If the filter is already in selectedFilters, remove it, otherwise add it
                if (selectedFilters.has(filterValue)) {
                    selectedFilters.delete(filterValue);
                } else {
                    selectedFilters.add(filterValue);
                }

                // If "all" filter is selected, make sure it stays active
                if (selectedFilters.size === 0) {
                    $filterButton.filter('[data-filter="all"]').addClass('active');
                } else {
                    $filterButton.filter('[data-filter="all"]').removeClass('active');
                    $filterDropdownButton.addClass('active'); // Add active class to dropdown button
                }
            }

            applyFilters();
            renderChangelog();
        });

// Reset filters when cross icon is clicked
        $filterDropdownButton.on('click', 'span.cross-icon', function () {
            selectedFilters.clear();
            $filterButton.removeClass('active');
            $filterDropdownButton.removeClass('active');
            $filterButton.filter('[data-filter="all"]').addClass('active');

            applyFilters();
            renderChangelog();
        });

// On page load, make sure the "all" filter is active by default
        $(document).ready(function() {
            $filterButton.filter('[data-filter="all"]').addClass('active');
        });



        // Function to apply filters to the changelog items
        function applyFilters() {
            $changelogerItem.each(function () {
                let itemFilters = $(this).data('filter').split(' ');
                $(this).toggle(selectedFilters.size === 0 || [...selectedFilters].some(f => itemFilters.includes(f)));
            });
        }

        // Render pagination
        function renderPagination() {
            $paginationWrapper.find(".page-numbers").not($prevButton).not($nextButton).remove();

            for (let i = 1; i <= totalPages; i++) {
                let pageElement = $("<span>")
                    .addClass("page-numbers")
                    .text(i)
                    .toggleClass("current", i === currentPage)
                    .on("click", function() {
                        currentPage = i;
                        renderChangelog();
                    });

                $nextButton.before(pageElement);
            }
        }

        // Render changelog based on pagination and filters
        function renderChangelog() {
            let start = (currentPage - 1) * perPage;
            let end = start + perPage;

            // Hide all items first
            $changelogerItem.hide();

            // Show only items for the current page after applying filters
            $(changelogData.slice(start, end)).each(function() {
                let item = $(this);
                let itemFilters = item.data('filter').split(' ');

                // Only show the item if it matches the selected filters
                if (selectedFilters.size === 0 || [...selectedFilters].some(f => itemFilters.includes(f))) {
                    item.show();
                }
            });

            // Update the page numbers
            $paginationWrapper.find(".page-numbers").removeClass("current");
            $paginationWrapper.find(".page-numbers").eq(currentPage - 1).addClass("current");

            // Toggle visibility of prev/next buttons
            $prevButton.toggle(currentPage > 1);
            $nextButton.toggle(currentPage < totalPages);

            // Only show the 'Load More' button if there are more items to load
            $loadMoreButton.toggle(end < changelogData.length);

            checkVersionTree();
        }


       function checkVersionTree() {
            let visibleIds = $container.find('.changelog-info-item:visible').map(function () {
                return $(this).attr('id');
            }).get();

            $container.find('.changeloger-version-list-wrapper li').each(function () {
                let $li = $(this);
                let $link = $li.children('a');
                let targetId = $link.attr('href')?.replace('#', '');

                let hasVisibleChildren = $li.find('a').filter(function () {
                    let childId = $(this).attr('href')?.replace('#', '');
                    return visibleIds.includes(childId);
                }).length > 0;

                if (visibleIds.includes(targetId) || hasVisibleChildren) {
                    $li.show();
                } else {
                    $li.hide();
                }
            });
        }

        // Handle "Previous" button click
        $prevButton.on("click", function() {
            if (currentPage > 1) {
                currentPage--;
                renderChangelog();
            }
        });

        // Handle "Next" button click
        $nextButton.on("click", function() {
            if (currentPage < totalPages) {
                currentPage++;
                renderChangelog();
            }
        });

        // Handle "Load More" button click
        $loadMoreButton.on("click", function() {
            loadedItems += perPage;
            let nextItems = changelogData.slice(0, loadedItems);
            $(nextItems).show();

            if (nextItems.length >= changelogData.length) {
                $(this).hide();
            }
        });

        renderPagination();
        renderChangelog();
    });
});
