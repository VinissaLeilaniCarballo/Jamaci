/*********************************************************************/
function valida_acceso(){
   $(document).ready(function(){
     $.ajax({
         beforeSend: function(){
           $("#btn-valida").html("Validando...");
          },
         url: 'valida_acceso.php',
         type: 'POST',
         data: "pass="+$("#pass").val()+"&opt="+$("#opcion").val(),
         success: function(res){
           if(res==1){
              document.location.href='aju_inventarios.php';
            }
           if(res==0){
              alert('La contrase\u00f1a no es correcta...');
              document.location.href='valida_cambio.php?opt=1265780909';
            }
            if(res==2){
              alert('La contrase\u00f1a no es correcta...');
              document.location.href='valida_cambio.php?opt=582963741';
            }
            if(res==3){
              document.location.href='util_backup.php';
            }
          },
         error: function(jqXHR,estado,error){
          }
        });
        })
}
/***********************************************************************/
function pulsar(e) {
            tecla = (document.all) ? e.keyCode : e.which;
            return (tecla != 13);
            }
/***********************************************************************/
function genera_opcion(){
     $(document).ready(function(){
       $.ajax({
         beforeSend: function(){
            $("#pone_opcion").html("Poniendo opciones...");
          },
         url: 'opciones_cancel_venta.php',
         type: 'POST',
         data: 'option='+$("#tipo_buscar").val(),
         success: function(res){
           $("#pone_opcion").html(res);
              $(function(){
               $('#daterange-btn').daterangepicker(
                   {
                 ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                 },
                startDate: moment().subtract(29, 'days'),
                endDate: moment()
              },
        function (start, end) {
          $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
          var xstart=start.format('YYYY-MM-DD');
          var xend=end.format('YYYY-MM-DD');
          $("#fi").val(xstart);
          $("#ff").val(xend);
          //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
         }
        );
       });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
          },
         error: function(jqXHR,estado,error){
           alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
           $("#pone_opcion").hmtl(estado+"     "+error);
          }
        });
     })
}
/*********************************************************************/
function busca_ventas(){
  $(document).ready(function(){
     if($("#fi").val()!=""||$("#ff").val()!=""){
     $.ajax({
         beforeSend: function(){
            $("#data").html("Buscando las ventas, un momento...");
          },
         url: 'busca_ventas_cancel.php',
         type: 'POST',
         data: 'fechai='+$("#fi").val()+'&fechaf='+$("#ff").val(),
         success: function(res){
           $("#data").html(res);
           $(document).ready(function() {
                $('#tabla_ventas').DataTable();
            });
          },
         error: function(jqXHR,estado,error){
           alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
           $("#data").hmtl(estado+"     "+error);
          }
        });
        }else{
      alert("Selecciona un rango de fechas para poder continuar...!");
  }
  })
}
/****************************************************************************/
function cancela_ticket(num_ticket){
   $(document).ready(function(){
    var ticket=num_ticket.split("|");
    var n = noty({
                  text: "Seguro que deseas cancelar la venta/ticket de Caja: "+ticket[0]+" "+"Numero: "+ticket[1],
                  theme: 'relax',
                  layout: 'center',
                  type: 'information',
                  modal: 'true',
                  buttons     : [
                    {addClass: 'btn btn-primary',
                     text    : 'Si',
                     onClick : function ($noty){
                          $noty.close();
                         $.ajax({
                            beforeSend: function(){
                            },
                            url: 'cancela_ticket.php',
                            type: 'POST',
                            data: 'serie='+ticket[0]+'&numero='+ticket[1],
                            success: function(res){
                            if(res!="0"){
                              alert("Se cancelo el ticket...!");
                              $("#data").empty();
                            }else{
                              alert("Ocurrio un error al intentar cancelar el ticket, es necesario que reportes a Soporte..!");
                             }
                            },
                           error: function(jqXHR,estado,error){
                            alert("Hubor un error al intentar cancelar la venta...por favor reporte a soporte...!");
                           $("#data").hmtl(estado+"     "+error);
                           }
                         });
                       }
                    },
                   {addClass: 'btn btn-danger',
                    text    : 'No',
                    onClick : function ($noty){
                        $noty.close();
                     }
                    }
                  ]
              });
 })
}
/*****************************************************************************/
function muestra_detalle(num_ticket){
   var tic=num_ticket.split("|");
   $("#modal_detalle_venta").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
                       $.ajax({
                          beforeSend: function(){
                            $("#detalle_de_venta").html("Consultando detalle...");
                          },
                          url: 'consulta_detalle_venta.php',
                          type: 'POST',
                          data: 'serie='+tic[0]+'&numero='+tic[1],
                          success: function(x){
                            $(".nuticket").html("");
                            $(".nuticket").append("Detalle de venta | <span class='label label-warning'>Ticket: "+tic[0]+" - "+tic[1]+"</span>");
                            $("#detalle_de_venta").html(x);
                           },
                          error: function(jqXHR,estado,error){
                            $("#detalle_de_venta").html('Hubo un error: '+estado+' '+error);
                          }
                       });
  }
  /**********************************************************************************/
  function busca_ventas_numero(){
  $(document).ready(function(){
    if($("#numero_ticket").val()!='0'){
      //alert($("#numero_ticket").val());
      $.ajax({
         beforeSend: function(){
            $("#data").html("Buscando detalle de venta, un momento...");
          },
         url: 'busca_ventas_cancel_numero.php',
         type: 'POST',
         data: 'serie_c='+$("#numero_caja").val()+'&numero_t='+$("#numero_ticket").val(),
         success: function(res){
            $("#data").html(res);
          },
         error: function(jqXHR,estado,error){
           alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
           $("#data").hmtl(estado+"     "+error);
          }
        });
        }else{
         alert("El numero de ticket, no puede ser cero...");
         $("#numero_ticket").focus();
        }
  })

}
/****************************************************************************************/
function limpia_divs(){
  $("#pone_opcion").empty();
  $("#data").empty();
}
/****************************************************************************************/
function alta_gasto(){
  $(document).ready(function(){
     if($("#fecha").val()!=""||$("#num_dock").val()!=""||$("#subtotal").val()!=""){
      $.ajax({
         beforeSend: function(){
            $("#btn-altas").attr('disabled', true);
            $("#btn-altas").html("Registrando...");
          },
         url: 'graba_gasto.php',
         type: 'POST',
         data: 'fecha='+$("#fecha").val()+'&numero_fact='+$("#num_dock").val()+'&proveedor='+$("#proveedor").val()+'&subtotal='+$("#subtotal").val()+'&iva='+$("#iva").val()+'&total='+$("#total").val()+'&concepto='+$("#concepto").val(),
         success: function(res){
           if(res=='error'){
             var n = noty({
                                   text: "No se registro el gasto, los campos SUBTOTAL, IVA, TOTAL no pueden ser inferiores a Cero...",
                                   theme: 'relax',
                                   layout: 'center',
                                   type: 'error',
                                   timeout: 2000,
                                  });
                                  $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
                                  $("#btn-altas").attr('disabled', false);
           } else{
           var n = noty({
                                   text: "Se registro el gasto correctamente...!",
                                   theme: 'relax',
                                   layout: 'center',
                                   type: 'information',
                                   timeout: 2000,
                                  });
            $("#btn-altas").attr('disabled', false);
            $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
            cancela_campos_gasto();
            }
          },
         error: function(jqXHR,estado,error){
           alert("Hubor un error al registrar el gasto...por favor reporte a soporte...!");
           $("#btn-altas").html(estado+"     "+error);
          }
        });
       }else{
         alert("Es necesario registrar los campos...");
       }
  })
}
/********************************************************************************/
function cancela_campos_gasto(){
    $("#fecha").val("");
    $("#num_dock").val("");
    $("#proveedor").val("");
    $("#concepto").val("");
    $("#subtotal").val("");
    $("#iva").val("");
    $("#total").val("");
}
/********************************************************************************/
function respalda(){
           $.ajax({
               beforeSend: function(){
               $("#btn-procede").prop("disabled", true)
               $("#respuesta").html("Respaldando base de datos... <img src='Imagenes/loader.gif'></img>");
               },
               url: 'crea_respaldo.php',
               type: 'POST',
               data: null,
               success: function(x){
                $("#respuesta").html(x);
               },
              error: function(jqXHR,estado,error){
               $("#respuesta").html('Hubo un error al generar el respaldo!!!Reporte a soporte...'+'     '+estado +' '+error);
              }
            });
    }
/************************************************************************************/