/**
 * Frontend JavaScript for Tabbed Changeloger Block
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tabbed changeloger instances
    const tabbedContainers = document.querySelectorAll('.changeloger-tabs-frontend');

    tabbedContainers.forEach(function(container) {
        initTabbedChangeloger(container);
    });
});

function initTabbedChangeloger(container) {
    const tabButtons = container.querySelectorAll('.tab-button');
    const tabPanels = container.querySelectorAll('.tab-panel');

    // Add click event listeners to tab buttons
    tabButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            switchTab(container, index);
        });
    });

    // Initialize with the active tab from data attribute
    const activeTabIndex = parseInt(container.dataset.activeTab) || 0;
    switchTab(container, activeTabIndex);
}

function switchTab(container, targetIndex) {
    const tabButtons = container.querySelectorAll('.tab-button');
    const tabPanels = container.querySelectorAll('.tab-panel');

    // Remove active class from all tabs and panels
    tabButtons.forEach(function(button) {
        button.classList.remove('active');
    });

    tabPanels.forEach(function(panel) {
        panel.classList.remove('active');
        panel.classList.add('hidden');
    });

    // Add active class to target tab and panel
    if (tabButtons[targetIndex]) {
        tabButtons[targetIndex].classList.add('active');
    }

    if (tabPanels[targetIndex]) {
        tabPanels[targetIndex].classList.add('active');
        tabPanels[targetIndex].classList.remove('hidden');
    }

    // Update container data attribute
    container.dataset.activeTab = targetIndex;
}
