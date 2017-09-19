<?php


return [

	'path' => storage_path() . '/dumps/',

	'mysql' => [
		'dump_command_path' => 'C:\\wamp\\bin\\mysql\\mysql5.6.17\\bin\\',
		'restore_command_path' => 'C:\\wamp\\bin\\mysql\\mysql5.6.17\\bin\\',
	],

	's3' => [
		'path' => ''
	],

    'compress' => false,
];

