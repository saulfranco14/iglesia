/**
 * JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Renteria
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 1.0.0
 * @package js
 * @final
 */

/**
 * Variable punlica para la Generacion de un TimeStamp para asegurarnos que es unico
 * Para ver si esta actualizando el archivo JS, al hacer cambios o no..
 * @var {String}
 */

var marcaTiempo = new Date().getTime();

/**
 * Vaariable publica que contiene la respuesta del servidor
 * @{JSON}
 */
var jsonRespuesta = null;

/**
 * variable publica que contiene el usuario
 * @var{String}
 */
var usuario = null;

/**
 * Variable publica que ocntiene la contraseña
 * @var{String}
 */
var contrasena = null;

/**
 * Variable publica que contiene la validacion
 * @var{String}
 */
var validacion = null;

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
const GATEWAY_ACCESO = 'admin/zend_gateway/index.php';
    /**
     * Constante publica que contiene el nnombre de la clase a invocar al servidor
     * Si fuera windows 8 Desktop, necesitan cambiar el const por var, ya que windows 8 no soporta const
     * @var{String}
     */
    const NOMBRE_CLASE = 'Acceso';
    /**
     * Cuandoel documento esta listo, podemos invocar funciones
     * Si es mas de 1, deberan llevar ; al final, de otra manera, no
     * mandamos a llamar el metodo de la vlidacion:
     */
    $(document).ready(
    traerValidacion()
    );


    /**
 * Funcion para desplegar el formulario de ingreso
 * @returns {void}
 */
function registro() {
    $("#dIngreso").slideUp("slow");
    $("#dRegistro").slideDown("slow");
}

/**
 * Funcion para desplegar el formulario de registro
 * @returns {void}
 */
function sesion() {
    $("#dRegistro").slideUp("slow");
    $("#dIngreso").slideDown("slow");
}
/**
 * Funcion para validar el acceso mediante AJAX
 * @returns{void}
 */
function traerValidacion()
{
    peticionJSON = JSON.stringify(
        {
            'Id': generarID(),
            'method': 'traerValidacion',
            'clase': NOMBRE_CLASE
        });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: peticionJSON,
        dataType: 'json',
        url: GATEWAY_ACCESO,
        success: function (jsonRespuesta, estatusRespuesta, jqXHR)
        {
            exitoTraerValidacion(jsonRespuesta, estatusRespuesta, jqXHR);
        },
        error: function (jqXHR, estatusError, textoError)
        {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
        }
    });
}

/**
 * Funcion Listener para traer caracteres de validacion mediante AJAX
 * @param {object} jsonRespuesta objeto del tipo JSON con la respuesta recibida del servidor
 * @param {String} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
 * @param {object} jqXHR objeto XHR, con toda la traza del respuesta
 */
function exitoTraerValidacion(jsonRespuesta, estatusRespuesta, jqXHR)
{
    //checamos primero, si existio un error Personalizado:
    if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
    }
    $('#labelValidacion').html(jsonRespuesta.result);
    $('#inputValidacion').val('');
}

/**
 * Funcion para verificar el login del usuario
 * returns{void}
 */

function verificarDatos()
{
    usuario = $('#inputUsuario').val().toString().trim();
    contrasena = $('#inputContrasena').val().toString().trim();
    validacion = $('#inputValidacion').val().toString().trim();
    if (usuario.length > 0 && contrasena.length > 0 && validacion.length == 4) {
        //todo bien enviamos la peticion:
        verificar();
        //mostramosVentanaModal("enviando <br /> Usuario: " + usuario + "<br /> Contrasena: " + contrasena + "<br /> Validacion: " + validacion);
    } else {
        //Faltan datos, avisamos:
        mostrarVentanaModal('Revisa tus datos antes de enviar');
    }
}

function contacto () {
   mostrarVentanaModal('Debes de tener una sesión.');
}


/**
 *Funcion para verificar el acceso mediante AJAX hacia el servidor.
 *returns {void}
 */

function verificar()
{
    peticionJSON = JSON.stringify(
        {
            'Id': generarID(),
            'method': 'verificarAcceso',
            'clase': NOMBRE_CLASE,
            'Params': [usuario, contrasena, validacion]
        });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: peticionJSON,
        dataType: 'json',
        url: GATEWAY_ACCESO,
        success: function (jsonRespuesta, estatusRespuesta, jqXHR)
        {
            exitoVerificarAcceso(jsonRespuesta, estatusRespuesta, jqXHR);
        },
        error: function (jqXHR, estatusError, textoError)
        {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
        }
    });
}



/**
 *Funcion para Listener verificar el acceso mediante AJAX hacia el servidor
 *@param {object} jsonRespuesta objeto del tipo JSON con la respuesta recibida del servidor
 *@param {String} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
 *@param {object} jqXHR objeto XHR, con toda la traza del respuesta
 *@returns {void}
 */

function exitoVerificarAcceso(jsonRespuesta, estatusRespuesta, jqXHR)
{
    $('#inputUsuario').val('');
    $('#inputContrasena').val('');
    $('#inputValidacion').val('')
    //Checamos si existio error:
    if (jsonRespuesta.error) {
        traerValidacion();
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
    }
    var arrayRespuesta = jsonRespuesta.result;
    if (arrayRespuesta[0].toString().length == 40) {
        //Si se pudo lograr, nos vamos al menu:
        if (arrayRespuesta[1] == '1') {
            document.location.assign('admin/paginas/menu.html');//Si agrega la pagina al historial
        } else if (arrayRespuesta[1] == '2') {
            document.location.assign('admin/paginas/inventario.html');//Si agrega la pagina al historial
            //socument.location.replace('menu.html');//No agrega la pagina al historial
        } else if (arrayRespuesta[1] == 'lider') {
            document.location.assign('admin/paginas/trabajador.html');//Si agrega la pagina al historial
            //socument.location.replace('menu.html');//No agrega la pagina al historial
        } else if (arrayRespuesta[1] == 'super') {
            document.location.assign('admin/paginas/sistema.html');//Si agrega la pagina al historial
            //socument.location.replace('menu.html');//No agrega la pagina al historial
        } else if (arrayRespuesta[1] == 'pagina') {
            document.location.assign('admin/paginas/pagina.html');//Si agrega la pagina al historial
            //socument.location.replace('menu.html');//No agrega la pagina al historial
        }
        return;
    } else {
        //No recibimos lo que esperamos....
        traerValidacion();
        mostrarVentanaModal('La respuesta no es de confianza.');
    }
}


