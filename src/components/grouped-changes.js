import React from "react";
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import CategoryTag from './category-tag';

/**
 * GroupedChanges Component
 * Renders changes grouped by category
 */
const GroupedChanges = ({
    changes,
    versionIndex,
    customLogTypeColors,
    handleCategoryChange,
    handleChangeChange,
    isProChangeloger
}) => {
    // Helper function to group changes by category
    const groupChangesByCategory = (changes) => {
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
    };

    return (
        <>
            {groupChangesByCategory(changes).map((group) => {
                const currentCategory = group.category.toLowerCase();

                return (
                    <div key={currentCategory} className="changelog-category-group">
                        <CategoryTag
                            category={group.category}
                            customLogTypeColors={customLogTypeColors}
                            onChange={(newContent) => {
                                // Update all changes with this category
                                group.changes.forEach((changeItem) => {
                                    const originalChangeIndex = changes.findIndex(c =>
                                        c.category === changeItem.category && c.change === changeItem.change
                                    );
                                    handleCategoryChange(newContent, versionIndex, originalChangeIndex);
                                });
                            }}
                            isProChangeloger={isProChangeloger}
                        />
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
            })}
        </>
    );
};

export default GroupedChanges;
