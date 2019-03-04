<?php
session_start();
if($_SESSION['autorizado']<>1){
header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');
require('class_lib/funciones.php');
$db= new ConexionMySQL();

$nombre=test_input($_POST['nombre']);
$apellido_p=test_input($_POST['apellido_p']);
$apellido_m=test_input($_POST['apellido_m']);
$empresa=test_input($_POST['empresa']);
$puesto=test_input($_POST['puesto']);
$email=test_input($_POST['email']);
$RFC=test_input($_POST['RFC']);
$datos_bancarios=test_input($_POST['datos_bancarios']);
$direccion=test_input($_POST['direccion']);

$cadena=$db->consulta("Insert into clientes (nombre,apellido_p,apellido_m,empresa,puesto,email,RFC,datos_bancarios,direccion)
values('$nombre','$apellido_p','$apellido_m','$empresa','$puesto','$email','$RFC','$datos_bancarios','$direccion')");


$cadena="Select idcliente from clientes order by idcliente desc limit 1";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
 while($e=$db->buscar_array($exe)){
   $telefono=test_input($_POST['telefono']);
   $extencion=test_input($_POST['extencion']);
   $celular=test_input($_POST['celular']);
  
   $id=$e['idcliente'];
   $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
   values('$telefono','$extencion','$celular','$id')");

   if (isset($_POST['telefono1'])){
     $telefono1=$_POST['telefono1'];
     $extencion1=$_POST['extencion1'];
     $celular1=$_POST['celular1'];
     $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
     values('$telefono1','$extencion1','$celular1','$id')");
   }
   if (isset($_POST['telefono2'])){
     $telefono2=$_POST['telefono2'];
     $extencion2=$_POST['extencion2'];
     $celular2=$_POST['celular2'];
     $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
     values('$telefono2','$extencion2','$celular2','$id')");
   }
   if (isset($_POST['telefono3'])){
     $telefono3=$_POST['telefono3'];
     $extencion3=$_POST['extencion3'];
     $celular3=$_POST['celular3'];
     $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
     values('$telefono3','$extencion3','$celular3','$id')");
   }
   if (isset($_POST['telefono4'])){
     $telefono4=$_POST['telefono4'];
     $extencion4=$_POST['extencion4'];
     $celular4=$_POST['celular4'];
     $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
     values('$telefono4','$extencion4','$celular4','$id')");
   }
   if (isset($_POST['telefono5'])){
     $telefono5=$_POST['telefono5'];
     $extencion5=$_POST['extencion5'];
     $celular5=$_POST['celular5'];
     $cadena=$db->consulta("Insert into numeros (numero,extencion,celular,idcliente)
     values('$telefono5','$extencion5','$celular5','$id')");
   }
 }

}
header("Location: inicio.php");
?>
