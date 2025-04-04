import { useBlockProps } from '@wordpress/block-editor';

import ChangelogParser from './parser';

function saveDep( props ) {
    const {
        improvementTagColor,
        newTagColor,
        updateTagColor,
        fixedTagColor,
        tweakedTagColor,
        paginationTextColor,
        paginationBgColor,
        paginationActiveTextColor,
        paginationActiveBgColor,
        paginationHoverTextColor,
        paginationHoverBgColor
    } = props.attributes;

    const blockProps = useBlockProps.save( {
        className: 'changeloger-container',
        style: {
            '--changeloger-pagination-text-color': paginationTextColor,
            '--changeloger-pagination-bg-color': paginationBgColor,
            '--changeloger-pagination-active-text-color':
            paginationActiveTextColor,
            '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
            '--changeloger-improvement-tag-bg-color': improvementTagColor,
            '--changeloger-new-tag-bg-color': newTagColor,
            '--changeloger-update-tag-bg-color': updateTagColor,
            '--changeloger-fixed-tag-bg-color': fixedTagColor,
            '--changeloger-tweaked-tag-bg-color': tweakedTagColor,
        },
    } );

    const parser = new ChangelogParser( props.attributes.changelog );
    const parsedChangelog = parser.parse();

    return JSON.stringify( {
        changelog: parsedChangelog,
        props: blockProps,
        version: parser.getVersions(),
        paginationStyles: {
            color: paginationTextColor,
            'background-color': paginationBgColor,
        },
    } );
}

export default saveDep;