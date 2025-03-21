import {__} from '@wordpress/i18n';
import {has, get, isEmpty, filter, some, lowerCase} from 'lodash';
import {Button} from '@wordpress/components';
import {useBlockProps, RichText} from '@wordpress/block-editor';
import {plus} from '@wordpress/icons';

import './editor.scss';
import Inspector from './inspector';
import CustomPlaceholder from './placeholder';

import ChangelogParser from './parser';
import BlockControl from './block-control';
import CustomLink from './components/custom-links';
import VersionsTree from './components/versions-tree';
import CustomColorControl from "./components/custom-color-control";
import Filter from "./components/filter";
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
        filteredChangelog
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

    useEffect(() => {
        setAttributes({ filteredChangelog: parsedChangelog });
    }, []); // Runs only once on mount


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
                  <FilterButton {...props} parsedChangelog={parsedChangelog} isEditor />
                    <div className="changelog-wrapper">
                        {isLeft && (
                            <div className="changeloger-version-list-container changeloger-version-list-position-left">
                                <h6 className="version-title">Versions</h6>
                                <VersionsTree versions={versions}/>
                            </div>
                        )}
                        <div className="changeloger-info-inner-wrapper">
                            <div className="changeloger-items">
                                {filteredChangelog.map((item, index) => {
                                    const {date, version, changes} = item;

                                    const currentLinks = get(
                                        customLinks,
                                        version,
                                        []
                                    );

                                    return (
                                        <div className="changelog-info-item">
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
                                <div class="wp-block-button">
                                    <RichText
                                        tagName="a"
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
									<span className="changeloger-prev-button page-numbers">
										« Previous
									</span>
                                    <span className="page-numbers current">
										1
									</span>
                                    <span className="page-numbers">2</span>
                                    <span className="page-numbers">3</span>
                                    <span className="changeloger-next-button page-numbers">
										Next »
									</span>
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
