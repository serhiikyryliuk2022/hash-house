<?php
add_action( 'phpmailer_init', 'send_smtp_email' );
function send_smtp_email( $phpmailer ) {
    $phpmailer->isSMTP();
    $phpmailer->Host       = 'smtp.gentlecode.com'; //SMTP_HOST;
    $phpmailer->Port       =  465; //SMTP_PORT;

    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = 'hash-house@gentlecode.com';
    $phpmailer->Password = '4cpJxz48EKpYTNE4';
    $phpmailer->From = get_bloginfo('admin_email');
    $phpmailer->FromName = get_bloginfo('name');
}