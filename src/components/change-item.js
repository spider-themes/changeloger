import React from "react";
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import CategoryTag from './category-tag';

/**
 * ChangeItem Component
 * Renders a single change item with category tag and delete button
 */
const ChangeItem = ({
    item,
    versionIndex,
    changeIndex,
    customLogTypeColors,
    handleCategoryChange,
    handleChangeChange,
    handleRemoveChangeItem,
    isProChangeloger
}) => {
    return (
        <p className='rich-text-delete'>
            {isProChangeloger ? (
                <>
                    <CategoryTag
                        category={item.category}
                        customLogTypeColors={customLogTypeColors}
                        onChange={(newContent) => handleCategoryChange(newContent, versionIndex, changeIndex)}
                        isProChangeloger={isProChangeloger}
                    />
                </>
            ) : (
                <CategoryTag
                    category={item.category}
                    customLogTypeColors={customLogTypeColors}
                    isProChangeloger={isProChangeloger}
                    isEditable={false}
                />
            )}
            <span className="change">
                {isProChangeloger ? (
                    <>
                        <RichText
                            tagName="span"
                            value={item.change}
                            onChange={(newContent) => handleChangeChange(newContent, versionIndex, changeIndex)}
                        />
                        <button className='rich-text-delete-btn' onClick={() => handleRemoveChangeItem(versionIndex, changeIndex)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </>
                ) : (
                    <span className="change">{item.change}</span>
                )}
            </span>
        </p>
    );
};

export default ChangeItem;
