/**
 * JS Alumnos, para brindar funcionalidades JSON desde / hacia el servidor. IMPORTANTE
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
 var jsonAlumno = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoAlumno = null;

   /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonGrupo = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoGrupo = null;

  /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonDomicilio = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoDomicilio = null;

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
   * variable publica que indica si recuperamos un grado de la lista de grados
   * @var {String}
   */

   var recuperado = false;

   /**
   * constante publica con la url del Gateway que recibe las peticiones al servidor
   * (Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http://www.dominio.com/etc...)
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   const GATEWAY_ALUMNO = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_ALUMNO = 'alumno';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarAlumno()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

      $('#tbodyAlumno').bind('click', function(event){
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

       function listarAlumno()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }

       /**
        * Funcion Listener para listar de Grupos mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonAlumno = jsonRespuesta.result;
          $('#tbodyAlumno > tr').remove();
          if(jsonAlumno.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonAlumno.length; indice++){
              objetoAlumno = jsonAlumno[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';7
               //   htmlNuevo += '&nbsp; <br class="visible-xs" />';
               //    htmlNuevo += '<button id="button_crear_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td>' + objetoAlumno.a + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.b + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.c + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.d + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.e + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.f + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.g + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.h + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.i + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.j + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.k + '</td>'
                htmlNuevo += '<td class="hidden-xs">' + objetoAlumno.l + '</td>'
                htmlNuevo += '<td class="hidden-xs">' + objetoAlumno.m + '</td>'
                htmlNuevo += '</tr>';
            }
            $('#tbodyAlumno').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay Alumnos');
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
            editarAlumno(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
            case 'crear':
            crearCredencial(queRegistro);
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

      function editarAlumno(indiceEscogido)
      {
        recuperado = true;
        objetoAlumno = jsonAlumno[indiceEscogido];
        $('#tabsMenu a[href="#divTabFormularioAlumno"]').tab('show');
        $('#Id_Alumno').val(objetoAlumno.a);
        $('#Nombre_Alumno').val(objetoAlumno.b);
        $('#ApellidoPaterno_Alumno').val(objetoAlumno.c);
        $('#ApellidoMaterno_Alumno').val(objetoAlumno.d);
        $('#Curp_Alumno').val(objetoAlumno.e);
        $('#Correo_Alumno').val(objetoAlumno.f);
        $('#Telefono_Alumno').val(objetoAlumno.g);
        $('#Genero_Alumno').val(objetoAlumno.h);
        $('#Tutor_Alumno').val(objetoAlumno.i);
        $('#CicloEscolar_Alumno').val(objetoAlumno.j);
        $('#Matricula_Alumno').val(objetoAlumno.k);
        comboDomicilio();
        comboGrupo();
        $('#h1TituloFormulario').html(sanitizarHTML('Editar a un Alumno'));
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboDomicilio()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboDomicilio',
          'clase' : CLASE_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosDomicilio(jsonRespuesta, estatusRespuesta, jqXHR);
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
      function exitolistarCombosDomicilio(jsonRespuesta, estatusRespuesta, jqXHR)
      {
      // checamos primero, si existio un error personalizaod:
       if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
       }
       var indice = 0;
       jsonDomicilio = jsonRespuesta.result;
       $('#Id_Domicilio > option'). remove();
       if(jsonDomicilio.length > 0 ){
        for(indice=0; indice<jsonDomicilio.length; indice++){
        objetoDomicilio = jsonDomicilio[indice];
       $('#Id_Domicilio').append('<option value="'+ objetoDomicilio.a + '">'+ objetoDomicilio.b + "  , " + objetoDomicilio.c + " , " + objetoDomicilio.d + "  , " + objetoDomicilio.e + " ,  " + objetoDomicilio.f + "  ,  " + objetoDomicilio.g + '</option>');
      }
      }else{
       $('#Id_Domicilio').append('<option value="x">No hay Domicilio </option>');
      }
      if (recuperado) {
       $('#Id_Domicilio').val(objetoAlumno.l).attr('selected','selected');
      }
      }

/**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboGrupo()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboGrupo',
          'clase' : CLASE_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosGrupo(jsonRespuesta, estatusRespuesta, jqXHR);
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
      function exitolistarCombosGrupo(jsonRespuesta, estatusRespuesta, jqXHR)
      {
      // checamos primero, si existio un error personalizaod:
       if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
       }
       var indice = 0;
       jsonGrupo = jsonRespuesta.result;
       $('#Id_Grupo > option'). remove();
       if(jsonGrupo.length > 0 ){
        for(indice=0; indice<jsonGrupo.length; indice++){
        objetoGrupo = jsonGrupo[indice];
       $('#Id_Grupo').append('<option value="'+ objetoGrupo.a + '">'+ objetoGrupo.b + '</option>');
      }
      }else{
       $('#Id_Grupo').append('<option value="x">No hay Grados </option>');
      }
      if (recuperado) {
       $('#Id_Grupo').val(objetoAlumno.m).attr('selected','selected');
      }
      }


      /**
      * Funcion para mostrar el formulario para un nuevo pais.
      * @returns {void}
      */

      function agregarAlumno()
      {
        objetoAlumno = null;
        $('#tabsMenu a[href="#divTabFormularioAlumno"]').tab('show');
        $('#Id_Alumno').val(0);
        $('#Nombre_Alumno').val('');
        $('#ApellidoPaterno_Alumno').val('');
        $('#ApellidoMaterno_Alumno').val('');
        $('#Curp_Alumno').val(''); 
        $('#Correo_Alumno').val('');
        $('#Telefono_Alumno').val('');
        $('#Genero_Alumno').val('');
        $('#Tutor_Alumno').val('');
        $('#CicloEscolar_Alumno').val('');
        $('#Matricula_Alumno').val('');
        comboDomicilio();
        comboGrupo();
        
        $('#h1TituloFormulario').html(sanitizarHTML('Crear a un Alumno'));
      }

      /**
      * Funcion para guardar un Grupo
      * @returns {void}
      */

      function guardarAlumno()
      {
        objetoAlumno = {
          a: $('#Id_Alumno').val(),
          b: $('#Nombre_Alumno').val(),
          c: $('#ApellidoPaterno_Alumno').val(),
          d: $('#ApellidoMaterno_Alumno').val(),
          e: $('#Curp_Alumno').val(),
          f: $('#Correo_Alumno').val(),
          g: $('#Telefono_Alumno').val(),
          h: $('#Genero_Alumno').val(),
          i: $('#Tutor_Alumno').val(),
          j: $('#CicloEscolar_Alumno').val(),
          k: $('#Matricula_Alumno').val(),
          l: $('#Id_Domicilio').val(),
          m: $('#Id_Grupo').val()
        };
        if (objetoAlumno.a == 0) {
          //insertar Grupo
          accion = 'insertar';
        }else{
          //actualizar Grupo
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_ALUMNO,
          'Params' : [objetoAlumno]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Alumno insertado con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar al Alumno');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Alumno  ' + objetoAlumno.a + '   Actualizado');
                }else{
                  //no se actuzalizo
                  mostrarVentanaModal('No se pudo actualizar al Alumno');
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
         * Funcion para solicitar confirmar el borrado del Grupo
         * @param {int} indiceEscogido El indice escogido de la lista de los paises
         * @returns {void}
         */
         function confirmarBorrado(indiceEscogido)
         {
          $('#tabsMenu a[href="#divTabBorrarAlumno"]').tab('show');
          
          objetoAlumno = jsonAlumno[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoAlumno.a + '</strong><br/>Nombre: <strong>' + objetoAlumno.b + '</strong>';
          $('#pDatosAlumno').html(sanitizarHTML(htmlNuevo));
         }

         function borrarAlumno()
         {
          objetoAlumno = { a:objetoAlumno.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_ALUMNO,
            'Params' : [objetoAlumno]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Alumno   ' + objetoAlumno.a + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
              
            }else{
              //no se borro:
              mostrarVentanaModal('El Alumno'+ objetoAlumno.a + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaAlumno"]').tab('show');
          listarAlumno();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarAlumno"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los paises mediante AJAX
         * @returns {void}
         */
         function buscarAlumno()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_ALUMNO,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaAlumno"]').tab('show');
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
          'clase' : CLASE_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
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

         /**
         * Funcion para mandar a crear los PDF de los alumnos de una lista, mediante AJAX
         * @returns {void}
         */
         function crearPDFLista()
         {
          peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'reportePDFLista',
          'clase' : CLASE_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
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
        function exitoCrearPDFDomicilio(jsonRespuesta,estatusRespuesta, jqXHR)
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
         function crearPDFLista()
         {
          peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'reportePDFDomicilio',
          'clase' : CLASE_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
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
        function exitoCrearPDFDomicilio(jsonRespuesta,estatusRespuesta, jqXHR)
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
        /**
        * Funcion Listener para obtener la crendencial del PDF
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
       
            function crearCredencial(indiceEscogido)
            {
              
            objetoAlumno = jsonAlumno[indiceEscogido];

                      peticionJSON = JSON.stringify(
                    {
                      'Id' : generarID(),
                      'method' : 'reportePDFCredencial',
                      'clase' : CLASE_ALUMNO,
                      'Params' : [objetoAlumno]
                    });
                    $.ajax({
                      method : 'POST',
                      timeout : 30000,
                      data : peticionJSON,
                      dataType : 'json',
                      url : GATEWAY_ALUMNO,
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
        function exitoCrearPDFCredencial(jsonRespuesta,estatusRespuesta, jqXHR)
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
         function crearPDFCrendecial()
         {
          peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'reportePDFCredencial',
          'clase' : CLASE_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
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
        function exitoCrearPDFCredencial(jsonRespuesta,estatusRespuesta, jqXHR)
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
        











