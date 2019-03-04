<?php
session_start();
if($_SESSION['autorizado']<>1){
header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');
require('class_lib/funciones.php');
$db= new ConexionMySQL();

$codigo=test_input($_POST['codigo']);
$nombre=test_input($_POST['nombre']);
$provedor=test_input($_POST['provedor']);
$unidad_medida=test_input($_POST['unidad_medida']);
$estante=test_input($_POST['estante']);
$ubicacion=test_input($_POST['ubicacion']);
$comentario=test_input($_POST['comentario']);

$cadena=$db->consulta("Insert into insumos (codigo,nombre,provedor,unidad_medida,estante,ubicacion,comentario,idcategoria)
values('$codigo','$nombre','$provedor','$unidad_medida','$estante','$ubicacion','$comentario','5')");



?>
