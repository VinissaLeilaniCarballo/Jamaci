<?php

            $servidor = "localhost";
            $nombreusuario = "root";
            $password = "root";
            $db = "JAMACI";

            $conexion = new mysqli($servidor, $nombreusuario, $password, $db);

            if($conexion->connect_error){
                die("Conexión fallida: " . $conexion->connect_error);
            }

if(isset($_POST['nombre']) && !empty ($_POST['nombre']) &&
isset($_POST['apellido_p']) && !empty ($_POST['apellido_p']) &&
isset($_POST['apellido_m']) && !empty ($_POST['apellido_m']) &&
isset($_POST['puesto']) && !empty ($_POST['puesto'])){

                $nombre = $_POST['nombre'];
                $ap = $_POST['apellido_p'];
                $am = $_POST['apellido_m'];
                $puesto = $_POST['puesto'];


                $sql = "INSERT INTO Trabajadores(nombre,apellido_p,apellido_m,puesto)
                                    VALUES('$nombre', '$ap','$am','$puesto')";

                if($conexion->query($sql) === true){
                    echo '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Success!</strong> Los datos de' .$nombre. $ap.$am.'se guardaron correctamente';
                }else{
                    die("Error al insertar datos: " . $conexion->error);
                }
                $conexion->close();
            }

?>
