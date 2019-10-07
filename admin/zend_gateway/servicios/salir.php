<?php

/**
 * Clase Salir, para brindar funcionalidades para Accesar a la Aplicacion.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.21
 * @package Escolaris
 * @final
 */

final Class Salir
{
	/**
	 * constructor
	 * @access public
	 * @return void
	 */
	public function __construct()
	{
		session_start();
	}
	
	/**
	 * Termina la sesion de la directora
	 * @access public
	 * @return String una cadena aleatoria de 40 caracteres
	 */
	public function terminarSesion()
	{
		//Nulificamos las VARIABLES de Sesion:
		$_SESSION["idUsuario"] = null;
		$_SESSION["ipUsuario"] = null;
		$_SESSION["tokenUsuario"] = null;
		$_SESSION["rolUsuario"] = null;
		//Destruimos las VARIABLES de la Sesion:
		session_unset();
		//Destruimos los archivos de la Sesion:
		session_destroy();
		//Retornamos una cadena aleatoria:
		return sha1(md5(microtime()));
	}
	
	/**
	 * Manda a pantalla, cuando se invoca la clase a cadena 
	 * @access public
	 * @return string
	 */
	public function __toString()
	{
		return '¿Que esperabas ver?';
	}
	
	/**
	 * Evita clonar la Clase
	 * @access public
	 * @throws exception
	 */
	
	public function __clone()
	{
		throw new Exception("HOY, solo hay clones de Homero Simpson");
	}
	
	/**
	 * El destructor de la clase base
	 * @access public
	 * @return void
	 */
	
	public function __destruct()
	{
		//vacio por el momento
	}
	
}