<?php
add_action( 'rest_api_init', 'wpcf7_rest_api_init' );
add_action( 'rest_api_init', 'api_init' );

function wpcf7_rest_api_init($t) {
	$namespace = 'app/v1';

	register_rest_route( $namespace ,
		'/contact', [
		'methods'  => WP_REST_Server::CREATABLE,
		'callback' => 'submitContact',
	]);

	register_rest_route( $namespace ,
		'/download-form/(?P<uri>[a-zA-Z0-9-]+)', [
		'methods'  => WP_REST_Server::CREATABLE,
		'callback' => 'downloadForm',
	]);

	$namespace = 'contact-form-7/v1';
	register_rest_route( $namespace ,
		'/contact-forms/(?P<id>\d+)/feedback', [
		'methods'  => WP_REST_Server::CREATABLE,
		'callback' => 'submitContact',
	]);

};

function api_init() {
	$namespace = 'wp/v2';

	register_rest_route( $namespace ,
		'/page/(?P<uri>[a-zA-Z0-9-]+)', [
		'methods'  => WP_REST_Server::READABLE,
		'callback' => 'getPage',
	]);

	register_rest_route( $namespace ,
		'/product/(?P<slug>[a-zA-Z0-9-]+)', [
		'methods'  => WP_REST_Server::READABLE,
		'callback' => 'getProduct',
	]);
};

function getProduct( WP_REST_Request $request ) {
	$product = get_page_by_path( $request['slug'], OBJECT, 'product' );

	if ( empty( $product ) ) {
		return rest_ensure_response( [] );
	}

	$product     = new WC_Product( $product );
	$productData = $product->get_data();

	$gallery = [];
	foreach ( $product->get_gallery_image_ids() as $imageId ) {
		$gallery[] = [
			'id'  => "{$imageId}",
			'src' => wp_get_attachment_image_url( $imageId, 'large' ),
		];
	}

	$whyChoose = [];
	$page = get_page_by_path('home');
	if ($page) {
		$cFields = get_fields($page->ID);

		$items = array_values(array_filter($cFields['whyChoose']['items'] ?? []));
		$whyChoose = array_map(function ($item){
			$item['image'] = $item['image']['url'];
			return $item;
		},  $items);
	}


	$response = [
		'name' => $productData['name'],
		'description' => $productData['description'],
		'short_description' => $productData['short_description'],
		'image' => [
			'src' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0]
		],
		'variations' => getVariable($product->get_id()),
		'gallery' => $gallery,
		'whyChoose' => $whyChoose
	];

	return rest_ensure_response($response);
}

/**
 * @param $data
 *
 * @return WP_Error|WP_HTTP_Response|WP_REST_Response
 */
function getPage($data): WP_Error|WP_REST_Response|WP_HTTP_Response
{
    $page = get_page_by_path($data['uri']);

    if (empty($page)) {
        return rest_ensure_response([]);
    }

    $cFields = clearEmptyItems(get_fields($page->ID));

    switch ($data['uri']) {
        case 'about-us':
            $cFields = formatFieldsForAboutUs($cFields);
            break;
        case 'home':
            $cFields = formatFieldsForHome($cFields);
            break;
        default:
            $cFields = [];
    }

	$response = [
        'title' => get_the_title($page),
        'content' => $page->post_content,
        'cFields' => $cFields,
    ];

    return rest_ensure_response($response);
}

function submitContact( WP_REST_Request $request ){
    $post = get_posts([
        'name' => 'template-contact-us',
        'post_type' => WPCF7_ContactForm::post_type,
    ])[0];

	if ( ! $post ) {
		return new WP_Error( 'wpcf7_not_found',
			__( "The requested contact form was not found.", 'contact-form-7' ),
			array( 'status' => 404 ) );
	}

	$item = wpcf7_contact_form( $post );

	$args = $request->get_params();
	$args['name-825'] = $args['name'];
	unset($args['name']);

	$_POST = array_merge($args, $_POST);

    $result = $item->submit();

	$response = array(
		'status' => $result['status'],
		'message' => $result['message'],
	);

	if ( ! empty( $result['scripts_on_sent_ok'] ) ) {
		$response['onSentOk'] = $result['scripts_on_sent_ok'];
	}

	if ( ! empty( $result['scripts_on_submit'] ) ) {
		$response['onSubmit'] = $result['scripts_on_submit'];
	}

	$response = apply_filters( 'wpcf7_ajax_json_echo', $response, $result );
	return rest_ensure_response( $response );
}

function downloadForm( WP_REST_Request $request ){
	$productUri = $request['uri'];
	$product = get_page_by_path( $productUri, OBJECT, 'product' );
	$uploadDir = wp_upload_dir()['basedir'];

	$uploadFiles = array_map(function($url) use ($uploadDir){
		return substr_replace($url, $uploadDir,
			0, strripos($url, '/woocommerce_uploads')
		);
	}, getVariable($product->ID)['files']);


    $formTemplate = get_posts([
        'name' => 'download-full-product-line-form',
        'post_type' => WPCF7_ContactForm::post_type,
    ])[0];
	$template = $formTemplate->post_content;

	if ( !$product || !$template ) {
		return new WP_Error( 'wpcf7_not_found',
			__( "The requested contact form was not found.", 'contact-form-7' ),
			array( 'status' => 404 ) );
	}

	$item = wpcf7_contact_form( $formTemplate );
	$properties = $item->get_properties();

	$args = $request->get_params();

	$to = $args['mail'];
	$subject = $properties['mail']['subject'];;
	$body = str_replace("[name-825]", $args['name'], $properties['mail']['body']);
	$headers[] = "From: ". get_bloginfo('name') ."<".get_bloginfo('admin_email').">";

	$success = wp_mail($to, $subject, $body, $headers, $uploadFiles);

	$response = array(
		'status' => "OK",
		'message' => "Your message has been delivered",
	);
	return rest_ensure_response($response);
}


function formatFieldsForAboutUs($cFields): array {
    $blockName = $cFields['team']['blockName'];
    unset($cFields['team']['blockName']);
    $items = array_values(array_filter($cFields['team']));
    unset($cFields['team']);

    $cFields['team']['items'] = $items;
    $cFields['team']['blockName'] = $blockName;

    return $cFields;
}
function formatFieldsForHome($cFields): array {
    $item = $cFields['top']['item'];
    unset($cFields['top']['item']);
    $cFields['top'] = array_merge($cFields['top'], $item);

    $cFields['map'] = array_merge(
        ['name' => $cFields['map']['name'] ?? ''],
        ['background' => $cFields['map']['block2']['map'] ?? ''],
        ['items' =>
            array_merge(
                array_filter(array_values($cFields['map']['block2']['partnerList']['list1'] ?? [])),
                array_filter(array_values($cFields['map']['block2']['partnerList']['list2'] ?? [])),
            )
        ]
    );

    $cFields['whyChoose'] = array_merge(
        ['name' => $cFields['whyChoose']['name'] ?? ''],
        ['items' => array_values(array_filter($cFields['whyChoose']['items']))]
    );

	$cFields['products'] = array_map(function ($product){
		$data = $product->get_data();
		$src = wp_get_attachment_image_src($data['image_id'], 'medium')[0] ?? '';
		return [
			'name' => $data['name'],
			'slug' => $data['slug'],
			'description' => $data['description'],
			'short_description' => $data['short_description'],
			'image' => [
				'src' => $src
			],
		];
	}, wc_get_products( ['status' => 'publish'] ));

    return $cFields;
}

function clearEmptyItems($fields): array
{
    return array_filter($fields, function($item){
        if(is_array($item)){
            $item = array_map(function($e){
                if(is_string($e)){
                    return $e;
                }

                if(!($e['image'] ?? false) && empty($e['description'])){
                    return false;
                };

                return $e;
            }, $item);

            return !empty(array_filter($item));
        }

        return !empty($item);
    });
}

function getVariable($productId): array {
	$variationsResult = [
		'rows' => [],
		'files' => false
	];

	$wcProduct = wc_get_product( $productId );
	if(get_class($wcProduct) === 'WC_Product_Variable'){
		$variations = $wcProduct->get_available_variations( 'objects' );
		$attributeKeys    = array_keys( $variations[0]->get_attributes( 'edit' ) );
		$variationsHeader = wc_get_attribute_taxonomy_labels();
		foreach ( $attributeKeys as $attrKey ) {
			$taxonomy                     = str_replace( 'pa_', '', $attrKey );
			$variationsResult['header'][] = $variationsHeader[ $taxonomy ];
		}

		foreach ( $variations as $key => $variant ) {
			$attrs = [ 'id' => $variant->get_id() ];
			if($variant->get_downloadable()) {
				$files = $variant->get_downloads( 'edit' );
				$file = array_shift( $files );
				$variationsResult['files'][$key] = $file['data']['file'];
			}

			foreach ( $variant->get_attributes( 'edit' ) as $taxonomy => $val ) {
				$term = get_term_by( 'slug', $val, $taxonomy );

				$taxonomy           = str_replace( 'pa_', '', $taxonomy );
				$attrs[ $taxonomy ] = $term->name;
			}
			$variationsResult['rows'][ $key ] = $attrs;
		}
	}

	return 	$variationsResult;
}