<?php
error_reporting(0);
session_start();

include('./class_lib/conexion.php');
include('./class_lib/funciones.php');
$db= new ConexionMySQL();
$usuario=test_input($_POST['usuario']);
$password=test_input($_POST['pass']);

$set_names=$db->consulta("SET NAMES 'utf8'");
$consulta = $db->consulta("SELECT a.nombre as nombreusuario,a.username,a.password FROM usuarios a WHERE a.username='$usuario' AND a.password='$password'");
if($db->numero_de_registros($consulta)>0){

  /*visitas***/
  $fp = fopen("contador.txt","r"); // Abrimos el fichero donde guardaremos y leeremos las visitas
  $visitas = intval(fgets($fp)); // Leemos las visitas y usamos intval para asegurarnos de que devuelve un entero
  $visitas++; // Incrementamos las visitas
  fclose($fp); // Cerramos el archivo pues lo vamos a volver a abrir en modo escritura
  $fp = fopen("contador.txt","w"); // Abrimos el archivo en modo escritura
  fputs($fp,$visitas); // Escribimos las visitas sumadas

  while($data=$db->buscar_array($consulta)){
    $_SESSION['autorizado']=1;
    $_SESSION['nombre_de_usuario']=$data['nombreusuario'];
  }


  echo "
    <script>
      document.location.href = 'inicio.php';
    </script>
  ";
}else{
  echo "<script>
    swal(
      'Nombre o contraseña invalidos',
      'Por favor verifique sus datos e intente nuevamente',
      'error'
    );
  </script>";
}
?>
