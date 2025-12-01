import { __ } from '@wordpress/i18n';
import { Modal, Button } from '@wordpress/components';
import '../changeloger/editor.scss';

function ProFeaturesModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const proLink = window.location.href.substring(0, window.location.href.lastIndexOf('/wp-admin')) + '/wp-admin/admin.php?page=changeloger-pricing';

    return (
        <Modal
            title={__('Pro Features', 'changeloger')}
            onRequestClose={onClose}
            className="changeloger-pro-features-modal"
        >
            <div className="changeloger-modal-content">
                <p className="changeloger-modal-message">
                    {__(
                        'Unlock more powerful features with Changeloger Pro!',
                        'changeloger'
                    )}
                </p>
                <p className="changeloger-modal-submessage">
                    {__(
                        'Upgrade to Changeloger Pro to unlock more powerful features!',
                        'changeloger'
                    )}
                </p>
                <div className="changeloger-modal-actions">
                    <Button
                        variant="primary"
                        href={proLink}
                        target="_blank"
                        className="changeloger-upgrade-button"
                    >
                        {__('Upgrade to Pro', 'changeloger')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="changeloger-close-button"
                    >
                        {__('Close', 'changeloger')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ProFeaturesModal;

