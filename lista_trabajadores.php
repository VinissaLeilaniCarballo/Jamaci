<?php
	session_start();
	require_once "includes/conexion.php";
	$conexion=conexion();

 ?>
 <div class="col-sm-12 ">
<div class="row">
	<div class="box">
		<table class="table table-hover table-condensed" id="tabladinamica">
<thead>
			<tr>
				<th>NOMBRE</th>
				<th>APELLIDO PATERNO</th>
				<th>APELLIDO MATERNO</th>
				<th>PUESTO</th>
				<th>EDITAR</th>
				<th>ELIMINAR</th>
			</tr>
</thead>
<tbody>
			<?php

				if(isset($_SESSION['consulta'])){
					if($_SESSION['consulta'] > 0){
						$idp=$_SESSION['consulta'];
						$sql="SELECT idtrabajador,nombre,apellido_p,apellido_m,puesto
						from trabajadores where idtrabajador='$idp'";
					}else{
						$sql="SELECT idtrabajador,nombre,apellido_p,apellido_m,puesto
						from trabajadores";
					}
				}else{
					$sql="SELECT idtrabajador,nombre,apellido_p,apellido_m,puesto
						from trabajadores";
				}

				$result=mysqli_query($conexion,$sql);
				while($ver=mysqli_fetch_row($result)){

					$datos=$ver[0]."||".
						   $ver[1]."||".
						   $ver[2]."||".
						   $ver[3]."||".
						   $ver[4];
			 ?>

			<tr>
				<td><?php echo $ver[1] ?></td>
				<td><?php echo $ver[2] ?></td>
				<td><?php echo $ver[3] ?></td>
				<td><?php echo $ver[4] ?></td>
				<td>
					<button class="btn" data-toggle="modal" data-target="#modalEditar" onclick="agregaform('<?php echo $datos ?>')">
          <i class="fas fa-edit color"></i>
					</button>
				</td>
				<td>
					<button class="btn"
					onclick="preguntarSiNo('<?php echo $ver[0] ?>')">
					<i class="fas fa-trash " style="color:#C4090A;"></i>
					</button>
				</td>
			</tr>
			<?php
		}
			 ?>

		 </tbody>
		</table>
	</div>
</div>
</div>

<script>

$(document).ready(function() {
    $('#tabladinamica').DataTable();
} );

</script>
