<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
define('ABSPATH', __DIR__ . '/');

try {
    // Mock WordPress functions
    if (!function_exists('esc_html')) {
        function esc_html($text) { return htmlspecialchars($text); }
    }
    if (!function_exists('esc_attr')) {
        function esc_attr($text) { return htmlspecialchars($text); }
    }
    if (!function_exists('esc_url')) {
        function esc_url($url) { return $url; }
    }
    if (!function_exists('wp_kses_post')) {
        function wp_kses_post($text) { return $text; }
    }
    if (!function_exists('__')) {
        function __($text, $domain) { return $text; }
    }

    require_once __DIR__ . '/includes/class-changelog-renderer.php';

    $renderer = new Changelog_Renderer();

    // Add your changelog content here - you can add multiple versions
    $changelog_text = "
= 2.0.0 (2024-11-24) =
New: Farok Added dynamic content update feature
Improvement: Better error handling in REST API
Fix: Resolved permalink issues with REST endpoints

= 1.5.0 (2024-11-20) =
New: Added pagination support
Update: Improved parser performance
Fix: Fixed version tree rendering
Tweaked: Updated UI styles

= 1.1.0 (2023-10-27) =
New: Added a new feature
Fix: Fixed a bug
General: Improved performance
";

    $attributes = [
        'changelog' => $changelog_text,
        'customLinks' => [],
        'versionName' => ['text' => 'Version'],
        'customLogTypeColors' => [
            'new' => '#0ed193',
            'fix' => '#000000',
            'improvement' => '#4c4cf1',
            'update' => '#ffa100'
        ],
        'uniqueId' => 'test-id',
        'enablePagination' => false,
        'enableVersions' => false,
        'perPage' => 10
    ];

    $parsed = $renderer->parse($changelog_text);
    $log = "Parsed count: " . count($parsed) . "\n";
    $log .= print_r($parsed, true);

    $output = $renderer->render($attributes);
    $log .= "\n\nOutput length: " . strlen($output) . "\n";
    
    // Write to file for easy viewing
    file_put_contents(__DIR__ . '/test-output.html', $output);
    file_put_contents(__DIR__ . '/test-log.txt', $log);
    
    echo "<!DOCTYPE html><html><head><title>Renderer Test</title></head><body>";
    echo "<h1>Changelog Renderer Test</h1>";
    echo "<h2>Parsed Data:</h2>";
    echo "<pre>" . htmlspecialchars($log) . "</pre>";
    echo "<hr>";
    echo "<h2>Rendered Output:</h2>";
    echo $output;
    echo "</body></html>";
    $log .= $output;

    file_put_contents(__DIR__ . '/test-output.txt', $log);
    echo "Done writing to test-output.txt";

} catch (Throwable $e) {
    file_put_contents(__DIR__ . '/test-error.txt', $e->getMessage() . "\n" . $e->getTraceAsString());
    echo "Error caught: " . $e->getMessage();
}
