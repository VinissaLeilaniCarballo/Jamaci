/*****************************************************************************/
/********************************************************************/
function pone_equipos_modelo(){
   $.ajax({
          beforeSend: function(){
            $("#modelos_registrados").html("");
           },
          url: 'lista_equipos_modelo.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#modelos_registrados").html(x);
             },
           error: function(jqXHR,estado,error){
             $("#modelos_registrados").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al consultar equipos registrados, contacte a soporte inmediatamente...!");
           }
           });
}
/*******************************************************************************/
