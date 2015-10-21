<?php

$config = [
	'host' => "localhost",
	'user' => "Rodrigoonan",
	'pass' => "phpmyJava1036",
	'db'   => "kjv_english"
];

@$db = new mysqli(
	$config['host'],
	$config['user'],
	$config['pass'],
	$config['db']
);

if ( mysqli_connect_errno() ) {
	$error_code    = $db->connect_errno;
	$error_message = $db->connect_error;

	echo "<strong>Error: </strong>";
	if ( $error_code == 2002 ) {
		echo "Incorrect hostname.";
	}

	if ( $error_code == 1045 ) {
		echo "Either username or password was incorrect.";
	}

	if ( $error_code == 1049 ) {
		echo "Undefined database.";
	}

	exit;
}

/*
	host: 2002
	user & pass: 1045
	db: 1049
*/