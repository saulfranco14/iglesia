/**
 * JS Errores, para mostrar y dar tratamiento a errores.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, Mexico 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 1.0.0
 * @package js
 * @final
 */

/**
 * Variable publica que contien el mensaje de error de la respuesta JSON recibida del servidor
 * @var{String}
 */
var mensajeError = null;

/**
 * Funcion para mostar la ventana Modal
 * @param {String} El codigo HTML a mostrar en el mensaje
 * @reutnrs{void}
 */
function mostrarVentanaModal(codigoHTML)
{
    $('#divAvisos').html(sanitizarHTML(codigoHTML));
    $('#divModalAvisos').modal('show');
}

/**
 * funcion para mostrar los Errores Personalizados
 * @param {object} elError objeto del tipo JSON con el error recibido del servidor
 * @param {object} estatusRespuesta objeto del tipo JSON con el estatus recibido del Servidor
 * @param{object} jqXHR objeto del tipo JSON con el error recibido del servidor
 * @reutnrs{void}
 */
function mostrarError(elError, estatusRespuesta, jqXHR)
{
    mensajeError = '<strong>Traza del Error ' + idLlamada + '</strong><br /><br />';
    mensajeError += '<strong>Codigo de Apache:</strong> ' + jqXHR.status + ' ' + jqXHR.statusText + '<br />';
    estatusPeticion(jqXHR);
    switch(elError.code){
        case -32000:
            mensajeError += elError.message;
            break;
        case -32600:
            mensajeError += 'Peticion invalida';
            break;
        case -32601:
            mensajeError += 'El metodo en el servicio web: <br /> NO se encontro';
            break;
        case -32602:
            mensajeError += 'Parametros invalidos';
            break;
        case -32603:
            mensajeError += 'Error interno';
            break;
        case -32700:
            mensajeError += 'Error de sintaxis';
            break;
        default:
        mensajeError += 'Error ' + elError.code + ':<br />' + elError.message;
        break;
    }
    console.log(jqXHR.responseJSON.error.message);
    mostrarVentanaModal(mensajeError);
}

/**
 * Funcion para mostrar los Errores de la peticion JSON
 * @param{object} jqXHR objeto del tipo JSON con el error recibido del Servidor
 * @param{object} estatusError onjeto del tipo JsON con el error recibido del servidor
 * @param{object} textoError objeto del tipo JSON con el error recibido del servidor
 * @returns{void}
 */
function mostrarErrorJSON(jqXHR, estatusError, textoError)
{
    mensajeError = '<strong>Traza del Error ' + idLlamada + '</strong><br /><br />';
    mensajeError += '<strong>Codigo de Apache:</strong> ' + jqXHR.status + ' ' + jqXHR.statusText + '<br />';
    estatusPeticion(jqXHR);
    switch ( $.trim(estatusError)){
        case 'timeout':
            mensajeError += 'El tiempo de Espera, se agoto.<br />Probablemente, existen intermitencias en su conexion a Internet';
            break;
        case 'error':
            mensajeError += 'Se recibio una respuesta.<br />Pero este fue el siguiente error:<br />' + textoError;
            break;    
        case 'abort':
            mensajeError += 'Su navegador aborto la conexion al Servidor.<br />Por razones desconocidas';
            break;    
        case 'parsererror':
            mensajeError += 'Se recibio una respuesta.<br />Pero esta corrupta la misma, o incompleta';
            break;    
        default:
        mensajeError += 'Error desconocido: ' + $.trim(estatusError) + ':<br />' + textoError;
        break;
    }
    console.log(jqXHR.responseText);
    mostrarVentanaModal(mensajeError);
}

/**
 * Funcion para mostrar el estatus al procesar la peticion JSON
 * @param{object} jqXHR objeto del tipo JSON con el error recibido del servidor
 * @return{void}
 */
function estatusPeticion(jqXHR)
{
    switch (jqXHR.readyState){
        case 0:
            mensajeError += '<strong>Estado:</strong>Peticion no completada (readyState:0)<br />';
            break;
        case 1:
            mensajeError += '<strong>Estado:</strong>Conexion si se establecio (readyState:1)<br />';
            break;
        case 2:
            mensajeError += '<strong>Estado:</strong>Peticion si se recibio(readyState:2)<br />';
            break;
        case 3:
            mensajeError += '<strong>Estado:</strong>Peticion en procesamiento (readyState:3)<br />';
            break;    
        case 4:
            mensajeError += '<strong>Estado:</strong>Peticion finalizada y con respuesta (readyState:4)<br />';
            break;    
        default:
            mensajeError += '<strong>Estado:</strong>Desconocido (readyState:' + jqXHR.readyState + ')<br />';
            break;
    }
    mensajeError += '<br />';
}