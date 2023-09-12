<?php


function addScrips() {
wp_enqueue_style( 'style', get_stylesheet_uri() );
wp_enqueue_style( 'style2', get_template_directory_uri()."/dist/css/styles.css" );
wp_enqueue_script( 'script_theme', get_template_directory_uri() . '/dist/js/main.js', array('jquery'), 1.1, true);
}
add_action( 'wp_enqueue_scripts', 'addScrips' );

function register_my_menus() {
    register_nav_menus(
        array(
        'header-menu' => __( 'Main Menu' ),
        'footer-menu1' => __( 'Footer Menu 1' ),
        'footer-menu2' => __( 'Footer Menu 2' ),
        'footer-menu3' => __( 'Footer Menu 3' ),
        'footer-menu4' => __( 'Footer Menu 4' )
        )
    );
}
add_action( 'init', 'register_my_menus' );

add_theme_support( 'post-thumbnails' );

// Limitar el excerpt

function get_excerpt(){
$excerpt = get_the_content();
$excerpt = preg_replace(" ([.*?])",'',$excerpt);
$excerpt = strip_shortcodes($excerpt);
$excerpt = strip_tags($excerpt);
$excerpt = substr($excerpt, 0, 175);
$excerpt = substr($excerpt, 0, strripos($excerpt, " "));
$excerpt = trim(preg_replace( '/s+/', ' ', $excerpt));
$excerpt = $excerpt.'...';

return $excerpt;
}

// Limitar el excerpt

add_theme_support( 'custom-logo' );


if( function_exists('acf_add_options_page') ) {
    
    acf_add_options_page(array(
        'page_title'    => 'Theme General Settings',
        'menu_title'    => 'Theme Settings',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
    
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Theme Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'theme-general-settings',
    ));
    
}