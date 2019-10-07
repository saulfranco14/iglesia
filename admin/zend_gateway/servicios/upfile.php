<?php

/**
 * Software freelance©
 * @author Saul Mauricio Franco Renteria
 * @copyright CDM
 * @version 2.0
 * @package sistema
 */
Class UpFile
{

    //esta variable recibe el id del registro en el que se guarda el nombre de la imagen
    private $_ID;
    private $_titulo;
    private $_directorio;
    private $_nameImagen;

    /**
     * Constructor de la Clase para verificar seguridad de conexion.
     * @access public
     * @return Object resource El objeto de la Conexion.
     */
    public function __construct()
    {
        if (!isset($_SESSION["id_usuario"])) {
            throw new Exception("Imposible continuar..... enlace corrupto");
            return;
        }
    }

    /**
     * Funcion para actualizar la informacion de la caratula de un disco.
     * @access public
     * @param String $id El id del disco al que se le asigna la imagen
     * @param String $titulo El titulo que se le dara a la imagen
     * @param String $directorio El directorio en donde se guardara la imagen
     * @param File $archivo El archivo a ser cargado
     * @param String $_directorio El directorio en el que debe de guardar la imagen que se sube
     * @return int El numero de Registros afectados.
     */
    public function cover($id, $titulo, $_foto_anterior, $archivo, $_directorio)
    {
        $mysqli = new mysqli("localhost", "root", "", "dbsanmateo");
        if (mysqli_connect_errno()) {
            printf("Falló la conexión failed: %s\n", $mysqli->connect_error);
            exit();
        }
        if (is_array($archivo)) {
            $archivo = (object) $archivo;
        }
        $aSubirEn = strip_tags("../../imagenes/" . $_directorio . $_foto_anterior);
        $_existencia = file_exists($aSubirEn);
        if ($_existencia) { //comprobar si existe
            //si borramos algo
            unlink($aSubirEn);
        }
        $status = array();
        $this->_nameImagen = $this->uploadImage($titulo, $archivo, $_directorio);
        $tipo = explode("=", $this->_nameImagen);
        
        $this_name = $archivo->name;
        $tipoA = explode(".", $this_name);
        $_this_new_name = $titulo . "." . strtolower($tipoA[1]);
        $_this_new_name = utf8_decode($_this_new_name);
        if ($_foto_anterior == $_this_new_name) {
            //return array_push($status, array('nombre' =>$tipo[0],'status' =>1));
            array_push($status, array('nombre' => 'ya existia una version anterior', 'status' => 1));
            return $status;
        } else {
            if (intval($tipo[1]) == 1) {
                $this->_ID = intval($id);
                $this->_nameImagen = '"' . strval(trim($tipo[0])) . '"';
                //el sql lo debes de cambiar por el de la tabla en el que vallas a modificar
                if($_directorio == "colores/"){
                    $mi_sql = sprintf("UPDATE color SET imagen=%s WHERE id_color=%s;", $this->_nameImagen, $this->_ID);
                }else if($_directorio == "prendas/"){
                    //debes de cambiar el sql y agregar todos los ifs que necesites
                    $mi_sql = sprintf("UPDATE prenda SET imagen=%s WHERE id_prenda=%s;", $this->_nameImagen, $this->_ID);
                }else if($_directorio == "carnets/"){
                     $mi_sql = sprintf("UPDATE carnet SET Foto=%s WHERE Id_Carnet=%s;", $this->_nameImagen, $this->_ID);
                }else if($_directorio == "zootecnicos/"){
                     $mi_sql = sprintf("UPDATE zootecnico SET Fotografia=%s WHERE Id_Zootecnico=%s;", $this->_nameImagen, $this->_ID);
                }else if($_directorio == "mascotas/"){
                     $mi_sql = sprintf("UPDATE mascota SET Fotografia=%s WHERE Id_Mascota=%s;", $this->_nameImagen, $this->_ID);
                }
                
                $mysqli->query($mi_sql);
                if (intval($mysqli->affected_rows) != 0) {
                    //array_push($status, array('nombre' =>$tipo[0],'status' =>1));
                    array_push($status, array('nombre' => 'modifica base', 'status' => 1));
                    return $status;
                } else if ($_existencia) {
                    //array_push($status, array('nombre' =>$tipo[0],'status' =>1));
                    array_push($status, array('nombre' => 'no modifica base, solo imagen', 'status' => 1));
                    return $status;
                } else {
                    //array_push($status, array('nombre' =>$tipo[0],'status' =>0));
                    array_push($status, array('nombre' => 'no modifica base', 'status' => 0));
                    return $status;
                }
            } else {
                //array_push($status, array('nombre' =>$tipo[0],'status' =>0));
                array_push($status, array('nombre' =>'no hizo nada','status' =>0));
                return $status;
            }
        }
    }

    /* esta funcion no la debemos de tocar por nada */

    /**
     * Funcion para subir la caratula de un disco.
     * @access public
     * @param String $titulo El titulo que se le dara a la imagen
     * @param File $archivo El archivo a ser cargado
     * @return String El nombre con el cual fue subida la imagen.
     * @final
     */
    public function uploadImage($titulo, $archivo, $_dir)
    {
        /* if (is_array($archivo)) {
          $archivo = (object) $archivo;
          } */
        $_existe = "Se genero un error de tipo:<br />";

        $_this_name = $archivo->name;
        $tipo = explode(".", $_this_name);
        $_this_new_name = $titulo . "." . strtolower($tipo[1]);
        $_this_new_name = utf8_decode($_this_new_name);
        $_exito = 0;
        if (is_uploaded_file($archivo->tmp_name)) { // comprobar si proviene del servidor
            if ((strtolower($tipo[1]) == "jpg") || (strtolower($tipo[1]) == "png") || (strtolower($tipo[1]) == "jpeg") || (strtolower($tipo[1]) == "bmp")) {
                $aSubirEn = strip_tags("../../imagenes/" . $_dir . $_this_new_name);
                if (move_uploaded_file($archivo->tmp_name, $aSubirEn)) { // comprobar si se movio
                    //Asigno a la foto permisos
                    chmod($aSubirEn, 0777);
                    //Si la subida se hizo bien agregamos 1
                    $_exito = 1;
                } else {
                    $_existe .= "Completado =><br/>" . $archivo->name . " -> no pudo ser creado en el directorio indicado <br/>";
                }
            } else {
                $_existe .= "Formato =><br/>" . $_archivo->name . " -> no tiene el formato adecuado <br/>";
            }
        } else {
            $_existe .= "Externo =><br/>" . $archivo->name . " -> no se reconoce como un archivo enviado por el usuario <br/>";
        }
        if ($_exito == 1) {
            //echo "Exito al subir el archivo";
            return $_this_new_name . "=1";
        } else {
            //echo $_existe . $_esSeguro . $_elFormato . $_esCompletado . "No todos los archivos fueron subidos";
            return $_existe . "Vuelva a intentar..." . "=0";
        }
    }

    public function __clone()
    {
        echo "Hasta el momento hay clones de Homero Simpson";
    }

}

?>