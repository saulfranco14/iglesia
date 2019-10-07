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
 var jsonUsuario = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoUsuario = null;

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

   const GATEWAY_USUARIO = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_USUARIO = 'usuario';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarUsuario()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

        $('#tbodyUsuario').bind('click', function(event){
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

       function listarUsuario()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_USUARIO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_USUARIO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarUsuario(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarUsuario(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonUsuario = jsonRespuesta.result;
          $('#tbodyUsuario > tr').remove();
          if(jsonUsuario.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonUsuario.length; indice++){
              objetoUsuario = jsonUsuario[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_contrasena_'+ indice + '" type="button" aria-label="Contrasena" class="btn btn-sm btn-info"><span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoUsuario.b + '</td>';
                htmlNuevo += '<td>' + objetoUsuario.c + '</td>';
                htmlNuevo += '<td>' + objetoUsuario.d + '</td>';
                htmlNuevo += '<td>' + objetoUsuario.e + '</td>';
                //htmlNuevo += '<td>' + objetoUsuario.f + '</td>';
                htmlNuevo += '<td>' + objetoUsuario.g + '</td>';
                //htmlNuevo += '<td>' + objetoUsuario.i + '</td>';
                htmlNuevo += '<td>' + objetoUsuario.j + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyUsuario').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay usuario disponible');
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
      * Funcion para mostrar la talla escogido de la lista.
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
            editarUsuario(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
          case 'contrasena':
            confirmarContrasenaUsuario(queRegistro);
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
        function confirmarContrasenaUsuario(indiceEscogido){
          
            objetoUsuario = jsonUsuario[indiceEscogido];
              $('#tabsMenu a[href="#divTabContrasenaUsuario"]').tab('show');
              $('#id_usuario_contra').val(objetoUsuario.a);
              $('#usuario').val('');
              $('#password').val('');
              $('#h1TituloFormularioContra').html(sanitizarHTML('Editar contraseña'));
        
        }
      
        function cambiarContrasenaUsuario(){
          
          objetoUsuario ={
              
              a: $('#id_usuario_contra').val(),
              o: $('#usuario').val(),
              p: $('#password').val()
          };

          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'contrasena',
            'clase' : CLASE_USUARIO,
            'Params' : [objetoUsuario]
          });

          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_USUARIO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoContrasenaUsuario(jsonRespuesta, estatusRespuesta, jqXHR);

            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
      }
        function exitoContrasenaUsuario(jsonRespuesta, estatusRespuesta, jqXHR)
        {

          console.log(jsonRespuesta.result);
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result >= 0){
              //si se borro:
              mostrarVentanaModal('Contraseña cambiada exitosamente.');
            }else{
              //no se borro:
              mostrarVentanaModal('No se pudo actualizar la contraseña, intente más tarde.');

            }
            mostrarListado();
        }

      /**
      * Funcion para mostrar el modelo escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los modelos
      * @returns {void}
      */

      function editarUsuario(indiceEscogido)
      {
        objetoUsuario = jsonUsuario[indiceEscogido];
          $('#tabsMenu a[href="#divTabFormularioUsuario"]').tab('show');
          $('#id_usuario').val(objetoUsuario.a);
          $('#created_at').val(objetoUsuario.b);
          $('#updated_at').val(objetoUsuario.c);
          $('#nombre').val(objetoUsuario.d);
          $('#apellido_paterno').val(objetoUsuario.e);
          $('#apellido_materno').val(objetoUsuario.f);
          $('#telefono_celular').val(objetoUsuario.g);
          $('#telefono_casa').val(objetoUsuario.h);
          $('#fecha_ingreso').val(objetoUsuario.i);
          $('#rol').val(objetoUsuario.j);
          $('#sexo').val(objetoUsuario.k);
          $('#estado_civil').val(objetoUsuario.l);
          $('#salario').val(objetoUsuario.m);
          $('#direccion').val(objetoUsuario.n);
         // $('#usuario').val(objetoUsuario.o);
         // $('#password').val(objetoUsuario.p);
          $('#h1TituloFormulario').html(sanitizarHTML('Editar un usuario'));
      }
      /**
      * Funcion para mostrar el formulario para un nuevo modelo.
      * @returns {void}
      */

      function agregarUsuario()
      {
        objetoUsuario = null;
        $('#tabsMenu a[href="#divTabFormularioUsuario"]').tab('show');
        $('#id_usuario').val(0);
        $('#created_at').val('');
        $('#updated_at').val('');
        $('#nombre').val('');
        $('#apellido_paterno').val('');
        $('#apellido_materno').val('');
        $('#telefono_celular').val('');
        $('#telefono_casa').val('');
        $('#fecha_ingreso').val('');
        $('#rol').val('');
        $('#sexo').val('');
        $('#estado_civil').val('');
        $('#salario').val('');
        $('#direccion').val('');
        //$('#usuario').val('');
        //$('#password').val('');
        $('#h1TituloFormulario').html(sanitizarHTML('Crear un usuario'));

      }

      /**
      * Funcion para guardar un modelo
      * @returns {void}
      */

      function guardarUsuario()
      {
        objetoUsuario = {
          a: $('#id_usuario').val(),
          b: $('#created_at').val(),
          c: $('#updated_at').val(),
          d: $('#nombre').val(),
          e: $('#apellido_paterno').val(),
          f: $('#apellido_materno').val(),
          g: $('#telefono_celular').val(),
          h: $('#telefono_casa').val(),
          i: $('#fecha_ingreso').val(),
          j: $('#rol').val(),
          k: $('#sexo').val(),
          l: $('#estado_civil').val(),
          m: $('#salario').val(),
          n: $('#direccion').val(),
          //o: $('#usuario').val(),
          //p: $('#password').val()
        };
        if (objetoUsuario.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_USUARIO,
          'Params' : [objetoUsuario]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_USUARIO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoUsuario(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoUsuario(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Usuario insertado con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar al usuario');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Usuario  ' + objetoUsuario.a + '   actualizado');
                }else{
                  //no se actualizo
                  mostrarVentanaModal('No se pudo actualizar el usuario');
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
          $('#tabsMenu a[href="#divTabBorrarUsuario"]').tab('show');
          objetoUsuario = jsonUsuario[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoUsuario.a + '</strong><br/>Nombre: <strong>' + objetoUsuario.d + '</strong>';
          $('#pDatosUsuario').html(sanitizarHTML(htmlNuevo));
         }

         function borrarUsuario()
         {
          objetoUsuario = { a:objetoUsuario.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_USUARIO,
            'Params' : [objetoUsuario]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_USUARIO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoUsuario(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoUsuario(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Usuario   ' + objetoUsuario.c + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Usuario '+ objetoUsuario.c + 'no pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaUsuario"]').tab('show');
          listarUsuario();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarUsuario"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los modelos mediante AJAX
         * @returns {void}
         */
         function buscarUsuario()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_USUARIO,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_USUARIO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarUsuario(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaUsuario"]').tab('show');
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
          'clase' : CLASE_USUARIO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_USUARIO,
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
       

        











