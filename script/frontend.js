(function ($) {
    class ChangelogerBlock {
        constructor(container) {
            this.$container = $(container);
            this.$ezdSidebarWrapper = $('.doc_rightsidebar .pageSideSection');
            this.currentPage = 1;

            if (this.$ezdSidebarWrapper.length) {
                this.$ezdSidebarWrapper.addClass('hasVersionTree');
                let $element = this.$container.find('.changeloger-version-list-container');
                if ($element.length) {
                    this.$ezdSidebarWrapper.append($element);
                }
            }

            this.perPage = this.$container.data('per-page');
            this.enablePagination = this.$container.data('enable-pagination');
            this.paginationType = this.$container.data('pagination-type');

            this.$paginationWrapper = this.$container.find('.changeloger-pagination-inner-wrapper');



            this.activeStateOnStickyVersion();
            this.fixParentOverflow();

            $(window).on('scroll', () => this.activeStateOnStickyVersion());
        }

        fixParentOverflow() {
            let $parentSelector = $('.changeloger-version-list-container');
            if ($parentSelector.length) {
                let $parent = $parentSelector.parent();
                while ($parent.length && !$parent.is('html')) {
                    if ($parent.css('overflow') !== 'visible') {
                        $parent.css('overflow', 'visible');
                    }
                    $parent = $parent.parent();
                }

            }


        }

        activeStateOnStickyVersion() {
            let curPos = $(window).scrollTop();
            let $versionWrapper = this.$container.find('.changeloger-version-list-wrapper');
            let offset = $versionWrapper.length ? -120 : 0;
            let $changelogerItems = this.$container.find('.changelog-info-item');

            $changelogerItems.each(function () {
                let $section = $(this);
                let top = $section.offset().top + offset;
                let bottom = top + $section.outerHeight() + 120;
                let $currentAnchor = $versionWrapper.find(`a[href="#${$section.attr('id')}"]`);

                if (curPos >= top && curPos <= bottom) {
                    $versionWrapper.find('a').removeClass('changeloger-active');
                    $section.addClass('changeloger-active');
                    $currentAnchor.addClass('changeloger-active');

                    // Add active class to all parent anchors
                    $currentAnchor.parents('li').children('a').addClass('changeloger-active');
                }
            });
        }


    }

    $(document).ready(() => {
        $('.changeloger-container').each(function () {
            new ChangelogerBlock(this);
        });
    });



})(jQuery);

