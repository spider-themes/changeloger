<?php

class Changeloger_Block_Register
{
    public function changeloger_create_block_init()
    {
        register_block_type(
            __DIR__ . '/../build/changeloger',
            array('render_callback' => [$this, 'changeloger_render'])
        );

        register_block_type(
            __DIR__ . '/../build/tabbed-changeloger',
            array('render_callback' => [$this, 'tabbed_changeloger_render'])
        );
    }

    public function changeloger_render($attributes, $content, $instance)
    {
        wp_register_style('changeloger', plugins_url('/', __FILE__) . '../build/changeloger/style-index.css');

        if ($attributes['enablePagination'] == '1' || $attributes['enableFilter'] == '1') {
            wp_enqueue_script('changeloger-filter');
        }
        return $content;
    }

    public function tabbed_changeloger_render($attributes, $content, $instance)
    {
        wp_register_style('tabbed-changeloger', plugins_url('/', __FILE__) . '../build/tabbed-changeloger/style-index.css');
        wp_enqueue_style('tabbed-changeloger');

        // Enqueue frontend JavaScript for tab functionality
        wp_enqueue_script('tabbed-changeloger-frontend');

        return $content;
    }
}