<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class color extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la id del color
	 * @access private
	 * @var int
	 */
	private  $_id_color;
	
	/*
	 * Atributo privado para la creacion del color
	 * @access private
	 * @var string
	 */
	private $_created_at;

	/*
	 * Atributo privado para la actualizacion del color
	 * @access private
	 * @var string
	 */
	private $_updated_at;
	
	/*
	 * Atributo privado para el nombre del color
	 * @access private
	 * @var string
	 */
	private $_nombre;

	/*
	 * Atributo privado para el descripcion del color
	 * @access private
	 * @var string
	 */
	private $_descripcion;

	/*
	 * Atributo privado para el color_hexadecimal del color
	 * @access private
	 * @var string
	 */
	private $_color_hexadecimal;

	/*
	 * Atributo privado para el color_hexadecimal del color
	 * @access private
	 * @var string
	 */
	private $_imagen;
	
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
			$this->_columnas = array(	'', 
										'color.id_color',
										'color.created_at',
										'color.updated_at',
										'color.nombre',
										'color.descripcion',
										'color.imagen'
									);
			$this->_aliasColumnas =		'color.id_color 	AS a,
										 color.created_at  	AS b,
										 color.updated_at 	AS c,
										 color.nombre 		AS d,
										 color.descripcion 	AS e,
										 color.imagen 		AS f';
		}else {
			//caso contrario no se aceptara
			throw new Exception("No tiene permisos para ver esta información");
			return;
		}
	}
	
	/*
	 * funcion para listar los registros de la tabla color.
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM color WHERE color.id_color>=1 ORDER BY color.id_color DESC;",$this->_aliasColumnas);
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

			$this->_id_color 			= $this->formatear($criterio, "CadenaBusqueda");
			$this->_nombre 				= $this->formatear($criterio, "CadenaBusqueda");

			$this->_sql = sprintf("SELECT %s FROM color WHERE (color.id_color LIKE %s OR color.nombre LIKE %s) ORDER BY color.descripcion DESC;",$this->_aliasColumnas, $this->_id_color, $this->_nombre);

		}else {

			$this->_columna 	= $this->_columnas[$columna];
			$this->_criterio 	= $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql 		= sprintf("SELECT %s FROM color WHERE %s LIKE %s ORDER BY color.descripcion DESC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para insertar un registro en la tabla color
	 * @access public
	 * @param object Es el registro que vamos a insertar.
	 * @return int El ID del registro insertado.
	 */
	public function insertar($registro){
		if(is_array($registro)){
			$registro = (object)$registro;			
		}


		$this->_nombre	 			= $this->formatear(strtoupper($registro->d), "Cadena");
		$this->_descripcion 		= $this->formatear(strtoupper($registro->e), "Cadena");

		$this->_sql = sprintf(		"INSERT INTO color 
									 VALUES
									 	(NULL,
									 	DATE_ADD(NOW(),INTERVAL -5 HOUR),
									 	NULL,
									 	%s,
									 	%s,
									 	NULL);",
									 $this->_nombre,
									 $this->_descripcion);
		return $this->sentenciaSQL($this->_sql, 4);

	}
	
	/*
	 * funcion para actualizar un registro de la tabla alergia
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El descripcion de resgistro afectados
	 */
	public function actualizar($registro){

		if(is_array($registro)){

			$registro = (object)$registro;

		}

		$this->_id_color 			= $this->formatear($registro->a, "Entero");
		$this->_nombre 				= $this->formatear(strtoupper($registro->d), "Cadena");
		$this->_descripcion 		= $this->formatear(strtoupper($registro->e), "Cadena");
		
		$this->_sql 				= sprintf(
												"UPDATE color 
												 SET  
												 color.updated_at 		=NOW(),
												 color.nombre 			=%s,
												 color.descripcion 		=%s 
												 WHERE color.id_color 	=%s 
												 LIMIT 1;",
												 $this->_nombre,
												 $this->_descripcion,
												 $this->_id_color
											);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion Eliminar un registro en la tabla color
	 * @access public
	 * @param object El registro a eliminarse
	 * @return int El descripcion de registros afectados
	 */
	public function borrar($registro) 
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}

		$this->_id_color	= $this->formatear($registro->a, "Entero");
		
		$this->_sql 		= sprintf("DELETE FROM color WHERE color.id_color=%s LIMIT 1;",$this->_id_color);
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
          $_nombre = 'lista_color.pdf';
          $_titulo = 'Listado de colors';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_color.pdf';
          $_titulo = 'Busqueda de color por "'.$criterio . '"';
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
         $this->_reportePDF->Cell(58,0,'Tipo de Alergia',0,0,'L',0); // el 58 es para el titulo de la color_hexadecimal se acomode con la base.
         $this->_reportePDF->Cell(3);
         $this->_reportePDF->Cell(10,0,'color_hexadecimal de la Alergia',0,0,'L',0);
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