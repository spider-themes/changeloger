import React from "react";
import { __ } from '@wordpress/i18n';
import { has, get } from 'lodash';
import { RichText } from '@wordpress/block-editor';

/**
 * CategoryTag Component
 * Renders a category tag with custom colors and optional editing
 */
const CategoryTag = ({ 
    category, 
    customLogTypeColors, 
    onChange, 
    isProChangeloger,
    isEditable = true 
}) => {
    const currentCategory = category.toLowerCase();
    const hasCustomColor = has(customLogTypeColors, currentCategory);
    
    const style = hasCustomColor
        ? { backgroundColor: get(customLogTypeColors, currentCategory) }
        : {};
    
    const className = `tag ${currentCategory.replace(' ', '-')}`;

    if (isProChangeloger && isEditable && onChange) {
        return (
            <RichText
                tagName="span"
                style={style}
                className={className}
                value={category}
                onChange={onChange}
                placeholder={__('Category', 'changeloger')}
            />
        );
    }

    return (
        <span style={style} className={className}>
            {category}
        </span>
    );
};

export default CategoryTag;
