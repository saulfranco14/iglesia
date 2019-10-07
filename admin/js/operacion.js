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
 var jsonOperacion = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoOperacion = null;


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
 var jsonOperacion = null;

 
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

   const GATEWAY_OPERACION = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_OPERACION = 'operacion';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarOperacion()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

        $('#tbodyOperacion').bind('click', function(event){
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

       function listarOperacion()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_OPERACION,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_OPERACION,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarOperacion(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarOperacion(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonOperacion = jsonRespuesta.result;
          $('#tbodyOperacion > tr').remove();
          if(jsonOperacion.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonOperacion.length; indice++){
              objetoOperacion = jsonOperacion[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoOperacion.a + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.b + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.c + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.d + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.f + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.g + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.i + '</td>';
                htmlNuevo += '<td>' + objetoOperacion.l + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyOperacion').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay operacion disponible');
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
            editarOperacion(queRegistro);
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

      function editarOperacion(indiceEscogido)
      {

        recuperado = true;
        objetoOperacion = jsonOperacion[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioOperacion"]').tab('show');
          $('#id_operacion').val(objetoOperacion.a);
          $('#created_at').val(objetoOperacion.b);
          $('#updated_at').val(objetoOperacion.c);
          $('#nombre').val(objetoOperacion.d);
          $('#numero_operacion').val(objetoOperacion.e);
          $('#descripcion').val(objetoOperacion.f);
          $('#costo').val(objetoOperacion.g);
          comboPrenda();
          comboModelo();
          $('#ultima_operacion').val(objetoOperacion.k);
          $('#h1TituloFormulario').html(sanitizarHTML('Editar una operacion'));
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
          'clase' : CLASE_OPERACION,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_OPERACION,
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
            jsonOperacion = jsonRespuesta.result;
            $('#id_prenda > option'). remove();

          if(jsonOperacion.length > 0 ){
            
            for(indice=0; indice<jsonOperacion.length; indice++){
                objetoPrenda = jsonOperacion[indice];
                $('#id_prenda').append('<option data-modelo="'+ objetoPrenda.i + '"  value="'+ objetoPrenda.a + '">'+ objetoPrenda.d + '</option>');  
          }
      
          }else{

             $('#id_prenda').append('<option value="x">No hay prenda </option>');

          }

          if (recuperado) {
           
           $('#id_prenda').val(objetoOperacion.h).attr('selected','selected');

          }
      }

     

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboModelo(){
          peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : 'comboModelo',
          'clase' : CLASE_OPERACION,
          'Params' : ['2']
          });
          accion = "listar";
            $.ajax({
              method : 'POST',
              timeout : 50000,
              data : peticionJSON,
              dataType : 'json',
              url : GATEWAY_OPERACION,
                success : function(jsonRespuesta, estatusRespuesta, jqXHR){
                exitolistarCombosModelo(jsonRespuesta, estatusRespuesta, jqXHR);
                },
                error : function(jqXHR, estatusError, textoError){
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
              $('#id_modelo').append('<option value="'+ objetoModelo.a + '">'+ objetoModelo.d + '  |  ' + objetoModelo.e +  '</option>');
              }
            }else{
              $('#id_modelo').append('<option value="x">No hay modelos disponibles </option>');
            }
            if (recuperado) {
              $('#id_modelo').val(objetoOperacion.j).attr('selected','selected');
            }
      }

      /**
      * Metodo change para jalar el combo dependendiente de prenda a modelo
      * @returns {void}
      */

      $('#id_prenda').change(function(){

        var modelo_val    = $( '#id_prenda' ).val();
        var modelo        = $('#id_prenda').find('option[value="'+modelo_val+'"]').data('modelo');

          $.post( '../zend_gateway/servicios/modelos.php', {id_modelo: modelo} ).done( function( respuesta ){
            $( '#id_modelo' ).html( respuesta );
          });
      });

       /**
      * Metodo change para que muestra los modelos de las prendas
      * @returns {void}
      */

      $( '#id_modelo' ).change( function(){

        var modelo = $(this).children('option:selected').html();

      });


      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarOperacion()
      {
        objetoOperacion = null;
        $('#tabsMenu a[href="#divTabFormularioOperacion"]').tab('show');
        $('#id_operacion').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#nombre').val('');
        $('#numero_operacion').val('');
        $('#descripcion').val('');
        $('#costo').val('');
        comboPrenda();
        comboModelo();
        $('#ultima_operacion').val(''); 
        $('#h1TituloFormulario').html(sanitizarHTML('Crear una operacion'));

      }



      /**
      * Funcion para guardar una operacion
      * @returns {void}
      */

      function guardarOperacion()
      {
        objetoOperacion = {
          a: $('#id_operacion').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#nombre').val(),
          e: $('#numero_operacion').val(),
          f: $('#descripcion').val(),
          g: $('#costo').val(),
          h: $('#id_prenda').val(),
          j: $('#id_modelo').val(),
          k: $('#ultima_operacion').val(),
        };

        if (objetoOperacion.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_OPERACION,
          'Params' : [objetoOperacion]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_OPERACION,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoOperacion(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoOperacion(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Operacion insertada con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar la operacion');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Operacion  ' + objetoOperacion.a + '   actualizada');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar la operacion');
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
          $('#tabsMenu a[href="#divTabBorrarOperacion"]').tab('show');
          objetoOperacion = jsonOperacion[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoOperacion.a + '</strong><br/>Nombre: <strong>' + objetoOperacion.d + '</strong>';
          $('#pDatosOperacion').html(sanitizarHTML(htmlNuevo));
         }

         function borrarOperacion()
         {
          objetoOperacion = { a:objetoOperacion.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_OPERACION,
            'Params' : [objetoOperacion]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_OPERACION,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoOperacion(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoOperacion(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Operacion   ' + objetoOperacion.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Operacion '+ objetoOperacion.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaOperacion"]').tab('show');
          listarOperacion();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarOperacion"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarOperacion()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_OPERACION,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_OPERACION,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarOperacion(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaOperacion"]').tab('show');
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
          'clase' : CLASE_OPERACION,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_OPERACION,
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
       

        











