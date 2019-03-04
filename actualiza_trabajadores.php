<?php
	require_once "includes/conexion.php";
	$conexion=conexion();
	$idtrabajador=$_POST['idtrabajador'];
	$nombre=$_POST['nombre'];
	$apellido_p=$_POST['apellido_p'];
	$apellido_m=$_POST['apellido_m'];
	$puesto=$_POST['puesto'];

	$sql="UPDATE trabajadores set nombre='$nombre',
								apellido_p='$apellido_p',
								apellido_m='$apellido_m',
								puesto='$puesto'
				where idtrabajador='$idtrabajador'";
	echo $result=mysqli_query($conexion,$sql);

 ?>
