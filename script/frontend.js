(function ($) {
    class ChangelogerBlock {
        constructor(container) {
            this.$container = $(container);
            this.$ezdSidebarWrapper = $('.doc_rightsidebar .pageSideSection');
            this.currentPage = 1;

            // Cache frequently accessed elements
            this.$versionWrapper = this.$container.find('.changeloger-version-list-wrapper');
            this.$sections = this.$container.find('.changelog-info-item');
            this.$paginationWrapper = this.$container.find('.changeloger-pagination-inner-wrapper');

            // Store data attributes once
            this.perPage = this.$container.data('per-page');
            this.enablePagination = this.$container.data('enable-pagination');
            this.paginationType = this.$container.data('pagination-type');

            // Throttle/debounce timers
            this.scrollTimer = null;
            this.searchTimer = null;

            if (this.$ezdSidebarWrapper.length) {
                this.$ezdSidebarWrapper.addClass('hasVersionTree');
                let $element = this.$container.find('.changeloger-version-list-container');
                if ($element.length) {
                    this.$ezdSidebarWrapper.append($element);
                }
            }

            this.fixParentOverflow();
            this.setupVersionClickHandlers();
            this.activeStateOnStickyVersion();

            // Throttle scroll events (execute at most once per 100ms)
            $(window).on('scroll', () => {
                if (this.scrollTimer) return;
                this.scrollTimer = setTimeout(() => {
                    this.activeStateOnStickyVersion();
                    this.scrollTimer = null;
                }, 100);
            });

            // Debounce search input (wait 300ms after user stops typing)
            $('.changelog-search-control').on('input', () => {
                clearTimeout(this.searchTimer);
                this.searchTimer = setTimeout(() => {
                    this.checkVersionTree();
                }, 300);
            });
        }

        fixParentOverflow() {
            let $parentSelector = $('.changeloger-version-list-container');
            if (!$parentSelector.length) return;

            // Use parentsUntil to avoid manual loop
            $parentSelector.parentsUntil('html').each(function() {
                if ($(this).css('overflow') !== 'visible') {
                    $(this).css('overflow', 'visible');
                }
            });
        }

        setupVersionClickHandlers() {
            // Set up click handlers once, use event delegation
            this.$versionWrapper.on('click', 'li > a', function (e) {
                const $parentLi = $(this).closest('li');
                const $childUl = $parentLi.children('ul');

                // Toggle current dropdown
                $childUl.toggle(300);

                // Hide sibling dropdowns
                $parentLi.siblings().children('ul').hide(300);
            });
        }

        activeStateOnStickyVersion() {
            const curPos = $(window).scrollTop();
            const offset = -50;

            // Find active section using more efficient filter
            let $activeSection = null;
            let minDistance = Infinity;

            this.$sections.each(function() {
                const $section = $(this);
                const top = $section.offset().top + offset;
                const bottom = top + $section.outerHeight();

                if (curPos >= top && curPos <= bottom) {
                    const distance = Math.abs(curPos - top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        $activeSection = $section;
                    }
                }
            });

            if (!$activeSection || !$activeSection.length) return;

            const targetId = $activeSection.attr('id');
            const $currentAnchor = this.$versionWrapper.find(`a[href="#${targetId}"]`);

            if (!$currentAnchor.length) return;

            // Batch DOM updates
            this.$versionWrapper.find('a').removeClass('changeloger-active');
            this.$sections.removeClass('changeloger-active');

            $activeSection.addClass('changeloger-active');
            $currentAnchor.addClass('changeloger-active');

            // Get all parent LIs that should stay open
            const $parentLis = $currentAnchor.parents('li');

            // Activate parent anchors
            $parentLis.children('a').addClass('changeloger-active');

            // Smart dropdown toggling: only hide dropdowns that aren't in the active path
            this.$versionWrapper.find('li > ul').each(function() {
                const $dropdown = $(this);
                const $parentLi = $dropdown.parent();

                // Check if this dropdown's parent LI or any of its children have active class
                const hasActiveChild = $dropdown.find('a.changeloger-active').length > 0;
                const isInActivePath = $parentLis.filter($parentLi).length > 0;

                if (isInActivePath || hasActiveChild) {
                    // Keep it visible
                    if (!$dropdown.is(':visible')) {
                        $dropdown.show(300);
                    }
                } else {
                    // Hide only if it's currently visible (avoid unnecessary animations)
                    if ($dropdown.is(':visible')) {
                        $dropdown.hide();
                    }
                }
            });
        }

        checkVersionTree() {
            // Build visible IDs set for O(1) lookup
            const visibleIds = new Set();
            this.$container.find('.changelog-info-item:visible').each(function() {
                const id = $(this).attr('id');
                if (id) visibleIds.add(id);
            });

            // Single pass through all list items
            this.$versionWrapper.find('li').each(function() {
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
    }

    $(document).ready(() => {
        $('.changeloger-container').each(function () {
            new ChangelogerBlock(this);
        });
    });

})(jQuery);