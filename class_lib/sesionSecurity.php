<?php
  session_start();
  date_default_timezone_set("America/Chihuahua");
  if($_SESSION['autorizado']<>1){
    header("Location: index.php");
  }
?>
