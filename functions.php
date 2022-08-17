<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function my_theme_enqueue_styles() {

	$parent_style = 'twentytwenty-style';

	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

	wp_enqueue_style( 'child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[ $parent_style ],
		time() //Please remove this in production and replace it with a version number
	);

	wp_enqueue_script(
		'towa-theme-frontend',
		get_stylesheet_directory_uri() . '/build/index.js',
		['wp-element'],
		time() //Please remove this in production and replace it with a version number
	);

}

add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
	register_rest_field( array('post'),
		'featured_image_url',
		array(
			'get_callback'    => 'get_rest_featured_image',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
function get_rest_featured_image( $object, $field_name, $request ) {
	if( $object['featured_media'] ){
		$img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
		return $img[0];
	}
	return false;
}