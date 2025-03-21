/**
 * WordPress Dependencies
 */
import {lowerCase, some, filter} from 'lodash';
import {useState} from "@wordpress/element";
import {Button, Popover} from '@wordpress/components';

function FilterButton(props) {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };


    const toggleCategory = (category) => {
        const newSelected = selectedCategory.includes(category)
            ? selectedCategory.filter((c) => c !== category)
            : [...selectedCategory, category];

        setSelectedCategory(newSelected);

        if (props.isEditor) return null;

        const updatedChangelog = newSelected.length > 0
            ? filterByCategories(props.parsedChangelog, newSelected)
            : props.parsedChangelog;

        props.setAttributes({filteredChangelog: updatedChangelog});
    };

    function filterByCategories(data, categories) {
        return filter(data, versionData =>
            some(versionData.changes, change => categories.includes(lowerCase(change.category)))
        );
    }

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
        <>
            <div className={`changeloger-filter-wrapper align-${props.attributes.filterPosition}`}>
                <Button className='changeloger-filter-popover-button' onClick={toggleVisible}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-filter buttonIcon">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filter
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-chevron-down buttonIcon">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </Button>
                {isVisible &&
                    <Popover className="changeloger-filter-popover" placement="bottom">
                        <div className='drop-title'>
                            <div className='title'>Filters</div>
                            <Button onClick={toggleVisible} className="close-btn" icon='no-alt'></Button>
                        </div>
                        <div className="drop-body">
                            <div className='title'>Type</div>
                            <div className="filter-button-group">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => toggleCategory(category)}
                                        className={`${
                                            selectedCategory.includes(category) && "active"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Popover>
                }
            </div>
        </>
    );
}

export default FilterButton;
