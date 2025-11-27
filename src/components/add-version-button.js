import React from "react";

/**
 * AddVersionButton Component
 * Button to add new versions with timeline styling
 */
const AddVersionButton = ({ onClick }) => {
    return (
        <div className="timeline-add-version-wrapper">
            <div className="timeline-line-extension"></div>
            <button className="timeline-circle-btn" onClick={onClick}>
                <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
                <span className="btn-text">Add New Version</span>
            </button>
        </div>
    );
};

export default AddVersionButton;
