/*****************************************************************************/
/********************************************************************/
function pone_equipos_registrados(){
   $.ajax({
          beforeSend: function(){
            $("#equipos_registrados").html("");
           },
          url: 'lista_equipos.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#equipos_registrados").html(x);
             },
           error: function(jqXHR,estado,error){
             $("#equipos_registrados").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al consultar equipos registrados, contacte a soporte inmediatamente...!");
           }
           });
}
/*******************************************************************************/
