import {__} from '@wordpress/i18n';
import {has, get} from 'lodash';
import {Button} from '@wordpress/components';
import {useBlockProps, RichText} from '@wordpress/block-editor';
import {plus} from '@wordpress/icons';
import React from "react";
import './editor.scss';
import Inspector from './inspector';
import CustomPlaceholder from './placeholder';

import ChangelogParser from './parser';
import BlockControl from './block-control';
import CustomLink from './components/custom-links';
import VersionsTree from './components/versions-tree';
import FilterButton from "./components/filter";
import {useEffect} from "@wordpress/element";

function Edit(props) {
    const {attributes, setAttributes} = props;
    const {
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
        enableFilter
    } = attributes;

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

    const parser = new ChangelogParser(changelog);
    const parsedChangelog = parser.parse();
    const versions = parser.getVersions();


    const isLeft = enableVersions && versionsPosition === 'left';
    const isRight = enableVersions && versionsPosition === 'right';

    function htmlEntityDecode(encodedString) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(encodedString, 'text/html');
        return doc.documentElement.textContent;
    }


    return (
        <div {...blockProps}>
            {!showPlaceholder && !showTextArea && (
                <>
                    {enableFilter &&
                        <FilterButton {...props} parsedChangelog={parsedChangelog}/>
                    }
                    <div className="changelog-wrapper">
                        {isLeft && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-left">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions}/>
                            </div>
                        )}
                        <div className="changeloger-info-inner-wrapper">
                            <div className="changeloger-items">
                                {parsedChangelog.map((item, index) => {
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
                                                <span>{date}</span>

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
												<span className="version-tag">
													{version}
												</span>
                                                <span className="line"></span>
                                            </div>
                                            <div className="content">
                                                {changes.map((item) => {
                                                    const currentCategory =
                                                        item.category.toLowerCase();

                                                    const hasCustomColor = has(
                                                        customLogTypeColors,
                                                        currentCategory
                                                    );


                                                    return (
                                                        <p>
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
                                                            <span
                                                                className="change">{htmlEntityDecode(item.change)}</span>
                                                        </p>
                                                    );
                                                })}

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
                                                                            link: '#',
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
                            </div>
                        </div>

                        {isRight && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-right">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions}/>
                            </div>
                        )}
                    </div>

                    {enablePagination && (
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
                            {'numbered' === paginationType && (
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
