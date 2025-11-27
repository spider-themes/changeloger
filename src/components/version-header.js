import React from "react";
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { trash } from '@wordpress/icons';

/**
 * VersionHeader Component
 * Displays version number, date, and version name with edit capabilities
 */
const VersionHeader = ({
    date,
    version,
    versionName,
    versionIndex,
    handleDateChange,
    handleVersionChange,
    handleRemoveVersion,
    setAttributes,
    isProChangeloger
}) => {
    return (
        <>
            <div className="date">
                {isProChangeloger ? (
                    <RichText
                        tagName="span"
                        value={date || ''}
                        onChange={(newContent) => handleDateChange(newContent, versionIndex)}
                        placeholder={__('Date', 'changeloger')}
                    />
                ) : (
                    <span>{date}</span>
                )}

                <RichText
                    tagName="span"
                    className="changeloger-version-name"
                    placeholder={__('Version Name', 'changeloger')}
                    value={versionName[version]}
                    onChange={(newContent) =>
                        setAttributes({
                            versionName: {
                                ...versionName,
                                [version]: newContent,
                            },
                        })
                    }
                />
            </div>
            <div className="version">
                {isProChangeloger ? (
                    <RichText
                        tagName="span"
                        className="version-tag"
                        value={version}
                        onChange={(newContent) => handleVersionChange(newContent, versionIndex)}
                        placeholder={__('Version', 'changeloger')}
                    />
                ) : (
                    <span className="version-tag">{version}</span>
                )}
                <span className="line"></span>
                <button onClick={() => handleRemoveVersion(versionIndex)} className="delete-version">
                    <Icon icon={trash} size={20} color='#ff0000' fill='#ff0000'/>
                </button>
            </div>
        </>
    );
};

export default VersionHeader;
