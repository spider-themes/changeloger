<?php

class Changeloger_Block_Assets {

	public function __construct() {
		add_action( 'enqueue_block_editor_assets', function () {
			wp_register_style(
				'changeloger',
				plugins_url( '/', __FILE__ ) . '../build/changeloger/style-index.css',
				array(),
				'initial'
			);

			wp_register_style(
				'tabbed-changeloger',
				plugins_url( '/', __FILE__ ) . '../build/tabbed-changeloger/style-index.css',
				array(),
				'initial'
			);

		} );

		add_action( 'enqueue_block_assets', [ $this, 'external_libraries' ] );
	}


	public function external_libraries(): void {

		wp_register_script(
			'tabbed-changeloger-frontend',
			plugins_url( '/', __FILE__ ) . '../script/tabbed-frontend.js',
			array( 'jquery' ),
			uniqid(),
			true
		);

		wp_register_script(
			'changeloger-frontend',
			plugins_url( '/', __FILE__ ) . '../script/frontend.js',
			array( 'jquery' ),
			uniqid(),
			true
		);
		wp_register_script(
			'changeloger-filter',
			plugins_url( '/', __FILE__ ) . '../script/filter.js',
			array( 'jquery' ),
			uniqid(),
			true
		);

		$licensing = array( 'can_use_premium_code' => cha_fs()->can_use_premium_code() );
		wp_localize_script( 'jquery', 'changeloger_local_object', array(
			'ajax_url'  => admin_url( 'admin-ajax.php' ),
			'nonce'     => wp_create_nonce( 'changeloger_nonce' ),
			'licensing' => 1
		) );
	}
}