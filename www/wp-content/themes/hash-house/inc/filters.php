<?php
add_filter( 'woocommerce_rest_check_permissions', function( $permission ){
	return true;
});

//add_filter( 'image_size_names_choose', 'my_custom_sizes' );
//
//function my_custom_sizes( $sizes ) {
//	return array_merge( $sizes, array(
//		'your-custom-size' => __( 'Your Custom Size Name' ),
//	) );
//}

//add_image_size( '346x227-thumb', 120, 120, true );