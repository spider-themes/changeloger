import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';
import { plus, trash } from '@wordpress/icons';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { activeTab, tabs } = attributes;
	const [selectedTab, setSelectedTab] = useState(activeTab || 0);

	// Initialize with default tab if none exist
	useEffect(() => {
		if (!tabs || tabs.length === 0) {
			setAttributes({
				tabs: [{ title: 'Tab 1', id: 'tab-1' }]
			});
		}
	}, []);

	// Update active tab when selectedTab changes
	useEffect(() => {
		setAttributes({ activeTab: selectedTab });
	}, [selectedTab]);

	// Add a new tab
	const addTab = () => {
		const newTabIndex = tabs.length + 1;
		const newTab = {
			title: `Tab ${newTabIndex}`,
			id: `tab-${newTabIndex}-${Date.now()}`
		};

		const updatedTabs = [...tabs, newTab];
		setAttributes({ tabs: updatedTabs });

		// Switch to the new tab
		setSelectedTab(updatedTabs.length - 1);
	};

	// Remove a tab
	const removeTab = (index, event) => {
		event.stopPropagation(); // Prevent tab click when removing
		if (tabs.length <= 1) return; // Keep at least one tab

		const updatedTabs = tabs.filter((_, i) => i !== index);
		setAttributes({ tabs: updatedTabs });

		// Adjust selected tab if necessary
		if (selectedTab >= updatedTabs.length) {
			setSelectedTab(updatedTabs.length - 1);
		} else if (selectedTab === index) {
			setSelectedTab(0);
		}
	};

	// Update tab title
	const updateTabTitle = (index, newTitle) => {
		const updatedTabs = [...tabs];
		updatedTabs[index] = { ...updatedTabs[index], title: newTitle };
		setAttributes({ tabs: updatedTabs });
	};

	// Handle tab click
	const handleTabClick = (index) => {
		setSelectedTab(index);
	};

	// Create template array - one changeloger block for each tab
	const template = tabs.map(() => ['cha/changeloger', {}]);

	return (
		<div {...useBlockProps()}>
			<div className="changeloger-tabs-editor">
				{/* Horizontal Tab Navigation */}
				<div className="tabs-header">
					{tabs.map((tab, index) => (
						<div key={tab.id} className="tab-item">
							{/* Tab Button with Remove Button Inside */}
							<button
								className={`tab-button ${selectedTab === index ? 'active' : ''}`}
								onClick={() => handleTabClick(index)}
								type="button"
							>
								<span className="tab-title">{tab.title}</span>
								{tabs.length > 1 && (
									<Button
										icon={trash}
										onClick={(event) => removeTab(index, event)}
										className="remove-tab-button-inline"
										isDestructive
										size="small"
										title="Remove Tab"
									/>
								)}
							</button>

							{/* Tab Title Editor */}
							<div className="tab-controls">
								<TextControl
									value={tab.title}
									onChange={(value) => updateTabTitle(index, value)}
									className="tab-title-input"
									placeholder="Tab Title"
								/>
							</div>
						</div>
					))}

					{/* Add Tab Button */}
					<Button
						icon={plus}
						onClick={addTab}
						className="add-tab-button"
						variant="secondary"
						size="small"
						title="Add New Tab"
					>
						Add Tab
					</Button>
				</div>

				{/* Tab Content Area */}
				<div className="tabs-content">
					<InnerBlocks
						allowedBlocks={['cha/changeloger']}
						template={template}
						templateLock="all"
						renderAppender={false}
					/>
				</div>

				{/* Tab Visibility Controller */}
				<style>
					{`
						.changeloger-tabs-editor .tabs-content .wp-block-cha-changeloger {
							display: none;
						}
						.changeloger-tabs-editor .tabs-content .wp-block-cha-changeloger:nth-child(${selectedTab + 1}) {
							display: block;
						}
					`}
				</style>
			</div>
		</div>
	);
}
