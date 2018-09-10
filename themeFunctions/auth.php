<?php

//$args = array(
//  'headers' => array(
//    'Authorization' => 'Basic ' . base64_encode( 'admin' . ':' . 'Ym1OU0Ukp6NQ' ),
//  ),
//);

wp_localize_script( 'wp-api', 'wpApiSettings', array( 'root' => esc_url_raw( rest_url() ), 'nonce' => wp_create_nonce( 'wp_rest' ) ) );
