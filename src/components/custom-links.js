import React from 'react';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Modal,
	Button,
	TextControl,
	FormFileUpload,
} from '@wordpress/components';

function CustomLink( props ) {
	const [ isOpen, setOpen ] = useState( false );
	const { action, currentLinks, customLinks, setAttributes, version } = props;

	const openModal = ( event ) => {
		event.preventDefault();
		setOpen( true );
	};

	const handleUploadIcon = ( event ) => {
		const fr = new FileReader();

		fr.onload = ( event ) => {
			const fileContent = event.target.result;

			var encodedData = window.btoa( fileContent );

			let base64ext = `data:image/svg+xml;base64,` + encodedData;

			setAttributes( {
				customLinks: {
					...customLinks,
					[ version ]: currentLinks.map(
						( currentLink, currentIndex ) => {
							if ( currentIndex !== props.index ) {
								return currentLink;
							}

							return {
								...currentLink,
								icon: base64ext,
							};
						}
					),
				},
			} );
			setOpen( false );
		};

		fr.readAsText( event.target.files[ 0 ] );
	};

	return (
		! isEmpty( action ) && (
			<div className="changeloger-link-item">
				<a
					className="changeloger-custom-link"
					href="#"
					onClick={ ( event ) => openModal( event ) }
				>
					{ ! isEmpty( action.icon ) && (
						<span
							className="changeloger-custom-link-icon"
							style={ {
								WebkitMaskImage: `url(${ action.icon })`,
							} }
						></span>
					) }
					{ action.name }
				</a>

				{ isOpen && (
					<Modal
						title="Customise Link"
						onRequestClose={ () => setOpen( false ) }
						shouldCloseOnClickOutside={ false }
					>
						<TextControl
							label={ __( 'Text', 'changeloger' ) }
							value={ action?.name }
							onChange={ ( newValue ) =>
								setAttributes( {
									customLinks: {
										...customLinks,
										[ version ]: currentLinks.map(
											( currentLink, currentIndex ) => {
												if (
													currentIndex !== props.index
												) {
													return currentLink;
												}

												return {
													...currentLink,
													name: newValue,
												};
											}
										),
									},
								} )
							}
						/>

						<TextControl
							label={ __( 'Link', 'changeloger' ) }
							value={ action?.link }
							onChange={ ( newValue ) =>
								setAttributes( {
									customLinks: {
										...customLinks,
										[ version ]: currentLinks.map(
											( currentLink, currentIndex ) => {
												if (
													currentIndex !== props.index
												) {
													return currentLink;
												}

												return {
													...currentLink,
													link: newValue,
												};
											}
										),
									},
								} )
							}
						/>

						<FormFileUpload
							variant="secondary"
							accept="application/svg"
							onChange={ ( event ) => handleUploadIcon( event ) }
						>
							{ __( 'Upload SVG', 'changeloger' ) }
						</FormFileUpload>

						<div
							style={ {
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: '20px',
							} }
						>
							<Button
								style={ { marginRight: '10px' } }
								isDestructive
								onClick={ () =>
									setAttributes( {
										customLinks: {
											...customLinks,
											[ version ]: currentLinks.map(
												(
													currentLink,
													currentIndex
												) => {
													if (
														currentIndex !==
														props.index
													) {
														return currentLink;
													}

													console.log(
														'C',
														currentLink
													);
													currentLinks.pop(
														currentLink
													);
													setOpen( false );
												}
											),
										},
									} )
								}
							>
								{ __( 'Delete', 'changeloger' ) }
							</Button>

							<Button
								variant="primary"
								onClick={ () => setOpen( false ) }
							>
								{ __( 'Save', 'changeloger' ) }
							</Button>
						</div>
					</Modal>
				) }
			</div>
		)
	);
}

export default CustomLink;
