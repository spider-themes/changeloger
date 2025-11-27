import React from "react";

/**
 * AddItemButton Component
 * Button to add new changelog items
 */
const AddItemButton = ({ onClick, label = "Add New Item" }) => {
    return (
        <button className='changeloger-add-item' onClick={onClick}>
            <span>
                <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
                {label}
            </span>
        </button>
    );
};

export default AddItemButton;
