<?php
require_once 'base.php';
require_once 'peticiones.php';

/*
 *  Clase alergia para brindar funcionalidades para la Tabla alergia
 *  @author Saul Mauricio Franco Renteria
 *  @package AIC
 *  @final
 */
final Class Usuario extends Base implements peticiones
{
	/*
	 * Atributo privado para el query de SQL
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/*
	 * Atributo privado para la id del usuario
	 * @access private
	 * @var int
	 */
	private  $_id_usuario;
	
	/*
	 * Atributo privado para la creacion del usuario
	 * @access private
	 * @var string
	 */
	private $_created_at;

	/*
	 * Atributo privado para la actualizacion del usuario
	 * @access private
	 * @var string
	 */
	private $_updated_at;
	
	/*
	 * Atributo privado para el nombre del usuario
	 * @access private
	 * @var string
	 */
	private $_nombre;

	/*
	 * Atributo privado para el apellido paterno del usuario
	 * @access private
	 * @var string
	 */
	private $_apellido_paterno;

	/*
	 * Atributo privado para el apellido materno del usuario
	 * @access private
	 * @var string
	 */
	private $_apellido_materno;

	/*
	 * Atributo privado para el telefono celular del usuario
	 * @access private
	 * @var string
	 */
	private $_telefono_celular;

	/*
	 * Atributo privado para el telefono casa del usuario
	 * @access private
	 * @var string
	 */
	private $_telefono_casa;

	/*
	 * Atributo privado para el fecha de ingreso del usuario
	 * @access private
	 * @var string
	 */
	private $_fecha_ingreso;

	/*
	 * Atributo privado para el rol del usuario
	 * @access private
	 * @var string
	 */
	private $_rol;

	/*
	 * Atributo privado para el sexo del usuario
	 * @access private
	 * @var string
	 */
	private $_sexo;


	/*
	 * Atributo privado para el estado civil del usuario
	 * @access private
	 * @var string
	 */
	private $_estado_civil;

	/*
	 * Atributo privado para el salario del usuario
	 * @access private
	 * @var string
	 */
	private $_salario;

	/*
	 * Atributo privado para el direccion del usuario
	 * @access private
	 * @var string
	 */
	private $_direccion;


	/*
	 * Atributo privado para el usuario del usuario
	 * @access private
	 * @var string
	 */
	private $_usuario;


	/*
	 * Atributo privado para el password del usuario
	 * @access private
	 * @var string
	 */
	private $_password;

	
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
			$this->_columnas = array('', 'usuario.id_usuario','usuario.created_at','usuario.updated_at','usuario.nombre','usuario.apellido_paterno','usuario.apellido_materno','usuario.telefono_celular','usuario.telefono_casa','usuario.fecha_ingreso','usuario.rol','usuario.sexo','usuario.estado_civil','usuario.salario','usuario.direccion','usuario.usuario','usuario.password');
			$this->_aliasColumnas =' usuario.id_usuario AS a, usuario.created_at AS b,usuario.updated_at AS c, usuario.nombre AS d, usuario.apellido_paterno AS e, usuario.apellido_materno AS f, usuario.telefono_celular AS g , usuario.telefono_casa AS h, usuario.fecha_ingreso AS i , usuario.rol AS j , usuario.sexo AS k , usuario.estado_civil AS l , usuario.salario AS m , usuario.direccion AS n , usuario.usuario AS o , usuario.password AS p  ';
		}else {
			//caso contrario no se aceptara
			throw new Exception("No tiene permisos para ver esta información");
			return;
		}
	}
	
	/*
	 * funcion para listar los registros de la tabla usuario.
	 * @access public
	 * @param int se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de resultados (puede ser un json, array o resultSet)
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM usuario WHERE usuario.id_usuario>=1 ORDER BY usuario.apellido_paterno DESC;",$this->_aliasColumnas);
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

			$this->_id_usuario 			= $this->formatear($criterio, "CadenaBusqueda");
			$this->_nombre 				= $this->formatear($criterio, "CadenaBusqueda");
			$this->_apellido_paterno 	= $this->formatear($criterio, "CadenaBusqueda");
			$this->_apellido_materno 	= $this->formatear($criterio, "CadenaBusqueda");

			$this->_sql = sprintf("SELECT %s FROM usuario WHERE (usuario.id_usuario LIKE %s OR usuario.nombre LIKE %s OR usuario.apellido_paterno LIKE %s) ORDER BY usuario.apellido_paterno DESC;",$this->_aliasColumnas, $this->_id_usuario, $this->_nombre);

		}else {

			$this->_columna 	= $this->_columnas[$columna];
			$this->_criterio 	= $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql 		= sprintf("SELECT %s FROM usuario WHERE %s LIKE %s ORDER BY usuario.apellido_paterno DESC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/*
	 * Funcion para insertar un registro en la tabla usuario
	 * @access public
	 * @param object Es el registro que vamos a insertar.
	 * @return int El ID del registro insertado.
	 */
	public function insertar($registro){
		if(is_array($registro)){
			$registro = (object)$registro;			
		}


		$this->_nombre	 			= $this->formatear(strtoupper($registro->d), "Cadena");
		$this->_apellido_paterno 	= $this->formatear(strtoupper($registro->e), "Cadena");
		$this->_apellido_materno 	= $this->formatear(strtoupper($registro->f), "Cadena");
		$this->_telefono_celular 	= $this->formatear($registro->g, "Cadena");
		$this->_telefono_casa 		= $this->formatear($registro->h, "Cadena");
		$this->_fecha_ingreso 		= $this->formatear($registro->i, "Cadena");
		$this->_rol 				= $this->formatear($registro->j, "Cadena");
		$this->_sexo 				= $this->formatear(strtoupper($registro->k), "Cadena");
		$this->_estado_civil 		= $this->formatear(strtoupper($registro->l), "Cadena");
		$this->_salario 			= $this->formatear($registro->m, "Cadena");
		$this->_direccion 			= $this->formatear(strtoupper($registro->n), "Cadena");

		$this->_sql = sprintf("INSERT INTO usuario VALUES(NULL,NOW(),NULL,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,NULL,NULL);",$this->_nombre,$this->_apellido_paterno,$this->_apellido_materno,$this->_telefono_celular,$this->_telefono_casa,$this->_fecha_ingreso,$this->_rol,$this->_sexo,$this->_estado_civil,$this->_salario,$this->_direccion);
		return $this->sentenciaSQL($this->_sql, 4);

	}
	
	/*
	 * funcion para actualizar un registro de la tabla alergia
	 * @access public
	 * @param object Elregistro a actualizarce
	 * @return int El apellido_paterno de resgistro afectados
	 */
	public function actualizar($registro){

		if(is_array($registro)){

			$registro = (object)$registro;

		}

		$this->_id_usuario 			= $this->formatear($registro->a, "Entero");
		$this->_nombre 				= $this->formatear(strtoupper($registro->d), "Cadena");
		$this->_apellido_paterno 	= $this->formatear(strtoupper($registro->e), "Cadena");
		$this->_apellido_materno 	= $this->formatear(strtoupper($registro->f), "Cadena");
		$this->_telefono_celular 	= $this->formatear($registro->g, "Cadena");
		$this->_telefono_casa 		= $this->formatear($registro->h, "Cadena");
		$this->_fecha_ingreso 		= $this->formatear($registro->i, "Cadena");
		$this->_rol 				= $this->formatear($registro->j, "Cadena");
		$this->_sexo 				= $this->formatear(strtoupper($registro->k), "Cadena");
		$this->_estado_civil 		= $this->formatear(strtoupper($registro->l), "Cadena");
		$this->_salario 			= $this->formatear($registro->m, "Cadena");
		$this->_direccion 			= $this->formatear(strtoupper($registro->n), "Cadena");
		//$this->_usuario 			= $this->formatear($registro->o, "Encriptalo");
		//$this->_password 			= $this->formatear($registro->p, "Encriptalo");
		
		$this->_sql 			= sprintf("UPDATE usuario SET 

												usuario.updated_at 			=NOW(), 
												usuario.nombre 				=%s, 
												usuario.apellido_paterno 	=%s, 
												usuario.apellido_materno 	=%s,
												usuario.telefono_celular 	=%s, 
												usuario.telefono_casa 		=%s,
												usuario.fecha_ingreso 		=%s, 
												usuario.rol 				=%s, 
												usuario.sexo 				=%s,
												usuario.estado_civil 		=%s,
												usuario.salario 			=%s,
												usuario.direccion 			=%s 

												WHERE usuario.id_usuario 	=%s LIMIT 1;",

												$this->_nombre,
												$this->_apellido_paterno,
												$this->_apellido_materno,
												$this->_telefono_celular,
												$this->_telefono_casa,
												$this->_fecha_ingreso,
												$this->_rol,$this->_sexo,
												$this->_estado_civil,
												$this->_salario,
												$this->_direccion,
												$this->_id_usuario
										);
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	/*
	 * Funcion Eliminar un registro en la tabla usuario
	 * @access public
	 * @param object El registro a eliminarse
	 * @return int El apellido_paterno de registros afectados
	 */
	public function borrar($registro) 
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}

		$this->_id_usuario	= $this->formatear($registro->a, "Entero");
		
		$this->_sql 		= sprintf("DELETE FROM usuario WHERE usuario.id_usuario=%s LIMIT 1;",$this->_id_usuario);
		return $this->sentenciaSQL($this->_sql, 5);

	}

	/*
	 * Funcion Cambiar la contraseña en la tabla usuario
	 * @access public
	 * @param object El registro a eliminarse
	 * @return int El apellido_paterno de registros afectados
	 */

	public function contrasena($registro){
		
		if(is_array($registro)){

			$registro = (object)$registro;

		}

		$this->_id_usuario	= $this->formatear($registro->a, "Entero");
		$this->_usuario 	= $this->formatear($registro->o, "Encriptalo");
		$this->_password	= $this->formatear($registro->p, "Encriptalo");
		$this->_sql 		= sprintf("UPDATE usuario SET 										     
					usuario.usuario 	=%s,
					usuario.password 	=%s
                                        
                                        WHERE usuario.id_usuario = %s  LIMIT 1;",

                                        $this->_usuario,
										$this->_password,
										$this->_id_usuario);
		
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
          $_nombre = 'lista_usuario.pdf';
          $_titulo = 'Listado de usuarios';
          break;
          case 'buscar':
          //busqueda
          $this->_resultSet = $this->buscar($criterio, $columna,0);
          $_nombre = 'busqueda_usuario.pdf';
          $_titulo = 'Busqueda de usuario por "'.$criterio . '"';
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
         $this->_reportePDF->Cell(58,0,'Tipo de Alergia',0,0,'L',0); // el 58 es para el titulo de la apellido_materno se acomode con la base.
         $this->_reportePDF->Cell(3);
         $this->_reportePDF->Cell(10,0,'apellido_materno de la Alergia',0,0,'L',0);
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