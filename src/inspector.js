import React from 'react';

import {map} from 'lodash';
import {__} from '@wordpress/i18n';

import {useSelect} from '@wordpress/data';
import {InspectorControls,ContrastChecker} from '@wordpress/block-editor';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import {
    PanelBody,
    TextControl,
    SelectControl,
    BaseControl,
    ColorPalette,
    ToggleControl,
} from '@wordpress/components';

import ChangelogParser from './parser';
import LogTypeColors from './components/log-type-colors';
import CustomColorControl from "./components/custom-color-control";

function Inspector(props) {
    const {attributes, setAttributes} = props;
    const {
        perPage,
        changelog,
        enableVersions,
        paginationType,
        enablePagination,
        versionsPosition,
        paginationBgColor,
        customLogTypeColors,
        paginationTextColor,
        paginationActiveBgColor,
        paginationActiveTextColor,
        paginationHoverBgColor,
        paginationHoverTextColor,
        enableFilter,
        filterPosition
    } = attributes;
    const versionPositions = [
        {
            label: __('Left', 'changeloger'),
            value: 'left',
        },
        {
            label: __('Right', 'changeloger'),
            value: 'right',
        },
    ];
    const filterPositions = [
        {
            icon:'editor-alignleft',
            label: __('Left', 'changeloger'),
            value: 'left',
        },
        {
            icon:'editor-aligncenter',
            label: __('Left', 'changeloger'),
            value: 'center',
        },
        {
            icon:'editor-alignright',
            label: __('Right', 'changeloger'),
            value: 'right',
        },
    ];

    const {defaultColors} = useSelect((select) => {
        return {
            defaultColors:
            select('core/block-editor')?.getSettings()
                ?.__experimentalFeatures?.color?.palette?.default,
        };
    });

    const parser = new ChangelogParser(changelog);
    const parsedChangelog = parser.parse();
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('General', 'changeloger')}>
                    <ToggleControl
                        label={__('Sidebar Versions', 'changeloger')}
                        checked={enableVersions}
                        onChange={() =>
                            setAttributes({
                                enableVersions: !enableVersions,
                            })
                        }
                    />
                    {enableVersions && (
                        <ToggleGroupControl
                            isBlock
                            value={versionsPosition}
                            label={__('Versions Position', 'changeloger')}
                        >
                            {versionPositions.map((position) => {
                                return (
                                    <ToggleGroupControlOption
                                        value={position.value}
                                        label={position.label}
                                        onClick={() =>
                                            setAttributes({
                                                versionsPosition: position.value,
                                            })
                                        }
                                    />
                                );
                            })}
                        </ToggleGroupControl>
                    )}

                    <ToggleControl
                        label={__('Pagination', 'changeloger')}
                        checked={enablePagination}
                        onChange={() =>
                            setAttributes({
                                enablePagination: !enablePagination,
                            })
                        }
                    />
                    {enablePagination && (
                        <>
                            <SelectControl
                                label={__('Pagination Type', 'changeloger')}
                                value={paginationType}
                                options={[
                                    {label: 'Load More', value: 'load-more'},
                                    {label: 'Numbered', value: 'numbered'},
                                ]}
                                onChange={(newValue) =>
                                    setAttributes({paginationType: newValue})
                                }
                                __nextHasNoMarginBottom
                            />

                            <TextControl
                                label={__('Per Page', 'changeloger')}
                                value={perPage.toString()}
                                type="number"
                                onChange={(newValue) =>
                                    setAttributes({perPage: Number(newValue)})
                                }
                            />
                        </>
                    )}


                    <ToggleControl
                        label={__('Filter', 'changeloger')}
                        checked={enableFilter}
                        onChange={() =>
                            setAttributes({
                                enableFilter: !enableFilter,
                            })
                        }
                    />
                    {enableFilter && (
                        <ToggleGroupControl
                            isBlock
                            value={filterPosition}
                            label={__('Filter Position', 'changeloger')}
                        >
                            {filterPositions.map((position) => {
                                return (
                                    <ToggleGroupControlOptionIcon
                                        icon={position.icon}
                                        value={position.value}
                                        label={position.label}
                                        onClick={() =>
                                            setAttributes({
                                                filterPosition: position.value,
                                            })
                                        }
                                    />
                                );
                            })}
                        </ToggleGroupControl>
                    )}
                </PanelBody>

            </InspectorControls>

            <InspectorControls group='styles'>

                <PanelBody
                    title={__('Log Tags', 'changeloger')}
                    initialOpen={false}
                >
                    <LogTypeColors
                        changelog={parsedChangelog}
                        colors={defaultColors}
                        value={customLogTypeColors}
                        onChange={(newCustomLogTypeColors) => {
                            setAttributes({
                                customLogTypeColors: newCustomLogTypeColors,
                            });
                        }}
                    />
                </PanelBody>

                {enablePagination && (
                    <PanelBody
                        title={__('Pagination', 'changeloger')}
                        initialOpen={false}
                    >

                        <CustomColorControl
                            className='is-list is-first'
                            colors={defaultColors}
                            label={__('Text Color', 'changeloger')}
                            colorValue={paginationTextColor}
                            onColorChange={(newValue) =>
                                setAttributes({
                                    paginationTextColor: newValue,
                                })
                            }
                        />
                        <CustomColorControl
                            className='is-list'
                            colors={defaultColors}
                            label={__('Bg Color', 'changeloger')}
                            colorValue={paginationBgColor}
                            onColorChange={(newValue) =>
                                setAttributes({
                                    paginationBgColor: newValue,
                                })
                            }
                        />

                        <CustomColorControl
                            className='is-list'
                            colors={defaultColors}
                            label={__('Text Hover Color', 'changeloger')}
                            colorValue={paginationHoverTextColor}
                            onColorChange={(newValue) =>
                                setAttributes({
                                    paginationHoverTextColor: newValue,
                                })
                            }
                        />
                        <CustomColorControl
                            className='is-list'
                            colors={defaultColors}
                            label={__('Bg Hover Color', 'changeloger')}
                            colorValue={paginationHoverBgColor}
                            onColorChange={(newValue) =>
                                setAttributes({
                                    paginationHoverBgColor: newValue,
                                })
                            }
                        />

                        {'numbered' === paginationType && (
                            <>
                                <CustomColorControl
                                    className='is-list'
                                    colors={defaultColors}
                                    label={__('Active Text Color', 'changeloger')}
                                    colorValue={paginationActiveTextColor}
                                    onColorChange={(newValue) =>
                                        setAttributes({
                                            paginationActiveTextColor: newValue,
                                        })
                                    }
                                />
                                <CustomColorControl
                                    className='is-list'
                                    colors={defaultColors}
                                    label={__('Active Bg Color', 'changeloger')}
                                    colorValue={paginationActiveBgColor}
                                    onColorChange={(newValue) =>
                                        setAttributes({
                                            paginationActiveBgColor: newValue,
                                        })
                                    }
                                />
                            </>
                        )}
                        <ContrastChecker
                            backgroundColor={paginationBgColor}
                            textColor={paginationTextColor}
                        />


                    </PanelBody>
                )}
            </InspectorControls>
        </>
    );
}

export default Inspector;
