import {useBlockProps} from '@wordpress/block-editor';

import ChangelogParser from './parser';

function save(props) {
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

    const blockProps = useBlockProps.save({
        className: 'changeloger-container',
        style: {
            '--changeloger-pagination-text-color': paginationTextColor,
            '--changeloger-pagination-bg-color': paginationBgColor,
            '--changeloger-pagination-active-text-color': paginationActiveTextColor,
            '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
            '--changeloger-pagination-hover-text-color': paginationHoverTextColor,
            '--changeloger-pagination-hover-bg-color': paginationHoverBgColor,
            '--changeloger-improvement-tag-bg-color': improvementTagColor,
            '--changeloger-new-tag-bg-color': newTagColor,
            '--changeloger-update-tag-bg-color': updateTagColor,
            '--changeloger-fixed-tag-bg-color': fixedTagColor,
            '--changeloger-tweaked-tag-bg-color': tweakedTagColor,
        },
    });

    const parser = new ChangelogParser(props.attributes.changelog);
    const parsedChangelog = parser.parse();
    // console.log('changelog', parsedChangelog);
    // console.log('props', blockProps);
    // console.log('version', parser.getVersions());
    // console.log('paginationStyles', {
    //     color: paginationTextColor,
    //     'background-color': paginationBgColor,
    // });


    return JSON.stringify({


        changelog: parsedChangelog,
        props: blockProps,
        version: parser.getVersions(),
        paginationStyles: {
            color: paginationTextColor,
            'background-color': paginationBgColor,
        },
    });
}

export default save;
