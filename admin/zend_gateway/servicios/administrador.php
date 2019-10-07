<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Administrador extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la ID del administrador
	 * @access private
	 * @var int
	 */
	private  $_id_administrador;
	
	/*
	 * Atributo privado para el usuario del admnistrador
	 * @access private
	 * @var string
	 */
	private $_usuario_administrador;
	
	/*
	 * Atributo privado para la contraseña del admnistrador
	 * @access private
	 * @var string
	 */
	private $_contrasena_administrador;

	/*
	 * Atributo privado para el alias del administrador
	 * @access private
	 * @var string
	 */
	private $_alias_administrador;
	

	
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
	 * Constructor de la clase administrador, para invocar el constructor de la clase heredada y validar sesiones.
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
			$this->_columnas = array('', 'administrador.Id_administrador','administrador.Usuario_administrador','administrador.Contrasena_Administrador','administrador.Alias_Administrador');
			$this->_aliasColumnas =' administrador.Id_administrador AS a, administrador.Usuario_administrador AS b,administrador.Contrasena_Administrador AS c,administrador.Alias_Administrador AS d';
		}else {
			//caso contrario no se aceptara
			throw new Exception("No tiene permisos");
			return;
		}
	}
	
	/*
	 * funcion para listar los registros de la tabla administrador.
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM administrador WHERE administrador.Id_administrador>=0 ORDER BY administrador.Id_administrador ASC;",$this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para buscar registros en la tabla administrador
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
			$this->_Id_administrador = $this->formatear($criterio, "CadenaBusqueda");
			$this->_Usuario_Administrador = $this->formatear($criterio, "Encriptalo");
			$this->_Contrasena_Administrador = $this->formatear($criterio, "Encriptalo");
			$this->_Alias_Administrador = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM administrador WHERE (administrador.Id_administrador LIKE %s OR administrador.Usuario_Administrador LIKE %s OR administrador.Contrasena_Administrador LIKE %s OR administrador.Alias_Administrador LIKE %s) ORDER BY administrador.Id_Administrador ASC;",$this->_aliasColumnas, $this->_Id_Administrador, $this->_Usuario_Administrador,$this->_Contrasena_Administrador,$this->_Alias_Administrador);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM administrador WHERE %s LIKE %s ORDER BY administrador.Id_administrador ASC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para insertar un registro en la tabla administrador
	 * @access public
	 * @param object Es el registro que vamos a insertar.
	 * @return int El ID del registro insertado.
	 */
	public function insertar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;			
		}
		$this->_Usuario_Administrador = $this->formatear($registro->b, "Encriptalo");
		$this->_Contrasena_Administrador = $this->formatear($registro->c, "Encriptalo");
		$this->_Alias_Administrador = $this->formatear($registro->d, "Cadena");
		$this->_sql = sprintf("INSERT INTO administrador VALUES(NULL ,%s ,%s,%s);",$this->_Usuario_Administrador,$this->_Contrasena_Administrador,$this->_Alias_Administrador);
		return $this->sentenciaSQL($this->_sql, 4);
	}
	
	/*
	 * funcion para actualizar un registro de la tabla administrador
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El numero de resgistro afectados
	 */
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_Id_Administrador = $this->formatear($registro->a, "Entero");
		$this->_Usuario_Administrador = $this->formatear($registro->b, "Encriptalo");
		$this->_Contrasena_Administrador = $this->formatear($registro->c, "Encriptalo");
		$this->_Alias_Administrador = $this->formatear($registro->d, "Cadena");
		$this->_sql = sprintf("UPDATE administrador SET administrador.Usuario_administrador=%s, administrador.Contrasena_Administrador=%s, administrador.Alias_Administrador=%s WHERE administrador.Id_administrador=%s LIMIT 1;",$this->_Usuario_Administrador,$this->_Contrasena_Administrador,$this->_Alias_Administrador,$this->_Id_Administrador);
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
		$this->_Id_Administrador= $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM administrador WHERE administrador.Id_Administrador=%s LIMIT 1;",$this->_Id_Administrador);
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
          $_nombre = 'lista_administrador.pdf';
          $_titulo = 'Listado de Administradores';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_administrador.pdf';
          $_titulo = 'Busqueda de administrador por "'.$criterio . '"';
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
         $this->_reportePDF->Cell(58,0,'Usuario ',0,0,'L',0); // el 58 es para el titulo de la descripcion se acomode con la base.
         $this->_reportePDF->Cell(3);
         $this->_reportePDF->Cell(10,0,'Contraseña ',0,0,'L',0);
         $this->_reportePDF->Cell(65);
         $this->_reportePDF->Cell(50,0,'Alias del Administrador ',0,0,'L',0);
         $this->_reportePDF->Ln(10);
         $this->_reportePDF->SetFont('times','',9);
         $this->_reportePDF->SetFillColor(217,248,207);
         $i=0;
         while($this->_registro = $this->_resultSet->fetch_assoc()){
         $rellenar = ((++$i)% 2);
         $this->_reportePDF->Cell(20,0, $this->_registro['a'],0,0,'R',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,1,$this->_registro['b'],0,0,'L',$rellenar,null,1); // el largo que ocupa el pdf la columna tipo de alergia
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(70,1,$this->_registro['c'],0,0,'L',$rellenar,null,1);
         $this->_reportePDF->Cell(1);
         $this->_reportePDF->Cell(40,0,$this->_registro['d'],0,1,'L',$rellenar,null,1);
         }
         $this->_reportePDF->Ln(5);
         $this->_reportePDF->SetFont('times','B',9);
         $this->_reportePDF->Cell(0,0,'Este reporte contiene   '. $this->_resultSet->num_rows . '   Administrador(s).',0,1,'L',0);
         $this->_reportePDF->Output('../pdfs/'. $_nombre, 'F');
         return $_nombre;
         }}