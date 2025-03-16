/**
 * WordPress Dependencies
 */
import classnames from 'classnames';
import {
    Button,
    ColorIndicator,
    Dropdown
} from '@wordpress/components';
import {get} from 'lodash';
import {
    __experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';
import CustomColorControl from "./custom-color-control";

function LogTypeColors(props) {
    const getUniqueCategory = () => {
        const finalCategory = [];
        props.changelog.forEach((item) => {
            const categories = [];
            item.changes.forEach((change) => {
                if (!finalCategory.includes(change.category)) {
                    if (!categories.includes(change.category)) {
                        categories.push(change.category);
                    }
                }
            });

            finalCategory.push(...categories);
        });

        return finalCategory;
    };

    const categories = getUniqueCategory();

    return categories.map((category, index) => {
        const clrValue = get(props.value, category.toLowerCase(), '');
// const onColorChange = get(props.onChange)
        return (
            <>

                <CustomColorControl
                    className={categories.length > 0
                    && index === 0
                        ? 'is-list is-first'
                        : 'is-list'
                    }
                    colors={props.colors}
                    label={category.concat(' Color')}
                    colorValue={clrValue}
                    onColorChange={(newColor) =>
                        props.onChange({
                            ...props.value,
                            [category.toLowerCase()]: newColor,
                        })
                    }
                />
            </>
        );
    });
}

export default LogTypeColors;
