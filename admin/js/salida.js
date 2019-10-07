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
 var jsonSalida = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoSalida = null;


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
 var jsonCliente = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoCliente = null;


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

   const GATEWAY_SALIDA = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_SALIDA = 'salida';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarSalida()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

        $('#tbodySalida').bind('click', function(event){
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

       function listarSalida()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_SALIDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarSalida(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
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
        function exitolistarSalida(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonSalida = jsonRespuesta.result;
          $('#tbodySalida > tr').remove();
          if(jsonSalida.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonSalida.length; indice++){
              objetoSalida = jsonSalida[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoSalida.a + '</td>';
                htmlNuevo += '<td>' + objetoSalida.b + '</td>';
                htmlNuevo += '<td>' + objetoSalida.c + '</td>';
                htmlNuevo += '<td>' + objetoSalida.d + '</td>';
                htmlNuevo += '<td>' + objetoSalida.e + '</td>';
                htmlNuevo += '<td>' + objetoSalida.f + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoSalida.g + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoSalida.h + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoSalida.i + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoSalida.j + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodySalida').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay salidas disponibles');
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
            editarSalida(queRegistro);
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
      * Funcion para mostrar el modelo escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function editarSalida(indiceEscogido)
      {

        recuperado = true;
        objetoSalida = jsonSalida[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioSalida"]').tab('show');
          $('#id_salida').val(objetoSalida.a);
          $('#created_at').val(objetoSalida.b);
          $('#updated_at').val(objetoSalida.c);
          $('#cantidad').val(objetoSalida.d);
          $('#observacion').val(objetoSalida.e);
          $('#fecha_salida').val(objetoSalida.f);
          comboPrenda();
          comboTalla();
          comboModelo();
          comboCliente();
          $('#h1TituloFormulario').html(sanitizarHTML('Editar una salida'));
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
          'clase' : CLASE_SALIDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
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
                $('#id_modelo').append('<option value="'+ objetoModelo.a + '">'+ objetoModelo.d + '</option>');
            }
      
          }else{

             $('#id_modelo').append('<option value="x">No hay modelo </option>');

          }

          if (recuperado) {
           
           $('#id_modelo').val(objetoSalida.i).attr('selected','selected');

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
          'clase' : CLASE_SALIDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
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
           
           $('#id_talla').val(objetoSalida.j).attr('selected','selected');

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
          'clase' : CLASE_SALIDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
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
           
           $('#id_prenda').val(objetoSalida.h).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboCliente()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboCliente',
          'clase' : CLASE_SALIDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosCliente(jsonRespuesta, estatusRespuesta, jqXHR);
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
      function exitolistarCombosCliente(jsonRespuesta, estatusRespuesta, jqXHR){
         
         // checamos primero, si existio un error personalizaod:
        if (jsonRespuesta.error) {
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;

        }

            var indice = 0;
            jsonCliente = jsonRespuesta.result;
            $('#id_cliente > option'). remove();

          if(jsonCliente.length > 0 ){
            
            for(indice=0; indice<jsonCliente.length; indice++){
              
                objetoCliente = jsonCliente[indice];
                $('#id_cliente').append('<option value="'+ objetoCliente.a + '">'+ objetoCliente.d + '</option>');
            }
      
          }else{

             $('#id_cliente').append('<option value="x">No hay talla </option>');

          }

          if (recuperado) {
           
           $('#id_cliente').val(objetoSalida.j).attr('selected','selected');

          }
      }


      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarSalida()
      {
        objetoSalida = null;
        $('#tabsMenu a[href="#divTabFormularioSalida"]').tab('show');
        $('#id_salida').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#cantidad').val('');
        $('#observacion').val('');
        $('#fecha_salida').val('');
        comboPrenda();
        comboTalla();
        comboModelo();
        comboCliente();
        $('#h1TituloFormulario').html(sanitizarHTML('Crear una salida'));

      }

      /**
      * Funcion para guardar un modelo
      * @returns {void}
      */

      function guardarSalida()
      {
        objetoSalida = {
          a: $('#id_salida').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#cantidad').val(),
          e: $('#observacion').val(),
          f: $('#fecha_salida').val(),
          g: $('#id_prenda').val(),
          h: $('#id_talla').val(),
          i: $('#id_modelo').val(),
          j: $('#id_cliente').val()
        };
        if (objetoSalida.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_SALIDA,
          'Params' : [objetoSalida]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoSalida(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoSalida(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Salida insertada con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar la salida');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Salida  ' + objetoSalida.a + '   actualizada');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar la salida');
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
          $('#tabsMenu a[href="#divTabBorrarSalida"]').tab('show');
          objetoSalida = jsonSalida[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoSalida.a + '</strong><br/>Nombre: <strong>' + objetoSalida.d + '</strong>';
          $('#pDatosSalida').html(sanitizarHTML(htmlNuevo));
         }

         function borrarSalida()
         {
          objetoSalida = { a:objetoSalida.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_SALIDA,
            'Params' : [objetoSalida]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_SALIDA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoSalida(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoSalida(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Salida   ' + objetoSalida.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Salida '+ objetoSalida.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaSalida"]').tab('show');
          listarSalida();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarSalida"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarSalida()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_SALIDA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_SALIDA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarSalida(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaSalida"]').tab('show');
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
          'clase' : CLASE_SALIDA,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_SALIDA,
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
       

        











