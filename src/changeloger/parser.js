export default class ChangelogParser {
    constructor(changelog) {
        this.changelog = changelog;
        this.datePattern =
            /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})\b/;
        this.versionPattern = /(?:[vV]?\s*)?(\d+(\.\d+){0,3})(?:\s*\(.*\))?/;
    }

    parseSection(section) {
        const rows = section.split('\n').filter((row) => row.trim() !== '');
        const hasEnoughRows = rows.length > 1;

        if (!hasEnoughRows) {
            return false;
        }

        const headerRow = rows[0].trim();
        const dateMatch = this.datePattern.exec(headerRow);
        const versionMatch = this.versionPattern.exec(headerRow);

        if (!versionMatch) {
            return false;
        }

        const version = versionMatch[1].trim();
        const contentRows = rows.slice(1);

        const parsedSection = {
            version: version,
            date: dateMatch ? dateMatch[0] : null,
            changes: this.parseChanges(contentRows)
        };

        return parsedSection;
    }

    parseChanges(rows) {
        const changes = [];
        let currentCategory = 'General';

        rows.forEach((row) => {
            if (row.trim() === '') {
                return; // Ignore empty rows
            }

            // Check for double asterisk format (**Category:**)
            const doubleAsteriskMatch = row.match(/^\*\*([^*]+)\*\*\s*:?\s*$/);
            if (doubleAsteriskMatch) {
                currentCategory = doubleAsteriskMatch[1].trim();
                return;
            }

            // Check for single asterisk format (* item)
            if (row.trim().startsWith('*')) {
                let change = row.trim().replace(/^\*\s*/, '');
                changes.push({
                    category: currentCategory, 
                    change: this.processLinks(change),

                });
            } else {
                // Handle traditional format (Category: change or Category - change)
                const splitIndexColon = row.indexOf(':');
                const splitIndexDash = row.indexOf(' - ');
                const splitIndex =
                    splitIndexColon !== -1 &&
                    (splitIndexDash === -1 || splitIndexColon < splitIndexDash)
                        ? splitIndexColon
                        : splitIndexDash;

                if (splitIndex !== -1) {
                    let category = row.substring(0, splitIndex).trim();
                    category = category.trim();

                    const change = row.substring(
                        splitIndex + (splitIndex === splitIndexDash ? 3 : 1)).trim();
                    changes.push({
                        category, 
                        change: this.processLinks(change)
                    });
                }
            }
        });
        return changes;
    }

    processLinks(text) {
        // Regex to find Markdown-style links and convert them to HTML anchor tags
        return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    }

    parse() {
        const cleanedChangelog = this.changelog.replace(/\n\s*(?=\n.*:)/g, '');
        const sections = cleanedChangelog.split(
            /\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+|-{1,12}\s*[\d.]+\s*\(.*\)\s*-{1,12}|\s*=\s*[\d.]+\s*\(.*?\)\s*=)/,
        );
        const changes = [];

        sections.forEach((section) => {
            const parsedSection = this.parseSection(section);
            if (parsedSection) {
                changes.push(parsedSection);
            }
        });
        return changes;
    }

    normalizeVersion(version) {
        const segments = version.split('.');

        // Ensure at least three parts (major .minor.patch)
        if (segments.length === 1) {
            segments.push('0', '0'); // Add patch version as 0 if only major
        } else if (segments.length === 2) {
            segments.push('0'); // Add patch version as 0 if only major and minor
        }

        return segments.join('.');
    }

    getVersions() {
        const parsedChanges = this.parse(); // Assuming parsedChanges are your version data
        const grouped = {};

        // Group versions by major.minor.x format
        parsedChanges.forEach((change) => {
            const normalizedVersion = this.normalizeVersion(change.version);

            // Split the normalized version into major and minor (e.g., "2.7" from "2.7.0")
            const parts = normalizedVersion.split(".");
            const majorMinor = `${parts[0]}.${parts[1]}.x`; // Group by "major.minor.x"

            // If the group doesn't exist, create it
            if (!grouped[majorMinor]) {
                grouped[majorMinor] = {
                    version: majorMinor,
                    children: []
                };
            }

            // Push the full version into its group
            grouped[majorMinor].children.push({
                ...change,
                version: normalizedVersion,
                children: []
            });
        });

        // Convert object to array & sort versions (descending order)
        const result = Object.values(grouped).map(group => {
            // Sort versions inside each group in descending order
            group.children.sort((a, b) => this.compareVersions(b.version, a.version));
            return group;
        });

        // Sort the groups themselves (major.minor.x) in descending order
        result.sort((a, b) => this.compareVersions(b.version, a.version));

        return result;
    }

// Function to compare versions in semantic versioning order
    compareVersions(v1, v2) {
        const a = v1.split('.').map(num => parseInt(num, 10)); // Convert to numbers
        const b = v2.split('.').map(num => parseInt(num, 10)); // Convert to numbers

        // Compare each part of the version (major, minor, patch)
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if ((a[i] || 0) > (b[i] || 0)) return 1;
            if ((a[i] || 0) < (b[i] || 0)) return -1;
        }

        return 0; // Versions are equal
    }

    // convert to plain text
    convertToPlainText(data) {
        let output = "";
        data.forEach((item) => {
           output +=`= ${item.version} (${item.date}) =\n`;
           item.changes.forEach((change)=>{
            output +=`${change.category}: ${change.change}\n`;
           })
           output +="\n";
        });
        return output.trim();
    }


}