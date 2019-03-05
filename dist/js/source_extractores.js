/*******************************************************************/
function registra_extractor(){
  if($("#codigo").val()==""||$("#nombre").val()==""||$("#provedor").val()==""||$("#valor_adquisicion").val()=="")||$("#precio_publico").val()=="")||$("#precio_tecnico").val()=="")||$("#precio_gobierno").val()=="")){
    alert("Debes de completar todos los campos...");
    $("#nombre").focus();
  }else{
    $.ajax({
          beforeSend: function(){
           },
          url: 'add_equipos.php',
          type: 'POST',
          data: 'codigo='+$("#codigo").val()+'&nombre='+$("#nombre").val()+'&provedor='+$("#provedor").val()+'&valor_adquisicion='+$("#valor_adquisicion").val()+'&precio_publico='+$("#precio_publico").val()+'&precio_tecnico='+$("#precio_tecnico").val()+'&precio_gobierno='+$("#precio_gobierno").val(),
          success: function(x){
              if(x!='0'){
                alert("Se registro el equipo correctamente...");
              }
              pone_equipos_registrados();
             },
           error: function(jqXHR,estado,error){
             $("#btn-reg-usr").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al registrar el usuario, contacte a soporte inmediatamente...!");
           }
           });
           }
}
/********************************************************************/
