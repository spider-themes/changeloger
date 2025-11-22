<?php

class Changeloger_REST_API {
	public function __construct() {
		add_action('rest_api_init', [$this, 'register_routes']);
	}

	public function register_routes() {
		register_rest_route('changeloger/v1', '/fetch-txt', [
			'methods' => 'GET',
			'callback' => [$this, 'fetch_txt_callback'],
			'permission_callback' => '__return_true',
		]);
	}

	public function fetch_txt_callback($request) {
		$url = $request->get_param('url');

		if (!$url) {
			return new WP_Error('no_url', 'No URL provided', ['status' => 400]);
		}

		$response = wp_remote_get($url);

		if (is_wp_error($response)) {
			return new WP_Error('fetch_failed', 'Failed to fetch the file', ['status' => 500]);
		}

		$status = wp_remote_retrieve_response_code($response);
		if ($status !== 200) {
			return new WP_Error('not_found', 'URL returned ' . $status, ['status' => 404]);
		}

		$content_type = wp_remote_retrieve_header($response, 'content-type');

		if (strpos($content_type, 'text/plain') === false) {
			return new WP_Error('invalid_type', 'This is not a .txt file', ['status' => 400]);
		}

		$body = wp_remote_retrieve_body($response);

		if (trim($body) === "") {
			return new WP_Error('empty_file', 'The file is empty', ['status' => 400]);
		}

		return rest_ensure_response([
			'content' => $body
		]);

	}
}


new Changeloger_REST_API();