import { __ } from '@wordpress/i18n';
import { has, get } from 'lodash';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import React from 'react';
import ChangelogParser from './parser';
import VersionsTree from '../components/versions-tree';
import FilterButton from '../components/filter';
import {isProChangeloger} from "../utils/constants";

function save(props) {
  const {
    uniqueId,
    customLinks,
    newTagColor,
    versionName,
    fixedTagColor,
    paginationType,
    updateTagColor,
    tweakedTagColor,
    enablePagination,
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
    enableVersions,
    versionsPosition,
    perPage,
    enableSearch,
    changelogLayout,
  } = props.attributes;

  const blockProps = useBlockProps.save({
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

  const parser = new ChangelogParser(props.attributes.changelog);
  const parsedChangelog = parser.parse();
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

  return (
    <div {...blockProps} id={uniqueId}>
      {enableSearch && isProChangeloger && (
        <div className="changelog_form_inner">
				<div className="changelog_form_group">
					<input
						type="search"
						data-searchTarget={uniqueId}
						className="changelog-search-control changelog_form_control noEnterSubmit"
						placeholder='Search your changelog...'
                        checked={enableSearch}
					/>
				</div>
				<span id="changelog-search-help-block" className="help-block" />
			</div>
      )}

      {enableFilter && isProChangeloger && (
        <FilterButton {...props} parsedChangelog={parsedChangelog} />
      )}
      <div className="changelog-wrapper">
        {isLeft &&(
          <div className="changeloger-version-list-container changeloger-version-list-position-left">
            <h6 className="version-title">Versions</h6>
            <VersionsTree versions={versions} uniqueId={uniqueId}/>
          </div>
        )}
        <span data-changeloger-content="start"></span>
        <div className="changeloger-info-inner-wrapper">
          <div className="changeloger-items">
            {parsedChangelog.map((item) => {
              const { date, version, changes } = item;

              const currentLinks = get(customLinks, version, []);

              const uniqueCategories = [
                ...new Set(changes.map((item) => item.category.toLowerCase())),
              ];

              return (
                <div
                  key={item.version}
                  id={uniqueId + '-' + item.version}
                  className="changelog-info-item"
                  data-filter={uniqueCategories.join(' ')}
                >
                  <div className="date">
                    <span>{date}</span>

                    <RichText.Content
                      tagName="span"
                      className="changeloger-version-name"
                      placeholder={__('Version Name', 'changeloger')}
                      value={versionName[version]}
                    />
                  </div>
                  <div className="version">
                    <span className="version-tag">{version}</span>
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
                              className={`tag ${currentCategory
                                .toLowerCase()
                                .replace(/\s/g, '-')}`}
                            >
                              {group.category}
                            </span>
                            <ul className="changelog-items-list">
                              {group.changes.map((item, changeIndex) => (
                                <li key={changeIndex} className="change">
                                  {item.change}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })
                    ) : (
                      // Individual layout: Each change with its own category tag
                      changes.map((item) => {
                        const currentCategory = item.category.toLowerCase();

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
                                      backgroundColor: get(
                                        customLogTypeColors,
                                        currentCategory
                                      ),
                                    }
                                  : {}
                              }
                              className={`tag ${currentCategory
                                .toLowerCase()
                                .replace(/\s/g, '-')}`}
                            >
                              {item.category}
                            </span>
                            <span className="change">{item.change}</span>
                          </p>
                        );
                      })
                    )}
                    <div className="changeloger-link-wrapper">
                      {currentLinks.map((itemLink) => {
                        return (
                          <a
                            href={itemLink.link}
                            className="changeloger-custom-link"
                            target="_blank"
                          >
                            {itemLink.icon && (
                              <span
                                className="changeloger-custom-link-icon"
                                style={{
                                  WebkitMaskImage: `url(${itemLink.icon})`,
                                }}
                              ></span>
                            )}
                            {itemLink.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
     <span data-changeloger-content="end"></span>
        {isRight && (
          <div className="changeloger-version-list-container changeloger-version-list-position-right">
            <h6 className="version-title">Versions</h6>
            <VersionsTree versions={versions} uniqueId={uniqueId} />
          </div>
        )}
      </div>

      {enablePagination && isProChangeloger && (
        <div className="changeloger-pagination-wrapper" data-per-page={perPage}>
          {'load-more' === paginationType && (
            <div className="wp-block-button">
              <RichText.Content
                tagName="button"
                style={{
                  color: paginationTextColor,
                  backgroundColor: paginationBgColor,
                }}
                className="changeloger-pagination-button wp-block-button__link wp-element-button"
                value={paginationLoadMoreText}
              />
            </div>
          )}
          {'numbered' === paginationType && isProChangeloger && (
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
    </div>
  );
}

export default save;
