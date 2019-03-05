<?php
///CLASE PARA CONECTAR CON MYSQL.....////
error_reporting(0);
class ConexionMySQL{

  private $conexion;
  private $total_consultas;

  public function ConexionMySQL(){
    if(!isset($this->conexion)){
      $this->conexion = (mysql_connect("localhost","root",""))
        or die("No se pudo establecer una conexion con el servidor, consulte a Soporte...!");
      mysql_select_db("JAMACI",$this->conexion) or die("Ocurrio un problema al seleccionar la base de datos, consulte a Soporte...!");
    }
  }

  public function consulta($consulta){
    error_reporting(0);
    $this->total_consultas++;
    $resultado = mysql_query($consulta,$this->conexion);
    if(!$resultado){
      echo 'Error en MySQL: ' . mysql_error();
      //echo "0";
      exit;
    }
    return $resultado;
  }

  public function buscar_array($consulta){
    error_reporting(0);
   return mysql_fetch_array($consulta);
  }

  public function numero_de_registros($consulta){
    error_reporting(0);
   return mysql_num_rows($consulta);
  }

  public function getTotalConsultas(){
   return $this->total_consultas;
  }

  public function DesconectaServer(){
    error_reporting(0);
    mysql_close($this->conexion);
  }

  }
?>
