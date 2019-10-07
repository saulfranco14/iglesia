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
 var jsonAlergias_has_Alumno = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoAlergias_has_Alumno = null;

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
 var jsonAlergias = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object} 
  */
  var objetoAlergias = null;

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

   const GATEWAY_ALERGIAS_HAS_ALUMNO = "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_ALERGIAS_HAS_ALUMNO = 'alergias_has_alumno';


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarAlergias_has_Alumno()
	   );
     
     /**
      * Crear chismoso para el tbody:
      */

      $('#tbodyRompimiento').bind('click', function(event){
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

       function listarAlergias_has_Alumno()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIAS_HAS_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitolistarAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonAlergias_has_Alumno = jsonRespuesta.result;
          $('#tbodyRompimiento > tr').remove();
          if(jsonAlergias_has_Alumno.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonAlergias_has_Alumno.length; indice++){
              objetoAlergias_has_Alumno = jsonAlergias_has_Alumno[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_reporte_'+ indice + '" type="button" aria-label="Reporte" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '<td class="hidden-xs>' + objetoAlergias_has_Alumno.a + '</td>';
                htmlNuevo += '<td class="hidden-xs>' + objetoAlergias_has_Alumno.b + '</td>';
                htmlNuevo += '<td>' + objetoAlergias_has_Alumno.c + '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyRompimiento').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay alergias ni alumnos');
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
            editarAlergias_has_Alumno(queRegistro);
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

      function editarAlergias_has_Alumno(indiceEscogido)
      {
        recuperado = true;
        objetoAlergias_has_Alumno = jsonAlergias_has_Alumno[indiceEscogido];
        $('#tabsMenu a[href="#divTabFormularioAlergias_has_Alumno"]').tab('show');
        $('#Alergias_Id_Alergia').val(objetoAlergias_has_Alumno.a);
        $('#Alumno_Id_Alumno').val(objetoAlergias_has_Alumno.b);
        $('#Fecha_Alergia').val(objetoAlergias_has_Alumno.c);
        comboAlergias();
        $('#h1TituloFormulario').html(sanitizarHTML('Editar a un Grupo'));
      }

      /**
      * Funcion para listar los grados en un combo mediante AJAX
      * @returns {void}
      */

      function comboAlergias()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboAlergias',
          'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIAS_HAS_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosAlergias(jsonRespuesta, estatusRespuesta, jqXHR);
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
      function exitolistarCombosAlergias(jsonRespuesta, estatusRespuesta, jqXHR)
      {
      // checamos primero, si existio un error personalizaod:
       if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
       }
       var indice = 0;
       jsonAlergias = jsonRespuesta.result;
       $('#Id_Alergia > option'). remove();
       if(jsonAlergias.length > 0 ){
        for(indice=0; indice<jsonAlumno.length; indice++){
        objetoAlergias = jsonAlergias[indice];
       $('#Id_Alergia').append('<option value="'+ objetoAlergias.a + '">'+ objetoAlergias.b + '</option>');
      }
      }else{
       $('#Id_Alergia').append('<option value="x">No hay Alergias </option>');
      }
      if (recuperado) {
       $('#Id_Alergia').val(objetoAlergias_has_Alumno.d).attr('selected','selected');
      }
      }

         /**
      * Funcion para listar los Alumnos en un combo mediante AJAX
      * @returns {void}
      */

      function comboAlumno()
       {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'comboAlumno',
          'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 50000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIAS_HAS_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarCombosAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
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
      function exitolistarCombosAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
      {
      // checamos primero, si existio un error personalizaod:
       if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
       }
       var indice = 0;
       jsonAlumno = jsonRespuesta.result;
       $('#Id_Alumno > option'). remove();
       if(jsonAlumno.length > 0 ){
        for(indice=0; indice<jsonAlumno.length; indice++){
        objetoAlumno = jsonAlumno[indice];
       $('#Id_Alumno').append('<option value="'+ objetoAlumno.a + '">'+ objetoAlumno.b + '</option>');
      }
      }else{
       $('#Id_Alumno').append('<option value="x">No hay Alumno </option>');
      }
      if (recuperado) {
       $('#Id_Alumno').val(objetoAlergias_has_Alumno.d).attr('selected','selected');
      }
      }



      /**
      * Funcion para mostrar el formulario para un nuevo pais.
      * @returns {void}
      */

      function agregarAlergias_has_Alumno()
      {
        objetoAlergias_has_Alumno = null;
        $('#tabsMenu a[href="#divTabFormularioAlergias_has_Alumno"]').tab('show');
        $('#Alergias_Id_Alergia').val('');
        $('#Alumno_Id_Alumno').val('');
        $('#Fecha_Alergia').val('');
        comboAlumno();
        comboAlergias();
        $('#h1TituloFormulario').html(sanitizarHTML('Crear una alergia con alumno'));
      }

      /**
      * Funcion para guardar un Grupo
      * @returns {void}
      */

      function guardarAlergias_has_Alumno()
      {
        objetoAlergias_has_Alumno = {
          a: $('#Alergias_Id_Alergia').val(),
          b: $('#Alumno_Id_Alumno').val(),
          c: $('#Fecha_Alergia').val()
        };
        if (objetoAlergias_has_Alumno.a == 0) {
          //insertar Grupo
          accion = 'insertar';
        }else{
          //actualizar Grupo
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
          'Params' : [objetoAlergias_has_Alumno]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIAS_HAS_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR);
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

        function exitoGuardadoAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR)
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
                  mostrarVentanaModal('Insertado con el ID '+ jsonRespuesta.result);
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Grupo  ' + objetoAlergias_has_Alumno.a + '   Actualizado');
                }else{
                  //no se actuzalizo
                  mostrarVentanaModal('No se pudo actualizar');
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
          $('#tabsMenu a[href="#divTabBorrarAlergias_has_Alumno"]').tab('show');
          objetoAlergias_has_Alumno = jsonAlergias_has_Alumno[indiceEscogido];
          htmlNuevo = 'ID: <strong>' + objetoAlergias_has_Alumno.a + '</strong><br/>Nombre: <strong>' + objetoAlergias_has_Alumno.b + '</strong>';
          $('#pDatosAlergias_has_Alumno').html(sanitizarHTML(htmlNuevo));
         }

         function borrarGrupo()
         {
          objetoAlergias_has_Alumno = { a:objetoAlergias_has_Alumno.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
            'Params' : [objetoAlergias_has_Alumno]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALERGIAS_HAS_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR);
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
        function exitoBorradoAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal(' Alergias y Alumno   ' + objetoAlergias_has_Alumno.a + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
              
            }else{
              //no se borro:
              mostrarVentanaModal(' Alergias y Alumno  '+ objetoAlergias_has_Alumno.a + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaAlergias_has_Alumno"]').tab('show');
          listarAlergias_has_Alumno();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarAlergias_has_Alumno"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los paises mediante AJAX
         * @returns {void}
         */
         function buscarAlergias_has_Alumno()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALERGIAS_HAS_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarAlergias_has_Alumno(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaAlergias_has_Alumno"]').tab('show');
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
          'clase' : CLASE_ALERGIAS_HAS_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALERGIAS_HAS_ALUMNO,
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
       

        











