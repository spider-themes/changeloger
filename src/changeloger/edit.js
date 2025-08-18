import { __ } from '@wordpress/i18n';
import { has, get } from 'lodash';
import {
  Button,
  TextControl,
  ToggleControl,
  PanelBody,
} from '@wordpress/components';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { plus } from '@wordpress/icons';
import React from 'react';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import Inspector from './inspector';
import CustomPlaceholder from './placeholder';
import ChangelogParser from './parser';
import BlockControl from './block-control';
import CustomLink from '../components/custom-links';
import VersionsTree from '../components/versions-tree';
import FilterButton from '../components/filter';

function Edit(props) {
  const { attributes, setAttributes } = props;
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
    enableSearch, // ✅ নতুন toggle attribute
    searchPlaceholder, // ✅ search placeholder text
  } = attributes;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChangelog, setFilteredChangelog] = useState([]);

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

  // Filter changelog based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredChangelog(parsedChangelog);
      return;
    }

    const filtered = parsedChangelog
      .map((item) => {
        const searchLower = searchTerm.toLowerCase();
        let shouldInclude = false;
        let allChanges = item.changes;

        const versionMatches = item.version.toLowerCase().includes(searchLower);

        const versionNameValue = versionName[item.version] || '';
        const versionNameMatches = versionNameValue
          .toLowerCase()
          .includes(searchLower);

        const dateMatches = item.date.toLowerCase().includes(searchLower);

        const categoryMatches = item.changes.some((change) =>
          change.category.toLowerCase().includes(searchLower)
        );

        if (
          versionMatches ||
          versionNameMatches ||
          dateMatches ||
          categoryMatches
        ) {
          shouldInclude = true;
          allChanges = item.changes;
        } else {
          const matchingChanges = item.changes.filter((change) =>
            change.change.toLowerCase().includes(searchLower)
          );

          if (matchingChanges.length > 0) {
            shouldInclude = true;
            allChanges = matchingChanges;
          }
        }

        return shouldInclude ? { ...item, changes: allChanges } : null;
      })
      .filter((item) => item !== null);

    setFilteredChangelog(filtered);
  }, [searchTerm, parsedChangelog, versionName]);

  const getFilteredChanges = (changes) => {
    return changes;
  };

  const isLeft = enableVersions && versionsPosition === 'left';
  const isRight = enableVersions && versionsPosition === 'right';

  function htmlEntityDecode(encodedString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
  }

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  useEffect(() => {
    if (!uniqueId) {
      const timestamp = Math.floor(Date.now() / 1000);
      const randomString = Math.random().toString(36).substr(2, 6);
      const generatedId = `cha-${timestamp}-${randomString}`;
      setAttributes({ uniqueId: generatedId });
    }
  }, []);

  return (
    <div {...blockProps} id={uniqueId}>
      {/* search filter */}
      {enableSearch && (
        <div className="changeloger-search-wrapper">
          <TextControl
            placeholder={
              searchPlaceholder || __('Search your changelog...', 'changeloger')
            }
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            className="changeloger-search-input"
          />
          {searchTerm && (
            <div className="changeloger-search-results-info">
              {__(
                `Found ${filteredChangelog.length} result(s) for "${searchTerm}"`,
                'changeloger'
              )}
              <Button
                isSmall
                variant="link"
                onClick={() => setSearchTerm('')}
                style={{ marginLeft: '10px' }}
              >
                {__('Clear', 'changeloger')}
              </Button>
            </div>
          )}
        </div>
      )}

      {!showPlaceholder && !showTextArea && (
        <>
          {enableFilter && !searchTerm && (
            <FilterButton {...props} parsedChangelog={parsedChangelog} />
          )}

          <div className="changelog-wrapper">
            {isLeft && (
              <div className="changeloger-version-list-container changeloger-version-list-position-left">
                <h6 className="version-title">Versions</h6>
                <VersionsTree versions={versions} />
              </div>
            )}

            <div className="changeloger-info-inner-wrapper">
              <div className="changeloger-items">
                {filteredChangelog.length > 0 ? (
                  filteredChangelog.map((item, index) => {
                    const { date, version, changes } = item;
                    const currentLinks = get(customLinks, version, []);
                    const filteredChanges = getFilteredChanges(changes);
                    const uniqueCategories = [
                      ...new Set(
                        filteredChanges.map((item) =>
                          item.category.toLowerCase()
                        )
                      ),
                    ];

                    return (
                      <div
                        key={`${version}-${index}`}
                        className="changelog-info-item"
                        data-filter={uniqueCategories.join(' ')}
                      >
                        <div className="date">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(date, searchTerm),
                            }}
                          ></span>

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
                          <span
                            className="version-tag"
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(version, searchTerm),
                            }}
                          ></span>
                          <span className="line"></span>
                        </div>

                        <div className="content">
                          {filteredChanges.map((item, changeIndex) => {
                            const currentCategory = item.category.toLowerCase();
                            const hasCustomColor = has(
                              customLogTypeColors,
                              currentCategory
                            );

                            return (
                              <p key={changeIndex}>
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
                                  dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerm(
                                      item.category,
                                      searchTerm
                                    ),
                                  }}
                                ></span>
                                <span
                                  className="change"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerm(
                                      htmlEntityDecode(item.change),
                                      searchTerm
                                    ),
                                  }}
                                ></span>
                              </p>
                            );
                          })}

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
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="changeloger-no-results">
                    <p>
                      {__(
                        'No changelog entries found matching your search.',
                        'changeloger'
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {isRight && (
              <div className="changeloger-version-list-container changeloger-version-list-position-right">
                <h6 className="version-title">Versions</h6>
                <VersionsTree versions={versions} uniqueId={uniqueId} />
              </div>
            )}
          </div>

          {enablePagination && !searchTerm && (
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
                        paginationLoadMoreText: newContent,
                      })
                    }
                  />
                </div>
              )}
              {'numbered' === paginationType && (
                <div className="changeloger-pagination-inner-wrapper">
                  <span className="changeloger-prev-button page-navigator">
                    « Previous
                  </span>
                  <span className="page-numbers current">1</span>
                  <span className="page-numbers">2</span>
                  <span className="page-numbers">3</span>
                  <span className="changeloger-next-button page-navigator">
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
      <BlockControl {...props} />
    </div>
  );
}

export default Edit;
