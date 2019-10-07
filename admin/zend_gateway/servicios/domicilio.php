<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Domicilio extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la ID del domicilio
	 * @access private
	 * @var int
	 */
	private  $_id_domicilio;
	
	/*
	 * Atributo privado para la calle del domicilio
	 * @access private
	 * @var string
	 */
	private $_calle_domicilio;
	
	/*
	 * Atributo privado para el numero del domicilio
	 * @access private
	 * @var string
	 */
	private $_numero_domicilio;
	
	/*
	 * Atributo privado para la colonia del domicilio
	 * @access private
	 * @var string
	 */
	private $_colonia_domicilio;

	/*
	 * Atributo privado para el municipio del domicilio
	 * @access private
	 * @var string
	 */
	private $_municipio_domicilio;

	/*
	 * Atributo privado para la entidad del domicilio
	 * @access private
	 * @var string
	 */
	private $_entidad_domicilio;

	/*
	 * Atributo privado para el codigo postal del domicilio
	 * @access private
	 * @var string
	 */
	private $_cp_domicilio;
	
	
	
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
			$this->_columnas = array('', 'domicilio.Id_Domicilio','domicilio.Calle_Domicilio','domicilio.Numero_Domicilio','domicilio.Colonia_Domicilio','domicilio.Municipio_Domicilio','domicilio.Entidad_Domicilio','domicilio.CP_Domicilio');
			$this->_aliasColumnas =' domicilio.Id_Domicilio AS a, domicilio.Calle_Domicilio AS b,domicilio.Numero_Domicilio AS c,domicilio.Colonia_Domicilio AS d,domicilio.Municipio_Domicilio AS e,domicilio.Entidad_Domicilio AS f,domicilio.CP_Domicilio AS g ';
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
		$this->_sql = sprintf("SELECT %s FROM domicilio WHERE domicilio.Id_Domicilio>=1 ORDER BY domicilio.Id_Domicilio ASC;",$this->_aliasColumnas);
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
			$this->_Id_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Calle_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Numero_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Colonia_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Municipio_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Entidad_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_CP_Domicilio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM domicilio WHERE (domicilio.Id_Domicilio LIKE %s OR domicilio.Calle_Domicilio LIKE %s OR domicilio.Numero_Domicilio LIKE %s OR domicilio.Colonia_Domicilio LIKE %s OR domicilio.Municipio_Domicilio LIKE %s OR domicilio.Entidad_Domicilio LIKE %s OR domicilio.CP_Domicilio LIKE %s) ORDER BY domicilio.Id_Domicilio ASC;",$this->_aliasColumnas, $this->_Id_Domicilio, $this->_Calle_Domicilio,$this->_Numero_Domicilio, $this->_Colonia_Domicilio, $this->_Municipio_Domicilio, $this->_Entidad_Domicilio, $this->_CP_Domicilio);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM domicilio WHERE %s LIKE %s ORDER BY domicilio.Id_Domicilio ASC;",
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
		$this->_Calle_Domicilio = $this->formatear($registro->b, "Cadena");
		$this->_Numero_Domicilio = $this->formatear($registro->c, "Cadena");
		$this->_Colonia_Domicilio = $this->formatear($registro->d, "Cadena");
		$this->_Municipio_Domicilio = $this->formatear($registro->e, "Cadena");
		$this->_Entidad_Domicilio = $this->formatear($registro->f, "Cadena");
		$this->_CP_Domicilio = $this->formatear($registro->g, "Cadena");
		$this->_sql = sprintf("INSERT INTO domicilio VALUES(NULL ,%s , %s, %s, %s, %s, %s);",$this->_Calle_Domicilio,$this->_Numero_Domicilio,$this->_Colonia_Domicilio,$this->_Municipio_Domicilio,$this->_Entidad_Domicilio,$this->_CP_Domicilio);
		return $this->sentenciaSQL($this->_sql, 4);
	}
	
	/*
	 * funcion para actualizar un registro de la tabla domicilio
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El numero de resgistro afectados
	 */
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_Domicilio = $this->formatear($registro->a, "Entero");
		$this->_Calle_Domicilio = $this->formatear($registro->b, "Cadena");
		$this->_Numero_Domicilio = $this->formatear($registro->c, "Cadena");
		$this->_Colonia_Domicilio = $this->formatear($registro->d, "Cadena");
		$this->_Municipio_Domicilio = $this->formatear($registro->e, "Cadena");
		$this->_Entidad_Domicilio = $this->formatear($registro->f, "Cadena");
		$this->_CP_Domicilio = $this->formatear($registro->g, "Cadena");
		$this->_sql = sprintf("UPDATE domicilio SET domicilio.Calle_Domicilio=%s, domicilio.Numero_Domicilio=%s, domicilio.Colonia_Domicilio=%s, domicilio.Municipio_Domicilio=%s, domicilio.Entidad_Domicilio=%s, domicilio.CP_Domicilio=%s WHERE domicilio.Id_Domicilio=%s LIMIT 1;",$this->_Calle_Domicilio,$this->_Numero_Domicilio,$this->_Colonia_Domicilio,$this->_Municipio_Domicilio,$this->_Entidad_Domicilio,$this->_CP_Domicilio,$this->_Id_Domicilio);
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
		$this->_Id_Domicilio= $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM domicilio WHERE domicilio.Id_Domicilio=%s LIMIT 1;",$this->_Id_Domicilio);
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
          $_nombre = 'lista_domicilio.pdf';
          $_titulo = 'Listado de domicilio';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_domicilio.pdf';
          $_titulo = 'Busqueda de Domicilio por "'.$criterio . '"';
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
         $this->_reportePDF->Cell(10,0,'ID',0,0,'R',0);
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(10,0,'Calle',0,0,'L',0); // 
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(12,0,'Numero',0,0,'L',0); // el primer numero es para el ancho de la barra
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(32,0,'Colonia',0,0,'L',0); // 
         $this->_reportePDF->Cell(10);
         $this->_reportePDF->Cell(39,0,'Municipio',0,0,'L',0); // el 0,0 es saltar linea
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(22,0,'Entidad',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(12,0,'CP',0,0,'L',0);
         $this->_reportePDF->Ln(10);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0,$this->_registro['b'],0,0,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,1,$this->_registro['c'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(40,1,$this->_registro['d'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(40,1,$this->_registro['e'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0,$this->_registro['f'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(20,0,$this->_registro['g'],0,1,'L',$rellenar,null,1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Domicilio(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }}