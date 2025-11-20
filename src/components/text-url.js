import { __ } from "@wordpress/i18n";
import { Modal, Button, TextControl } from "@wordpress/components";
import "../changeloger/editor.scss";
import LoaderWave from "./loader-wave";

const TextUrl = ({
  onClose,
  handleUrlFile,
  handleUrlChange,
  textUrl,
  isOpen,
  loader,
  errorMessage
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={__("File URL", "changeloger")}
        onRequestClose={onClose}
        className={`changeloger-version-limit-modal changeloger-text-url ${loader && 'changeloger-modal-loader'}`}
      >
        <div className="changeloger-modal-content">
          <p className="changeloger-modal-message">
            {__("Changelog File URL.", "changeloger")}
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
            {errorMessage && (
            <div className="changeloger-text-url-error">
              {errorMessage}
            </div>
          )}
          <div className="changeloger-modal-actions">
            <Button
              variant="primary"
              onClick={handleUrlFile}
              className="changeloger-upgrade-button"
            >
             { loader && <LoaderWave />}
            <span>
                  {__("Fetch URL Data", "changeloger")}
            </span>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TextUrl;
