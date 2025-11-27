import React from "react";
import ChangeItem from './change-item';

/**
 * IndividualChanges Component
 * Renders changes individually with their own category tags
 */
const IndividualChanges = ({
    changes,
    versionIndex,
    customLogTypeColors,
    handleCategoryChange,
    handleChangeChange,
    handleRemoveChangeItem,
    isProChangeloger
}) => {
    return (
        <>
            {changes.map((item, changeIndex) => (
                <ChangeItem
                    key={changeIndex}
                    item={item}
                    versionIndex={versionIndex}
                    changeIndex={changeIndex}
                    customLogTypeColors={customLogTypeColors}
                    handleCategoryChange={handleCategoryChange}
                    handleChangeChange={handleChangeChange}
                    handleRemoveChangeItem={handleRemoveChangeItem}
                    isProChangeloger={isProChangeloger}
                />
            ))}
        </>
    );
};

export default IndividualChanges;
