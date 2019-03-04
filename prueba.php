<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="js/jquery-3.1.1.min.js"></script>
</head>
<body>
	<div id="ventana">
		<form>
			<input type="text" name="a">
			<br><br>
			<input type="text" name="a">
			<br><br>
			<input type="text" name="a">
		</form>
	</div>

	<br><br>
	<div id="otro">

	</div>

	<button id="ver" onclick="mostrar(23)">
		Ver...
	</button>

	<script type="text/javascript">
		$('#ventana').hide();

		function mostrar($id){
			$('#ventana').show();
			alert($id);
			$('#otro').append("<input type='text' value='"+$id+"'>");
		}

	</script>
</body>
</html>
