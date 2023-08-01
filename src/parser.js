export default class ChangelogParser {
	constructor( changelog ) {
		this.changelog = changelog;
		this.datePattern =
			/(\d{2} \w+ \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})/;
		this.versionPattern = /[\d.]+|v[\d.]+/;
	}

	parseSection( section ) {
		const rows = section.split( '\n' );
		const hasEnoughRows = rows.length > 1;

		if ( ! hasEnoughRows ) {
			return false;
		}

		const headerRow = rows[ 0 ];
		const dateMatch = this.datePattern.exec( headerRow );
		const versionMatch = this.versionPattern.exec( headerRow );

		if ( ! dateMatch || ! versionMatch ) {
			return false;
		}

		const parsedSection = {
			date: dateMatch[ 0 ],
			version: versionMatch[ 0 ],
			changes: this.parseChanges( rows.slice( 1 ) ),
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
			}
		} );
		return changes;
	}

	parse() {
		const cleanedChangelog = this.changelog.replace(
			/\n\s*(?=\n.*:)/g,
			''
		);

		const sections = cleanedChangelog.split( /\n\s*\n/ );
		let changes = [];

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
		for ( let change of parsedChanges ) {
			if ( change.version === version ) {
				return change;
			}
		}
		return null;
	}

	normalizeVersion( version ) {
		let segments = version.split( '.' );
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
		for ( let change of parsedChanges ) {
			const parentVersion = this.getParentVersion(
				this.normalizeVersion( change.version )
			);

			if (
				parentVersion &&
				versionMap[ parentVersion ] &&
				parentVersion !== this.normalizeVersion( change.version )
			) {
				if (
					! versionMap[ parentVersion ].children.includes( change ) &&
					! processedVersions.has( change.version )
				) {
					versionMap[ parentVersion ].children.push( change );
					processedVersions.add( change.version );
				}
			}
		}

		// Filter out versions that have been nested
		return hierarchicalChanges.filter(
			( change ) => ! processedVersions.has( change.version )
		);
	}
}
