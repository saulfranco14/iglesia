<?php

$conexion = mysqli_connect("localhost","root","","centenario_beta");

$query = $conexion->query("SELECT * FROM prenda DESC");

echo '<option value="0">Seleccione</option>';

while ( $row = $query->fetch_array() )
{
	echo '<option value="' . $row['id_prenda']. '">' . $row['nombre'] . '</option>' . "\n";
}
