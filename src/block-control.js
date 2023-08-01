import { __ } from "@wordpress/i18n";
import { BlockControls } from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";

function BlockControl(props) {
	const { attributes, setAttributes } = props;
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton onClick={() => setAttributes({ showTextArea: true })}>
					{__("Edit", "")}
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default BlockControl;
