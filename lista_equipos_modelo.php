<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');

$db=new ConexionMySQL();

$cadena="Select * from modelo as M INNER JOIN equipos as E on M.idequipo=E.idequipo";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
  echo "<div class='box box-primary'>";
  echo "<div class='box-header'>";
  echo "<h3 class='box-title'>Equipos Registrados.</h3>";
  echo "</div>";
  echo "<div class='box-body'>";
 echo "<table id='tabla_users' class='table table-hover table-condensed'>";
 echo "<thead>";
 echo "<tr>";
  echo "<th style='text-align: center;'>Modelo</th>";
  echo "<th style='text-align: center;'>No.Serie Condensadora</th>";
  echo "<th style='text-align: center;'>No.Serie Evaporadora</th>";
  echo "<th style='text-align: center;'>Ubicacion</th>";
  echo "<th style='text-align: center;'>Estante</th>";
  echo "<th style='text-align: center;'> </th>";
 echo "</tr>";
 echo "</thead>";
 echo "<tbody>";
 while($e=$db->buscar_array($exe)){
   echo "<tr>";
   echo "<td style='text-align: center;'>".strtoupper($e['modelo'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['condensadora_serie'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['evaporadora_serie'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['ubicacion'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['estante'])."</td>";
   echo "</tr>";
 }
 echo "</tbody>";
 echo "</table>";
 echo "</div>";
 echo "</div>";
}else{
 echo "<b>Actualmente no hay equipos registrados...</b>";
}
?>
