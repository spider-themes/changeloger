import { useState } from '@wordpress/element';
import ChangelogParser from './parser';

/**
 * Custom hook for centralized changelog state management
 * This hook manages parsedChangelog state and provides handlers for editing
 */
export const useChangelogState = (changelog) => {
    const parser = new ChangelogParser(changelog);
    const [parsedChangelog, setParsedChangelog] = useState(() => parser.parse());

    // Function to update changelog attribute from parsedChangelog
    const updateChangelogAttribute = (updatedChangelog, setAttributes) => {
        const plainText = parser.convertToPlainText(updatedChangelog);
        setAttributes({ changelog: plainText });
    };

    // Handle change for changelog items
    const handleChangeChange = (newContent, versionIndex, changeIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog[versionIndex].changes[changeIndex].change = newContent;
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };

    // Handle change for category/tag
    const handleCategoryChange = (newCategory, versionIndex, changeIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog[versionIndex].changes[changeIndex].category = newCategory;
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };

    // Handle change for date field
    const handleDateChange = (newDate, versionIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog[versionIndex].date = newDate;
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };

    // Handle change for version field
    const handleVersionChange = (newVersion, versionIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog[versionIndex].version = newVersion;
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };

    return {
        parsedChangelog,
        setParsedChangelog,
        handleChangeChange,
        handleCategoryChange,
        handleDateChange,
        handleVersionChange,
        updateChangelogAttribute
    };
};

