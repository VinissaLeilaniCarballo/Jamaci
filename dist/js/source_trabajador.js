/*****************************************************************************/
/*function registra_trabajadores(){
  if($("#nombre").val()==""||$("#apellido_p").val()==""||$("#apellido_m").val()==""||$("#puesto").val()==""){
    alert("Debes de completar todos los campos...");
    $("#nombre").focus();
  }else{
    $.ajax({
          beforeSend: function(){
           },
          url: 'alta_trabajadores.php',
          type: 'POST',
          data: 'nombre='+$("#nombre").val()+'&apellido_p='+$("#apellido_p").val()+'&apellido_m='+$("#apellido_m").val()+'&puesto='+$("#puesto").val(),
          success: function(x){
              if(x!='0'){
                alert("Se registro el Trabajador correctamente...");
              }
              pone_trabajadores_registrados();
             },
           error: function(jqXHR,estado,error){
             $("#btn-trabajadores").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al registrar el equipo contacte a soporte inmediatamente...!");
           }
           });
           }
}
/********************************************************************/
/*function pone_trabajadores_registrados(){
   $.ajax({
          beforeSend: function(){
            $("#trabajadores_registrados").html("");
           },
          url: 'lista_trabajadores.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#trabajadores_registrados").html(x);
             },
           error: function(jqXHR,estado,error){
             $("#trabajadores_registrados").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al consultar equipos registrados, contacte a soporte inmediatamente...!");
           }
           });
}
/*******************************************************************************/

/* function busqueda(){

  var texto = document.getElementById("buscador").value;

  var parametros = {
    "texto" : texto
  };

  $.ajax({
    data: parametros,
    url: 'buscar_trabajadores.php',
    type:"POST",
    success: function(response){
      $("#datos").html(response);
    }


  });

} */






function agregardatos(nombre,apellido_p,apellido_m,puesto){

	cadena="nombre=" + nombre +
			"&apellido_p=" + apellido_p +
			"&apellido_m=" + apellido_m +
			"&puesto=" + puesto;

	$.ajax({
		type:"POST",
		url:"alta_trabajadores.php",
		data:cadena,
		success:function(r){
			if(r==1){
				$('#tabla').load('lista_trabajadores.php');
				 $('#buscador').load('buscar_trabajadores.php');
				alertify.success("El Trabjador fue agregado con exito");
			}else{
				alertify.error("Fallo el servidor");
			}
		}
	});

}

function agregaform(datos){

	d=datos.split('||');

	$('#idtrabajador').val(d[0]);
	$('#nombreu').val(d[1]);
	$('#apellido_pu').val(d[2]);
	$('#apellido_mu').val(d[3]);
	$('#puestou').val(d[4]);

}

function actualizaDatos(){


	idtrabajador=$('#idtrabajador').val();
	nombre=$('#nombreu').val();
	apellido_p=$('#apellido_pu').val();
	apellido_m=$('#apellido_mu').val();
	puesto=$('#puestou').val();

	cadena= "idtrabajador=" + idtrabajador +
			"&nombre=" + nombre +
			"&apellido_p=" + apellido_p +
			"&apellido_m=" + apellido_m +
			"&puesto=" + puesto;

	$.ajax({
		type:"POST",
		url:"actualiza_trabajadores.php",
		data:cadena,
		success:function(r){

			if(r==1){
				$('#tabla').load('lista_trabajadores.php');
				alertify.success("Actualizado con exito :)");
			}else{
				alertify.error("Fallo el servidor");
			}
		}
	});

}

function preguntarSiNo(idtrabajador){
	alertify.confirm('Eliminar Datos', '¿Esta seguro de eliminar este registro?',
					function(){ eliminarDatos(idtrabajador) }
                , function(){ alertify.error('Se cancelo')});
}

function eliminarDatos(idtrabajador){

	cadena="idtrabajador=" + idtrabajador;

		$.ajax({
			type:"POST",
			url:"elimina_trabajadores.php",
			data:cadena,
			success:function(r){
				if(r==1){
					$('#tabla').load('lista_trabajadores.php');
					alertify.success("Eliminado con exito!");
				}else{
					alertify.error("Fallo el servidor");
				}
			}
		});
}
