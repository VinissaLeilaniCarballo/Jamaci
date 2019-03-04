<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');
require('class_lib/funciones.php');
$db=new ConexionMySQL();
$nombre=test_input($_POST['nombre']);
$username=test_input($_POST['username']);
$pass=test_input($_POST['pass']);
$cadena=$db->consulta("Insert into usuarios(nombre,username,password) values('$nombre','$username','$pass')");
?>
