import {__} from '@wordpress/i18n';
import {useEffect,useState} from "@wordpress/element";
import {useBlockProps} from '@wordpress/block-editor';
import React from "react";
import './editor.scss';
import Inspector from './inspector';
import CustomPlaceholder from './placeholder';
import ChangelogParser from './parser';
import BlockControl from './block-control';
import VersionsTree from '../components/versions-tree';
import FilterButton from "../components/filter";
import SearchBar from '../components/search-bar';
import ChangelogItem from '../components/changelog-item';
import AddVersionButton from '../components/add-version-button';
import PaginationControls from '../components/pagination-controls';
import {isProChangeloger} from "../utils/constants";
import ProFeaturesModal from '../components/pro-features-modal';

function Edit(props) {
    const [isProFeaturesModalOpen, setIsProFeaturesModalOpen] = useState(false);
    const {attributes, setAttributes} = props;
    const {
        uniqueId,
        changelog,
        customLinks,
        newTagColor,
        versionName,
        showTextArea,
        fixedTagColor,
        paginationType,
        enableVersions,
        updateTagColor,
        tweakedTagColor,
        showPlaceholder,
        enablePagination,
        versionsPosition,
        paginationBgColor,
        improvementTagColor,
        paginationTextColor,
        customLogTypeColors,
        paginationLoadMoreText,
        paginationActiveBgColor,
        paginationActiveTextColor,
        paginationHoverBgColor,
        paginationHoverTextColor,
        enableFilter,
        enableSearch,
        changelogLayout,
        filterPosition
    } = attributes;

    // Get centralized state and handlers from props (set by placeholder.js)
    let {
        parsedChangelog,
        handleChangeChange,
        handleCategoryChange,
        handleDateChange,
        handleVersionChange,
        handleAddChangeItem,
        handleAddVersion,
        handleRemoveChangeItem,
        handleRemoveVersion,
    } = props;

    // Fallback: if parsedChangelog not available from placeholder, parse locally
    if (!parsedChangelog) {
        const parser = new ChangelogParser(changelog);
        parsedChangelog = parser.parse();
    }

    // Create parser for converting back to plain text
    const parser = new ChangelogParser(changelog);

    // Fallback handlers if not provided by placeholder
    if (!handleChangeChange) {
        handleChangeChange = (newContent, versionIndex, changeIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog[versionIndex].changes[changeIndex].change = newContent;
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }
    if (!handleCategoryChange) {
        handleCategoryChange = (newCategory, versionIndex, changeIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog[versionIndex].changes[changeIndex].category = newCategory;
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }
    if (!handleDateChange) {
        handleDateChange = (newDate, versionIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog[versionIndex].date = newDate;
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }
    if (!handleVersionChange) {
        handleVersionChange = (newVersion, versionIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog[versionIndex].version = newVersion;
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }

    if (!handleAddChangeItem) {
        handleAddChangeItem = (versionIndex) => {
            const updatedChangelog = [...parsedChangelog];
            if (!updatedChangelog[versionIndex].changes) {
                updatedChangelog[versionIndex].changes = [];
            }
            updatedChangelog[versionIndex].changes.push({
                category: 'NEW',
                change: 'Added a new feature'
            });
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }

    if (!handleAddVersion) {
        handleAddVersion = () => {
            const updatedChangelog = [...parsedChangelog];
            const today = new Date();
            const formattedToday = today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            });
            const newItem = {
                version: '1.0.0',
                date: formattedToday,
                changes: [
                    {
                        category: 'NEW',
                        change: 'Added a new feature'
                    }
                ]
            };
            updatedChangelog.unshift(newItem);
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }

    if (!handleRemoveChangeItem) {
        handleRemoveChangeItem = (versionIndex, changeIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog[versionIndex].changes.splice(changeIndex, 1);
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }

    if (!handleRemoveVersion) {
        handleRemoveVersion = (versionIndex) => {
            const updatedChangelog = [...parsedChangelog];
            updatedChangelog.splice(versionIndex, 1);
            const plainText = parser.convertToPlainText(updatedChangelog);
            setAttributes({ changelog: plainText });
        };
    }

    const blockProps = useBlockProps({
        className: 'changeloger-container',
        style: {
            '--changeloger-pagination-text-color': paginationTextColor,
            '--changeloger-pagination-bg-color': paginationBgColor,
            '--changeloger-pagination-active-text-color': paginationActiveTextColor,
            '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
            '--changeloger-pagination-hover-text-color': paginationHoverTextColor,
            '--changeloger-pagination-hover-bg-color': paginationHoverBgColor,
            '--changeloger-improvement-tag-bg-color': improvementTagColor,
            '--changeloger-new-tag-bg-color': newTagColor,
            '--changeloger-update-tag-bg-color': updateTagColor,
            '--changeloger-fixed-tag-bg-color': fixedTagColor,
            '--changeloger-tweaked-tag-bg-color': tweakedTagColor,
        },
    });

    const versions = parser.getVersions();

    const isLeft = enableVersions && versionsPosition === 'left';
    const isRight = enableVersions && versionsPosition === 'right';

    useEffect(() => {
        if (!uniqueId) {
            // Generate a unique ID based on the current timestamp (in seconds) and a random string
            const timestamp = Math.floor(Date.now() / 1000); // Current time in seconds
            const randomString = Math.random().toString(36).substr(2, 6); // Random alphanumeric string of length 6
            const generatedId = `cha-${timestamp}-${randomString}`;

            setAttributes({uniqueId: generatedId});
        }
    }, []);

    return (
        <div {...blockProps} id={uniqueId}>
            <SearchBar 
                uniqueId={uniqueId} 
                enableSearch={enableSearch} 
                isProChangeloger={isProChangeloger} 
            />

            {!showPlaceholder && !showTextArea && (
                <>
                    {enableFilter && isProChangeloger &&
                        <div className={`changeloger-action-alignment align-${filterPosition}`}>
                            <FilterButton {...props} parsedChangelog={parsedChangelog}/>
                        </div>
                    }
                    <div className="changelog-wrapper">
                        {isLeft && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-left">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions} uniqueId={uniqueId}/>
                            </div>
                        )}
                        <div className="changeloger-info-inner-wrapper">
                            <div className="changeloger-items">
                                {
                                    isProChangeloger ? (
                                        <AddVersionButton onClick={handleAddVersion} />
                                    ) : (
                                       <>
                                       <div className='timeline-add-version-wrapper'>
                                       <button className='timeline-circle-btn' onClick={() => setIsProFeaturesModalOpen(true)}>
                                        <svg
                                            height="24"
                                            width="24"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                                        </svg>
                                        <span className="btn-text">Add New Version</span>
                                       </button>
                                        <ProFeaturesModal isOpen={isProFeaturesModalOpen} onClose={() => setIsProFeaturesModalOpen(false)} />
                                       </div>
                                       </>
                                    )
                                }
                                {parsedChangelog.map((item, versionIndex) => (
                                    <ChangelogItem
                                        key={versionIndex}
                                        item={item}
                                        versionIndex={versionIndex}
                                        customLinks={customLinks}
                                        versionName={versionName}
                                        changelogLayout={changelogLayout}
                                        customLogTypeColors={customLogTypeColors}
                                        uniqueId={uniqueId}
                                        handleDateChange={handleDateChange}
                                        handleVersionChange={handleVersionChange}
                                        handleCategoryChange={handleCategoryChange}
                                        handleChangeChange={handleChangeChange}
                                        handleAddChangeItem={handleAddChangeItem}
                                        handleRemoveChangeItem={handleRemoveChangeItem}
                                        handleRemoveVersion={handleRemoveVersion}
                                        setAttributes={setAttributes}
                                        isProChangeloger={isProChangeloger}
                                    />
                                ))}
                            </div>
                        </div>

                        {isRight && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-right">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions} uniqueId={uniqueId}/>
                            </div>
                        )}
                    </div>

                    <PaginationControls
                        enablePagination={enablePagination}
                        paginationType={paginationType}
                        paginationLoadMoreText={paginationLoadMoreText}
                        paginationTextColor={paginationTextColor}
                        paginationBgColor={paginationBgColor}
                        setAttributes={setAttributes}
                        isProChangeloger={isProChangeloger}
                    />
                </>
            )}

            <Inspector {...props} />
            <CustomPlaceholder {...props} />
            {<BlockControl {...props} />}
        </div>
    );
}

export default Edit;