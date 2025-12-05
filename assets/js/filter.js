jQuery(document).ready(function($) {
    $('.changeloger-container').each(function() {
        let $container = $(this);
        let $paginationWrapper = $container.find('.changeloger-pagination-wrapper');
        let $prevButton = $paginationWrapper.find('.changeloger-prev-button');
        let $nextButton = $paginationWrapper.find('.changeloger-next-button');
        let $loadMoreButton = $container.find('.changeloger-pagination-button');
        let currentPage = 1;
        let changelogData = $container.find(".changelog-info-item").toArray();
        let filteredData = changelogData.slice(); // Copy of original data for filtering
        let perPage = parseInt($paginationWrapper.attr("data-per-page"), 10) || changelogData.length ;
        let totalPages = Math.ceil(filteredData.length / perPage);
        let loadedItems = perPage; // Initial value for loaded items (to load the first chunk)

        // Filter system
        let selectedFilters = new Set();
        let searchQuery = '';

        const $filterButton = $container.find('.filter-button-group button');
        const $filterDropdownButton = $container.find('.changeloger-filter-popover-button').first();
        const $filterDropdown = $container.find('.changeloger-filter-popover').first();
        const $changelogerItem = $container.find('.changelog-info-item');
        const $searchControl = $container.find('.changelog-search-control');
        const $helpBlock = $container.find('#changelog-search-help-block');

        // Search functionality
        let searchTimer = null;
        $searchControl.on('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function() {
                searchQuery = $searchControl.val().toLowerCase();

                // Clear previous search highlights
                $container.unmark();

                applyFilters();
                renderChangelog();

                // Update search help block
                updateSearchHelpBlock();
            }, 300);
        });

        function updateSearchHelpBlock() {
            if (searchQuery.length > 0) {
                if (filteredData.length > 0) {
                    $helpBlock.text(filteredData.length + ' result(s) found.').show();
                } else {
                    $helpBlock.text('No results found.').show();
                }
            } else {
                $helpBlock.hide();
            }
        }

        function clearSearch() {
            searchQuery = '';
            $searchControl.val('');
            $container.unmark();
            updateSearchHelpBlock();
        }

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

            // Also clear search when filters are reset
            clearSearch();

            applyFilters();
            renderChangelog();
        });

        // On page load, make sure the "all" filter is active by default
        $(document).ready(function() {
            $filterButton.filter('[data-filter="all"]').addClass('active');
        });

        // Function to apply filters and search to the changelog items
        function applyFilters() {
            // Update filteredData based on current filters and search
            filteredData = changelogData.filter(function(item) {
                const $item = $(item);

                // Check filter criteria
                let matchesFilter = true;
                if (selectedFilters.size > 0) {
                    let itemFilters = $item.data('filter').split(' ');
                    matchesFilter = [...selectedFilters].some(f => itemFilters.includes(f));
                }

                // Check search criteria
                let matchesSearch = true;
                if (searchQuery.length > 0) {
                    const date = $item.find('.date span:first').text().toLowerCase();
                    const version = $item.find('.version-tag').text().toLowerCase();
                    const changes = $item.find('.content').text().toLowerCase();

                    matchesSearch = date.includes(searchQuery) ||
                                  version.includes(searchQuery) ||
                                  changes.includes(searchQuery);
                }

                return matchesFilter && matchesSearch;
            });

            // Update total pages based on filtered data
            totalPages = Math.ceil(filteredData.length / perPage);

            // Reset to page 1 when filters change
            currentPage = 1;

            // Re-render pagination with new total pages
            renderPagination();
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

            // Show only items for the current page from filtered data
            $(filteredData.slice(start, end)).each(function() {
                const $item = $(this);
                $item.show();

                // Apply search highlighting if there's a search query
                if (searchQuery.length > 0) {
                    $item.mark(searchQuery, {
                        "separateWordSearch": false
                    });
                }
            });

            // Update the page numbers
            $paginationWrapper.find(".page-numbers").removeClass("current");
            $paginationWrapper.find(".page-numbers").not($prevButton).not($nextButton).eq(currentPage - 1).addClass("current");

            // Toggle visibility of prev/next buttons
            $prevButton.toggle(currentPage > 1);
            $nextButton.toggle(currentPage < totalPages);

            // Only show the 'Load More' button if there are more items to load from filtered data
            $loadMoreButton.toggle(end < filteredData.length);

            // Update version tree and search help
            checkVersionTree();
            updateSearchHelpBlock();
        }

        function checkVersionTree() {
            // Build visible IDs set for O(1) lookup
            const visibleIds = new Set();
            $container.find('.changelog-info-item:visible').each(function() {
                const id = $(this).attr('id');
                if (id) visibleIds.add(id);
            });
            // Single pass through all list items
            $container.find('.changeloger-version-list-wrapper li').each(function() {
                const $li = $(this);
                const $link = $li.children('a');
                const targetId = $link.attr('href')?.replace('#', '');

                // Check if this item or any descendant should be visible
                let shouldShow = targetId && visibleIds.has(targetId);

                if (!shouldShow) {
                    // Check descendants using find() instead of recursive iteration
                    shouldShow = $li.find('a').toArray().some(anchor => {
                        const childId = $(anchor).attr('href')?.replace('#', '');
                        return childId && visibleIds.has(childId);
                    });
                }

                $li.toggle(shouldShow);
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
            let nextItems = filteredData.slice(0, loadedItems);

            // Show items and apply search highlighting if needed
            $(nextItems).each(function() {
                const $item = $(this);
                $item.show();

                if (searchQuery.length > 0) {
                    $item.mark(searchQuery, {
                        "separateWordSearch": false
                    });
                }
            });

            if (nextItems.length >= filteredData.length) {
                $(this).hide();
            }

            checkVersionTree();
        });

        const $tabButtons = $('.changeloger-tabs-frontend').find('.tab-button');
        // Add click event listeners to tab buttons
        $tabButtons.each(function(index) {
            $(this).on('click', function() {
                setTimeout(function() {
                    checkVersionTree();
                }, 100);
            });
        });

        // Initialize filtered data on page load
        applyFilters();
        renderPagination();
        renderChangelog();

    });
});
