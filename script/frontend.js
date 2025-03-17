class ChangelogerBlock {
    constructor(container) {
        this.ezdSidebarWrapper = document.querySelector('.doc_rightsidebar .pageSideSection');
        this.container = container;
        this.currentPage = 1;
        this.changelogerWrapper =
            this.container.querySelector('.changelog-wrapper');
        this.changelogerInnerWrapper = this.container.querySelector(
            '.changeloger-info-inner-wrapper'
        );
        this.changelogerWrapperItems = this.changelogerInnerWrapper.querySelector(
            '.changeloger-items'
        );

        this.changelogerVersionWrapper = this.container.querySelector(
            '.changeloger-version-list-wrapper'
        );

        if (this.ezdSidebarWrapper) {
            this.ezdSidebarWrapper.classList.add('hasVersionTree')
            const element = this.container.querySelector(
                '.changeloger-version-list-container'
            ); // Element to move
            const targetDiv = this.ezdSidebarWrapper; // New parent div

            if (element && targetDiv) {
                targetDiv.appendChild(element); // Move the element
            }
        }
        this.changelogerItem = this.container.querySelectorAll(
            '.changelog-info-item'
        );

        this.changelogerPaginationWrapper = this.container.querySelector(
            '.changeloger-pagination-wrapper'
        );
        this.changelogerId = this.container.getAttribute('data-id');
        this.totalPage = this.container.getAttribute('data-total-page');
        this.perPage = this.container.getAttribute('data-per-page');
        this.enablePagination = this.container.getAttribute(
            'data-enable-pagination'
        );
        this.paginationType = this.container.getAttribute(
            'data-pagination-type'
        );
        this.loadMoreButton = this.container.querySelector(
            '.changeloger-pagination-button'
        );
        this.numberedPaginationButton =
            this.container.querySelectorAll('.page-numbers');

        this.loadMore();
        this.numberedPaginated();

        this.activeStateOnStickyVersion();
        this.fixParentOverflow();

        window.addEventListener('scroll', () =>
            this.activeStateOnStickyVersion()
        );
    }

    fixParentOverflow() {
        let parentSelector = document.querySelector(
            '.changeloger-version-list-container'
        );

        if (parentSelector) {
            let parent = parentSelector.parentElement;

            while (parent) {
                const hasOverflow = getComputedStyle(parent).overflow;

                if (hasOverflow !== 'visible') {
                    parent.style.overflow = 'visible';
                }

                parent = parent.parentElement;
            }
        }
    }

    loadMore() {
        if (
            'true' === this.enablePagination &&
            'load-more' === this.paginationType
        ) {
            this.loadMoreButton.addEventListener('click', () => {
                this.changelogerloadMore();
            });

            if (Number(this.currentPage) >= Number(this.totalPage)) {
                this.loadMoreButton.style.display = 'none';
            }
        }
    }

    numberedPaginated() {
        if (
            'true' === this.enablePagination &&
            'numbered' === this.paginationType
        ) {
            this.numberedPaginationButton.forEach((button, index) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();

                    const currentHref = button.href;
                    const newUrl = new URL(currentHref);

                    if (location.href === currentHref.toString()) {
                        newUrl.searchParams.delete('cr-page');
                    }

                    const newPage = newUrl.searchParams.has('cr-page')
                        ? Number(newUrl.searchParams.get('cr-page'))
                        : 1;

                    this.changelogerNumberedPaginated(
                        isNaN(newPage) || 0 == newPage ? 1 : newPage
                    );
                });
            });
        }
    }

    async changelogerloadMore() {
        const currentPage = new URL(location.href);
        currentPage.searchParams.set('cr-page', this.currentPage + 1);
        const requestUrl = currentPage.toString();

        fetch(requestUrl)
            .then((response) => response.text())
            .then((response) => {
                const parser = new DOMParser();

                const responseDocument = parser.parseFromString(
                    response,
                    'text/html'
                );

                const newChangelogerWrapper = responseDocument.querySelector(
                    `[data-id="${this.changelogerId}"] `
                );

                const newChangelogerItem =
                    newChangelogerWrapper.querySelectorAll(
                        '.changelog-info-item'
                    );

                const newChangelogerVersionItem =
                    newChangelogerWrapper.querySelector(
                        '.changeloger-version-list-wrapper'
                    );

                this.changelogerWrapperItems.append(...newChangelogerItem);
                this.changelogerVersionWrapper.innerHTML =
                    newChangelogerVersionItem.innerHTML;

                this.activeStateOnStickyVersion();
                this.currentPage++;

                if (this.currentPage >= Number(this.totalPage)) {
                    this.loadMoreButton.style.display = 'none';
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async changelogerNumberedPaginated(page) {
        const currentPage = new URL(location.href);
        currentPage.searchParams.set('cr-page', page);

        const requestUrl = currentPage.href;
        fetch(requestUrl)
            .then((response) => response.text())
            .then((response) => {
                const parser = new DOMParser();
                const responseDocument = parser.parseFromString(
                    response,
                    'text/html'
                );

                const newChangelogerContainer = responseDocument.querySelector(
                    `[data-id="${this.changelogerId}"] `
                );

                const newChangelogerItem =
                    newChangelogerContainer.querySelector(
                        '.changelog-wrapper'
                    );

                const newChangelogerpaginationWrapper =
                    newChangelogerContainer.querySelector(
                        '.changeloger-pagination-wrapper'
                    );

                this.changelogerWrapper.innerHTML =
                    newChangelogerItem.innerHTML;
                this.changelogerPaginationWrapper.innerHTML =
                    newChangelogerpaginationWrapper.innerHTML;
                this.currentPage = page;

                this.numberedPaginationButton =
                    this.container.querySelectorAll('.page-numbers');

                this.numberedPaginated();
                this.activeStateOnStickyVersion();

                history.replaceState(null, null, currentPage.toString());
            })
            .catch((error) => {
                console.error(error);
            });
    }

    activeStateOnStickyVersion() {
        let versionTreeHeight = this.container.querySelector(
            '.changeloger-version-list-wrapper'
        )?.offsetHeight;
        const changelogerItem = this.container.querySelectorAll(
            '.changelog-info-item'
        );
        let versionTreeWrapper = this.container.querySelector(
            '.changeloger-version-list-wrapper'
        );
        if (this.ezdSidebarWrapper) {
            versionTreeWrapper = this.ezdSidebarWrapper.querySelector(
                '.changeloger-version-list-wrapper'
            );
            versionTreeHeight = -160;
        }
        const setActiveStateRecursive = (sections, curPos) => {
            sections.forEach((section) => {
                const top = section.offsetTop - versionTreeHeight;
                let bottom = top + section.offsetHeight;

                if (this.ezdSidebarWrapper) {
                    bottom = top + section.offsetHeight + 160;
                }
                if (curPos >= top && curPos <= bottom) {
                    const currentAnchor = versionTreeWrapper?.querySelector(
                        ':scope > li > a[href="#' +
                        section.getAttribute('id') +
                        '"]'
                    );
                    const mainAnchors =
                        versionTreeWrapper?.querySelectorAll(
                            ':scope > li > a'
                        );
                    mainAnchors?.forEach((a) => {
                        a?.classList?.remove('changeloger-active');
                        const nextSibling = a?.nextElementSibling;
                        const currentNestedAnchor = nextSibling?.querySelector(
                            'li a[href="#' + section.getAttribute('id') + '"]'
                        );
                        if (nextSibling && currentNestedAnchor) {
                            const parentElement = currentNestedAnchor.closest(
                                '.changeloger-version-list-main-item'
                            );
                            parentElement?.firstElementChild?.classList.remove(
                                'changeloger-active'
                            );
                        }

                        nextSibling
                            ?.querySelectorAll('li a')
                            .forEach((nestedAnchor) => {
                                nestedAnchor.classList.remove(
                                    'changeloger-active-nested-version'
                                );
                            });
                    });

                    sections.forEach((changelogerItem) => {
                        changelogerItem.classList.remove(
                            'changeloger-active'
                        );
                    });

                    section.classList.add('changeloger-active');
                    if (currentAnchor) {
                        currentAnchor?.classList.add('changeloger-active');
                    } else {
                        mainAnchors?.forEach((a) => {
                            const nextSibling = a?.nextElementSibling;
                            const currentNestedAnchor =
                                nextSibling?.querySelector(
                                    'li a[href="#' +
                                    section.getAttribute('id') +
                                    '"]'
                                );
                            if (nextSibling && currentNestedAnchor) {
                                const parentElement =
                                    currentNestedAnchor.closest(
                                        '.changeloger-version-list-main-item'
                                    );
                                parentElement?.firstElementChild?.classList.add(
                                    'changeloger-active'
                                );
                                currentNestedAnchor?.classList.add(
                                    'changeloger-active-nested-version'
                                );
                            }
                        });
                    }
                } else {
                    const currentAnchor = versionTreeWrapper?.querySelector(
                        ':scope > li > a[href="#' +
                        section.getAttribute('id') +
                        '"]'
                    );
                    currentAnchor?.classList.remove('changeloger-active');
                }
            });
        };

        const curPos = window.scrollY;
        setActiveStateRecursive(changelogerItem, curPos);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const changelogerContainer = document.querySelectorAll(
        '.changeloger-container'
    );

    changelogerContainer.forEach(
        (container) => new ChangelogerBlock(container)
    );
});
