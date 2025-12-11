import React from "react";
import { get } from 'lodash';
import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import VersionHeader from './version-header';
import GroupedChanges from './grouped-changes';
import IndividualChanges from './individual-changes';
import AddItemButton from './add-item-button';
import CustomLink from './custom-links';
import ProFeaturesModal from './pro-features-modal';
import { useState } from '@wordpress/element';
/**
 * ChangelogItem Component
 * Main component that wraps a complete changelog version entry
 */
const ChangelogItem = ({
    item,
    versionIndex,
    customLinks,
    versionName,
    changelogLayout,
    customLogTypeColors,
    uniqueId,
    handleDateChange,
    handleVersionChange,
    handleCategoryChange,
    handleChangeChange,
    handleAddChangeItem,
    handleRemoveChangeItem,
    handleRemoveVersion,
    setAttributes,
    isProChangeloger
}) => {
    const { date, version, changes } = item;
    const currentLinks = get(customLinks, version, []);
    const uniqueCategories = [...new Set(changes.map(item => item.category.toLowerCase()))];
    const [isProFeaturesModalOpen, setIsProFeaturesModalOpen] = useState(false);
    return (
        <div className="changelog-info-item" data-filter={uniqueCategories.join(" ")}>
            <VersionHeader
                date={date}
                version={version}
                versionName={versionName}
                versionIndex={versionIndex}
                handleDateChange={handleDateChange}
                handleVersionChange={handleVersionChange}
                handleRemoveVersion={handleRemoveVersion}
                setAttributes={setAttributes}
                isProChangeloger={isProChangeloger}
            />

            <div className="content">
                {changelogLayout === 'grouped' && isProChangeloger ? (
                    <GroupedChanges
                        changes={changes}
                        versionIndex={versionIndex}
                        customLogTypeColors={customLogTypeColors}
                        handleCategoryChange={handleCategoryChange}
                        handleChangeChange={handleChangeChange}
                        isProChangeloger={isProChangeloger}
                    />
                ) : (
                    <IndividualChanges
                        changes={changes}
                        versionIndex={versionIndex}
                        customLogTypeColors={customLogTypeColors}
                        handleCategoryChange={handleCategoryChange}
                        handleChangeChange={handleChangeChange}
                        handleRemoveChangeItem={handleRemoveChangeItem}
                        isProChangeloger={isProChangeloger}
                    />
                )}
                {
                    isProChangeloger ? (
                        <AddItemButton onClick={() => handleAddChangeItem(versionIndex)} />
                    ) : (
                        <>
                        <AddItemButton onClick={() => setIsProFeaturesModalOpen(true)} />
                        <ProFeaturesModal isOpen={isProFeaturesModalOpen} onClose={() => setIsProFeaturesModalOpen(false)} />
                        </>
                    )
                }

                {currentLinks && currentLinks.length > 0 && (
                    <div className="changeloger-link-wrapper">
                        {currentLinks.map((action, index) => (
                            <CustomLink
                                key={index}
                                action={action}
                                index={index}
                                customLinks={customLinks}
                                currentLinks={currentLinks}
                                setAttributes={setAttributes}
                                version={version}
                            />
                        ))}

                        <Button
                            isSmall
                            isPressed
                            icon={plus}
                            label="Add Link"
                            onClick={() =>
                                setAttributes({
                                    customLinks: {
                                        ...customLinks,
                                        [version]: [
                                            ...currentLinks,
                                            {
                                                name: 'Link',
                                                link: `${uniqueId}#`,
                                                icon: '',
                                            },
                                        ],
                                    },
                                })
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangelogItem;
