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

   var CLASE_TRABAJO = 'trabajo';


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
            exitolistarTrabajo(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }

      /**
      * Funcion para listar el trabajo semanal mediante AJAX
      * @return {void}
      */

       function listarTrabajoSemanal()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listarPago',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listarPago";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarPago(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }

       /**
      * Funcion para listar el trabajo total mediante AJAX
      * @return {void}
      */

       function listarTrabajoTotal(){

        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listarPagoTotalTrabajo',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listarPagoTotalTrabajo";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarPagoTotal(jsonRespuesta, estatusRespuesta, jqXHR);
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

      function listarTotalTrabajo(){

        peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'listarTodoTrabajo',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
      
        accion = "listarTodoTrabajo";

        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR){
              exitolistarTrabajo(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarTrabajo(jsonRespuesta, estatusRespuesta, jqXHR)
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
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                
                switch (objetoTrabajo.e){
                   case '1':
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#0000FF"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#0000FF"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#0000FF">' + objetoTrabajo.q + '</td>';
                  break;

                   case '2':
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF00FF"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#FF00FF">' + objetoTrabajo.q + '</td>';
                  break;

                   case '3':
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF8C00"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#FF8C00">' + objetoTrabajo.q + '</td>';
                  break;

                   case '4':
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#808080"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808080"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#808080">' + objetoTrabajo.q + '</td>';
                  break;

                   case '5':
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#808000"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808000"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#808000">' + objetoTrabajo.q + '</td>';
                  break;

                   case '6':
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#008080"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#008080"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#008080">' + objetoTrabajo.q + '</td>';
                  break;

                  case '7':
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td style="color:#800080"><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td style="color:#800080"><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td style="color:#800080">' + objetoTrabajo.q + '</td>';
                  break;

                  default:
                      htmlNuevo += '<td >' + objetoTrabajo.a + '</td>';
                      htmlNuevo += '<td >' + objetoTrabajo.b + '</td>';
                      htmlNuevo += '<td >' + objetoTrabajo.c + '</td>';
                      htmlNuevo += '<td ><strong>' + objetoTrabajo.d + ' </strong></td>';
                      htmlNuevo += '<td><strong> $' + objetoTrabajo.f + ' </strong></td>';
                      htmlNuevo += '<td>' + objetoTrabajo.r + '</td>';
                      htmlNuevo += '<td>' + objetoTrabajo.n + '</td>';
                      htmlNuevo += '<td>' + objetoTrabajo.s + '</td>';
                      htmlNuevo += '<td>' + objetoTrabajo.o + '</td>';
                      htmlNuevo += '<td>' + objetoTrabajo.p + '</td>';
                      htmlNuevo += '<td>' + objetoTrabajo.q + '</td>';
                }      
                htmlNuevo += '</tr>';
            }


            $('#tbodyTrabajo').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay trabajos disponibles');
          }
          switch (accion){
          case 'buscar':
            //mostramos el boton de listar todos:
            $('#buttonListarTodos').show();
          break;
          case 'listar':
            //ocultamos el boton de listar todos:
            $('#buttonListarTodos').hide();
          break;
          }
        }

        /**
        * Funcion Listener para listar las alergias mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitolistarPago(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //Checamos primero, si existio un error Personalizado:
          if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonTrabajo = jsonRespuesta.result;
          $('#tbodyPago > tr').remove();
          if(jsonTrabajo.length > 0){
            htmlNuevo = '';
            objetoTrabajo = jsonTrabajo[indice];
            mostrarVentanaModal('<h4><strong>Pago Semanal:  $' + objetoTrabajo.z + '    </strong></h4></td>');
          }else{
            mostrarVentanaModal('No hay pago de esta semana disponible');
          }
         
        }

        /**
        * Funcion Listener para listar las alergias mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitolistarPagoTotal(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //Checamos primero, si existio un error Personalizado:
          if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonTrabajo = jsonRespuesta.result;
          $('#tbodyPago > tr').remove();
          if(jsonTrabajo.length > 0){
            htmlNuevo = '';
            objetoTrabajo = jsonTrabajo[indice];
            mostrarVentanaModal('<h4><strong>Pago total:  $' + objetoTrabajo.y + '    </strong></h4></td>');
          }else{
            mostrarVentanaModal('No hay pago de esta semana disponible');
          }
         
        }


      /**
      * Funcion para mostrar el color escogido de la lista.
      * @param {int} idBoton El ID del boton pulsado en el tbody
      * @returns {void}
      */

      function seleccionoRegistro(idBoton)
      {
        //partiendo de que llega: button_editar_1, button_editar_2, etc..., button_borrar_1, button_borrar_2, etc...
        var arraycitoIDS = idBoton.split('_');
        var queAccion    = arraycitoIDS[1];//es editar o borrar
        var queRegistro  = Number(arraycitoIDS[2]);// Un numero desde cero(posicion del array, no ID del registro)...
        switch(queAccion){
          case 'editar':
            editarTrabajo(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
          default:
            mostrarVentanaModal('No hay accion seleccionada');
          break;
        }
      }



      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboEntrega()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboEntrega',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosEntrega(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonEntrega = jsonRespuesta.result;
            $('#id_entrega > option'). remove();

          if(jsonEntrega.length > 0 ){
            
            for(indice=0; indice<jsonEntrega.length; indice++){
              
                objetoEntrega = jsonEntrega[indice];
                    $('#id_entrega').append('<option data-id-entrega="'+ objetoEntrega.a + '" data-entrega-cantidad="'+ objetoEntrega.d + '" data-corte="'+ objetoEntrega.g + '" data-talla="'+ objetoEntrega.h + '" data-modelo="'+ objetoEntrega.i + '" value="'+ objetoEntrega.a + '">' + objetoEntrega.d + ' pzas '  + ' |   Corte:  ' + objetoEntrega.prenda + ' | Talla:   ' + objetoEntrega.talla + ' |  Modelo:  ' +  objetoEntrega.modelo + ' | Cliente:   '   +  objetoEntrega.cliente + '</option>');            
            }
      
          }else{

             $('#id_entrega').append('<option value="x">No entregas</option>');

          }

          if (recuperado) {
           
           $('#id_entrega').val(objetoTrabajo.m).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboColor()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboColor',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosColor(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosColor(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonColor = jsonRespuesta.result;
            $('#id_color > option'). remove();

          if(jsonColor.length > 0 ){
            
            for(indice=0; indice<jsonColor.length; indice++){
              
                objetoColor = jsonColor[indice];
                $('#id_color').append('<option value="'+ objetoColor.a + '">'+ objetoColor.d + '</option>');
            }
      
          }else{

             $('#id_color').append('<option value="x">No hay color </option>');

          }

          if (recuperado) {
           
           $('#id_color').val(objetoTrabajo.l).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboModelo()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboModelo',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosModelo(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosModelo(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonModelo = jsonRespuesta.result;
            $('#id_modelo > option'). remove();

          if(jsonModelo.length > 0 ){
            
            for(indice=0; indice<jsonModelo.length; indice++){
              
                objetoModelo = jsonModelo[indice];
                $('#id_modelo').append('<option value="'+ objetoModelo.a + '">'+ objetoModelo.d + '  |  '  + objetoModelo.e + '</option>');
            }
      
          }else{

             $('#id_modelo').append('<option value="x">No hay modelo </option>');

          }

          if (recuperado) {
           
           $('#id_modelo').val(objetoTrabajo.k).attr('selected','selected');

          }
      }


      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboTalla()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboTalla',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosTalla(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosTalla(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonTalla = jsonRespuesta.result;
            $('#id_talla > option'). remove();

          if(jsonTalla.length > 0 ){
            
            for(indice=0; indice<jsonTalla.length; indice++){
              
                objetoTalla = jsonTalla[indice];
                $('#id_talla').append('<option value="'+ objetoTalla.a + '">'+ objetoTalla.d + '</option>');
            }
      
          }else{

             $('#id_talla').append('<option value="x">No hay talla </option>');

          }

          if (recuperado) {
           
           $('#id_talla').val(objetoTrabajo.j).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboPrenda()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboPrenda',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosPrenda(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosPrenda(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonPrenda = jsonRespuesta.result;
            $('#id_prenda > option'). remove();

          if(jsonPrenda.length > 0 ){
            
            for(indice=0; indice<jsonPrenda.length; indice++){
              
                objetoPrenda = jsonPrenda[indice];
                $('#id_prenda').append('<option value="'+ objetoPrenda.a + '">'+ objetoPrenda.d + '</option>');
            }
      
          }else{

             $('#id_prenda').append('<option value="x">No hay prenda </option>');

          }

          if (recuperado) {
           
           $('#id_prenda').val(objetoTrabajo.h).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboUsuario()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboUsuario',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosUsuario(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosUsuario(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonUsuario = jsonRespuesta.result;
            $('#id_usuario > option'). remove();

          if(jsonUsuario.length > 0 ){
            
            for(indice=0; indice<jsonUsuario.length; indice++){
              
                objetoUsuario = jsonUsuario[indice];
                $('#id_usuario').append('<option value="'+ objetoUsuario.a + '">'+ objetoUsuario.d + '</option>');
            }
      
          }else{

             $('#id_usuario').append('<option value="x">No hay usuario disponible </option>');

          }

          if (recuperado) {
           
           $('#id_usuario').val(objetoTrabajo.g).attr('selected','selected');

          }
      }

      
      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboOperacion()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboOperacion',
          'clase' : CLASE_TRABAJO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosOperacion(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
      * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
      * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
      * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
      * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
      */
      function exitolistarCombosOperacion(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonOperacion = jsonRespuesta.result;
            $('#id_operacion > option'). remove();

          if(jsonOperacion.length > 0 ){
            
            for(indice=0; indice<jsonOperacion.length; indice++){
              
                objetoOperacion = jsonOperacion[indice];
                $('#id_operacion').append('<option data-costo="'+ objetoOperacion.g + '"  value="'+ objetoOperacion.a + '">'+ objetoOperacion.d + ' | '  + objetoOperacion.g  + '</option>');
                //$('#pago_operacion').append('<option data-id="'+ objetoOperacion.a + '"  value="'+ objetoOperacion.g + '">'+ objetoOperacion.d +   "   |   "    + objetoOperacion.g +  '</option>');
            }
      
          }else{

             $('#id_operacion').append('<option value="x">No hay operaciones disponibles </option>');

          }

          if (recuperado) {
           
           $('#id_operacion').val(objetoTrabajo.i).attr('selected','selected');

          }
      }

      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarTrabajo()
      {
        objetoTrabajo = null;
        $('#tabsMenu a[href="#divTabFormularioTrabajo"]').tab('show');
        $('#id_trabajo').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#cantidad').val('');
        $('#observacion').val('');
        comboUsuario();
       // comboPrenda();
        comboOperacion();
       // comboTalla();
       //
        comboColor();
        comboEntrega(); // m
        $('#h1TituloFormulario').html(sanitizarHTML('Crear un trabajo'));

      }

      /**
      * Funcion para mostrar el modelo escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function editarTrabajo(indiceEscogido)
      {

        recuperado = true;
        objetoTrabajo = jsonTrabajo[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioTrabajo"]').tab('show');
          $('#id_trabajo').val(objetoTrabajo.a);
          $('#cantidad').val(objetoTrabajo.d);
          $('#observacion').val(objetoTrabajo.e);
          $('#pago').val(objetoTrabajo.f);
          comboUsuario(); //g
          comboPrenda(); //h
          comboOperacion(); //i
          comboTalla(); //j
          comboModelo(); //k
          comboColor(); // comboColor l
          comboEntrega(); // m
          $('#h1TituloFormulario').html(sanitizarHTML('Editar un trabajo'));
      }

     
      /**
      * Funcion para guardar un modelo
      * @returns {void}
      */

      function guardarTrabajo()
      {

        var operacion_val = $( '#id_operacion' ).val();
        var prenda_val    = $( '#id_entrega' ).val();
        var modelo_val    = $( '#id_entrega' ).val();
        var talla_val     = $( '#id_entrega' ).val();

        var operacion              = $('#id_operacion').find('option[value="'+operacion_val+'"]').data('costo');
        var prenda                 = $('#id_entrega').find('option[value="'+prenda_val+'"]').data('corte');
        var modelo                 = $('#id_entrega').find('option[value="'+modelo_val+'"]').data('modelo');
        var talla                  = $('#id_entrega').find('option[value="'+talla_val+'"]').data('talla');

        

        objetoTrabajo = {
          a: $('#id_trabajo').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#cantidad').val(),
          e: $('#observacion').val(),
          f: operacion,
          g: $('#id_usuario').val(),
          h: prenda,
          i: $('#id_operacion').val(),
          j: talla,
          k: modelo,
          l: $('#id_color').val(),
          m: $('#id_entrega').val(),
  
        };

        console.log(objetoTrabajo);

        if (objetoTrabajo.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_TRABAJO,
          'Params' : [objetoTrabajo]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoTrabajo(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }


       /**
      * Metodo change para jalar el combo dependendiente de entrega a operaciones
      * @returns {void}
      */

      $('#id_entrega').change(function(){

        var corte_val    = $( '#id_entrega' ).val();
        var corte        = $( '#id_entrega').find('option[value="'+corte_val+'"]').data('corte');

          $.post( '../zend_gateway/servicios/operaciones.php', {id_operacion: corte} ).done( function( respuesta ){
            $( '#id_operacion' ).html( respuesta );
          });
      });

       /**
      * Metodo change para que muestra los modelos de las prendas
      * @returns {void}
      */

      $( '#id_operacion' ).change( function(){

        var corte = $(this).children('option:selected').html();

      });


      /**
        * Funcion Listener para listar los modelos mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */

        function exitoGuardadoTrabajo(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          // Checamos si existio un error:
          if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            switch(accion){
              case 'insertar':
                if(jsonRespuesta.result > 0){
                  //si se inserto
                  mostrarVentanaModal('Trabajo insertado con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar el trabajo');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Trabajo  ' + objetoTrabajo.a + '   actualizado');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar el trabajo');
                }
              break;
              default:
                //no se que paso
                mostrarVentanaModal('Tipo de respuesta no definida');
              break;
            }
            mostrarListado();
        }

        /**
         * Funcion para solicitar confirmar el borrado de la alergia
         * @param {int} indiceEscogido El indice escogido de la lista de los paises
         * @returns {void}
         */
         function confirmarBorrado(indiceEscogido)
         {
          $('#tabsMenu a[href="#divTabBorrarTrabajo"]').tab('show');
          objetoTrabajo = jsonTrabajo[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoTrabajo.a + '</strong><br/>Nombre: <strong>' + objetoTrabajo.e + '</strong>';
          $('#pDatosTrabajo').html(sanitizarHTML(htmlNuevo));
         }


        

         function borrarTrabajo()
         {
          objetoTrabajo = { a:objetoTrabajo.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_TRABAJO,
            'Params' : [objetoTrabajo]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoTrabajo(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
      }
      /**
        * Funcion Listener para listar los modelos mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
      */
        function exitoBorradoTrabajo(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Trabajo  ' + objetoTrabajo.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Trabajo '+ objetoTrabajo.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaTrabajo"]').tab('show');
          listarTrabajo();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarTrabajo"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarTrabajo()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_TRABAJO,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_TRABAJO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarTrabajo(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaTrabajo"]').tab('show');
         }
         /**
         * Funcion para mandar a crear los PDFs, mediante AJAX
         * @returns {void}
         */
         function crearPDF()
         {
          peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'reportePDF',
          'clase' : CLASE_TRABAJO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_TRABAJO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
         }
         /**
        * Funcion Listener para listar los paises mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitoCrearPDF(jsonRespuesta,estatusRespuesta, jqXHR)
        {
          // Checamos si existio el error:
          if(jsonRespuesta.error){
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;
          }
          if(jsonRespuesta.result != '' && (jsonRespuesta.result.substr(jsonRespuesta.result.length - 4)== '.pdf')){
            var urlPDF = '../pdfs/' + jsonRespuesta.result;
            if(window.toStaticHTML){
             //Revisar... pendiente en windows 8 desktop...
            }else{
            // Estamos en un navegador web, de escritorio o movil:
            window.open(urlPDF, '_blank');
            }
          }else{
            // no se puedo crear el pdf:
            mostrarVentanaModal('El pdf, no pudo ser creado.');
          }
        }
       

        











