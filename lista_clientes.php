<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');

$db=new ConexionMySQL();

$cadena="Select * from clientes as C INNER JOIN numeros as N on C.idcliente=N.idcliente  group by C.idcliente";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
  echo "<div class='box box-primary'>";
  echo "<div class='box-header'>";
  echo "<h3 class='box-title'>Clientes Registrados.</h3>";
  echo "</div>";
  echo "<div class='box-body'>";
 echo "<table id='tabla_users' class='table table-hover table-condensed'>";
 echo "<thead>";
 echo "<tr>";
 echo "<th style='text-align: center;'>Empresa</th>";
  echo "<th style='text-align: center;'>Telefono</th>";
  echo "<th style='text-align: center;'>Extension</th>";
  echo "<th style='text-align: center;'>Celular</th>";
  echo "<th style='text-align: center;'>Correo Electronico</th>";
 echo "</tr>";
 echo "</thead>";
 echo "<tbody>";
 while($e=$db->buscar_array($exe)){
   echo "<tr>";
   echo "<td style='text-align: center;'>".strtoupper($e['empresa'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['numero'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['extencion'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['celular'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['email'])."</td>";
   echo "<td style='text-align: center;'><button class=' btn btn-default onclick'funcion(".strtoupper($e['idcliente']).")><i class='fas fa-eye color'></i></i></button></td>";

   echo "</tr>";
 }
 echo "</tbody>";
 echo "</table>";
 echo "</div>";
 echo "</div>";
}else{
 echo "<b>Actualmente no hay clientes registrados...</b>";
}
?>
