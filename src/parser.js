export default class ChangelogParser {
	constructor( changelog ) {
		this.changelog = changelog;
		this.datePattern =
				/(\d{2} \w+ \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4}|\d{2}\/\d{2}\/\d{4})/;
		this.versionPattern = /(?:=+\s*)?([\d.]+|v[\d.]+)(?:\s*\(.+\))?\s*-*\s*=*/;
	}

	parseSection( section ) {
		const rows = section.split( '\n' );
		const hasEnoughRows = rows.length > 1;

		if ( !hasEnoughRows ) {
			return false;
		}

		const headerRow = rows[ 0 ].trim();
		const dateMatch = this.datePattern.exec( headerRow );
		const versionMatch = this.versionPattern.exec( headerRow );

		if ( !versionMatch ) {
			return false;
		}

		// Skip empty line after date and version
		const contentRows = rows.slice( 1 ).filter( row => row.trim() !== '' );

		const parsedSection = {
			version: versionMatch[ 1 ],
			date: dateMatch ? dateMatch[ 0 ] : null,
			changes: this.parseChanges( contentRows ),
		};

		return parsedSection;
	}

	parseChanges( rows ) {
		const changes = [];
		rows.forEach( ( row ) => {
			const splitIndex = row.indexOf( ':' );
			if ( splitIndex !== -1 ) {
				let category = row.substring( 0, splitIndex ).trim();

				// Remove any unwanted symbols at the beginning of the category
				category = category.replace( /^[*->=]+/, '' ).trim();

				const change = row.substring( splitIndex + 1 ).trim();
				changes.push( { category, change } );
			} else if ( row.trim().startsWith( '*' ) ) {
				// Handle changes with categories, e.g., "* Added - Table Filter Options for all list table"
				let change = row.trim().replace( /^[*\s-]+/, '' );
				let categorySplitIndex = change.indexOf( ' - ' );
				if ( categorySplitIndex !== -1 ) {
					let category = change.substring( 0, categorySplitIndex ).trim();
					let changeDetail = change.substring( categorySplitIndex + 3 ).trim();
					changes.push( { category, change: changeDetail } );
				} else {
					changes.push( { category: 'General', change } );
				}
			}
		} );
		return changes;
	}

	parse() {
		const cleanedChangelog = this.changelog.replace( /\n\s*(?=\n.*:)/g, '' );
		const sections = cleanedChangelog.split( /\n\s*\n/ );
		const changes = [];

		sections.forEach( ( section ) => {
			const parsedSection = this.parseSection( section );
			if ( parsedSection ) {
				changes.push( parsedSection );
			}
		} );

		return changes;
	}

	getVersion( version ) {
		const parsedChanges = this.parse();
		for ( const change of parsedChanges ) {
			if ( change.version === version ) {
				return change;
			}
		}
		return null;
	}

	normalizeVersion( version ) {
		const segments = version.split( '.' );
		while ( segments[ segments.length - 1 ] === '0' ) {
			segments.pop();
		}
		return segments.join( '.' );
	}

	getParentVersion( version ) {
		const segments = version.split( '.' );
		if ( segments.length <= 1 ) {
			return null; // Base version, no parent (e.g., "1")
		}
		segments.pop(); // Remove the last segment
		return segments.join( '.' ); // Reconstruct the parent version
	}

	getVersions() {
		const parsedChanges = this.parse();
		const hierarchicalChanges = [];
		const versionMap = {};
		const processedVersions = new Set();

		// 1st pass: Populate the versionMap and hierarchicalChanges
		parsedChanges.forEach( ( change ) => {
			const normalizedVersion = this.normalizeVersion( change.version );
			versionMap[ normalizedVersion ] = { ...change, children: [] };
			hierarchicalChanges.push( versionMap[ normalizedVersion ] );
		} );

		// 2nd pass: Check for hierarchical relationships
		parsedChanges.forEach( ( change ) => {
			const parentVersion = this.getParentVersion( this.normalizeVersion( change.version ) );

			if ( parentVersion && versionMap[ parentVersion ] ) {
				versionMap[ parentVersion ].children.push( change );
				processedVersions.add( change.version );
			}
		} );

		// Filter out versions that have been nested
		return hierarchicalChanges.filter( ( change ) => !processedVersions.has( change.version ) );
	}
}
