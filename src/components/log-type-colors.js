/**
 * WordPress Dependencies
 */
import { BaseControl, ColorPalette } from '@wordpress/components';
import { get } from 'lodash';

function LogTypeColors( props ) {
	const getUniqueCategory = () => {
		const finalCategory = [];
		props.changelog.forEach( ( item ) => {
			const categories = [];
			item.changes.forEach( ( change ) => {
				if ( ! finalCategory.includes( change.category ) ) {
					if ( ! categories.includes( change.category ) ) {
						categories.push( change.category );
					}
				}
			} );

			finalCategory.push( ...categories );
		} );

		return finalCategory;
	};

	const categories = getUniqueCategory();

	return categories.map( ( category, index ) => {
		const value = get( props.value, category.toLowerCase(), '' );

		return (
			<BaseControl key={ index } label={ category.concat( ' Color' ) }>
				<ColorPalette
					value={ value }
					colors={ props.colors }
					onChange={ ( newColor ) =>
						props.onChange( {
							...props.value,
							[ category.toLowerCase() ]: newColor,
						} )
					}
				/>
			</BaseControl>
		);
	} );
}

export default LogTypeColors;
