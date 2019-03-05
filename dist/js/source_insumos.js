/*****************************************************************************/
function registra_insumos(){
  if($("#codigo").val()==""||$("#nombre").val()==""||$("#provedor").val()==""||$("#unidad_medida").val()==""||$("#estante").val()==""||$("#ubicacion").val()==""||$("#comentario").val()==""){
    alert("Debes de completar todos los campos...");
    $("#codigo").focus();
  }else{
    $.ajax({
          beforeSend: function(){
           },
          url: 'alta_insumos.php',
          type: 'POST',
          data: 'codigo='+$("#codigo").val()+'&nombre='+$("#nombre").val()+'&provedor='+$("#provedor").val()+'&unidad_medida='+$("#unidad_medida").val()+'&estante='+$("#estante").val()+'&ubicacion='+$("#ubicacion").val()+'&comentario='+$("#comentario").val(),
          success: function(x){
              if(x!='0'){
                alert("Se registro el insumo correctamente...");
              }
              pone_insumos_registrados();
             },
           error: function(jqXHR,estado,error){
             $("#btn-reg-insumos").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al registrar el insumo contacte a soporte inmediatamente...!");
           }
           });
           }
}
/***********************************************************************************/
function pone_insumos_registrados(){
   $.ajax({
          beforeSend: function(){
            $("#insumos_registrados").html("");
           },
          url: 'lista_insumos.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#insumos_registrados").html(x);
             },
           error: function(jqXHR,estado,error){
             $("#insumos_registrados").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al consultar insumos registrados, contacte a soporte inmediatamente...!");
           }
           });
}
/*******************************************************************************/
