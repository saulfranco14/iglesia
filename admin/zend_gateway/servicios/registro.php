<?php

session_start();

if (isset($_SESSION["id_usuario"])) {
    //Recepcion datos
    /* las tags de $_POST sufren los mismos cambios que imagen.js */
    $ID = strip_tags($_POST['id']);
    $DATO_NOMBRE = strip_tags($_POST['nombre']);
    $IMAGEN_ANTERIOR = strip_tags($_POST['anterior']);
    //esta linea no la debemos de modificar ya que recibe el tipo de usuario que intenta hacer la subida desde imagen.js
    $_tipoUsuario = strip_tags($_POST['usuario']);
    //para cachar la imagen 
    if (isset($_POST["submit"])) {
        require_once 'upfile.php';
        switch ($_tipoUsuario) {
            case 'color':
                $registra = new UpFile();
                //esta variable solo contiene el nombre de la carpeta en el que vallas a guardar las 
                //imagenes y solo se encuentre en el directorio imagenes
                $_folder = 'colores/';
                $status = $registra->cover($ID, $DATO_NOMBRE, $IMAGEN_ANTERIOR, $_FILES["archivo"], $_folder);
                break;
            case 'prenda':
                $registra = new UpFile();
                //esta variable solo contiene el nombre de la carpeta en el que vallas a guardar las 
                //imagenes y solo se encuentre en el directorio imagenes
                $_folder = 'prendas/';
                $status = $registra->cover($ID, $DATO_NOMBRE, $IMAGEN_ANTERIOR, $_FILES["archivo"], $_folder);
                break;
            case 'usuario':
                $registra = new UpFile();
                //esta variable solo contiene el nombre de la carpeta en el que vallas a guardar las 
                //imagenes y solo se encuentre en el directorio imagenes
                $_folder = 'usuarios/';
                $status = $registra->cover($ID, $DATO_NOMBRE, $IMAGEN_ANTERIOR, $_FILES["archivo"], $_folder);
                break;
            case 'carnet':
                 $registra = new UpFile();
                //esta variable solo contiene el nombre de la carpeta en el que vallas a guardar las 
                //imagenes y solo se encuentre en el directorio imagenes
                $_folder = 'carnets/';
                $status = $registra->cover($ID, $DATO_NOMBRE, $IMAGEN_ANTERIOR, $_FILES["archivo"], $_folder);
                break;
            case 'mascota':
                 $registra = new UpFile();
                //esta variable solo contiene el nombre de la carpeta en el que vallamos a guardar las 
                //imagenes y solo se encuentre en el directorio imagenes
                $_folder = 'mascotas/';
                $status = $registra->cover($ID, $DATO_NOMBRE, $IMAGEN_ANTERIOR, $_FILES["archivo"], $_folder);
                break;
        }
        echo json_encode($status);
    } else {
        throw new Exception("¿Que esperaba ver?");
    }
} else {
    throw new Exception("Disculpe las molestias, no puede ver esta información");
}
?>
