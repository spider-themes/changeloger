import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { activeTab } = attributes;
	const [selectedTab, setSelectedTab] = useState(activeTab || 0);
	const [tabItems, setTabItems] = useState([]);

	// Ensure at least one tab exists when the component mounts
	useEffect(() => {
		const blocks = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0]?.innerBlocks || [];

		// Insert a default tab if no tabs exist
		if (blocks.length === 0) {
			const defaultTab = createBlock('cha/changeloger', { title: 'Tab 1' });
			wp.data.dispatch('core/block-editor').insertBlock(defaultTab, 0, clientId);
		} else {
			setTabItems(blocks);
		}
	}, [clientId]); // This effect only runs once on mount

	// Add a new tab when the button is clicked
	const addTab = () => {
		const newTab = createBlock('cha/changeloger', {
			title: `Tab ${tabItems.length + 1}`
		});
		wp.data.dispatch('core/block-editor').insertBlock(newTab, tabItems.length, clientId);
	};

	// Update tabItems after a new tab is added
	useEffect(() => {
		const blocks = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0]?.innerBlocks || [];
		setTabItems(blocks);
	}, [clientId, tabItems.length]); // This will update tabItems every time the number of inner blocks changes

	// Track the selected tab and update activeTab
	const handleTabClick = (index) => {
		setSelectedTab(index);
		setAttributes({ activeTab: index });  // Track active tab in attributes
	};

	return (
		<div {...useBlockProps()}>
			<div className="tabs-header">
				{/* Render tab buttons */}
				{tabItems.map((tab, index) => (
					<Button
						key={index}
						className={selectedTab === index ? 'active' : ''}
						onClick={() => handleTabClick(index)}
					>
						{tab.attributes?.title || `Tab ${index + 1}`}
					</Button>
				))}
				{/* Button to add new tab */}
				<Button className="add-tab" onClick={addTab}>+ Add Tab</Button>
			</div>
			<div className="tabs-content">
				{/* Render tab content */}
				{tabItems.map((tab, index) => (
					<div
						key={index}
						className={`tab-panel ${selectedTab === index ? 'active' : 'hidden'}`}
					>
						<InnerBlocks
							allowedBlocks={['cha/changeloger']}
							template={[['cha/changeloger', {}]]}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
