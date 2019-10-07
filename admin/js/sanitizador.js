/**
 * JS Sanitizador, para limpiar el codigo HTML de sentencias incrustadas de JS malas o dudosas (Solo en Windows 8 Metro).
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.5
 * @package js
 * @final
 */

/**
 * Variable publica para alojar htmlNuevo que sera insertado dinamicamente en la pagina.
 * @var {String}
 */
var htmlNuevo = null;

/**
 *Variable publica para alojar html ya sanitizado
 * @var {String}
 */
var htmlSanitizado = null;

/**
 * Variable numerica para recorrer bucles FOR, mediante un indice.
 * @var {Number}
 */
var indice = null;

/**
 * Funcion para genera sanitizar un codigo HTML nuevo (es para windows 8 Desktop)
 * @param {String} El codigo HTML a sanitizar
 * @returns {String}
 */
function sanitizarHTML(codigoHTML)
{
	htmlSanitizado = codigoHTML;
	if(window.toStaticHTML){
		//Estamos en Windows 8 Desktop, hay que sanitizar el HTML:
		htmlSanitizado = window.toStaticHTML(htmlSanitizado);
	}
	return htmlSanitizado;
}
