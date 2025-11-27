import React from "react";
import { RichText } from '@wordpress/block-editor';

/**
 * PaginationControls Component
 * Renders pagination controls (load more or numbered)
 */
const PaginationControls = ({
    enablePagination,
    paginationType,
    paginationLoadMoreText,
    paginationTextColor,
    paginationBgColor,
    setAttributes,
    isProChangeloger
}) => {
    if (!enablePagination || !isProChangeloger) {
        return null;
    }

    return (
        <div className="changeloger-pagination-wrapper">
            {paginationType === 'load-more' && (
                <div className="wp-block-button">
                    <RichText
                        tagName="button"
                        style={{
                            color: paginationTextColor,
                            backgroundColor: paginationBgColor,
                        }}
                        className="changeloger-pagination-button wp-block-button__link wp-element-button"
                        value={paginationLoadMoreText}
                        onChange={(newContent) =>
                            setAttributes({
                                paginationLoadMoreText: newContent,
                            })
                        }
                    />
                </div>
            )}
            {paginationType === 'numbered' && (
                <div className="changeloger-pagination-inner-wrapper">
                    <span className="changeloger-prev-button page-navigator">« Previous</span>
                    <span className="page-numbers current">1</span>
                    <span className="page-numbers">2</span>
                    <span className="page-numbers">3</span>
                    <span className="changeloger-next-button page-navigator">Next »</span>
                </div>
            )}
        </div>
    );
};

export default PaginationControls;
