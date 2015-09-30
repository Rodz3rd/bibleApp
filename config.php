<?php

$config = [
	'host' => "localhost",
	'user' => "RodrigoConan",
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
	echo "Wrong Configuration";
	exit;
}