<?php
session_start();
if($_SESSION['autorizado']<>1){
header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');
require('class_lib/funciones.php');
$db= new ConexionMySQL();

$id=($_GET['equipo']);
$cadena="Select idequipo from equipos where $id=idequipo ";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
 while($e=$db->buscar_array($exe)){
   $condensadora_serie=test_input($_POST['condensadora_serie']);
   $evaporadora_serie=test_input($_POST['evaporadora_serie']);
   $estante=test_input($_POST['estante']);
   $ubicacion=test_input($_POST['ubicacion']);


   $cadena=$db->consulta("Insert into modelo (condensadora_serie,evaporadora_serie,ubicacion,estante,idequipo)
   values('$condensadora_serie','$evaporadora_serie','$ubicacion','$estante','$id')");


header("Location: alta_equipos.modelo.php");

?>
