/**
 * JS IDgenerador, para crear un numero entero, para generar las peticiones.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.5
 * @package js
 * @final
 */

/**
 * Variable publica para la Gerenación de un ID unico para cada peticion al servidor
 * @var {String}
 */
var idLlamada = null;

/**
 * Función para generar un ID aleatorio
 */
function generarID()
{
	idLlamada = (''+Math.random()).substring(2);
	return idLlamada;
}
