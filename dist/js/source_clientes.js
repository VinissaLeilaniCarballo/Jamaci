
/********************************************************************/
function pone_clientes_registrados(){
   $.ajax({
          beforeSend: function(){
            $("#clientes_registrados").html("");
           },
          url: 'lista_clientes.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#clientes_registrados").html(x);
             },
           error: function(jqXHR,estado,error){
             $("#clientes_registrados").html('Hubo un error: '+estado+' '+error);
             alert("Hubo un error al consultar clientes registrados, contacte a soporte inmediatamente...!");
           }
           });
}
/*******************************************************************************/
