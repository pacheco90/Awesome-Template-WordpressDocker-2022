<?php

function addScrips() {
wp_enqueue_style( 'style', get_stylesheet_uri() );
wp_enqueue_style( 'style2', get_template_directory_uri()."/dist/css/styles.css" );
wp_enqueue_script( 'script_theme', get_template_directory_uri() . '/dist/js/main.js', array('jquery'), 1.0, true);
}
add_action( 'wp_enqueue_scripts', 'addScrips' );


function register_my_menus() {
    register_nav_menus(
        array(
        'header-menu' => __( 'Main Menu' ),
        'footer-menu' => __( 'Footer Menu 1' ),
        'footer-menu2' => __( 'Footer Menu 2' )
        )
    );
}
add_action( 'init', 'register_my_menus' );

add_theme_support( 'post-thumbnails' );