<?php

$conexion = mysqli_connect("localhost","root","","centenario_beta");

$modelo = $_POST['id_modelo'];

$query = $conexion->query("SELECT * FROM modelo WHERE id_modelo = $modelo ");

while ( $row = $query->fetch_array() )
{
	echo utf8_encode('<option value="' . $row['id_modelo']. '">' . $row['nombre'] . ' | '. $row['numero'] .  '</option>' . "\n");
}
