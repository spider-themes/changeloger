/**
 * WordPress Dependencies
 */
import React from "react";
import {lowerCase} from 'lodash';

const FilterButton = (props) => {

    const getUniqueCategory = () => {
        const finalCategory = [];
        props.parsedChangelog.forEach((item) => {
            item.changes.forEach((change) => {
                const categoryLower = lowerCase(change.category);
                if (!finalCategory.includes(categoryLower)) {
                    finalCategory.push(categoryLower);
                }
            });
        });
        return finalCategory;
    };

    const categories = getUniqueCategory();
    return (
            <div className='changeloger-filter-wrapper'>
                <button className='changeloger-filter-popover-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-filter buttonIcon">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filter
                    <span className='arrow-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1" stroke-linecap="round"
                             stroke-linejoin="round"
                             className="lucide lucide-chevron-down buttonIcon">
                            <path d="m6 9 6 6 6-6"></path></svg>
                    </span>
                    <span className='cross-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-x buttonIcon"><path d="M18 6 6 18"></path><path
                            d="m6 6 12 12"></path></svg>
                    </span>
                </button>
                <div className="changeloger-filter-popover">
                    <div className='drop-title'>
                        <div className='title'>Filters</div>
                    </div>
                    <div className="drop-body">
                        <div className='title'>Type</div>
                        <div className="filter-button-group">
                            <button data-filter='all'>All Entries</button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    data-filter={category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
    );
}

export default FilterButton;
