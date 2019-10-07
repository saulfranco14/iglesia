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
 var jsonColorEntrega = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoColorEntrega = null;


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
 var jsonEntrega = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoEntrega = null;


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

   const GATEWAY_COLORENTREGA = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_COLORENTREGA = 'colorentrega';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarColorEntrega()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

        $('#tbodyEntrega').bind('click', function(event){
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

       function listarColorEntrega()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_COLORENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_COLORENTREGA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarColorEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarColorEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonColorEntrega = jsonRespuesta.result;
          $('#tbodyEntrega > tr').remove();
          if(jsonColorEntrega.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonColorEntrega.length; indice++){
              objetoColorEntrega = jsonColorEntrega[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.a + '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.b + '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.c + '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.d + '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.e + '</td>';
                htmlNuevo += '<td>' + objetoColorEntrega.f + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyEntrega').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay colores de entregas disponibles');
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
            editarColoresEntrega(queRegistro);
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

      function editarColoresEntrega(indiceEscogido)
      {

        recuperado = true;
        objetoColorEntrega = jsonColorEntrega[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioColorEntrega"]').tab('show');
          $('#id_colores_entrega').val(objetoColorEntrega.a);
          $('#created_at').val(objetoColorEntrega.b);
          $('#updated_at').val(objetoColorEntrega.c);
          comboColor();
          $('#cantidad').val(objetoColorEntrega.e);
          comboEntrega();
          $('#h1TituloFormulario').html(sanitizarHTML('Editar color de una entrega'));
      }

      /**
      * Funcion para listar el color mediante AJAX
      * @returns {void}
      */

      function comboColor(){
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboColor',
          'clase' : CLASE_COLORENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_COLORENTREGA,
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
           
           $('#id_color').val(objetoColorEntrega.d).attr('selected','selected');

          }
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboEntrega(){
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboEntrega',
          'clase' : CLASE_COLORENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_COLORENTREGA,
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
                $('#id_entrega').append('<option value="'+ objetoEntrega.a + '">'+ objetoEntrega.d +  objetoEntrega.f +'</option>');
            }
      
          }else{

             $('#id_entrega').append('<option value="x">No hay entregas </option>');

          }

          if (recuperado) {
           
           $('#id_entrega').val(objetoColorEntrega.j).attr('selected','selected');

          }
      }

      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarEntrega()
      {
        objetoColorEntrega = null;
        $('#tabsMenu a[href="#divTabFormularioColorEntrega"]').tab('show');
        $('#id_colores_entrega').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        comboColor();
        $('#cantidad').val('');
        comboEntrega();
        $('#h1TituloFormulario').html(sanitizarHTML('Crear color para entrega'));

      }

      /**
      * Funcion para guardar un color para la entrega
      * @returns {void}
      */

      function guardarColorEntrega()
      {
        objetoColorEntrega = {
          a: $('#id_entrega').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#color_id_color').val(),
          e: $('#cantidad').val(),
          f: $('#entrega_id_entrega').val()
        };
        if (objetoColorEntrega.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_COLORENTREGA,
          'Params' : [objetoColorEntrega]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_COLORENTREGA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoColorEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoColorEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Color de entrega insertado con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Color de entrega  ' + objetoColorEntrega.a + '   actualizada');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar.');
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
          $('#tabsMenu a[href="#divTabBorrarColorEntrega"]').tab('show');
          objetoColorEntrega = jsonColorEntrega[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoColorEntrega.a + '</strong><br/>Nombre: <strong>' + objetoColorEntrega.d + '</strong>';
          $('#pDatosColorEntrega').html(sanitizarHTML(htmlNuevo));
         }

         function borrarEntrega()
         {
          objetoColorEntrega = { a:objetoColorEntrega.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_COLORENTREGA,
            'Params' : [objetoColorEntrega]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_COLORENTREGA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Color de la entrega   ' + objetoColorEntrega.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Color de la entrega '+ objetoColorEntrega.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de los colores de la entrega
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaColorEntrega"]').tab('show');
          listarColorEntrega();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarColorEntrega"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarEntrega()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_COLORENTREGA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_COLORENTREGA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarColorEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaColorEntrega"]').tab('show');
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
          'clase' : CLASE_COLORENTREGA,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_COLORENTREGA,
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
       

        











