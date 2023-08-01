import { __ } from '@wordpress/i18n';
import {
	Placeholder,
	Button,
	FormFileUpload,
	TextareaControl,
} from '@wordpress/components';
import { more } from '@wordpress/icons';

function CustomPlaceholder( props ) {
	const { attributes, setAttributes } = props;
	const { changelog, showPlaceholder, showTextArea } = attributes;

	const readFileContent = ( event ) => {
		const fr = new FileReader();

		fr.onload = ( event ) => {
			const fileContent = event.target.result;
			setAttributes( { changelog: fileContent, showPlaceholder: false } );
		};

		fr.readAsText( event.target.files[ 0 ] );
	};

	return (
		<>
			{ showPlaceholder && (
				<Placeholder
					icon={ more }
					className="changelogger-placeholder"
					label={ __( 'Changeloger', 'changeloger' ) }
					instructions={ __(
						'Paste your changelog here, or upload changelog from a text file.',
						'changeloger'
					) }
				>
					<FormFileUpload
						variant="secondary"
						accept="text/plain"
						onChange={ ( event ) => readFileContent( event ) }
					>
						{ __( 'Upload', 'changeloger' ) }
					</FormFileUpload>

					<Button
						variant="primary"
						onClick={ () =>
							setAttributes( {
								showPlaceholder: false,
								showTextArea: true,
							} )
						}
					>
						{ __( 'Paste', 'changeloger' ) }
					</Button>
				</Placeholder>
			) }

			{ ! showPlaceholder && showTextArea && (
				<>
					<TextareaControl
						label={ __(
							'Paste your changelog Here',
							'changeloger'
						) }
						rows={ 20 }
						value={ changelog }
						onChange={ ( newValue ) =>
							setAttributes( { changelog: newValue } )
						}
					/>
					<Button
						className="placeholder-cancel-button"
						variant="secondary"
						onClick={ () =>
							setAttributes( { showPlaceholder: true } )
						}
					>
						{ __( 'Cancel', 'changeloger' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ () =>
							setAttributes( { showTextArea: false } )
						}
					>
						{ __( 'Save', 'changeloger' ) }
					</Button>
				</>
			) }
		</>
	);
}

export default CustomPlaceholder;
