/******************************************************************************/
 function busca_articulo(){
          if($("#codigo").val()!=""){
         $(document).ready(function(){
          $.ajax({
          beforeSend: function(){
            $("#descripcion").html("Buscando informacion del articulo...");
           },
          url: 'busca_data_articulo2.php',
          type: 'POST',
          dataType: 'json',
          data: 'codigo='+$("#codigo").val(),
          success: function(x){
            if(x=='0'){
              alert("El codigo del articulo, no existe...!");
              $("#codigo").val("");
              $("#codigo").focus();
            }else{
              $("#descripcion").val(x.descripcion);
              $("#exis_anterior").val(x.cantidad);
              $("#exis_actual").prop("disabled", false);
              $("#exis_actual").select();
              $("#exis_actual").focus();
            }
           },
           error: function(jqXHR,estado,error){
             alert("Ocurrio un error al consultar la informacion del articulo...reporte a soporte...!    "+estado+"    "+error);
           }
           });
          });
          }else{
          }
         }
/***************************************************************************************/
$(document).ready(function(){
    $(".cantidades").inputmask();
    });
/****************************************************************************************/
function cancela(){
 $("#descripcion").val("Aqui aparece la descripcion...");
 $("#exis_anterior").val("");
 $("#exis_actual").val("");
 $("#exis_actual").prop("disabled", true);
 $("#codigo").val("");
 $("#codigo").focus();
}
/*****************************************************************************************/
function agrega_a_lista(){
            var tipo='';
            var dif=0.00;
            var articulo=$("#codigo").val();
            var descripcion=$("#descripcion").val();
            var existencia_nueva=$("#exis_actual").val();
            if(existencia_nueva==""){
              existencia_nueva=0.00;
            }
            var existencia_anterior=$("#exis_anterior").val();
            dif=existencia_nueva-existencia_anterior;
            if(existencia_nueva-existencia_anterior>0){
               tipo='A';
            }
            if(existencia_nueva-existencia_anterior<0){
               tipo='A-';
            }
            if(existencia_nueva-existencia_anterior==0){
               tipo='0';
            }
            insertar=$("#lista_articulos_existencias > tbody").append("<tr id='"+articulo+"'><td class='center'>"+articulo+"</td><td class='center'>"+descripcion+"</td><td class='center'>"+existencia_anterior+"</td><td class='center'>"+existencia_nueva+"</td><td class='center'>"+dif.toFixed(2)+"</td><td class='center'>"+tipo+"</td><td class='center'><button class='btn btn-danger elimina'><i class='fa fa-trash-o'></i></button></td></tr>").hide();
            insertar.fadeIn(1000);
            cancela();
            $("#codigo").val("");
            $("#codigo").focus();
        }
/*******************************************************************************************/
function verifica_tabla_existencia(){
     $('#lista_articulos_existencias > tbody > tr').each(function(){
           var cod = $(this).find('td').eq(0).html();
               if($("#codigo").val()==cod){
                 $("#"+cod).remove();
               }
            });
       }
/****************************************************************************************/
function cancela_todo(){
            var removes=$("#lista_articulos_existencias > tbody:last").children().fadeOut(1000);
            removes.remove();
            cancela();
         }
/********************************************************************************************/
function procesa_lista_ajustes(){
          var cuantos=0;
          $("#lista_articulos_existencias > tbody > tr").each(function(){
              cuantos++;
          })
          if(cuantos>0){
          $("#btn_procesa").prop('disabled', true);
           var n = noty({
                  text: "Desea procesar el ajuste en los articulos de la lista...?",
                  theme: 'relax',
                  layout: 'center',
                  type: 'information',
                  modal: 'true',
                  buttons     : [
                    {addClass: 'btn btn-primary',
                     text    : 'Si',
                     onClick : function ($noty){
                          $noty.close();
                          $('#lista_articulos_existencias > tbody > tr').each(function(){
                             var cod = $(this).find('td').eq(0).html();
                             var can = $(this).find('td').eq(3).html();
                             var tipo  = $(this).find('td').eq(5).html();
                             var dif = $(this).find('td').eq(4).html();
                             if(tipo!='0'){
                             $.ajax({
                             beforeSend: function(){
                              },
                             url: 'procesa_ajuste.php',
                             type: 'POST',
                             data: 'codigo='+cod+'&cantidad='+can+'&tipo='+tipo+'&diferencia='+dif,
                             success: function(x){
                                  var n = noty({
                                   text: "Procesando articulo: "+cod,
                                   theme: 'relax',
                                   layout: 'topLeft',
                                   type: 'success',
                                   timeout: 1000,
                                  });
                               },
                             error: function(jqXHR,estado,error){
                               }
                              });
                             }
                            });
                              removes=$("#lista_articulos_existencias > tbody:last").children().fadeOut(1000);
                              removes.remove();
                              $("#btn_procesa").prop('disabled', false);
                              pone_foco();
                          }
                        },
                   {addClass: 'btn btn-danger',
                    text    : 'No',
                    onClick : function ($noty){
                       $("#btn_procesa").prop('disabled', false);
                       $noty.close();
                    }
                   }
                  ]
               });
            }else{
              alert("No hay registros que procesar...");
            }
         }
/******************************************************************************************/
$(function(){
         // Evento que selecciona la fila y la elimina
	      $(document).on("click",".elimina",function(){
	     	var parent = $(this).parents().parents().get(0);
		  $(parent).fadeOut().remove();
       	});
       });
/*****************************************************************************************/