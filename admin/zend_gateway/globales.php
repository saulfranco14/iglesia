<?php
date_default_timezone_set('America/Mexico_City');
define('PRODUCCION', false);
define('HOY',date('Y') . "-" . date('m') . "-" . date ('d'));
define('HORA', date('H') . ":" . date('i') . ":" . date ('s'));

if(PRODUCCION){
	//Reservador para PRODUCCION
	// define('SERVIDOR', 'mysql');
	// define('USUARIO', 'expediente');
	// define('CONTRASENA', 'Expediente*#2016');
	// define('BASE', 'expediente');
	define('SERVIDOR', 'localhost');
	define('USUARIO', 'root');
	define('CONTRASENA', '');
	define('BASE', 'dbsanmateo');
 }else{
 	//Reservador para DESARROLLO
 	// define('SERVIDOR', 'mysql');
	// define('USUARIO', 'expediente');
	// define('CONTRASENA', 'Expediente*#2016');
	// define('BASE', 'expediente');
	define('SERVIDOR', 'localhost');
	define('USUARIO', 'root');
	define('CONTRASENA', '');
	define('BASE', 'dbsanmateo');
 }