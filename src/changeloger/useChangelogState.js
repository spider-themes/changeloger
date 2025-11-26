import { useState } from '@wordpress/element';
import ChangelogParser from './parser';

/**
 * Custom hook for centralized changelog state management
 * This hook manages parsedChangelog state and provides handlers for editing
 */
export const useChangelogState = (changelog) => {
    const parser = new ChangelogParser(changelog);
    const [parsedChangelog, setParsedChangelog] = useState(() => parser.parse());
    console.log(parsedChangelog);
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
    
    // Handle Adding a New Change Item to a specific Version
    const handleAddChangeItem = (versionIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        const newItem = {
            category: 'NEW', 
            change: 'Added a new feature' 
        };

        if (!updatedChangelog[versionIndex].changes) {
            updatedChangelog[versionIndex].changes = [];
        }
        
        updatedChangelog[versionIndex].changes.push(newItem);

        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };
    
    // Handle New version add and also add singel changes item
    const handleAddVersion = (setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        // date format: YYYY-MM-DD
        const date = new Date().toISOString().split('T')[0];
        const newVersion = {
            version: 'New Version',
            date,
            changes: [
                {
                    category: 'NEW', 
                    change: 'Added a new feature' 
                }
            ]
        };
        updatedChangelog.push(newVersion);
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };
    
    // Handle Remove a Change item
    const handleRemoveChangeItem = (versionIndex, changeIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog[versionIndex].changes.splice(changeIndex, 1);
        setParsedChangelog(updatedChangelog);
        updateChangelogAttribute(updatedChangelog, setAttributes);
    };
    // Handle Remove a Version
    const handleRemoveVersion = (versionIndex, setAttributes) => {
        const updatedChangelog = [...parsedChangelog];
        updatedChangelog.splice(versionIndex, 1);
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
        handleAddChangeItem,
        handleAddVersion,
        handleRemoveChangeItem,
        handleRemoveVersion,
        updateChangelogAttribute
    };
};

