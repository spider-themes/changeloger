<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Changelog_Renderer {

    private $date_pattern = '/\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})\b/';
    private $version_pattern = '/(?:[vV]?\s*)?(\d+(\.\d+){0,3})(?:\s*\(.*\))?/';

    /**
     * Parse the changelog text into a structured array.
     *
     * @param string $changelog The changelog text.
     *
     * @return array The parsed changelog.
     */
    public function parse( $changelog ) {
        // Remove newlines before a section start to clean up
        $cleaned_changelog = preg_replace( '/\n\s*(?=\n.*:)/', '', $changelog );

        // Split by section headers (dates, versions, etc.)
        // Regex ported from JS: /\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+|-{1,12}\s*[\d.]+\s*\(.*\)\s*-{1,12})/
        $sections = preg_split(
                '/\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+|-{1,12}\s*[\d.]+\s*\(.*\)\s*-{1,12})/',
                $cleaned_changelog
        );

        $changes = [];

        foreach ( $sections as $section ) {
            $parsed_section = $this->parse_section( $section );
            if ( $parsed_section ) {
                $changes[] = $parsed_section;
            }
        }

        return $changes;
    }

    /**
     * Parse a single section of the changelog.
     *
     * @param string $section The section text.
     *
     * @return array|false The parsed section or false if invalid.
     */
    private function parse_section( $section ) {
        $rows = array_filter( explode( "\n", $section ), function ( $row ) {
            return trim( $row ) !== '';
        } );

        // Re-index array
        $rows = array_values( $rows );

        if ( count( $rows ) <= 1 ) {
            return false;
        }

        $header_row = trim( $rows[0] );

        preg_match( $this->date_pattern, $header_row, $date_match );
        preg_match( $this->version_pattern, $header_row, $version_match );

        if ( empty( $version_match ) ) {
            return false;
        }

        $version      = trim( $version_match[1] );
        $content_rows = array_slice( $rows, 1 );

        return [
                'version' => $version,
                'date'    => ! empty( $date_match ) ? $date_match[0] : null,
                'changes' => $this->parse_changes( $content_rows ),
        ];
    }

    /**
     * Parse the changes lines.
     *
     * @param array $rows The lines of changes.
     *
     * @return array The parsed changes.
     */
    private function parse_changes( $rows ) {
        $changes = [];

        foreach ( $rows as $row ) {
            if ( trim( $row ) === '' ) {
                continue;
            }

            $split_index_colon = strpos( $row, ':' );
            $split_index_dash  = strpos( $row, ' - ' );

            $split_index = ( $split_index_colon !== false
                             && ( $split_index_dash === false || $split_index_colon < $split_index_dash ) )
                    ? $split_index_colon
                    : $split_index_dash;

            if ( $split_index !== false ) {
                $category = trim( substr( $row, 0, $split_index ) );

                // JS: category = category.trim(); (Already done)

                $start_pos = $split_index + ( $split_index === $split_index_dash ? 3 : 1 );
                $change    = trim( substr( $row, $start_pos ) );

                $changes[] = [
                        'category' => $category,
                        'change'   => $this->process_links( $change ),
                ];
            } elseif ( strpos( trim( $row ), '*' ) === 0 ) {
                // Handle changes starting with *
                $change               = preg_replace( '/^[*\s-]+/', '', trim( $row ) );
                $category_split_index = strpos( $change, ' - ' );

                if ( $category_split_index !== false ) {
                    $category      = trim( substr( $change, 0, $category_split_index ) );
                    $change_detail = trim( substr( $change, $category_split_index + 3 ) );
                    $changes[]     = [
                            'category' => $category,
                            'change'   => $this->process_links( $change_detail ),
                    ];
                } else {
                    $changes[] = [
                            'category' => 'General',
                            'change'   => $this->process_links( $change ),
                    ];
                }
            } elseif ( strpos( trim( $row ), '-' ) === 0 ) {
                // Handle changes starting with - (common in markdown lists)
                $change    = preg_replace( '/^[*\s-]+/', '', trim( $row ) );
                $changes[] = [
                        'category' => 'General',
                        'change'   => $this->process_links( $change ),
                ];
            }
        }

        return $changes;
    }

    /**
     * Convert markdown links to HTML anchors.
     *
     * @param string $text The text to process.
     *
     * @return string The processed text.
     */
    private function process_links( $text ) {
        return preg_replace( '/\[(.*?)\]\((.*?)\)/', '<a href="$2">$1</a>', $text );
    }

    /**
     * Helper to get value from array using dot notation or key.
     * Simplified for this use case (mostly direct keys).
     */
    private function get( $array, $key, $default = null ) {
        return isset( $array[ $key ] ) ? $array[ $key ] : $default;
    }

    /**
     * Normalize version to semantic versioning format (major.minor.patch)
     *
     * @param string $version The version string.
     *
     * @return string The normalized version.
     */
    public function normalize_version( $version ) {
        $segments = explode( '.', $version );

        // Ensure at least three parts (major.minor.patch)
        if ( count( $segments ) === 1 ) {
            $segments[] = '0'; // Add minor version as 0
            $segments[] = '0'; // Add patch version as 0
        } elseif ( count( $segments ) === 2 ) {
            $segments[] = '0'; // Add patch version as 0
        }

        return implode( '.', $segments );
    }

    /**
     * Compare two versions using semantic versioning rules.
     *
     * @param string $v1 First version.
     * @param string $v2 Second version.
     *
     * @return int Returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
     */
    public function compare_versions( $v1, $v2 ) {
        $a = array_map( 'intval', explode( '.', $v1 ) );
        $b = array_map( 'intval', explode( '.', $v2 ) );

        $max_length = max( count( $a ), count( $b ) );

        // Pad with zeros to match length
        $a = array_pad( $a, $max_length, 0 );
        $b = array_pad( $b, $max_length, 0 );

        // Compare each part of the version (major, minor, patch)
        for ( $i = 0; $i < $max_length; $i ++ ) {
            if ( $a[ $i ] > $b[ $i ] ) {
                return 1;
            }
            if ( $a[ $i ] < $b[ $i ] ) {
                return - 1;
            }
        }

        return 0; // Versions are equal
    }

    /**
     * Get versions grouped by major.minor.x format and sorted in descending order.
     *
     * @param string $changelog_text The changelog text.
     *
     * @return array The grouped and sorted versions.
     */
    public function get_versions( $changelog_text ) {
        $parsed_changes = $this->parse( $changelog_text );
        $grouped        = [];

        // Group versions by major.minor.x format
        foreach ( $parsed_changes as $change ) {
            $normalized_version = $this->normalize_version( $change['version'] );

            // Split the normalized version into major and minor (e.g., "2.7" from "2.7.0")
            $parts       = explode( '.', $normalized_version );
            $major_minor = $parts[0] . '.' . $parts[1] . '.x'; // Group by "major.minor.x"

            // If the group doesn't exist, create it
            if ( ! isset( $grouped[ $major_minor ] ) ) {
                $grouped[ $major_minor ] = [
                        'version'  => $major_minor,
                        'children' => [],
                ];
            }

            // Push the full version into its group
            $change['version']                     = $normalized_version;
            $change['children']                    = [];
            $grouped[ $major_minor ]['children'][] = $change;
        }

        // Convert to array and sort versions (descending order)
        $result = array_values( $grouped );

        // Sort versions inside each group in descending order
        foreach ( $result as &$group ) {
            usort(
                    $group['children'],
                    function ( $a, $b ) {
                        return $this->compare_versions( $b['version'], $a['version'] );
                    }
            );
        }

        // Sort the groups themselves (major.minor.x) in descending order
        usort(
                $result,
                function ( $a, $b ) {
                    return $this->compare_versions( $b['version'], $a['version'] );
                }
        );

        return $result;
    }

    /**
     * Convert parsed changelog data to plain text format.
     *
     * @param array $data The parsed changelog array.
     *
     * @return string The plain text representation.
     */
    public function convert_to_plain_text( $data ) {
        $output = '';

        foreach ( $data as $item ) {
            $output .= '= ' . $item['version'] . ' (' . $item['date'] . ') =' . "\n";

            foreach ( $item['changes'] as $change ) {
                $output .= $change['category'] . ': ' . wp_strip_all_tags( $change['change'] ) . "\n";
            }

            $output .= "\n";
        }

        return trim( $output );
    }

    /**
     * Check if a new version has been added with a higher version number.
     *
     * @param array $prev_changelog Previous changelog array.
     * @param array $new_changelog  New changelog array.
     *
     * @return bool True if a new version with higher number was added.
     */
    public function has_new_version_added( $prev_changelog, $new_changelog ) {
        // Validate inputs
        if ( ! is_array( $prev_changelog ) || ! is_array( $new_changelog ) ) {
            return false;
        }

        // If previous changelog is empty, it's a new version
        if ( empty( $prev_changelog ) && ! empty( $new_changelog ) ) {
            return true;
        }

        // If new changelog is empty, no new version
        if ( empty( $new_changelog ) ) {
            return false;
        }

        // Get the highest version from previous changelog
        $prev_versions = array_map(
                function ( $item ) {
                    return $item['version'];
                },
                $prev_changelog
        );

        $highest_prev_version = null;
        if ( ! empty( $prev_versions ) ) {
            $highest_prev_version = $prev_versions[0];
            foreach ( $prev_versions as $version ) {
                if ( $this->compare_versions( $version, $highest_prev_version ) > 0 ) {
                    $highest_prev_version = $version;
                }
            }
        }

        // Get the highest version from new changelog
        $new_versions = array_map(
                function ( $item ) {
                    return $item['version'];
                },
                $new_changelog
        );

        $highest_new_version = null;
        if ( ! empty( $new_versions ) ) {
            $highest_new_version = $new_versions[0];
            foreach ( $new_versions as $version ) {
                if ( $this->compare_versions( $version, $highest_new_version ) > 0 ) {
                    $highest_new_version = $version;
                }
            }
        }

        // Check if highest new version is greater than highest previous version
        if ( $highest_new_version && $highest_prev_version ) {
            return $this->compare_versions( $highest_new_version, $highest_prev_version ) > 0;
        }

        return false;
    }

    /**
     * Render the changelog HTML.
     *
     * @param array $attributes The block attributes.
     *
     * @return string The rendered HTML.
     */
    public function render( $attributes ) {
        $changelog_text   = isset( $attributes['changelog'] ) ? $attributes['changelog'] : '';
        $parsed_changelog = $this->parse( $changelog_text );

        $custom_links           = isset( $attributes['customLinks'] ) ? $attributes['customLinks'] : [];
        $version_name           = isset( $attributes['versionName'] ) ? $attributes['versionName'] : [];
        $custom_log_type_colors = isset( $attributes['customLogTypeColors'] ) ? $attributes['customLogTypeColors'] : [];
        $unique_id              = isset( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : uniqid( 'changeloger-' );
        ob_start();
        ?>
        <div class="changeloger-info-inner-wrapper">
            <div class="changeloger-items">
                <?php foreach ( $parsed_changelog as $item ) :
                    $date = $item['date'];
                    $version = $item['version'];
                    $changes = $item['changes'];

                    $current_links = $this->get( $custom_links, $version, [] );

                    // Get unique categories for data-filter
                    $unique_categories = array_unique( array_map( function ( $change ) {
                        return strtolower( $change['category'] );
                    }, $changes ) );

                    ?>
                    <div
                            id="<?php echo esc_attr( $unique_id . '-' . $version ); ?>"
                            class="changelog-info-item"
                            data-filter="<?php echo esc_attr( implode( ' ', $unique_categories ) ); ?>">
                        <div class="date">
                            <span><?php echo esc_html( $date ); ?></span>

                            <?php if ( ! empty( $this->get( $version_name, $version ) ) ) : ?>
                                <span class="changeloger-version-name">
                                    <?php echo esc_html( $this->get( $version_name, $version ) ); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                        <div class="version">
                            <span class="version-tag"><?php echo esc_html( $version ); ?></span>
                            <span class="line"></span>
                        </div>
                        <div class="content">
                            <?php foreach ( $changes as $change_item ) :
                                $current_category = strtolower( $change_item['category'] );
                                $has_custom_color = isset( $custom_log_type_colors[ $current_category ] );
                                $category_class = strtolower( str_replace( ' ', '-', $current_category ) );

                                $style = '';
                                if ( $has_custom_color ) {
                                    $style = 'style="background-color: ' . esc_attr( $custom_log_type_colors[ $current_category ] ) . ';"';
                                }
                                ?>
                                <p>
                                    <span
                                        <?php echo $style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                        ?>
                                        class="tag <?php echo esc_attr( $category_class ); ?>"><?php echo esc_html( $change_item['category'] ); ?></span>
                                    <span class="change"><?php echo wp_kses_post( $change_item['change'] ); ?></span>
                                </p>
                            <?php endforeach; ?>

                            <?php if ( ! empty( $current_links ) && is_array( $current_links ) ) : ?>
                                <div class="changeloger-link-wrapper">
                                    <?php foreach ( $current_links as $item_link ) : ?>
                                        <a
                                                href="<?php echo esc_url( $item_link['link'] ); ?>"
                                                class="changeloger-custom-link"
                                                target="_blank"
                                        >
                                            <?php if ( ! empty( $item_link['icon'] ) ) : ?>
                                                <span
                                                        class="changeloger-custom-link-icon"
                                                        style="WebkitMaskImage: url(<?php echo esc_url( $item_link['icon'] ); ?>);"
                                                ></span>
                                            <?php endif; ?>
                                            <?php echo esc_html( $item_link['name'] ); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php

        $html = ob_get_clean();

        // Minify HTML: remove extra whitespace
        $html = preg_replace( '/\s+/', ' ', $html ); // Replace multiple spaces with single space
        $html = preg_replace( '/>\s+</', '><', $html ); // Remove spaces between tags
        $html = trim( $html ); // Remove leading/trailing whitespace

        return $html;
    }

    /**
     * Render version tree HTML (equivalent to React VersionsTree component).
     *
     * @param string $changelog_text The changelog text to parse.
     * @param string $unique_id      The unique ID for anchors (e.g., 'changeloger-123').
     * @param bool   $is_child       Whether this is a child tree (for recursive calls).
     *
     * @return string The rendered HTML for the version tree.
     */
    public function render_versiontree( $changelog_text, $unique_id = '', $is_child = false ) {
        // If not a child call, get the grouped versions
        if ( ! $is_child ) {
            if ( empty( $unique_id ) ) {
                $unique_id = 'cha-' . uniqid();
            }
            $versions = $this->get_versions( $changelog_text );
        } else {
            // For child calls, $changelog_text actually contains the versions array
            $versions = $changelog_text;
        }

        ob_start();
        ?>
        <ul class="<?php echo ! $is_child ? 'changeloger-version-list-wrapper' : ''; ?>">
            <?php foreach ( $versions as $version ) :
                $has_children = ! empty( $version['children'] ) && is_array( $version['children'] ) && count( $version['children'] ) > 0;
                ?>
                <li class="<?php echo $is_child ? 'changeloger-version-list-main-item' : ''; ?>">
                    <a href="#<?php echo esc_attr( $unique_id . '-' . $version['version'] ); ?>">
                        Version <?php echo esc_html( $version['version'] ); ?>
                    </a>
                    <?php if ( $has_children ) : ?>
                        <?php echo $this->render_versiontree_children( $version['children'],
                                $unique_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
        <?php

        $html = ob_get_clean();

        // Minify HTML: remove extra whitespace
        $html = preg_replace( '/\s+/', ' ', $html ); // Replace multiple spaces with single space
        $html = preg_replace( '/>\s+</', '><', $html ); // Remove spaces between tags
        $html = trim( $html ); // Remove leading/trailing whitespace

        return $html;
    }

    /**
     * Helper function to render child version trees recursively.
     *
     * @param array  $versions  The child versions array.
     * @param string $unique_id The unique ID for anchors.
     *
     * @return string The rendered HTML for child versions.
     */
    private function render_versiontree_children( $versions, $unique_id ) {
        ob_start();
        ?>
        <ul class="">
            <?php foreach ( $versions as $version ) :
                $has_children = ! empty( $version['children'] ) && is_array( $version['children'] ) && count( $version['children'] ) > 0;
                ?>
                <li class="changeloger-version-list-main-item">
                    <a href="#<?php echo esc_attr( $unique_id . '-' . $version['version'] ); ?>">
                        Version <?php echo esc_html( $version['version'] ); ?>
                    </a>
                    <?php if ( $has_children ) : ?>
                        <?php echo $this->render_versiontree_children( $version['children'],
                                $unique_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
        <?php
        return ob_get_clean();
    }
}
