/*FUNCIONES PARA EL PUNTO DE VENTA*/
/************************************************************************************/
function busca_articulo(){
     $(document).ready(function(){
      var cod=$("#codigo").val().trim();
          if(cod.trim()!=""){
         $(document).ready(function(){
          $.ajax({
          beforeSend: function(){
            $("#data_articulo").html("Buscando informacion del articulo...");
           },
          url: 'busca_data_articulo_pventa.php',
          dataType: 'json',
          type: 'POST',
          data: 'codigo='+$("#codigo").val(),
          success: function(data){
            if(data==0){
            alert("No existe el articulo...!");
            $("#codigo").val("");
            $("#codigo").focus();
            $("#cantidad").attr("disabled", true);
            $("#preciou").attr("disabled", true);
            }else{
            $(".widget-user-desc").html(data[0].descripcion);
            $(".exis").html(data[0].cantidad);
            $(".preciol").html(data[0].precio);
            $("#preciou").attr("disabled", false);
            //$('#preciou').number(true, 2);
            $("#preciou").val(data[0].precio);
            //$('#cantidad').number(true, 2);
            $("#cantidad").attr("disabled", false);
            $("#cantidad").val(0.00);
            $("#preciou").select();
            $("#preciou").focus();
              if(data[0].imagen!=""){
                $("#imagen").attr("src",'img_articulos/'+data[0].imagen);
               }else{
                $("#imagen").attr("src",'dist/img/sin_foto.png');
               }
              if(data[0].cantidad<=0){
                alert("No hay suficiente existencia...!")
                 $("#codigo").val("");
                 $("#codigo").focus();
                 $("#cantidad").attr("disabled", true);
                 $("#preciou").attr("disabled", true);
              }
            }
           },
           error: function(jqXHR,estado,error){
            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
           }
           });
          });
          }else{
          }
          })
         }
 /*************************************************************************************/
 function agrega_a_lista(){
   $(document).ready(function(){
         if($("#cantidad").val()>0){
            var articulo=$("#codigo").val();
            var descripcion=$(".widget-user-desc").html();
            var precio=$("#preciou").val();
            var cantidad=$("#cantidad").val();
            var monto=cantidad*precio;
            $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center'>"+precio+"</td><td class='center'>"+monto.toFixed(2)+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
            $("#codigo").val("");
            $("#cantidad").val("");
            $("#preciou").val("");
            $("#cantidad").attr("disabled", true);
            $("#preciou").attr("disabled", true);
            $("#codigo").focus();
            /*cancela_operacion();*/
            $("#imagen").attr("src",'dist/img/sin_foto.png');
            resumen();
            }else{
             var n = noty({
                                   text: "La cantidad es invalida...!",
                                   theme: 'relax',
                                   layout: 'center',
                                   type: 'error',
                                   timeout: 2000,
                                  });
            }
            })
         }
/******************************************************************************************/
$(function(){
         // Evento que selecciona la fila y la elimina
	      $(document).on("click",".delete",function(){
	     	var parent = $(this).parents().parents().get(0);
		  $(parent).remove();
           resumen();
       	});
       });
/****************************************************************************************/
function pone_num_venta(){
          $(document).ready(function(){
          $.ajax({
          beforeSend: function(){
            $("#num_ticket").html("Buscando...");
           },
          url: 'busca_ticket.php',
          type: 'POST',
          data: 'caja='+$("#ncaja").val(),
          success: function(x){
            $("#num_ticket").html("Caja: "+$("#ncaja").val()+" - Ticket # " +x);
           },
           error: function(jqXHR,estado,error){
             $("#num_ticket").html('Hubo un error: '+estado+' '+error);
           }
           });
          });
        }
/*****************************************************************************************/
function resumen(){
  $(document).ready(function(){
            var articulos=0.00;
            var monto=0.00;
            $('#tabla_articulos > tbody > tr').each(function(){
            articulos +=parseFloat($(this).find("td").eq(2).html());
            monto+=parseFloat($(this).find('td').eq(4).html());
            });
            $("#total_articulos").html("Total de Articulos: "+articulos.toFixed(2));
            $("#total_venta").val(monto.toFixed(2));
            $("#totales").html('$' + monto.toFixed(2));
            if(articulos>0){
              $("#btn-procesa").prop('disabled', false);
              $("#btn-cancela").prop('disabled', false);
            }else{
              $("#btn-procesa").prop('disabled', true);
              $("#btn-cancela").prop('disabled', true);
            }
            })
          }
/********************************************************************************************/
function busca_cliente(){
      $(document).ready(function(){
               $("#modal_tabla_clientes").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
                       $.ajax({
                          beforeSend: function(){
                            $("#lista_clientes").html("Cargando los clientes...");
                          },
                          url: 'lista_clientes.php',
                          type: 'POST',
                          data: null,
                          success: function(x){
                            $("#lista_clientes").html(x);
                            $(document).ready(function() {
                             $('#sample-table-3').DataTable();
                            });
                           },
                          error: function(jqXHR,estado,error){
                            $("#lista_clientes").html('Hubo un error: '+estado+' '+error);
                          }
                       });
                       })
                      }
/*********************************************************************************************/
function pone_cliente(elid){
                 var client=elid;
                 var idcl=client.split("|");
                 $("#idcliente_credito").val(idcl[0]);
                 $("#modal_tabla_clientes").modal('hide');
                 $("#tipo_de_venta").html("<button class='btn btn-danger btn-xs' onclick='quita_cliente();'>Quitar</button> Venta de Credito a: "+idcl[1]);
                 $("#btn_cre").attr('disabled', true);
                 //window.alert(client);
               }
/*********************************************************************************************/
function quita_cliente(){
  $("#btn_cre").attr('disabled', false);
  $("#tipo_de_venta").html("Venta de Contado.");
  $("#idcliente_credito").val("");
}
/***********************************************************************************************/
function cancela_venta(){
         $("#btn_cancela").prop("disabled", true);
         var n = noty({
                  text: "Deseas cancelar la venta...?",
                  theme: 'relax',
                  layout: 'center',
                  type: 'information',
                  buttons     : [
                    {addClass: 'btn btn-primary',
                     text    : 'Si',
                     onClick : function ($noty){
                          $noty.close();
                          $("#tabla_articulos > tbody:last").children().remove();
                          resumen();
                          cancela_codigo();
                          $("#codigo").focus();
                      }
                   },
                   {addClass: 'btn btn-danger',
                    text    : 'No',
                    onClick : function ($noty){
                      $("#btn_cancela").prop("disabled", false);
                       $noty.close();
                     }
                    }
                  ]
              });
       }
/***************************************************************************************/
function cancela_codigo(){
   $("#preciou").val("");
   $("#cantidad").val("");
   $("#preciou").attr("disabled", true);
   $("#cantidad").attr("disabled", true);
   $("#codigo").val("");
   $("#codigo").focus();
}
/***************************************************************************************/
function prepara_venta(){
  $(document).ready(function(){
   $("#modal_prepara_venta").modal({
        show:true,
        backdrop: 'static',
        keyboard: false
   });
   $('#modal_prepara_venta').on('shown.bs.modal', function () {
   $("#paga_con").select();
   $('#paga_con').focus();
   });
   $("#total_de_venta").val("$ "+ $("#total_venta").val());
   })
}
/***********************************************************************************/
function calcula_cambio(){
   var m1=$("#total_venta").val();
   var m2=$("#paga_con").val();
   var change=parseFloat(m2)-parseFloat(m1);
   $("#el_cambio").val("$ "+change.toFixed(2));
}
/**************************************************************************************/
function pone_foco_ini(){
  $("#codigo").focus();
}
/**************************************************************************************/
function procesa_venta(){
  $(document).ready(function(){
    /*busca el numero de ticket*/
     var n_tic='';
      $.ajax({
          url: 'busca_ticket.php',
          type: 'POST',
          data: 'caja='+$("#ncaja").val(),
          success: function(x){
            n_tic=x;
           },
           error: function(jqXHR,estado,error){
             alert('Hubo un error, no se pudo establecer el numero de ticket, reporte a soporte!! '+estado+' '+error);
           }
           });
      ////******************************/////
     setTimeout('actualiza_ticket()',1000);
    $('#modal_prepara_venta').modal('toggle');
         var credi='0';
         var clients='0';
          //$("#btn-procesa").prop('disabled', true);
           if($('#idcliente_credito').val()!=""){
             credi='1';
             clients=$("#idcliente_credito").val();
           }
           var yapuso=0;
           $('#tabla_articulos > tbody > tr').each(function(){
                var descripcion_art=$(this).find('td').eq(1).html();
                var cod = $(this).find('td').eq(0).html();
                var can = $(this).find('td').eq(2).html();
                var preciou  = $(this).find('td').eq(3).html();
                var monto=$(this).find('td').eq(4).html();
                         $.ajax({
                             beforeSend: function(){
                              },
                             url: 'procesa_venta.php',
                             type: 'POST',
                             data: 'codigo='+cod+'&cantidad='+can+'&preciou='+preciou+'&credito='+credi+'&clienteid='+clients+'&caja='+$("#ncaja").val(),
                             success: function(x){
                                  var n = noty({
                                   text: "Procesando venta...  articulo actual: "+cod,
                                   theme: 'relax',
                                   layout: 'topLeft',
                                   type: 'success',
                                   timeout: 2000,
                                  });
                               if(yapuso==0){
                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                               yapuso=1;
                               }else{
                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                               }
                              },
                             error: function(jqXHR,estado,error){
                               $("#errores").html('Error... '+estado+'  '+error);
                              }
                             });
                           });
                          })
                        }
/*******************************************************************************************/
function actualiza_ticket(){
  $(document).ready(function(){
    $.ajax({
                             beforeSend: function(){
                              },
                             url: 'update_numero_ticket.php',
                             type: 'POST',
                             data: 'caja='+$("#ncaja").val(),
                             success: function(x){
                               //alert("Se actualizo el numero de ticket");
                               $("#tabla_articulos > tbody:last").children().remove();
                                resumen();
                                quita_cliente();
                                $("#codigo").focus();
                              },
                             error: function(jqXHR,estado,error){
                               $("#errores").html('Error... '+estado+'  '+error);
                              }
                             });
                             pone_num_venta();
                             $(".print_ticket").printPage({
                               url: "ticket.txt",
                               attr: "href",
                               message:"Generando vista previa del ticket.."
                             })
                             $(".print_ticket").click();
                             })
}
/*******************************************************************************************/
function llena_ticket_archivo(param1,param2,param3,param4,param5,param6,param7,param8,param9,param10){
   var cod=param1;
   var can=param2;
   var preciou=param3;
   var descripcion=param4;
   var serie=$("#ncaja").val();
   var yapuso=param5;
   var monto=param6;
   var total=param7;
   var pago=param8;
   var cambio=param9;
   var nn=param10;
   $.ajax({
        beforeSend: function(){
          },
        url: 'impresion_tickets.php',
        type: 'POST',
        data: 'codigo='+cod+'&cantidad='+can+'&preciou='+preciou+'&descripcion='+descripcion+'&serie='+serie+'&yapuso='+yapuso+'&monto='+monto+'&total='+total+'&supago='+pago+'&cambio='+cambio+'&numero_ticket='+nn,
        success: function(x){
         //alert(x);
         },
        error: function(jqXHR,estado,error){
        }
       });
}
/************************************************************************************/
/***************************************************************************************/
function busqueda_art(){
   $("#modal_busqueda_arts").modal({
             show:true,
             backdrop: 'static',
             keyboard: false
            });
   $('#modal_busqueda_arts').on('shown.bs.modal', function () {
   $("#lista_articulos").html("");
   $("#articulo_buscar").val("");
   $("#articulo_buscar").focus();
   });
}
/*****************************************************************************/
function busca(){
    $.ajax({
        beforeSend: function(){
          $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
          },
        url: 'busca_articulos_ayuda.php',
        type: 'POST',
        data: 'articulo='+$("#articulo_buscar").val(),
        success: function(x){
         $("#lista_articulos").html(x);
         },
        error: function(jqXHR,estado,error){
          $("#lista_articulos").html("Error en la peticion AJAX..."+estado+"      "+error);
        }
       });
}
/*****************************************************************************/
function add_art(art){
  //alert(art);
  $("#modal_busqueda_arts").modal("toggle");
  $("#codigo").val(art.trim());
  busca_articulo();
}
/*********************************************************************************/
