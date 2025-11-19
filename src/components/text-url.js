import { __ } from "@wordpress/i18n";
import { Modal, Button,TextControl } from "@wordpress/components";
import '../changeloger/editor.scss';

const TextUrl = ({ onClose, 
    handleUrlFile, 
    handleUrlChange, 
    textUrl, 
    isOpen  }) => {
     if (!isOpen) return null;

  return (
    <>
      <Modal
        title={__("File URL", "changeloger")}
        onRequestClose={onClose}
        className="changeloger-version-limit-modal"
      >
        <div className="changeloger-modal-content">
          <p className="changeloger-modal-message">
            {__(
                "Enter the URL of the changelog text file you want to load.",
            )}
          </p>
            <TextControl
                __next40pxDefaultSize
                __nextHasNoMarginBottom
                placeholder={ __( 'Enter URL to changelog text file', 'changeloger' ) }
                onChange={ handleUrlChange }
                value={ textUrl }
                type="url"
                className="changeloger-text-url-input"
            />
          <div className="changeloger-modal-actions">
            <Button
              variant="primary"
                onClick={handleUrlFile}
              className="changeloger-upgrade-button"
            >
              {__("Save File URL", "changeloger")}
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="changeloger-close-button"
            >
              {__("Close", "changeloger")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TextUrl;
