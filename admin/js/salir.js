/**
 * JS Salir, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 1.0.0
 * @package js
 * @final
 */

/**
 * Variable publica para la Generación de un TimeStamp para asegurarnos que es unico.
 * Para ver si se esta actualizando el archivo JS, al hacer cambios o no...
 * @var {String}
 */
var marcaTiempo = new Date().getTime();

/**
 * Vaariable publica que contiene la respuesta del servidor
 * @{JSON}
 */
var jsonRespuesta = null;

/**
 * Variable publica para crear la peticion JSONN que se enviara al servidor
 * @var{JSON}
 */
var peticionJSON = null;

/**
 * constante publica con la url del Gateway que recibe las peticiones al servidor
 * (si fuera desde un apk o similar debera uncluir la ruta completa http:://www.dominio.com/etc..)
 * si fuera desde windows 8 desktop necesitan cambiar el cont por var, ya que windows 8 desktop no soporta const
 * @var{String}
 */
const GATEWAY_SALIR = '../zend_gateway/index.php';

/**
 * Constante publica que contiene el nnombre de la clase a invocar al servidor
 * Si fuera windows 8 Desktop, necesitan cambiar el const por var, ya que windows 8 no soporta const
 * @var{String}
 */
const NOMBRE_CLASE = 'Salir';

/**
*Funcion para cerrar la Sesion mediante AJAX hacia el servidor}
*@returns {void}
*/

function cerrarSesion()
{
	 peticionJSON = JSON.stringify(
	            {
	                'Id' : generarID(),
	                'method' : 'terminarSesion',
	                'clase' : NOMBRE_CLASE
	            });
	            $.ajax({
	                method : 'POST',
	                timeout : 50000,
	                data : peticionJSON,
	                dataType : 'json',
	                url: GATEWAY_SALIR,
	                success: function (jsonRespuesta, estatusRespuesta, jqXHR)
	                {
	                    exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR);  
	        },
	        error : function (jqXHR, estatusError, textoError)
	        {
	         mostrarErrorJSON(jqXHR, estatusError, textoError);   
	        }
	            });
}

/**
 * Funcion Listener para cerrar la sesion mediante AJAX hacia el Servidor
 * @param {object} jsonRespuesta objeto del tipo JSON con la respuesta recibida del servidor
 * @param {String} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
 * @param {object} jqXHR objeto XHR, con toda la traza del respuesta
 */

function exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos si existio un error:
	if(jsonRespuesta.error){
		mostrarError(jsonRespuesta, estatusRespuesta, jqXHR);
		return;
	}
	//Si no existio un error, no es importante la respuesta, se sale:
	document.location.assign('adios.html');//Si agrega la pagina al historial
	}