import React from "react";

/**
 * SearchBar Component
 * Renders the search input for filtering changelog entries
 */
const SearchBar = ({ uniqueId, enableSearch, isProChangeloger }) => {
    if (!enableSearch || !isProChangeloger) {
        return null;
    }

    return (
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
    );
};

export default SearchBar;
