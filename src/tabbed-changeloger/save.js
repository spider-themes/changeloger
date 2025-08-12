/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { activeTab, tabs } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="changeloger-tabs-frontend" data-active-tab={activeTab || 0}>
				{/* Tab Navigation */}
				<div className="tabs-header">
					{tabs && tabs.map((tab, index) => (
						<button
							key={tab.id}
							className={`tab-button ${index === (activeTab || 0) ? 'active' : ''}`}
							data-tab-index={index}
							type="button"
						>
							{tab.title}
						</button>
					))}
				</div>

				{/* Tab Content */}
				<div className="tabs-content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
