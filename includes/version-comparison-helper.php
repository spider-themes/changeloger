<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Compare two version strings
 *
 * Compares two version strings using semantic versioning rules.
 * Supports formats like: 1.0.0, 2.0, 1.0.0-beta, etc.
 *
 * @param string $version1 First version string
 * @param string $version2 Second version string
 *
 * @return int Returns 1 if version1 > version2, -1 if version1 < version2, 0 if equal
 */
function cha_compare_versions( $version1, $version2 ) {
	if ( ! is_string( $version1 ) || ! is_string( $version2 ) ) {
		return 0;
	}

	$version1 = trim( $version1 );
	$version2 = trim( $version2 );

	// Handle identical versions
	if ( $version1 === $version2 ) {
		return 0;
	}

	// Use WordPress version comparison if available
	if ( function_exists( 'version_compare' ) ) {
		$result = version_compare( $version1, $version2 );
		if ( $result > 0 ) {
			return 1;
		} elseif ( $result < 0 ) {
			return -1;
		} else {
			return 0;
		}
	}

	// Fallback: Manual version parsing
	return cha_manual_version_compare( $version1, $version2 );
}

/**
 * Manual version comparison fallback
 *
 * @param string $v1 Version 1
 * @param string $v2 Version 2
 *
 * @return int
 */
function cha_manual_version_compare( $v1, $v2 ) {
	// Extract numeric parts
	$v1_parts = cha_parse_version( $v1 );
	$v2_parts = cha_parse_version( $v2 );

	// Compare major, minor, patch
	for ( $i = 0; $i < 3; $i++ ) {
		$v1_num = isset( $v1_parts[ $i ] ) ? (int) $v1_parts[ $i ] : 0;
		$v2_num = isset( $v2_parts[ $i ] ) ? (int) $v2_parts[ $i ] : 0;

		if ( $v1_num > $v2_num ) {
			return 1;
		} elseif ( $v1_num < $v2_num ) {
			return -1;
		}
	}

	// Check pre-release versions
	$v1_prerelease = cha_extract_prerelease( $v1 );
	$v2_prerelease = cha_extract_prerelease( $v2 );

	if ( ! empty( $v1_prerelease ) && ! empty( $v2_prerelease ) ) {
		if ( $v1_prerelease > $v2_prerelease ) {
			return 1;
		} elseif ( $v1_prerelease < $v2_prerelease ) {
			return -1;
		}
	} elseif ( empty( $v1_prerelease ) && ! empty( $v2_prerelease ) ) {
		return 1; // Release version is greater than pre-release
	} elseif ( ! empty( $v1_prerelease ) && empty( $v2_prerelease ) ) {
		return -1; // Pre-release is less than release version
	}

	return 0;
}

/**
 * Parse version string into numeric components
 *
 * @param string $version Version string
 *
 * @return array Array of version parts [major, minor, patch, ...]
 */
function cha_parse_version( $version ) {
	// Extract numeric and dot parts only for version comparison
	$version = preg_replace( '/^v/i', '', $version ); // Remove leading 'v'
	$version = preg_replace( '/[^0-9.].*$/', '', $version ); // Remove non-numeric parts after version

	if ( empty( $version ) ) {
		return [ 0, 0, 0 ];
	}

	$parts = explode( '.', $version );

	// Ensure we have at least 3 parts (major.minor.patch)
	while ( count( $parts ) < 3 ) {
		$parts[] = '0';
	}

	return $parts;
}

/**
 * Extract pre-release identifier from version string
 *
 * @param string $version Version string
 *
 * @return string Pre-release identifier or empty string
 */
function cha_extract_prerelease( $version ) {
	// Look for pre-release identifiers like -alpha, -beta, -rc, -dev, etc.
	if ( preg_match( '/-(alpha|beta|rc|dev|a|b|c)(\d*)/i', $version, $matches ) ) {
		return strtolower( $matches[1] . $matches[2] );
	}

	return '';
}

/**
 * Check if version string is valid semantic version
 *
 * @param string $version Version string to validate
 *
 * @return bool True if valid, false otherwise
 */
function cha_is_valid_version( $version ) {
	// Simple check for version pattern
	return (bool) preg_match( '/^\d+(\.\d+)*(-[a-zA-Z0-9]+)*$/', trim( $version ) );
}

