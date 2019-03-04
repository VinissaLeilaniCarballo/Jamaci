<?php
	require_once "includes/conexion.php";
	$conexion=conexion();

	$sql="SELECT idtrabajador,nombre,apellido_p,apellido_m,puesto
						from trabajadores";
				$result=mysqli_query($conexion,$sql);

 ?>
<br><br>
<div class="row">
	<div></div>
	<div >
		<label>Buscador</label>
		<select style="background: #D9D9D9"  id="buscadorvivo">
			<option style="background: #D9D9D9"  value="0">Seleciona uno</option>
			<?php
				while($ver=mysqli_fetch_row($result)):
			 ?>
				<option value="<?php echo $ver[0] ?>">
					<?php echo $ver[1]." ".$ver[2] ?>
				</option>

			<?php endwhile; ?>

		</select>
	</div>
</div>


	<script type="text/javascript">
		$(document).ready(function(){
			$('#buscadorvivo').select2();

			$('#buscadorvivo').change(function(){
				$.ajax({
					type:"post",
					data:'valor=' + $('#buscadorvivo').val(),
					url:'crearsession.php',
					success:function(r){
						$('#tabla').load('lista_trabajadores.php');
					}
				});
			});
		});
	</script>
