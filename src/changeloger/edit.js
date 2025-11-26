import {__} from '@wordpress/i18n';
import {has, get} from 'lodash';
import {Button} from '@wordpress/components';
import {useBlockProps, RichText} from '@wordpress/block-editor';
import {plus} from '@wordpress/icons';
import React from "react";
import {useEffect} from "@wordpress/element";
import './editor.scss';
import Inspector from './inspector';
import CustomPlaceholder from './placeholder';
import ChangelogParser from './parser';
import BlockControl from './block-control';
import CustomLink from '../components/custom-links';
import VersionsTree from '../components/versions-tree';
import FilterButton from "../components/filter";
import {isProChangeloger} from "../utils/constants";

function Edit(props) {
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
        changelogLayout
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
            const newItem = {
                version: '1.0.0',
                date: new Date().toISOString().split('T')[0],
                changes: [
                    {
                        category: 'NEW',
                        change: 'Added a new feature'
                    }
                ]
            };
            updatedChangelog.push(newItem);
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

    // Helper function to group changes by category
    function groupChangesByCategory(changes) {
        const grouped = {};
        changes.forEach((item) => {
            const category = item.category.toLowerCase();
            if (!grouped[category]) {
                grouped[category] = {
                    category: item.category,
                    changes: []
                };
            }
            grouped[category].changes.push(item);
        });
        return Object.values(grouped);
    }

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

            {/* search filter */}
            {enableSearch && isProChangeloger && (
                <div className="changelog_form_inner">
                    <div className="changelog_form_group">
                        <input
                            type="search"
                            data-searchTarget={uniqueId}
                            className="changelog-search-control changelog_form_control noEnterSubmit"
                            placeholder='Search your changelog...'
                        />
                    </div>
                    <span id="changelog-search-help-block" className="help-block"/>
                </div>
            )}

            {!showPlaceholder && !showTextArea && (
                <>
                    {enableFilter && isProChangeloger &&
                        <FilterButton {...props} parsedChangelog={parsedChangelog}/>
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
                                {parsedChangelog.map((item, versionIndex) => {
                                    const {date, version, changes} = item;
                                    const currentLinks = get(
                                        customLinks,
                                        version,
                                        []
                                    );

                                    const uniqueCategories = [...new Set(changes.map(item => item.category.toLowerCase()))];

                                    return (
                                        <div className="changelog-info-item" data-filter={uniqueCategories.join(" ")}>
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
                                                    placeholder={__(
                                                        'Version Name',
                                                        'changeloger'
                                                    )}
                                                    value={versionName[version]}
                                                    onChange={(newContent) =>
                                                        setAttributes({
                                                            versionName: {
                                                                ...versionName,
                                                                [version]:
                                                                newContent,
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
                                            </div>
                                            <div className="content">
                                                {changelogLayout === 'grouped' && isProChangeloger ? (
                                                    // Grouped layout: Categories displayed once with changes listed below
                                                    groupChangesByCategory(changes).map((group) => {
                                                        const currentCategory = group.category.toLowerCase();
                                                        const hasCustomColor = has(
                                                            customLogTypeColors,
                                                            currentCategory
                                                        );

                                                        return (
                                                            <div key={currentCategory} className="changelog-category-group">
                                                                {isProChangeloger ? (
                                                                    <RichText
                                                                        tagName="span"
                                                                        style={
                                                                            hasCustomColor
                                                                                ? {
                                                                                    backgroundColor: get(
                                                                                        customLogTypeColors,
                                                                                        currentCategory
                                                                                    ),
                                                                                }
                                                                                : {}
                                                                        }
                                                                        className={`tag ${currentCategory.replace(
                                                                            ' ',
                                                                            '-'
                                                                        )}`}
                                                                        value={group.category}
                                                                        onChange={(newContent) => {
                                                                            // Update all changes with this category
                                                                            group.changes.forEach((changeItem) => {
                                                                                const originalChangeIndex = changes.findIndex(c =>
                                                                                    c.category === changeItem.category && c.change === changeItem.change
                                                                                );
                                                                                handleCategoryChange(newContent, versionIndex, originalChangeIndex);
                                                                            });
                                                                        }}
                                                                        placeholder={__ ('Category', 'changeloger')}
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        style={
                                                                            hasCustomColor
                                                                                ? {
                                                                                    backgroundColor: get(
                                                                                        customLogTypeColors,
                                                                                        currentCategory
                                                                                    ),
                                                                                }
                                                                                : {}
                                                                        }
                                                                        className={`tag ${currentCategory.replace(
                                                                            ' ',
                                                                            '-'
                                                                        )}`}
                                                                    >
                                                                        {group.category}
                                                                    </span>
                                                                )}
                                                                <ul className="changelog-items-list">
                                                                    {group.changes.map((item, changeIndex) => {
                                                                        // Find the original index of this change in the main changes array
                                                                        const originalChangeIndex = changes.findIndex(c =>
                                                                            c.category === item.category && c.change === item.change
                                                                        );
                                                                        return (
                                                                            <li key={changeIndex} className="change">
                                                                                {isProChangeloger ? (
                                                                                    <RichText
                                                                                        style={{
                                                                                            whiteSpace: 'normal',
                                                                                            minWidth: '0'
                                                                                        }}
                                                                                        tagName="span"
                                                                                        value={item.change || "Enter Text here"}
                                                                                        placeholder={__('Change', 'changeloger')}
                                                                                        onChange={(newContent) => handleChangeChange(newContent, versionIndex, originalChangeIndex)}
                                                                                    />
                                                                                ) : (
                                                                                    <span>{item.change}</span>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    // Individual layout: Each change with its own category tag
                                                    changes.map((item, changeIndex) => {
                                                        const currentCategory =
                                                            item.category.toLowerCase();

                                                        const hasCustomColor = has(
                                                            customLogTypeColors,
                                                            currentCategory
                                                        );

                                                        return (
                                                            <p key={changeIndex} className='rich-text-delete'>
																{isProChangeloger ? (
																	<>
                                                                    <RichText
																		tagName="span"
																		style={
																			hasCustomColor
																				? {
																					backgroundColor:
																						get(
																							customLogTypeColors,
																							currentCategory
																						),
																				}
																				: {}
																		}
																		className={`tag ${currentCategory.replace(
																			' ',
																			'-'
																		)}`}
																		value={item.category}
																		onChange={(newContent) => handleCategoryChange(newContent, versionIndex, changeIndex)}
																	/>
                                                                    <button className='rich-text-delete-btn' onClick={() => handleRemoveChangeItem(versionIndex, changeIndex)}>Remove</button>
                                                                    </>
																) : (
																	<span
																		style={
																			hasCustomColor
																				? {
																					backgroundColor:
																						get(
																							customLogTypeColors,
																							currentCategory
																						),
																				}
																				: {}
																		}
																		className={`tag ${currentCategory.replace(
																			' ',
																			'-'
																		)}`}
																	>
																		{item.category}
																	</span>
																)}
                                                                {/* <span className="change"> */}
                                                                    {isProChangeloger ? (
                                                                        <RichText
                                                                            className='change'
                                                                            tagName="span"
                                                                            value={item.change}
                                                                            onChange={(newContent) => handleChangeChange(newContent, versionIndex, changeIndex)}
                                                                        />
                                                                    ) : (
                                                                        <span className="change">{item.change}</span>
                                                                    )}
                                                                {/* </span> */}
                                                            </p>
                                                        );
                                                    })
                                                )}
                                                <button className='changeloger-add-item' onClick={() => handleAddChangeItem(versionIndex)} >
                                                    <span>
                                                        <svg
                                                        height="24"
                                                        width="24"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                                                        </svg>
                                                        Add New Item
                                                    </span>
                                                </button>
                                                <div className="changeloger-link-wrapper">
                                                    {currentLinks.map(
                                                        (action, index) => {
                                                            return (
                                                                <CustomLink
                                                                    action={
                                                                        action
                                                                    }
                                                                    index={index}
                                                                    customLinks={
                                                                        customLinks
                                                                    }
                                                                    currentLinks={
                                                                        currentLinks
                                                                    }
                                                                    setAttributes={
                                                                        setAttributes
                                                                    }
                                                                    version={
                                                                        version
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}

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
                                                    ></Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="timeline-add-version-wrapper">
                                <div className="timeline-line-extension"></div>
                                <button className="timeline-circle-btn" onClick={() => handleAddVersion()}>
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
                            </div>
                            </div>
                        </div>

                        {isRight && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-right">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions} uniqueId={uniqueId}/>
                            </div>
                        )}
                    </div>

                    {enablePagination && isProChangeloger && (
                        <div className="changeloger-pagination-wrapper">
                            {'load-more' === paginationType && (
                                <div className="wp-block-button">
                                    <RichText
                                        tagName="button"
                                        style={{
                                            color: paginationTextColor,
                                            backgroundColor: paginationBgColor,
                                        }}
                                        className="changeloger-pagination-button wp-block-button__link wp-element-button"
                                        value={paginationLoadMoreText}
                                        onChange={(newContent) =>
                                            setAttributes({
                                                paginationLoadMoreText:
                                                newContent,
                                            })
                                        }
                                    />
                                </div>
                            )}
                            {'numbered' === paginationType && isProChangeloger && (
                                <div className="changeloger-pagination-inner-wrapper">
                                    <span className="changeloger-prev-button page-navigator">« Previous</span>
                                    <span className="page-numbers current">1</span>
                                    <span className="page-numbers">2</span>
                                    <span className="page-numbers">3</span>
                                    <span className="changeloger-next-button page-navigator">Next »</span>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            <Inspector {...props} />
            <CustomPlaceholder {...props} />
            {<BlockControl {...props} />}
        </div>
    );
}

export default Edit;