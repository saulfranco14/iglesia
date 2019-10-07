<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Alumno extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la ID del alumno
	 * @access private
	 * @var int
	 */
	private  $_id_alumno;

	/*
	 * Atributo privado para la ID del alumno
	 * @access private
	 * @var int
	 */
	private  $_id_grupo;

	/*
	 * Atributo privado para la ID del alumno
	 * @access private
	 * @var int
	 */
	private  $_id_domicilio;
	
	/*
	 * Atributo privado para el tipo del nombre del alumno
	 * @access private
	 * @var string
	 */
	private $_nombre_alumno;
	
	/*
	 * Atributo privado para el tipo del Apellido Paterno del Alumno
	 * @access private
	 * @var string
	 */
	private $_apellidopaterno_alumno;

	/*
	 * Atributo privado para el tipo de Apellido Materno del Alumno
	 * @access private
	 * @var string
	 */
	private $_apellidomaterno_alumno;

	/*
	 * Atributo privado para el tipo del Curp del Alumno
	 * @access private
	 * @var string
	 */
	private $_curp_alumno;

	/*
	 * Atributo privado para el tipo del correo del alumno
	 * @access private
	 * @var string
	 */
	private $_correo_alumno;

	/*
	 * Atributo privado para el tipo del telefono del alumno
	 * @access private
	 * @var string
	 */
	private $_telefono_alumno;

	/*
	 * Atributo privado para el tipo del genero del alumno
	 * @access private
	 * @var string
	 */
	private $_genero_alumno;

	/*
	 * Atributo privado para el tipo del tutor del alumno
	 * @access private
	 * @var string
	 */
	private $_tutor_alumno;

	/*
	 * Atributo privado para el tipo del ciclo escolar del alumno
	 * @access private
	 * @var string
	 */
	private $_cicloescolar_alumno;

	/*
	 * Atributo privado para el tipo de la matricula del alumno
	 * @access private
	 * @var string
	 */
	private $_matricula_alumno;
	
	
	/*
	 * atributo privado para el tipo de devolucion para el ResultSet
	 * @access private
	 * @var int
	 */
	private $_tipo;
	
	/*
	 * atributo privado para el reporte en PDF
	 * @access private
	 * @var object
	 */
	private $_reportePDF;
	
	/*
	 * atributo privado para el ResultSet de MySQL
	 * @acess private
	 * @var object
	 */
	private $_resultSet;
	
	/*
	 * Atributo privado para un registro del ResultSet de MySQL
	 * @access private
	 * @var object
	 */
	private $_registro;
	
	/*
	 * Atributo privado con el criterio, para las busquedas
	 * @access private
	 * @var string
	 */
	private $_criterio;
	
	/*
	 * Atributo privado con el nombre de una columna para las busquedas
	 * @access private
	 * @var string
	 */
	private $_columna;
	
	/*
	 * Atributo privado con el nombre de todas las columnas
	 * @access private
	 * @var array
	 */
	private $_columnas;
	
	/*
	 * Atributo privado para los ALIAS de todas las columnas.
	 * @access private
	 * @var string
	 */
	private $_aliasColumnas;
	
	/*
	 * Constructor de la clase Grupo, para invocar el constructor de la clase heredada y validar sesiones.
	 * @access public
	 * @return void
	 */
	public function __construct()
	{
		//verificar si esta logeado
		if(parent::validaSesion()){
			//si es asi, madamos a llamr el constructor del padre
			parent::__construct();
			//inicializamos valores:
			$this->_columnas = array('', 'alumno.Id_Alumno','alumno.Nombre_Alumno, alumno.ApellidoPaterno_Alumno, alumno.ApellidoMaterno_Alumno, alumno.Curp_Alumno, alumno.Correo_Alumno, alumno.Telefono_Alumno, alumno.Genero_Alumno, alumno.Tutor_Alumno, alumno.CicloEscolar_Alumno, alumno.Matricula_Alumno, alumno.Domicilio_Id_Domicilio, alumno.Grupo_Id_Grupo');
			$this->_aliasColumnas =' alumno.Id_Alumno AS a, alumno.Nombre_Alumno AS b, alumno.ApellidoPaterno_Alumno AS c, alumno.ApellidoMaterno_Alumno AS d , alumno.Curp_Alumno AS e, alumno.Correo_Alumno AS f, alumno.Telefono_Alumno AS g, alumno.Genero_Alumno AS h , alumno.Tutor_Alumno AS i, alumno.CicloEscolar_Alumno AS j, alumno.Matricula_Alumno AS k, alumno.Domicilio_Id_Domicilio AS l, alumno.Grupo_Id_Grupo AS m ';
		}else {
			//caso contrario no se aceptara
			throw new Exception("No tiene permisos");
			return;
		}
	}
	
	/*
	 * funcion para listar los registros de la tabla grupo.
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM alumno WHERE alumno.Id_Alumno>=1 ORDER BY alumno.ApellidoMaterno_Alumno ASC;",$this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

	/*
	 * funcion para listar de la tabla grado dentro de un combo
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	 public function comboDomicilio($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = "SELECT domicilio.Id_Domicilio AS a, domicilio.Calle_Domicilio AS b, domicilio.Numero_Domicilio AS c,domicilio.Colonia_Domicilio AS d,domicilio.Municipio_Domicilio AS e,domicilio.Entidad_Domicilio AS f,domicilio.CP_Domicilio AS g FROM domicilio WHERE domicilio.Id_Domicilio>=1 ORDER BY Id_Domicilio ASC;";
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

	/*
	
	 * funcion para listar de la tabla grado dentro de un combo
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	 public function comboGrupo($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = "SELECT grupo.Id_Grupo AS a, grupo.Nombre_Grupo AS b, grupo.Salon_Grupo AS c, grupo.Grado_Id_Grado AS d  FROM grupo WHERE grupo.Id_Grupo>=1 ORDER BY Salon_Grupo ASC;";
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

	
	/*
	 * Funcion para buscar registros en la tabla grupo
	 * @acces public
	 * @param string El criterio a buscar en la tabla
	 * @param string En que columna se va a buscar en la tabla.
	 * @param int Se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function buscar($criterio,$columna,$tipo)
	{
		//esta funcion solo sirve desde web, en el movil, la busqueda se hace directo en el dispocitivo, si se usa JQueryMobile.
		$this->_tipo = intval($tipo);
		$columna = intval($columna);
		if ($columna == 0){
			$this->_Id_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Nombre_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_ApellidoPaterno_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_ApellidoMaterno_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Curp_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_CicloEscolar_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Matricula_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM alumno WHERE (alumno.Id_Alumno LIKE %s OR  alumno.Nombre_Alumno LIKE %s OR alumno.ApellidoPaterno_Alumno LIKE %s OR alumno.ApellidoMaterno_Alumno LIKE %s OR alumno.Matricula_Alumno LIKE %s) and alumno.Id_Alumno = alumno.Id_Alumno ORDER BY alumno.Id_Alumno ASC;",$this->_aliasColumnas, $this->_Id_Alumno, $this->_Nombre_Alumno, $this->_ApellidoPaterno_Alumno, $this->_ApellidoMaterno_Alumno, $this->_Matricula_Alumno);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM alumno WHERE (%s LIKE %s) AND alumno.Id_Alumno = alumno.Id_Alumno ORDER BY alumno.Id_Alumno ASC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para insertar un registro en la tabla grupo
	 * @access public
	 * @param object Es el registro que vamos a insertar.
	 * @return int El ID del registro insertado.
	 */
	public function insertar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;			
		}
		
		$this->_Id_Alumno = $this->_siguienteID();
		$this->_Nombre_Alumno = $this->formatear($registro->b, "Cadena");
		$this->_ApellidoPaterno_Alumno = $this->formatear($registro->c, "Cadena");
		$this->_ApellidoMaterno_Alumno = $this->formatear($registro->d, "Cadena");
		$this->_Curp_Alumno = $this->formatear($registro->e, "Cadena");
		$this->_Correo_Alumno = $this->formatear($registro->f, "Cadena");
		$this->_Telefono_Alumno = $this->formatear($registro->g, "Entero");
		$this->_Genero_Alumno = $this->formatear($registro->h, "Cadena");
		$this->_Tutor_Alumno = $this->formatear($registro->i, "Cadena");
		$this->_CicloEscolar_Alumno = $this->formatear($registro->j, "Entero");
		$this->_Matricula_Alumno = $this->formatear($registro->k, "Entero");
		$this->_Id_Domicilio= $this->formatear($registro->l, "Entero");
		$this->_Id_Grupo = $this->formatear($registro->m, "Entero");
		$this->_sql = sprintf("INSERT INTO alumno VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s );",$this->_Id_Alumno, $this->_Nombre_Alumno, $this->_ApellidoPaterno_Alumno, $this->_ApellidoMaterno_Alumno, $this->_Curp_Alumno, $this->_Correo_Alumno, $this->_Telefono_Alumno, $this->_Genero_Alumno, $this->_Tutor_Alumno, $this->_CicloEscolar_Alumno,$this->_Matricula_Alumno, $this->_Id_Domicilio, $this->_Id_Grupo);
		$_afectados = $this->sentenciaSQL($this->_sql,5);
		if($_afectados == 1){
		 return $this->_Id_Alumno;
		}else{
		 throw new Exception("No se pudo insertar el Grupo con el ID" . $this->_Id_Alumno);
		}

	}
	
	/*
	 * funcion para actualizar un registro de la tabla grupo
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El numero de resgistro afectados
	 */
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_Alumno = $this->formatear($registro->a, "Entero");
		$this->_Nombre_Alumno = $this->formatear($registro->b, "Cadena");
		$this->_ApellidoPaterno_Alumno = $this->formatear($registro->c, "Cadena");
		$this->_ApellidoMaterno_Alumno = $this->formatear($registro->d, "Cadena");
		$this->_Curp_Alumno = $this->formatear($registro->e, "Cadena");
		$this->_Correo_Alumno = $this->formatear($registro->f, "Cadena");
		$this->_Telefono_Alumno = $this->formatear($registro->g, "Entero");
		$this->_Genero_Alumno = $this->formatear($registro->h, "Cadena");
		$this->_Tutor_Alumno = $this->formatear($registro->i, "Cadena");
		$this->_CicloEscolar_Alumno = $this->formatear($registro->j, "Entero");
		$this->_Matricula_Alumno = $this->formatear($registro->k, "Entero");
		$this->_Id_Domicilio= $this->formatear($registro->l, "Entero");
		$this->_Id_Grupo = $this->formatear($registro->m, "Entero");
		$this->_sql = sprintf("UPDATE alumno SET alumno.Nombre_Alumno=%s , alumno.ApellidoPaterno_Alumno=%s , alumno.ApellidoMaterno_Alumno=%s ,alumno.Curp_Alumno=%s ,alumno.Correo_Alumno=%s ,alumno.Telefono_Alumno=%s ,alumno.Genero_Alumno=%s , alumno.Tutor_Alumno=%s ,alumno.CicloEscolar_Alumno=%s ,alumno.Matricula_Alumno=%s , alumno.Domicilio_Id_Domicilio=%s ,alumno.Grupo_Id_Grupo=%s  WHERE alumno.Id_Alumno=%s LIMIT 1;",$this->_Nombre_Alumno,$this->_ApellidoMaterno_Alumno,$this->_ApellidoPaterno_Alumno,$this->_Curp_Alumno,$this->_Correo_Alumno,$this->_Telefono_Alumno,$this->_Genero_Alumno,$this->_Tutor_Alumno,$this->_CicloEscolar_Alumno,$this->_Matricula_Alumno,$this->_Id_Domicilio,$this->_Id_Grupo,$this->_Id_Alumno);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion Eliminar un registro en la tabla Admisnitrador
	 * @access public
	 * @param object El registro a eliminarse
	 * @return int El numero de registros afectados
	 */
	public function borrar($registro) 
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_Alumno= $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM alumno WHERE alumno.Id_Alumno=%s LIMIT 1;",$this->_Id_Alumno);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion para crear un reporte PDF sencillo de la tabla Admisnitrador
	 * @access pulic
	 * @param El tipo de reporte a realizar
	 * @param La columna de busqueda.
	 * @return string Nombre del archivo PDF creado.
	 */
	 public function reportePDF($tipo, $criterio='', $columna='')
        {
          switch(strval($tipo)){
          case 'listar':
          // listado
          $this->_resultSet = $this->listar(0);
          $_nombre = 'lista_alumno.pdf';
          $_titulo = 'Listado de alumno';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_alumno.pdf';
          $_titulo = 'Busqueda de alumno por "'.$criterio . '"';
          break;
          default:
          throw new Exception('No hay tipo de reporte Definido'); return;
          break;
          }
          require_once 'fabricapdf.php';
           /**
          * Cell ($ancho, $alto=0, $texto='', $borde=0, $salto=0, $alineado='', $rellenar=false, $enlace='', $stretch=0, $ignorar_altura_minima=false, $alineado='T',
        * $alineadoVertical='M');
        * MultiCell($ancho, $altura, $texto, $borde=0, $alineado='J', $rellenar=false, $saltoLinea=1, $x='', $y='', $resetearAltura=true, $stretch=0, $esHTML=false,
        * autopadding=true, $maximaAltura=0, $alineadoVertical='T', $ajustarCelda=false)
         */

         $this->_reportePDF = new FabricaPDF('L','mm', 'CARTA',true,'UTF-8',false);
         $this->_reportePDF->colocarCaracteristicas($this->_reportePDF, $_titulo, 'Saul Franco');
         $this->_reportePDF->colocarMargenes($this->_reportePDF,30,10,5,5,10,10, true);
         $this->_reportePDF->AddPage();
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(20,0,'ID',0,0,'R',0);
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(18,0,'Nombre del Alumno',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(8,0,'Apellido Paterno ',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Apellido Materno',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'CURP',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Correo',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(28,0,'Telefono',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Genero',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Tutor',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Ciclo Escolar',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Matricula',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Domicilio',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(1);
          $this->_reportePDF->Cell(18,0,'Grupo',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,0,$this->_registro['b'],0,1,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['c'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['d'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['e'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['f'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['g'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['h'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['i'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['j'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['k'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['l'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['m'],0,1,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Alumno(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }
         /*
		 * Funcion para crear un reporte PDF sencillo de la tabla alumno con listado
		 * @access pulic
		 * @param El tipo de reporte a realizar
		 * @param La columna de busqueda.
		 * @return string Nombre del archivo PDF creado.
		 */

         public function reportePDFLista($tipo, $criterio='', $columna='')
        {
          switch(strval($tipo)){
          case 'listar':
          // listado
          $this->_resultSet = $this->listar(0);
          $_nombre = 'lista_alumno.pdf';
          $_titulo = 'Listado los alumnos';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_alumno.pdf';
          $_titulo = 'Busqueda de alumno por "'.$criterio . '"';
          break;
          default:
          throw new Exception('No hay tipo de reporte Definido'); return;
          break;
          }
          require_once 'fabricapdf.php';
           /**
          * Cell ($ancho, $alto=0, $texto='', $borde=0, $salto=0, $alineado='', $rellenar=false, $enlace='', $stretch=0, $ignorar_altura_minima=false, $alineado='T',
        * $alineadoVertical='M');
        * MultiCell($ancho, $altura, $texto, $borde=0, $alineado='J', $rellenar=false, $saltoLinea=1, $x='', $y='', $resetearAltura=true, $stretch=0, $esHTML=false,
        * autopadding=true, $maximaAltura=0, $alineadoVertical='T', $ajustarCelda=false)
         */
         $this->_reportePDF = new FabricaPDF('L','mm', 'CARTA',true,'UTF-8',false);
         $this->_reportePDF->colocarCaracteristicas($this->_reportePDF, $_titulo, 'Saul Franco');
         $this->_reportePDF->colocarMargenes($this->_reportePDF,30,10,5,5,10,10, true);
         $this->_reportePDF->AddPage();
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(20,0,'ID',0,0,'R',0);
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(18,0,'Nombre del Alumno',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(8,0,'Apellido Paterno ',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Apellido Materno',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
          $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Domicilio',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,0,$this->_registro['b'],0,1,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['c'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['d'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Alumno(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }

	       
	         /*
			 * Funcion para crear un reporte PDF sencillo de la tabla alumno con domicilio
			 * @access pulic
			 * @param El tipo de reporte a realizar
			 * @param La columna de busqueda.
			 * @return string Nombre del archivo PDF creado.
			 */


          public function reportePDFDomicilio($tipo, $criterio='', $columna='')
          {
          switch(strval($tipo)){
          case 'listar':
          // listado
          $this->_resultSet = $this->listar(0);
          $_nombre = 'lista_alumno.pdf';
          $_titulo = 'Listado de Domicilios';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_alumno.pdf';
          $_titulo = 'Busqueda de domicilio por "'.$criterio . '"';
          break;
          default:
          throw new Exception('No hay tipo de reporte Definido'); return;
          break;
          }
          require_once 'fabricapdf.php';
           /**
          * Cell ($ancho, $alto=0, $texto='', $borde=0, $salto=0, $alineado='', $rellenar=false, $enlace='', $stretch=0, $ignorar_altura_minima=false, $alineado='T',
        * $alineadoVertical='M');
        * MultiCell($ancho, $altura, $texto, $borde=0, $alineado='J', $rellenar=false, $saltoLinea=1, $x='', $y='', $resetearAltura=true, $stretch=0, $esHTML=false,
        * autopadding=true, $maximaAltura=0, $alineadoVertical='T', $ajustarCelda=false)
         */
         $this->_reportePDF = new FabricaPDF('L','mm', 'CARTA',true,'UTF-8',false);
         $this->_reportePDF->colocarCaracteristicas($this->_reportePDF, $_titulo, 'Saul Franco');
         $this->_reportePDF->colocarMargenes($this->_reportePDF,30,10,5,5,10,10, true);
         $this->_reportePDF->AddPage();
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(20,0,'ID',0,0,'R',0);
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(18,0,'Nombre del Alumno',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(8,0,'Apellido Paterno ',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
          $this->_reportePDF->Cell(18,0,'Apellido Materno',0,1,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,0,$this->_registro['b'],0,1,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['c'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0, $this->_registro['d'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Alumno(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }
          /*
		 * Funcion para crear un reporte PDF sencillo de la tabla alumno con listado
		 * @access pulic
		 * @param El tipo de reporte a realizar
		 * @param La columna de busqueda.
		 * @return string Nombre del archivo PDF creado.
		 */

         public function reportePDFCredencial($arrayAlumno)
        {
          if(is_array($arrayAlumno)){
			$objetoAlumno = (object)$arrayAlumno;
		}
		$this->_sql = sprintf("SELECT * FROM alumno WHERE alumno.Id_Alumno=%s",$arrayAlumno['a']);
		$this->_resultSet = $this->sentenciaSQL($this->_sql, $this->_tipo);
		$this->_registro = $this->_resultSet->fetch_assoc();

           require_once 'fabricapdf.php';
           
           /**
          * Cell ($ancho, $alto=0, $texto='', $borde=0, $salto=0, $alineado='', $rellenar=false, $enlace='', $stretch=0, $ignorar_altura_minima=false, $alineado='T',
        * $alineadoVertical='M');
        * MultiCell($ancho, $altura, $texto, $borde=0, $alineado='J', $rellenar=false, $saltoLinea=1, $x='', $y='', $resetearAltura=true, $stretch=0, $esHTML=false,
        * autopadding=true, $maximaAltura=0, $alineadoVertical='T', $ajustarCelda=false)
         */

          
         $this->_reportePDF = new FabricaPDF('P','mm', 'CARTA',true,'UTF-8',false);
         $this->_reportePDF->colocarCaracteristicas($this->_reportePDF, 'Credencial del Alumno', 'Saul Franco');
         $this->_reportePDF->colocarMargenes($this->_reportePDF,30,10,5,5,10,10, true);
         $this->_reportePDF->AddPage();
         $this->_reportePDF->SetFont('times','N',19);
         $this->_reportePDF->Image('../imagenes/Credencial.jpg', 25, 65, 135, 90, 'JPG', '', '', true, 150, '', false, false, 1, false, false, false);
         $this->_reportePDF->SetFont('times','N',10);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         $rellenar = ((++$i)% 2);
         
         
         $this->_reportePDF->Cell(45,200, $this->_registro['ApellidoPaterno_Alumno'],0,0,'R','',null,1);
         $this->_reportePDF->Cell(17,200, $this->_registro['ApellidoMaterno_Alumno'],0,0,'R','',null,1);
         $this->_reportePDF->Cell(17,200,$this->_registro['Nombre_Alumno'],0,0,'','',null,1); 
          
         
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este pdf contiene  '. $this->_resultSet->num_rows . '   Credencial.',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/credencial.pdf', 'F');
         return 'credencial.pdf';
         }


         private function _siguienteID()
         {
         	$this->_sql = "SELECT IFNULL((MAX(Id_Alumno)+1), 1) AS maximo FROM alumno;";
		return $this->sentenciaSQL($this->_sql,8, 'maximo');
         }
         
         }



         
