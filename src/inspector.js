import React from 'react';

import {map} from 'lodash';
import {__} from '@wordpress/i18n';

import {useSelect} from '@wordpress/data';
import {InspectorControls} from '@wordpress/block-editor';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
    } = attributes;
    const positions = [
        {
            label: __('Left', 'changeloger'),
            value: 'left',
        },
        {
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
                        {positions.map((position) => {
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
            </PanelBody>


            <PanelBody
                title={__('Log Tags Color', 'changeloger')}
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
                    title={__('Pagination Styling', 'changeloger')}
                    initialOpen={false}
                >

                    <CustomColorControl
                        className='is-list is-first'
                        colors={defaultColors}
                        label={__('Pagination Text Color', 'changeloger')}
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
                        label={__('Pagination Bg Color', 'changeloger')}
                        colorValue={paginationBgColor}
                        onColorChange={(newValue) =>
                            setAttributes({
                                paginationBgColor: newValue,
                            })
                        }
                    />

                    {'numbered' === paginationType && (
                        <>
                            <CustomColorControl
                                className='is-list'
                                colors={defaultColors}
                                label={__('Pagination Active Text Color', 'changeloger')}
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
                                label={__('Pagination Active Bg Color', 'changeloger')}
                                colorValue={paginationActiveBgColor}
                                onColorChange={(newValue) =>
                                    setAttributes({
                                        paginationActiveBgColor: newValue,
                                    })
                                }
                            />
                        </>
                    )}


                </PanelBody>
            )}
        </InspectorControls>
    );
}

export default Inspector;
