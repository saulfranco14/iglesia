<?php

$conexion = mysqli_connect("localhost","root","","centenario_beta");

$corte = $_POST['id_operacion'];

$query = $conexion->query("SELECT * FROM operacion WHERE prenda_id_prenda = $corte");

while ( $row = $query->fetch_array() )
{
	echo utf8_encode('<option data-costo="' . $row['costo']. '" value="' . $row['id_operacion']. '">' . $row['nombre'] . ' | '. $row['costo'] .  '</option>' . "\n");
}
