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
$mod=test_input($_POST['modelo']);
$provedor=test_input($_POST['provedor']);
$valor_adquisicion=test_input($_POST['valor_adquisicion']);
$precio_publico=test_input($_POST['precio_publico']);
$precio_tecnico=test_input($_POST['precio_tecnico']);
$precio_gobierno=test_input($_POST['precio_gobierno']);


$cadena=$db->consulta("Insert into equipos (codigo,garantia,nombre,provedor,valor_adquisicion,precio_publico,precio_tecnico,precio_gobierno,modelo)
values('$codigo','2019','$nombre','$provedor','$valor_adquisicion','$precio_publico','$precio_tecnico','$precio_gobierno','$mod')");


?>
