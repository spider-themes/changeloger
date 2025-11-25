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
	 * @return array|false The parsed section or false if invalid.
	 */
	private function parse_section( $section ) {
		$rows = array_filter( explode( "\n", $section ), function( $row ) {
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

		$version = trim( $version_match[1] );
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

			$split_index = ( $split_index_colon !== false &&
				( $split_index_dash === false || $split_index_colon < $split_index_dash ) )
				? $split_index_colon
				: $split_index_dash;

			if ( $split_index !== false ) {
				$category = trim( substr( $row, 0, $split_index ) );
				
				// JS: category = category.trim(); (Already done)
				
				$start_pos = $split_index + ( $split_index === $split_index_dash ? 3 : 1 );
				$change = trim( substr( $row, $start_pos ) );
				
				$changes[] = [
					'category' => $category,
					'change'   => $this->process_links( $change ),
				];
			} elseif ( strpos( trim( $row ), '*' ) === 0 ) {
				// Handle changes starting with *
				$change = preg_replace( '/^[*\s-]+/', '', trim( $row ) );
				$category_split_index = strpos( $change, ' - ' );
				
				if ( $category_split_index !== false ) {
					$category = trim( substr( $change, 0, $category_split_index ) );
					$change_detail = trim( substr( $change, $category_split_index + 3 ) );
					$changes[] = [
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
                 $change = preg_replace( '/^[*\s-]+/', '', trim( $row ) );
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
     * Render the changelog HTML.
     *
     * @param array $attributes The block attributes.
     * @return string The rendered HTML.
     */
    public function render( $attributes ) {
        $changelog_text = isset( $attributes['changelog'] ) ? $attributes['changelog'] : '';
        $parsed_changelog = $this->parse( $changelog_text );
        
        $custom_links = isset( $attributes['customLinks'] ) ? $attributes['customLinks'] : [];
        $version_name = isset( $attributes['versionName'] ) ? $attributes['versionName'] : [];
        $custom_log_type_colors = isset( $attributes['customLogTypeColors'] ) ? $attributes['customLogTypeColors'] : [];
        $unique_id = isset( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : uniqid( 'changeloger-' );

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
                    $unique_categories = array_unique( array_map( function( $change ) {
                        return strtolower( $change['category'] );
                    }, $changes ) );
                    
                    ?>
                    <div
                        id="<?php echo esc_attr( $unique_id . '-' . $version ); ?>"
                        class="changelog-info-item"
                        data-filter="<?php echo esc_attr( implode( ' ', $unique_categories ) ); ?>"
                    >
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
                                        <?php echo $style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                        class="tag <?php echo esc_attr( $category_class ); ?>"
                                    >
                                        <?php echo esc_html( $change_item['category'] ); ?>
                                    </span>
                                    <span class="change"><?php echo wp_kses_post( $change_item['change'] ); ?></span>
                                </p>
                            <?php endforeach; ?>

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
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
