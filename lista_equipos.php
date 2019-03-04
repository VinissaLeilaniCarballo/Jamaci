<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');

$db=new ConexionMySQL();

$cadena="Select * from equipos";
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
 echo "<th style='text-align: center;'>Codigo</th>";
  echo "<th style='text-align: center;'>Modelo</th>";
  echo "<th style='text-align: center;'>Producto</th>";
  echo "<th style='text-align: center;'>Provedor</th>";
  echo "<th style='text-align: center;'>Garantia</th>";
  echo "<th style='text-align: center;'>Valor de Adquisicion</th>";
  echo "<th style='text-align: center;'>Precio Publico</th>";
  echo "<th style='text-align: center;'>Precio Tecnico</th>";
  echo "<th style='text-align: center;'>Precio Gobierno</th>";
  echo "<th style='text-align: center;'>Cantidad</th>";
  echo "<th style='text-align: center;'> </th>";
 echo "</tr>";
 echo "</thead>";
 echo "<tbody>";
 while($e=$db->buscar_array($exe)){
   echo "<tr>";
   echo "<td style='text-align: center;'>".strtoupper($e['codigo'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['modelo'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['nombre'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['provedor'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['garantia'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['valor_adquisicion'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['precio_publico'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['precio_tecnico'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['precio_gobierno'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e[''])."</td>";
   echo "<td style='text-align: center;'><button  id='equipo' onclick='cambiar(this.idequipo);' class=' btn btn-default onclick'funcion(".strtoupper($e['idequipo']).")><i class='fas fa-eye color'></i></button></td>";
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
