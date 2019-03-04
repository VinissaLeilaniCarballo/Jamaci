<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');

$db=new ConexionMySQL();

$cadena="Select * from insumos where idcategoria='8' ";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
  echo "<div class='box box-primary'>";
  echo "<div class='box-header'>";
  echo "<h3 class='box-title'>Insumos Registrados.</h3>";
  echo "</div>";
  echo "<div class='box-body'>";
 echo "<table id='tabla_users' class='table table-hover table-condensed'>";
 echo "<thead>";
 echo "<tr>";
 echo "<th style='text-align: center;'>Codigo</th>";
  echo "<th style='text-align: center;'>Producto</th>";
  echo "<th style='text-align: center;'>Provedor</th>";
  echo "<th style='text-align: center;'>Unidad de Medida</th>";
  echo "<th style='text-align: center;'>estante</th>";
  echo "<th style='text-align: center;'>ubicacion</th>";
  echo "<th style='text-align: center;'>cometario</th>";
 echo "</tr>";
 echo "</thead>";
 echo "<tbody>";
 while($e=$db->buscar_array($exe)){
   echo "<tr>";
   echo "<td style='text-align: center;'>".strtoupper($e['codigo'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['nombre'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['provedor'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['unidad_medida'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['estante'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['ubicacion'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['comentario'])."</td>";

   echo "</tr>";
 }
 echo "</tbody>";
 echo "</table>";
 echo "</div>";
 echo "</div>";
}else{
 echo "<b>Actualmente no hay insumos registrados...</b>";
}
?>
