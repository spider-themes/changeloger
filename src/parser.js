export default class ChangelogParser {
	constructor( changelog ) {
		this.changelog = changelog;
		this.datePattern =
				/(\d{2} \w+ \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4}|\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/;
		this.versionPattern = /(?:=+\s*)?([\d.]+|v[\d.]+|#*\s*[\d.]+)(?:\s*-\s*\d{4}-\d{2}-\d{2})?\s*-*\s*=*/;
	}

	parseSection( section ) {
		const rows = section.split( '\n' ).filter( row => row.trim() !== '' );
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

		const version = versionMatch[ 1 ].replace( /#/g, '' );
		const contentRows = rows.slice( 1 );

		const parsedSection = {
			version: version,
			date: dateMatch ? dateMatch[ 0 ] : null,
			changes: this.parseChanges( contentRows ),
		};

		return parsedSection;
	}

	parseChanges( rows ) {
		const changes = [];
		rows.forEach( ( row ) => {
			if ( row.trim() === '' ) {
				return; // Ignore empty rows
			}
			const splitIndexColon = row.indexOf( ':' );
			const splitIndexDash = row.indexOf( ' - ' );
			const splitIndex = (splitIndexColon !== -1 && (splitIndexDash === -1 || splitIndexColon < splitIndexDash)) ? splitIndexColon : splitIndexDash;

			if ( splitIndex !== -1 ) {
				let category = row.substring( 0, splitIndex ).trim();

				// Remove any unwanted symbols at the beginning of the category
				category = category.replace( /^[*->=]+/, '' ).trim();

				const change = row.substring( splitIndex + (splitIndex === splitIndexDash ? 3 : 1) ).trim();
				changes.push( { category, change: this.change } );
			} else if ( row.trim().startsWith( '*' ) ) {
				// Handle changes with categories, e.g.,
				let change = row.trim().replace( /^[*\s-]+/, '' );
				let categorySplitIndex = change.indexOf( ' - ' );
				if ( categorySplitIndex !== -1 ) {
					let category = change.substring( 0, categorySplitIndex ).trim();
					let changeDetail = change.substring( categorySplitIndex + 3 ).trim();
					changes.push( { category, change: this.changeDetail } );
				} else {
					changes.push( { category: 'General', change: this.change } );
				}
			} else if ( row.trim().startsWith( '*' ) ) {
				// Handle changes that may contain links or additional props
				let change = row.trim().replace( /^[*\s-]+/, '' );
				changes.push( { category: 'General', change: this.change } );
			}
		} );
		return changes;
	}

	processLinks( text ) {
		// Regex to find links in the text and convert them to a standard format
		return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
	}

	parse() {
		const cleanedChangelog = this.changelog.replace( /\n\s*(?=\n.*:)/g, '' );
		const sections = cleanedChangelog.split( /\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+)/ );
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
		return segments.join( '.' );
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
