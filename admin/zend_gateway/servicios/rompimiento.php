<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Alergias_has_Alumno extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la ID del grupo
	 * @access private
	 * @var int
	 */
	private  $_alergias_id_alergia;

	/*
	 * Atributo privado para la ID del grado
	 * @access private
	 * @var int
	 */
	private  $_alumno_id_alumno;
	
	/*
	 * Atributo privado para el usuario del Grupo
	 * @access private
	 * @var string
	 */
	private $_fecha_alergia;	
	
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
			$this->_columnas = array('', 'alergias_has_alumno.Alergias_Id_Alergia','alergias_has_alumno.Alumno_Id_Alumno','alergias_has_alumno.Fecha_Alergia');
			$this->_aliasColumnas =' alergias_has_alumno.Alergias_Id_Alergia AS a, alergias_has_alumno.Alumno_Id_Alumno AS b,alergias_has_alumno.Fecha_Alergia c';
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
		$this->_sql = sprintf("SELECT %s FROM alergias_has_alumno WHERE Alergias_Id_Alergia and Alumno_Id_Alumno >=1 AND (alergias_has_alumno.Alergias_Id_Alergia=alergias_has_alumno.Alumno_Id_Alumno) ORDER BY alergias_has_alumno.Alumno_Id_Alumno ASC;",$this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

	/*
	 * funcion para listar de la tabla grado dentro de un combo
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	 public function comboAlumno($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = "SELECT alumno.Id_Alumno AS a, alumno.Nombre_Alumno AS b, alumno.ApellidoPaterno_Alumno AS c, alumno.ApellidoMaterno_Alumno AS d, alumno.Curp_Alumno AS e, alumno.Correo_Alumno AS f, alumno.Telefono_Alumno AS g, alumno.Genero_Alumno AS h , alumno.Tutor_Alumno AS i, alumno.CicloEscolar_Alumno AS j, alumno.Matricula_Alumno AS k, alumno.Domicilio_Id_Domicilio AS l, alumno.Grupo_Id_Grupo AS m  FROM alumno WHERE alumno.Id_Alumno>=1 ORDER BY ApellidoPaterno_Alumno ASC;";
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

	/*
	 * funcion para listar de la tabla alergias dentro de un combo
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	 public function comboAlergia($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = "SELECT alergias.Id_alergia AS a, alergias.Tipo_Alergia AS b,alergias.Descripcion_Alergia AS c FROM alergias WHERE alergias.Id_alergia>=1 ORDER BY Tipo_Alergia ASC;";
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
			$this->_Alergias_Id_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Alumno_Id_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Fecha_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Id_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Nombre_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_ApellidoPaterno_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_ApellidoMaterno_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Curp_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_CicloEscolar_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Matricula_Alumno = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Id_alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Tipo_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Descripcion_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM alergias_has_alumno  WHERE (alergias_has_alumno.Alergias_Id_Alergia LIKE %s OR  alergias_has_alumno.Alumno_Id_Alumno LIKE %s OR alergias_has_alumno.Fecha_Alergia LIKE %s) AND alergias_has_alumno.Alumno_Id_Alumno= alumno.Id_Alumno ORDER BY alumno.ApellidoPaterno_Alumno ASC;",$this->_aliasColumnas, $this->_Alergias_Id_Alergia, $this->_Alumno_Id_Alumno,$this->_Fecha_Alergia);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM grupo, grado WHERE (%s LIKE %s) AND grupo.Grado_Id_Grado=grado.Id_grado ORDER BY grupo.Id_grupo ASC;",
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
		$this->_Id_grupo = $this->_siguienteID();
		$this->_Nombre_grupo = $this->formatear($registro->b, "Cadena");
		$this->_Salon_grupo = $this->formatear($registro->c, "Entero");
		$this->_Id_grado = $this->formatear($registro->d,"Entero");
		$this->_sql = sprintf("INSERT INTO grupo VALUES(%s ,%s ,%s, %s);",$this->_Id_grupo,$this->_Nombre_grupo,$this->_Salon_grupo,$this->_Id_grado);
		$_afectados = $this->sentenciaSQL($this->_sql,5);
		if($_afectados == 1){
		 return $this->_Id_grupo;
		}else{
		 throw new Exception("No se pudo insertar el Grupo con el ID" . $this->_Id_grupo);
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
		$this->_Id_grupo = $this->formatear($registro->a, "Entero");
		$this->_Nombre_grupo = $this->formatear($registro->b, "Cadena");
		$this->_Salon_grupo = $this->formatear($registro->c, "Entero");
		$this->_Id_grado = $this->formatear($registro->d, "Entero");
		$this->_sql = sprintf("UPDATE grupo SET  grupo.Nombre_Grupo=%s , grupo.Salon_grupo=%s, grupo.Grado_Id_Grado=%s WHERE grupo.Id_grupo=%s LIMIT 1;",$this->_Nombre_grupo, $this->_Salon_grupo,$this->_Id_grado,$this->_Id_grupo);
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
		$this->_Id_grupo= $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM grupo WHERE grupo.Id_grupo=%s LIMIT 1;",$this->_Id_grupo);
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
          $_nombre = 'lista_grupo.pdf';
          $_titulo = 'Listado de grupos';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_grupo.pdf';
          $_titulo = 'Busqueda de grupo por "'.$criterio . '"';
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
         $this->_reportePDF = new FabricaPDF('P','mm', 'CARTA',true,'UTF-8',false);
         $this->_reportePDF->colocarCaracteristicas($this->_reportePDF, $_titulo, 'Saul Franco');
         $this->_reportePDF->colocarMargenes($this->_reportePDF,30,10,5,5,10,10, true);
         $this->_reportePDF->AddPage();
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(20,0,'ID',0,0,'R',0);
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(58,0,'Nombre del Grupo ',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(60,0,'Salon del Grupo ',0,0,'L',0);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(10,0,'Grado ',0,0,'L',0);
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(58,0,$this->_registro['b'],0,0,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(60,0,$this->_registro['c'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(40,0,$this->_registro['d'],0,1,'L',$rellenar,null,1);

         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Grupo(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }
         
         
         private function _siguienteID()
         {
         	$this->_sql = "SELECT IFNULL((MAX(Id_grupo)+1), 1) AS maximo FROM grupo;";
		return $this->sentenciaSQL($this->_sql,8, 'maximo');
         }
         
         }
