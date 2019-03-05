
<?php
		function conexion(){
			$servidor="localhost";
			$usuario="root";
			$password="";
			$bd="JAMACI";

			$conexion=mysqli_connect($servidor,$usuario,$password,$bd);

			return $conexion;
		}

 ?>
