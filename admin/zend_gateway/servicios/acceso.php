<?php

require_once 'base.php';

/**
 * Clase Acceso, para brindar funcionalidades para Accesar a la Aplicacion.
 * Iglesia San Mateo
 * @author Saul Mauricio Franco Renteria
 * @version 1.0
 * @package 
 * @final
 */
final Class Acceso extends Base
{

    /**
     * Atributo privado para el query de SQL
     * @access private
     * @var String 
     */
    private $_sql;

    /**
     * Atributo privado para e usuario_zootecnico
     * @access private
     * @private String
     */
    private $_usuario;

    /**
     * Atributo privado para la contrase�a
     * @access private
     * @private String
     */
    private $_password;

    /**
     * Atributo privado para el id
     * @access private
     * @private Integer
     */
    private $_id;

    /**
     * Atributo privado ppara un registro de una tabla de MySQL
     * @access private
     * @private object
     */
    private $_registro;

    /**
     * Atributo privado para todos los caracteres de la Validacion
     * @access private
     * @private arrat
     */
    private $_arrayCaracteres;

    /**
     * Atributo privado para los caracteres
     * @access private
     * @private String
     */
    private $_caracteres;

    // No hay constructor, por defaut, se invoca el del padre....

    public function traerValidacion()
    {
        $this->_arrayCaracteres = array("b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z");
        shuffle($this->_arrayCaracteres);
        $this->_caracteres = '';
        for ($indice = 0; $indice < 4; $indice++) {
            $this->_caracteres .= $this->_arrayCaracteres[rand(0, count($this->_arrayCaracteres) - 1)];
        }
        $_SESSION['validacion'] = $this->_caracteres;
        return $_SESSION['validacion'];
    }

    /**
     * verifica que el usuario_zootecnico exista, sea unico y este activo
     * @access public
     * @param string el usuario_zootecnico del empleado
     * @param String la contrase�a del empleado
     * @param String la validacion
     * @return String una cadena aleatoria de 40 caracteres
     */
    public function verificarAcceso($correo, $password, $validacion)
    {
        if (isset($_SESSION["id_usuario"])) {
            throw new Exception("El usuario ya tiene una Sesión Abierta");
            return;
        }
        if ($_SESSION['validacion'] != trim($validacion)) {
            throw new Exception("La validacion, es Incorrecta.<br />Se ha generado una nueva");
        }
        $this->_id = 0;
        $this->_usuario = $this->formatear($correo, "Cadena");
        $this->_password = $this->formatear($password, "Encriptalo");
        $this->_sql = sprintf("SELECT id_usuario, email, password, id_role FROM usuariosanmateo WHERE (email =%s AND password=%s) LIMIT 1;", $this->_usuario, $this->_password);
        $this->_registro = $this->sentenciaSQL($this->_sql, 7);
        $this->_id = $this->_registro['id_usuario'];
        if ($this->_id > 0) {
            //Si el Id es mayo a cero encontraremos ese usuario_zootecnico y contrase�a
            $_SESSION["id_usuario"] = $this->_id;
            // $_SESSION["rolusuario_zootecnico"] = $this->_registro['rol'];
            $_SESSION["ipUsuario"] = $_SERVER['REMOTE_ADDR'];
            $_SESSION["tokenUsuario"] = md5(sha1(session_id() . $_SERVER['REMOTE_ADDR'] . $_SESSION["id_usuario"]));
            $_SESSION['validacion'] = null;
            unset($_SESSION['validacion']);
            return array(sha1(md5(microtime())), $this->_registro['id_role']); //Retornamos una cadena aleatoria de 40 caracteres
        } else {
            //El ID no fue mayor que cero, estan incorrectos usuario_zootecnico y/o contrase�a:
            if (PRODUCCION) {
                throw new Exception("Error en sus permisos del Servidor");
            } else {
                throw new Exception("Error en sus permisos del Servidor:<br />" . $this->_sql);
            }
            return;
        }
    }

}
