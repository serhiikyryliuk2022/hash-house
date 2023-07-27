<?php

require get_theme_file_path('inc/route.php');
require get_theme_file_path('inc/filters.php');
require get_theme_file_path('inc/mail-settings.php');

add_action( 'wp_enqueue_scripts', function (): void {
	$pathUri = get_template_directory_uri() . '/app/dist/hash-house/';
	$pathTemplate = get_template_directory() . '/app/dist/hash-house/';
	$files = scandir($pathTemplate);

	$resources =[];
	foreach ($files as $key => $name){
		if(in_array($name, ['.', '..'])){
			continue;
		}
		if(preg_match('/^([\d\w]+)\./', $name, $match)){
			$key = $match[1];
		}
		$resources[$key] = $name;
	}

	$jsFiles = array_filter($resources, function($name){
		return strripos($name, '.js');
	});

	$cssFiles = array_filter($resources, function($name){
		return strripos($name, '.css');
	});

	$ttfFiles = array_filter($resources, function($name){
		return strripos($name, '.ttf');
	});

	foreach ($jsFiles as $key => $jsFile) {
		wp_enqueue_script( $key, $pathUri . $jsFile, [], null, true );
	}

	foreach ($cssFiles as $key => $jsFile) {
		wp_enqueue_style( $key, $pathUri . $jsFile );
	}
} );



