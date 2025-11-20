import { __ } from '@wordpress/i18n';
import {
	Placeholder,
	Button,
	FormFileUpload,
	TextareaControl
} from '@wordpress/components';
import { more } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import ChangelogParser from './parser';
import { isProChangeloger } from '../utils/constants';
import VersionLimitModal from '../components/version-limit-modal';
import TextUrl from '../components/text-url';

function CustomPlaceholder( props ) {
	const { attributes, setAttributes } = props;
	const { changelog, showPlaceholder, showTextArea,textUrl } = attributes;
    const [ isOpenTextUrl, setIsOpenTextUrl ] = useState( false );
    const [ textUrlState, setTextUrlState ] = useState( '' );

    // Function to open the modal
    const openModal = () => setIsOpenTextUrl( true );

	// State for version limit modal
	const [showVersionLimitModal, setShowVersionLimitModal] = useState(false);
	const MAX_FREE_VERSIONS = 20;

	// Function to limit changelog to max versions for free users
	const limitChangelogVersions = (changelogText) => {

		if (!isProChangeloger && changelogText) {
			const parser = new ChangelogParser(changelogText);
			const parsedChangelog = parser.parse();
			if (parsedChangelog.length > MAX_FREE_VERSIONS) {
				setShowVersionLimitModal(true);

				// Limit to first MAX_FREE_VERSIONS
				const limitedParsed = parsedChangelog.slice(0, MAX_FREE_VERSIONS);

				// Reconstruct changelog text from limited parsed data
				let limitedChangelogText = '';
				limitedParsed.forEach((item) => {
					limitedChangelogText += `= ${item.version} (${item.date}) =\n`;
					item.changes.forEach((change) => {
						limitedChangelogText += `${change.category}: ${change.change}\n`;
					});
					limitedChangelogText += '\n';
				});

				return limitedChangelogText.trim();
			}
		}
		return changelogText; // Return original if under limit or pro user
	};

	const readFileContent = ( event ) => {
		const fr = new FileReader();

		fr.onload = ( event ) => {
			const fileContent = event.target.result;
			const limitedContent = limitChangelogVersions(fileContent);
			setAttributes( { changelog: limitedContent, showPlaceholder: false } );
		};

		fr.readAsText( event.target.files[ 0 ] );
	};

    // Handle URL change
    const handleUrlChange = ( url ) => {
        setTextUrlState( url );
    };
    // Handle URL file fetch
    const handleUrlFile = () => {
        if ( ! textUrlState ) {
            return;
        }
        setAttributes({ textUrl: textUrlState }); 
        fetch(textUrlState)
            .then(res => res.text())
            .then(data => { 
                const limitedData = limitChangelogVersions(data);
                setAttributes({ changelog: limitedData, showPlaceholder: false });
                setIsOpenTextUrl(false); 
            })
            .catch(err => {
                console.log("Fetch error:", err);
            });
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
                    <Button variant="secondary" onClick={ openModal }>
                        { __( 'Upload Changelog URL', 'changeloger' ) }
                    </Button>
                    <TextUrl
                        isOpen={ isOpenTextUrl }
                        onClose={ () => setIsOpenTextUrl( false ) }
                        handleUrlFile={ handleUrlFile }
                        handleUrlChange={ handleUrlChange }
                        textUrl={ textUrlState }
                    />

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
					<Button
						className="placeholder-sample-button"
						variant="tertiary"
						onClick={ () => {
							const sampleData = `${changelog}\n` + '= 2.0.0 (01 April 2025) =\n' +
								'New: Added a bulk edit feature for faster modifications.\n' +
								'Tweaked: Adjusted UI spacing for better readability.\n' +
								'Updated: Refreshed third-party dependencies for stability.\n' +
								'Fixed: Resolved a bug causing layout shifts on mobile.\n' +
								'improvement: Enhanced performance for faster load times.\n'+
								'\n' +
								'= 1.0.0 (01 March 2025) =\n' +
								'New: Added a bulk edit feature for faster modifications.\n' +
								'Tweaked: Adjusted UI spacing for better readability.\n' +
								'Updated: Refreshed third-party dependencies for stability.\n' +
								'Fixed: Resolved a bug causing layout shifts on mobile.\n' +
								'improvement: Enhanced performance for faster load times.\n';

							const limitedData = limitChangelogVersions(sampleData);
							setAttributes( {
								showPlaceholder: false,
								showTextArea: true,
								changelog: limitedData
							} );
						} }
					>
						{ __( 'Load Sample Data', 'changeloger' ) }
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
						onChange={ ( newValue ) => {
							const limitedValue = limitChangelogVersions(newValue);
							setAttributes( { changelog: limitedValue } );
						} }
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

				</>
			) }

			{/* Version Limit Modal */}
			<VersionLimitModal
				isOpen={showVersionLimitModal}
				onClose={() =>  (false)}
			/>
		</>
	);
}

export default CustomPlaceholder;
