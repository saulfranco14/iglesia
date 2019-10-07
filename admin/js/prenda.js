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

   const GATEWAY_PRENDA = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_PRENDA = 'prenda';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

  $(document).ready(
    listarPrenda()
  );
     
  /**
  * Crear chismoso para el tbody:
  */
  $('#tbodyPrenda').bind('click', function(event){
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
  function listarPrenda(){
    peticionJSON = JSON.stringify({
    'Id' : generarID(),
    'method' : 'listar',
    'clase' : CLASE_PRENDA,
    'Params' : ['2']
    });
      accion = "listar";
        $.ajax({
        method : 'POST',
        timeout : 30000,
        data : peticionJSON,
        dataType : 'json',
        url : GATEWAY_PRENDA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR){
          exitolistarPrenda(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarPrenda(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonPrenda = jsonRespuesta.result;
          $('#tbodyPrenda > tr').remove();
          if(jsonPrenda.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonPrenda.length; indice++){
              objetoPrenda = jsonPrenda[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_actuim_' + indice + '" type="button" aria-label="actualizar" class="btn btn-sm btn-info"><span class="glyphicon glyphicon-camera" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td><img class="muestra img-rounded" src="../imagenes/prendas/' + objetoPrenda.g + '" title="' + objetoPrenda.g + '"/></td>';
                
                htmlNuevo += '<td>' + objetoPrenda.b + '</td>';
                htmlNuevo += '<td>' + objetoPrenda.c + '</td>';
                htmlNuevo += '<td>' + objetoPrenda.d + '</td>';
                htmlNuevo += '<td>' + objetoPrenda.f + '</td>';
                htmlNuevo += '<td>' + objetoPrenda.i + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyPrenda').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay prenda disponible');
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
            editarPrenda(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
          case 'actuim':
            confirmarActualizar(queRegistro);
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

      function editarPrenda(indiceEscogido)
      {

        recuperado = true;
        objetoPrenda = jsonPrenda[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioPrenda"]').tab('show');
          $('#id_prenda').val(objetoPrenda.a);
          $('#created_at').val(objetoPrenda.b);
          $('#updated_at').val(objetoPrenda.c);
          $('#nombre').val(objetoPrenda.d);
          $('#descripcion').val(objetoPrenda.e);
          $('#costo').val(objetoPrenda.f);
          $('#imagen').val(objetoPrenda.g);
          comboModelo();
          $('#h1TituloFormulario').html(sanitizarHTML('Editar un corte'));
      }

       /**
      * Funcion para mostrar la imagen y poder actualizar.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function confirmarActualizar(indiceEscogido)
      {
          objetoPrenda = jsonPrenda[indiceEscogido];
          $('#tabsMenu a[href="#divTabActualizarImgPrenda"]').tab('show');
          $('#show_cover').attr("src", "../imagenes/prendas/" + objetoPrenda.g);
          $('#imagen').val(objetoPrenda.g);
          $('#h1TituloFormulario').html(sanitizarHTML('Imagen'));

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
          'clase' : CLASE_PRENDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_PRENDA,
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
                $('#id_modelo').append('<option value="'+ objetoModelo.a + '">'+ objetoModelo.d + '-' + objetoModelo.e +  '</option>');
            }
      
          }else{

             $('#id_modelo').append('<option value="x">No hay modelo </option>');

          }

          if (recuperado) {
           
           $('#id_modelo').val(objetoPrenda.h).attr('selected','selected');

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
          'clase' : CLASE_PRENDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_PRENDA,
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
           
           $('#id_talla').val(objetoPrenda.j).attr('selected','selected');

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
          'clase' : CLASE_PRENDA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_PRENDA,
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
           
           $('#id_color').val(objetoPrenda.h).attr('selected','selected');

          }
      }


      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarPrenda()
      {
        objetoPrenda = null;
        $('#tabsMenu a[href="#divTabFormularioPrenda"]').tab('show');
        $('#id_prenda').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#nombre').val('');
        $('#descripcion').val('');
        $('#costo').val('');
        $('#imagen').val(''); 
        comboModelo();
        $('#h1TituloFormulario').html(sanitizarHTML('Crear un corte'));

      }

      /**
      * Funcion para guardar un modelo
      * @returns {void}
      */

      function guardarPrenda()
      {
        objetoPrenda = {
          a: $('#id_prenda').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#nombre').val(),
          e: $('#descripcion').val(),
          f: $('#costo').val(),
          g: $('#imagen').val(),
          h: $('#id_modelo').val()
        };
        if (objetoPrenda.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_PRENDA,
          'Params' : [objetoPrenda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_PRENDA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadPrenda(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadPrenda(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Prenda insertada con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar la prenda');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Prenda  ' + objetoPrenda.a + '   actualizada');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar la prenda');
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
          $('#tabsMenu a[href="#divTabBorrarPrenda"]').tab('show');
          objetoPrenda = jsonPrenda[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoPrenda.a + '</strong><br/>Nombre: <strong>' + objetoPrenda.d + '</strong>';
          $('#pDatosPrenda').html(sanitizarHTML(htmlNuevo));
         }

         function borrarPrenda()
         {
          objetoPrenda = { a:objetoPrenda.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_PRENDA,
            'Params' : [objetoPrenda]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_PRENDA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoPrenda(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoPrenda(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Prenda   ' + objetoPrenda.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Prenda '+ objetoPrenda.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaPrenda"]').tab('show');
          listarPrenda();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarPrenda"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarPrenda()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_PRENDA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_PRENDA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarPrenda(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaPrenda"]').tab('show');
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
          'clase' : CLASE_PRENDA,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_PRENDA,
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
       

        











