import { __ } from "@wordpress/i18n";
import { Modal, Button, TextControl } from "@wordpress/components";
import "../changeloger/editor.scss";

const TextUrl = ({
  onClose,
  handleUrlFile,
  handleUrlChange,
  textUrl,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={__("File URL", "changeloger")}
        onRequestClose={onClose}
        className="changeloger-version-limit-modal changeloger-text-url"
      >
        <div className="changeloger-modal-content">
          <p className="changeloger-modal-message">
            {__("Changelog File URL.")}
          </p>
          <TextControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            placeholder={__("Enter URL to changelog text file", "changeloger")}
            onChange={handleUrlChange}
            value={textUrl}
            type="url"
            required
            className="changeloger-text-url-input"
          />
          <p className="changeloger-text-url-note">
            {__("Note: Only text files are supported. (.txt)", "changeloger")}
          </p>
          <div className="changeloger-modal-actions">
            <Button
              variant="primary"
              onClick={handleUrlFile}
              className="changeloger-upgrade-button"
            >
              {__("Fetch URL Data", "changeloger")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TextUrl;
