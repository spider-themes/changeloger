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
						{ __( 'Upload Changelog (.txt file)', 'changeloger' ) }
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
						{ __( 'Plain Text', 'changeloger' ) }
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
						{ __( 'View Visual Changelogs', 'changeloger' ) }
					</Button>
					<Button
						className="placeholder-sample-button"
						variant="tertiary"
						onClick={ () =>
							setAttributes( { changelog:`${changelog}\n` + '= 1.0.0  (01 March 2025) =\n' +
									'New: Added a bulk edit feature for faster modifications.\n' +
									'Tweaked: Adjusted UI spacing for better readability.\n' +
									'Updated: Refreshed third-party dependencies for stability.\n' +
									'Fixed: Resolved a bug causing layout shifts on mobile.\n' +
									'improvement: Enhanced performance for faster load times.\n'
							} )
						}
					>
						{ __( 'Add Sample Data', 'changeloger' ) }
					</Button>
				</>
			) }
		</>
	);
}

export default CustomPlaceholder;
