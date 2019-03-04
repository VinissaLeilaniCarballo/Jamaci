<?php

	require_once "includes/conexion.php";
	$conexion=conexion();
	$nombre=$_POST['nombre'];
	$apellido_p=$_POST['apellido_p'];
	$apellido_m=$_POST['apellido_m'];
	$puesto=$_POST['puesto'];

	$sql="INSERT into trabajadores (nombre,apellido_p,apellido_m,puesto)
								values ('$nombre','$apellido_p','$apellido_m','$puesto')";
	echo $result=mysqli_query($conexion,$sql);

 ?>
