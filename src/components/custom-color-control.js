import {useState} from '@wordpress/element';
import classnames from 'classnames';
import {
    Button,
    ColorIndicator,
    Dropdown
} from '@wordpress/components';

import {

    __experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

const CustomColorControl = ({
                                label, colorValue,
                                onColorChange,
                                colors = [],
                                className
                            }) => {

    return (
        <Dropdown
            popoverProps={{
                placement: 'left-start',
                offset: 36,
                shift: true
            }}
            className={
                `changeloger-color-dropdown-control ${className}`
            }
            contentClassName="changeloger-color-dropdown-control-content"
            renderToggle={({isOpen, onToggle}) => (
                <Button
                    className={
                        `changeloger-color-dropdown-control-button ${isOpen && 'is-open'} ${className}`
                    }
                    onClick={onToggle}
                    aria-expanded={isOpen}
                >
                    <ColorIndicator
                        colorValue={colorValue ?? gradientValue}
                    />

                    {label}
                </Button>
            )}
            renderContent={() => (
                <ColorGradientControl
                    colors={colors}
                    colorValue={colorValue}
                    onColorChange={onColorChange}
                    // gradientValue={ gradientValue }
                    // onGradientChange={ onGradientChange }
                />
            )}
        />
    );
};

export default CustomColorControl;