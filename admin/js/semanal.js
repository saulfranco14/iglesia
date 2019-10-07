/**
 * JS Modelos, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Sistema
 * @author Ing. Saul Mauricio Franco Rentera
 * @version 1.0
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
 * Variable publica que contiene la respuesta del servidor
 * @var {JSON}
 */
 var jsonRespuesta = null;

 /**
  * Variable publica para crear la peticion JSON que se enviara al servidor
  * @var {JSON}
  */

 var peticionJSON = null;
 
 /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonTrabajo = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoTrabajo = null;


   /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonPrenda = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoPrenda = null;

     /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonColor = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoColor = null;

  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonTalla = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoTalla = null;

  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonModelo = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoModelo = null;

  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonUsuario = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoUsuario = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoOperacion = null;


  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonEntrega = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoEntrega = null;


  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonOperacion = null;

 
  /**
   * variable publica que indica si recuperamos un grado de la lista
   * @var {String}
   */

   var recuperado = false;




  /**
   * variable publica que contiene el nombre de la ultima accion realizada
   * @var {String}
   */

   var accion = null;
  
   /**
   * variable publica que contiene el numero de la columna para busqueda
   * @var {String}
   */

   var columnaBusqueda = null;
    
    /**
   * variable publica que contiene el criterio pra las busquedas
   * @var {String}
   */

   var criterioBusqueda = null;

   /**
   * constante publica con la url del Gateway que recibe las peticiones al servidor
   * (Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http://www.dominio.com/etc...)
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   const GATEWAY_TRABAJO = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_TRABAJO = 'semanal';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarTrabajo()


	   );

     
    /**
    * Crear chismoso para el tbody:
    */

        $('#tbodyTrabajo').bind('click', function(event){
          if(event.target != "[object HTMLButtonElement]"){
            if(event.target.parentElement == "[object HTMLButtonElement]"){
              seleccionoRegistro(event.target.parentElement.id);
            }
          }else{
            seleccionoRegistro(event.target.id);
          }
        });

    /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
    */

       function listarTrabajo()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }

      
      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarLunes(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalLunes',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalLunes";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }


      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarMartes(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalMartes',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalMartes";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarMiercoles(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalMiercoles',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalMiercoles";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarJueves(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalJueves',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalJueves";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }


      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarViernes(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalViernes',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalViernes";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarSabado(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalSabado',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalSabado";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      /**
      * Funcion para listar los paises mediante AJAX
      * @return {void}
      */

      function listarDomingo(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanalDomingo',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanalDomingo";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      function listarPrimeraSemana(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanal1Semana',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanal1Semana";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

      function listarSegundaSemana(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listaSemanal2Semana',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listaSemanal2Semana";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistar(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError){
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
        });
      }

     

       /**
        * Funcion Listener para listar las alergias mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitolistar(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonTrabajo = jsonRespuesta.result;
          $('#tbodyTrabajo > tr').remove();
          if(jsonTrabajo.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonTrabajo.length; indice++){
              objetoTrabajo = jsonTrabajo[indice];
              htmlNuevo += '<tr>';
               
                
                switch (objetoTrabajo.e){
                   case '1':
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#0000FF"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#0000FF"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                   case '2':
                      
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF00FF"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                   case '3':
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF8C00"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                   case '4':
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808080"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#808080">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#808080"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                   case '5':
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808000"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#808000">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#808000"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                   case '6':
                      
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#008080"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#008080">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#008080"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                  case '7':
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.q + ' </strong></td>';
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.p + ' </strong></td>';
                      htmlNuevo += '<td style="color:#800080"><strong>'   + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#800080">'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td style="color:#800080"><strong>$'  + objetoTrabajo.f + '</td>';
                  break;

                  default:
                      htmlNuevo += '<td>'           + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td>'           + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td>'           + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td>'           + objetoTrabajo.q + '</td>';
                      htmlNuevo += '<td>'           + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td><strong>'   + objetoTrabajo.o + ' </strong></td>';
                      htmlNuevo += '<td>'           + objetoTrabajo.d + '</td>';
                      htmlNuevo += '<td><strong>$ ' + objetoTrabajo.f + ' </strong></td>';
                }      
                htmlNuevo += '</tr>';
            }


            $('#tbodyTrabajo').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay trabajos.');
          }
          
        }

      
        










