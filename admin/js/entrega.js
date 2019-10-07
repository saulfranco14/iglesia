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
 var jsonEntregaColores = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoEntregaColores = null;


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

   const GATEWAY_ENTREGA = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_ENTREGA = 'entrega';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarEntrega()
	   );

  $(document).ready(
     listarColoresEntrega()
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
      * Crear chismoso para el tbody:
      */

        $('#tbodyEntregaColores').bind('click', function(event){
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

       function listarEntrega()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonEntrega = jsonRespuesta.result;
          $('#tbodyEntrega > tr').remove();
          if(jsonEntrega.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonEntrega.length; indice++){
              objetoEntrega = jsonEntrega[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                  //htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  //htmlNuevo += '<button id="button_colores_'+ indice + '" type="button" aria-label="Contrasena" class="btn btn-sm btn-success"><span class="glyphicon glyphicon glyphicon-tint" aria-hidden="true"></span></button>';
                  // htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  //htmlNuevo += '<button id="button_vista_'+ indice + '" type="button" aria-label="Contrasena" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoEntrega.a + '</td>';
                htmlNuevo += '<td>' + objetoEntrega.b + '</td>';
              // htmlNuevo += '<td>' + objetoEntrega.c + '</td>';
                htmlNuevo += '<td><strong>' + objetoEntrega.d + ' pzas </strong> </td>';
                htmlNuevo += '<td>' + objetoEntrega.e + '</td>';
                htmlNuevo += '<td><strong>' + objetoEntrega.f + '</strong></td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoEntrega.g + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoEntrega.h + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoEntrega.i + '</td>';
                htmlNuevo += '<td class="hidden-xs">' + objetoEntrega.j + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyEntrega').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay entregas disponibles');
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
       * Funcion para listar los paises mediante AJAX
       * @return {void}
       */

       function listarColoresEntrega(){
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listarColores',
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listarColores";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarEntregaColores(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarEntregaColores(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //Checamos primero, si existio un error Personalizado:
          if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonEntregaColores = jsonRespuesta.result;
          $('#tbodyEntregaColores > tr').remove();
          if(jsonEntregaColores.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonEntregaColores.length; indice++){
              objetoEntregaColores = jsonEntregaColores[indice];

              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editarcolor_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrarcolor_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoEntregaColores.k + '</td>';
                htmlNuevo += '<td>' + objetoEntregaColores.l + '</td>';
              // htmlNuevo += '<td>' + objetoEntrega.c + '</td>';
              //  htmlNuevo += '<td><strong>' + objetoEntregaColores.m + ' </strong> </td>';
                htmlNuevo += '<td>' + objetoEntregaColores.n + '</td>';
                htmlNuevo += '<td><strong>' + objetoEntregaColores.o + '</strong></td>';
                htmlNuevo += '<td><strong>' + objetoEntregaColores.q + '</strong></td>';
                htmlNuevo += '<td>' + objetoEntregaColores.p + '</td>';
               // htmlNuevo += '<td>' + objetoEntregaColores.t + '</td>';
                //htmlNuevo += '<td>' + objetoEntregaColores.w + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyEntregaColores').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay colores de entregas disponibles');
          }
          switch (accion){
          case 'buscarColores':
            //mostramos el boton de listar todos:
            $('#buttonListarColoresTodos').show();
          break;
          case 'listarColores':
            //ocultamos el boton de listar todos:
            $('#buttonListarColoresTodos').hide();
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
            editarEntrega(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
          case 'colores':
            coloresInsertar(queRegistro);
            break;
          case 'vista':
            vistaColores(queRegistro);
            break;
          case 'editarcolor':
            editarEntregaColor(queRegistro);
            break;
          case 'borrarcolor':
            confirmarBorradoColor(queRegistro);
            break;
          default:
            mostrarVentanaModal('No hay accion seleccionada');
          break;
        }
      }


       /**
         * Funcion para solicitar confirmar el borrado de la alergia
         * @param {int} indiceEscogido El indice escogido de la lista de los paises
         * @returns {void}
         */
        function vistaColores(indiceEscogido){
          
          $('#tabsMenu a[href="#divTabListaColores"]').tab('show');
          listarColoresEntrega();

        }

      /**
         * Funcion para solicitar confirmar el borrado de la alergia
         * @param {int} indiceEscogido El indice escogido de la lista de los paises
         * @returns {void}
         */
        function coloresInsertar(indiceEscogido){
          
            objetoEntrega = null;
                $('#tabsMenu a[href="#divTabColores"]').tab('show');
                $('#id_colores_entrega').val(0);
                comboColor();
                $('#cantidad_colores_entrega').val('');
                comboEntrega();
              $('#h1TituloFormulario').html(sanitizarHTML('Crear colores de entrega'));
        }
      
        function guardarColorEntrega(){
          
          objetoEntrega ={
              k: $('#id_colores_entrega').val(),
              n: $('#color_id_color').val(),
              o: $('#cantidad_colores_entrega').val(),
              p: $('#entrega_id_entrega').val()
          };



          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'colores',
            'clase' : CLASE_ENTREGA,
            'Params' : [objetoEntrega]
          });

          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ENTREGA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoColoresEntrega(jsonRespuesta, estatusRespuesta, jqXHR);

            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
         }


        function exitoColoresEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
        {

          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result >= 0){
              //si se borro:
              mostrarVentanaModal('Colores de entrega guardado exitosamente.');
            }else{
              //no se borro:
              mostrarVentanaModal('No se pudo insertar, intente más tarde.');

            }
            mostrarListado();
        }


      /**
      * Funcion para mostrar el modelo escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function editarEntrega(indiceEscogido)
      {

        recuperado = true;
        objetoEntrega = jsonEntrega[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioEntrega"]').tab('show');
          $('#id_entrega').val(objetoEntrega.a);
          $('#created_at').val(objetoEntrega.b);
          $('#updated_at').val(objetoEntrega.c);
          $('#cantidad').val(objetoEntrega.d);
          $('#observacion').val(objetoEntrega.e);
          $('#fecha_entrega').val(objetoEntrega.f);
          comboPrenda();
          comboTalla();
          comboModelo();
          comboCliente();
          comboColor(); // comboColor l
          $('#activo').val(objetoEntrega.q);
          $('#h1TituloFormulario').html(sanitizarHTML('Editar una entrega'));
      }

       /**
      * Funcion para mostrar el modelo escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function editarEntregaColor(indiceEscogido)
      {

        recuperado = true;
        objetoEntregaColores = jsonEntregaColores[indiceEscogido];
          $('#tabsMenu a[href="#divTabColores"]').tab('show');
          $('#id_colores_entrega').val(objetoEntregaColores.k);
          comboColor();
          $('#cantidad_colores_entrega').val(objetoEntregaColores.o);
          comboEntrega();
          $('#h1TituloFormulario').html(sanitizarHTML('Editar una entrega de colores'));
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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
            $('#color_id_color > option'). remove();

          if(jsonColor.length > 0 ){
            
            for(indice=0; indice<jsonColor.length; indice++){
                objetoColor = jsonColor[indice];
                $('#color_id_color').append('<option value="'+ objetoColor.a + '">'+ objetoColor.d + '</option>');
            }
      
          }else{

             $('#color_id_color').append('<option value="x">No hay color </option>');

          }

          if (recuperado) {
           
           $('#color_id_color').val(objetoEntregaColores.n).attr('selected','selected');

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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
            $('#entrega_id_entrega > option'). remove();

          if(jsonEntrega.length > 0 ){
            
            for(indice=0; indice<jsonEntrega.length; indice++){
                objetoEntrega = jsonEntrega[indice];
                    $('#entrega_id_entrega').append('<option value="'+ objetoEntrega.a + '">' + objetoEntrega.d + ' pzas '  + ' |   Corte:  ' + objetoEntrega.prenda + ' | Talla:   ' + objetoEntrega.talla + ' |  Modelo:  ' +  objetoEntrega.modelo + ' | Cliente:   '   +  objetoEntrega.cliente + '</option>');            
            }
      
          }else{

             $('#entrega_id_entrega').append('<option value="x">No hay colores de entregas </option>');

          }

          if (recuperado) {
           
           $('#entrega_id_entrega').val(objetoEntregaColores.w).attr('selected','selected');

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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
                $('#id_modelo').append('<option value="'+ objetoModelo.a + '">'+ objetoModelo.d + '  |  ' + objetoModelo.e +  '</option>');
            }
      
          }else{

             $('#id_modelo').append('<option value="x">No hay modelo </option>');

          }

          if (recuperado) {
           
           $('#id_modelo').val(objetoEntrega.i).attr('selected','selected');

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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
           
           $('#id_talla').val(objetoEntrega.j).attr('selected','selected');

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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
                $('#id_prenda').append('<option data-modelo="'+ objetoPrenda.i + '" value="'+ objetoPrenda.a + '">'+ ' Corte: ' + objetoPrenda.d + '    |    ' + ' Modelo: '  + objetoPrenda.modelo +  ' </option>');
            }
      
          }else{

             $('#id_prenda').append('<option value="x">No hay prenda </option>');

          }

          if (recuperado) {
           
           $('#id_prenda').val(objetoEntrega.h).attr('selected','selected');

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
          'clase' : CLASE_ENTREGA,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
           
           $('#id_cliente').val(objetoEntrega.j).attr('selected','selected');

          }
      }


      /**
      * Funcion para mostrar el formulario para una nueva prenda.
      * @returns {void}
      */

      function agregarEntrega()
      {
        objetoEntrega = null;
        $('#tabsMenu a[href="#divTabFormularioEntrega"]').tab('show');
        $('#id_entrega').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#cantidad').val('');
        $('#observacion').val('');
        $('#fecha_entrega').val('');
        comboPrenda();
        comboTalla();
        comboModelo();
        comboCliente();
        $('#activo').val('');
        $('#h1TituloFormulario').html(sanitizarHTML('Crear una entrega'));

      }

      /**
      * Funcion para guardar un modelo
      * @returns {void}
      */

      function guardarEntrega(){

        var modelo_val = $( '#id_prenda' ).val();

        var modelo     = $('#id_prenda').find('option[value="'+modelo_val+'"]').data('modelo');


        objetoEntrega = {
          a: $('#id_entrega').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#cantidad').val(),
          e: $('#observacion').val(),
          f: $('#fecha_entrega').val(),
          g: $('#id_prenda').val(),
          h: $('#id_talla').val(),
          i: modelo,
          j: $('#id_cliente').val(),
          q: $('#activo').val()
        };

        console.log(objetoEntrega);
        if (objetoEntrega.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_ENTREGA,
          'Params' : [objetoEntrega]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoEntrega(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Entrega insertada con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar la entrega');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Entrega  ' + objetoEntrega.a + '   actualizada');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar la entrega');
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
          $('#tabsMenu a[href="#divTabBorrarEntrega"]').tab('show');
          objetoEntrega = jsonEntrega[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoEntrega.a + '</strong><br/>Nombre: <strong>' + objetoEntrega.d + '</strong>';
          $('#pDatosEntrega').html(sanitizarHTML(htmlNuevo));
         }

         function borrarEntrega()
         {
          objetoEntrega = { a:objetoEntrega.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_ENTREGA,
            'Params' : [objetoEntrega]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ENTREGA,
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
              mostrarVentanaModal('Entrega   ' + objetoEntrega.d + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Entrega '+ objetoEntrega.d + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaEntrega"]').tab('show');
          listarEntrega();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarEntrega"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }

         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusquedaColores()
         {
          $('#tabsMenu a[href="#divTabBuscarColores"]').tab('show');
          $('#inputCriterioColores').val('');
          $('#selectColumnaColores').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarEntrega()
         {
          columna = $('#selectColumna').val();
          criterio = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_ENTREGA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ENTREGA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarEntrega(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaEntrega"]').tab('show');
         }

          /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarEntregaColores()
         {
          columna = $('#selectColumnaColores').val();
          criterio = $('#inputCriterioColores').val();
          accion = 'buscarColores';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscarColores',
            'clase' : CLASE_ENTREGA,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ENTREGA,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarEntregaColores(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaColores"]').tab('show');
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
          'clase' : CLASE_ENTREGA,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ENTREGA,
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
       

        











