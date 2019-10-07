<?php
date_default_timezone_set('America/Mexico_City');
define('PRODUCCION', true);
define('HOY',date('Y') . "-" . date('m') . "-" . date ('d'));
define('HORA', date('H') . ":" . date('i') . ":" . date ('s'));

if(PRODUCCION){
	//Reservador para PRODUCCION
	define('SERVIDOR', 'mysql');
	define('USUARIO', 'expediente');
	define('CONTRASENA', 'Expediente*#2016');
	define('BASE', 'expediente');
 }else{
 	//Reservador para DESARROLLO
 	define('SERVIDOR', 'mysql');
	define('USUARIO', 'expediente');
	define('CONTRASENA', 'Expediente*#2016');
	define('BASE', 'expediente');
 }