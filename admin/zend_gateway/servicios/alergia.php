<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Alergia extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la ID de la alergia
	 * @access private
	 * @var int
	 */
	private  $_id_alergia;
	
	/*
	 * Atributo privado para el tipo de la alergia
	 * @access private
	 * @var string
	 */
	private $_tipo_alergia;
	
	/*
	 * Atributo privado para el correo de la alergia
	 * @access private
	 * @var string
	 */
	private $_descripcion_alergia;
	
	
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
	 * Constructor de la clase alergia, para invocar el constructor de la clase heredada y validar sesiones.
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
			$this->_columnas = array('', 'alergias.Id_alergia','alergias.Tipo_Alergia','alergias.Descripcion_Alergia');
			$this->_aliasColumnas =' alergias.Id_alergia AS a, alergias.Tipo_Alergia AS b,alergias.Descripcion_Alergia AS c ';
		}else {
			//caso contrario no se aceptara
			throw new Exception("No tiene permisos");
			return;
		}
	}
	
	/*
	 * funcion para listar los registros de la tabla alergia.
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM alergias WHERE alergias.Id_alergia>=1 ORDER BY alergias.Id_alergia ASC;",$this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para buscar registros en la tabla alergia
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
			$this->_Id_alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Tipo_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Descripcion_Alergia = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM alergias WHERE (alergias.Id_alergia LIKE %s OR alergias.Tipo_Alergia LIKE %s OR alergias.Descripcion_Alergia LIKE %s) ORDER BY alergias.Id_alergia ASC;",$this->_aliasColumnas, $this->_Id_alergia, $this->_Tipo_Alergia,$this->_Descripcion_Alergia);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM alergias WHERE %s LIKE %s ORDER BY alergias.Id_alergia ASC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para insertar un registro en la tabla alergia
	 * @access public
	 * @param object Es el registro que vamos a insertar.
	 * @return int El ID del registro insertado.
	 */
	public function insertar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;			
		}
		$this->_Tipo_Alergia = $this->formatear($registro->b, "Cadena");
		$this->_Descripcion_Alergia = $this->formatear($registro->c, "Cadena");
		$this->_sql = sprintf("INSERT INTO alergias VALUES(NULL ,%s ,%s);",$this->_Tipo_Alergia,$this->_Descripcion_Alergia);
		return $this->sentenciaSQL($this->_sql, 4);
	}
	
	/*
	 * funcion para actualizar un registro de la tabla alergia
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El numero de resgistro afectados
	 */
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_alergia = $this->formatear($registro->a, "Entero");
		$this->_Tipo_Alergia = $this->formatear($registro->b, "Cadena");
		$this->_Descripcion_Alergia = $this->formatear($registro->c, "Cadena");
		$this->_sql = sprintf("UPDATE alergias SET alergias.Tipo_Alergia=%s, alergias.Descripcion_Alergia=%s WHERE alergias.Id_alergia=%s LIMIT 1;",$this->_Tipo_Alergia,$this->_Descripcion_Alergia,$this->_Id_alergia);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion Eliminar un registro en la tabla alergia
	 * @access public
	 * @param object El registro a eliminarse
	 * @return int El numero de registros afectados
	 */
	public function borrar($registro) 
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_alergia= $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM alergias WHERE alergias.Id_alergia=%s LIMIT 1;",$this->_Id_alergia);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion para crear un reporte PDF sencillo de la tabla alergia
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
          $_nombre = 'lista_alergia.pdf';
          $_titulo = 'Listado de Alergias';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_alergia.pdf';
          $_titulo = 'Busqueda de Alergia por "'.$criterio . '"';
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
         $this->_reportePDF->Cell(58,0,'Tipo de Alergia',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(3);
         $this->_reportePDF->Cell(10,0,'Descripcion de la Alergia',0,0,'L',0);
         $this->_reportePDF->Ln(10);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,0,$this->_registro['b'],0,0,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0,$this->_registro['c'],0,1,'L',$rellenar,null,1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Alergia(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }}