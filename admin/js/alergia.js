/**
 * JS Paises, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Rentera
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.5
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
 var jsonAlergia = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoAlergia = null;

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

   const GATEWAY_ALERGIA = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_ALERGIA = 'alergia';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarAlergia()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

      $('#tbodyAlergia').bind('click', function(event){
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

       function listarAlergia()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_ALERGIA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarAlergia(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarAlergia(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonAlergia = jsonRespuesta.result;
          $('#tbodyAlergia > tr').remove();
          if(jsonAlergia.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonAlergia.length; indice++){
              objetoAlergia = jsonAlergia[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoAlergia.a + '</td>';
                htmlNuevo += '<td>' + objetoAlergia.b + '</td>';
                htmlNuevo += '<td>' + objetoAlergia.c + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyAlergia').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay Alergia');
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
      * Funcion para mostrar el pais escogido de la lista.
      * @param {int} idBoton El ID del boton pulsado en el tbody
      * @returns {void}
      */

      function seleccionoRegistro(idBoton)
      {
        //partiendo de que llega: button_editar_1, button_editar_2, etc..., button_borrar_1, button_borrar_2, etc...
        var arraycitoIDS = idBoton.split('_');
        var queAccion = arraycitoIDS[1];//es editar o borrar
        var queRegistro = Number(arraycitoIDS[2]);// Un numero desde cero(posicion del array, no ID del registro)...
        switch(queAccion){
          case 'editar':
            editarAlergia(queRegistro);
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
      * Funcion para mostrar el pais escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los paises
      * @returns {void}
      */

      function editarAlergia(indiceEscogido)
      {
        objetoAlergia = jsonAlergia[indiceEscogido];
        $('#tabsMenu a[href="#divTabFormularioAlergia"]').tab('show');
        $('#Id_Alergia').val(objetoAlergia.a);
        $('#Tipo_Alergia').val(objetoAlergia.b);
        $('#Descripcion_Alergia').val(objetoAlergia.c);
        $('#h1TituloFormulario').html(sanitizarHTML('Editar una Alergia'));
      }
      /**
      * Funcion para mostrar el formulario para un nuevo pais.
      * @returns {void}
      */

      function agregarAlergia()
      {
        objetoAlergia = null;
        $('#tabsMenu a[href="#divTabFormularioAlergia"]').tab('show');
        $('#Id_Alergia').val(0);
        $('#Tipo_Alergia').val('');
        $('#Descripcion_Alergia').val('');
        $('#h1TituloFormulario').html(sanitizarHTML('Crear una Alergia'));
      }

      /**
      * Funcion para guardar un pais
      * @returns {void}
      */

      function guardarAlergia()
      {
        objetoAlergia = {
          a: $('#Id_Alergia').val(),
          b: $('#Tipo_Alergia').val(),
          c: $('#Descripcion_Alergia').val()
        };
        if (objetoAlergia.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_ALERGIA,
          'Params' : [objetoAlergia]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoAlergia(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoAlergia(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Alergia insertada con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar la alergia');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Alergia  ' + objetoAlergia.a + '   Actualizada');
                }else{
                  //no se actuzalizo
                  mostrarVentanaModal('No se pudo actualizar la Alergia');
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
          $('#tabsMenu a[href="#divTabBorrarAlergia"]').tab('show');
          objetoAlergia = jsonAlergia[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoAlergia.a + '</strong><br/>Nombre: <strong>' + objetoAlergia.b + '</strong>';
          $('#pDatosAlergia').html(sanitizarHTML(htmlNuevo));
         }

         function borrarAlergia()
         {
          objetoAlergia = { a:objetoAlergia.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_ALERGIA,
            'Params' : [objetoAlergia]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALERGIA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoAlergia(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoAlergia(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Alergia   ' + objetoAlergia.a + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('La Alergia'+ objetoAlergia.a + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaAlergia"]').tab('show');
          listarAlergia();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarAlergia"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los paises mediante AJAX
         * @returns {void}
         */
         function buscarAlergia()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_ALERGIA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALERGIA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarAlergia(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaAlergia"]').tab('show');
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
          'clase' : CLASE_ALERGIA,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIA,
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
       

        











