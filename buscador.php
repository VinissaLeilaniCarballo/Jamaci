<?php
require('class_lib/conexion.php');
require('class_lib/funciones.php');
	$conexion=conexion();

	$sql="SELECT idusuario,nombre,username,password,
						from usuarios";
				$result=mysqli_query($conexion,$sql);

 ?>
<br><br>
<div class="row">
	<div class="col-sm-8"></div>
	<div class="col-sm-4">
		<label>Buscador</label>
		<select id="buscadorvivo" class="form-control input-sm">


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
					url:'',
					success:function(r){
						$('#usuarios_registrados').load('lista_usuarios.php');
					}
				});
			});
		});
	</script>
