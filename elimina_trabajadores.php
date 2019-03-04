
<?php
	require_once "includes/conexion.php";
	$conexion=conexion();
	$idtrabajador=$_POST['idtrabajador'];

	$sql="DELETE from trabajadores where idtrabajador='$idtrabajador'";
	echo $result=mysqli_query($conexion,$sql);
 ?>
