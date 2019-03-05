/******************************************************************************************/
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
/******************************************************************************************/
function pone_opcion(){
   $(document).ready(function(){
        $.ajax({
                             beforeSend: function(){
                              },
                             url: 'pone_opcion_repo_venta.php',
                             type: 'POST',
                             data: null,
                             success: function(x){
                              $("#opcion").html(x);
                              $(".select2").select2();
                              },
                             error: function(jqXHR,estado,error){
                               $("#opcion").html('Error... '+estado+'  '+error);
                              }
                             });
   })
}
/*******************************************************************************************/
function activa_boton(){
  $(document).ready(function(){
    if($("#numero_caja").val()!=""){
      $("#btn-sig").prop("disabled", false);
    }else{
      $("#btn-sig").prop("disabled", true);
      $("#btn-listo").prop("disabled", true);
    }
  })
}
/*******************************************************************************************/
function revisa(){
   var cual=$('input[name=r1]:checked').attr('id');
   if(cual=='por_linea'){
     $("#linea").attr("disabled", false);
   }else{
     $("#linea").attr("disabled", true);
     $("#grupo").attr("disabled", true);
   }
}
/*****************************************************************************************/
function pone_grupos(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#pone_grupos").html("Recuperando lista de grupos...");
           },
          url: 'pone_grupos.php',
          type: 'POST',
          data: 'linea='+$("#linea").val(),
          success: function(x){
            $("#pone_grupos").html(x);

            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
/***************************************************************************************/
function trae_venta(){
  $(document).ready(function(){
    if($("#fi").val()==""){
      alert("Indica un rango de fechas valido...");
      $("#daterange-btn").focus();
    } else{
    var caja=$("#numero_caja").val();
    var cual=$('input[name=r1]:checked').attr('id');
    if(cual=='por_linea'){
      var data_enviar='fechai='+$("#fi").val()+'&fechaf='+$("#ff").val()+'&caja='+caja+'&tipo='+cual+'&linea='+$("#linea").val()+'&grupo='+$("#grupo").val();
     }else{
      var data_enviar='fechai='+$("#fi").val()+'&fechaf='+$("#ff").val()+'&caja='+caja+'&tipo='+cual;
    }

    $.ajax({
          beforeSend: function(){
            $("#data").html("Buscando ventas, un momento...");
           },
          url: 'busca_ventas_reporte.php',
          type: 'POST',
          data: data_enviar,
          success: function(datares){
             $("#data").html(datares);

           },
           error: function(jqXHR,estado,error){
             $("#data").html(error+"    "+estado);
           }
           });
           setTimeout('sumatorias()', 1000);
           }
  })
}
/****************************************************************************************/
function sumatorias(){
  $(document).ready(function(){
    var detalle=0.00;
    var detalle_cancelado=0.00;
    var total_credito=0.00;
    var venta_neta=0.00;
    var detalle_contado=0.00;
    var detalle_cancelado_contado=0.00;
    var total_contado=0.00;
    var total_gastos=0.00;
    var total_abonos=0.00;
    $('#tabla_ventas_credito > tbody > tr').each(function(){
                var monto = $(this).find('td').eq(2).html();
                var status = $(this).find('td').eq(3).html();
                monto=monto.replace(",","");
                monto=parseFloat(monto);
                total_credito+=monto;
             if(status=="CANCELADO"){
               detalle_cancelado+=monto;
               }
             if(status=="ACTIVA"){
               detalle+=monto
             }
         $("#total_credito").html("");
         $("#total_credito").html("<span class='label label-success'>Total: $ "+total_credito.toFixed(2)+"</span> | <span class='label label-success'>Cancelaciones: $ "+detalle_cancelado.toFixed(2)+"</span> | <span class='label label-danger'>Venta Neta: $ "+detalle.toFixed(2)+"</span>");
        });
       /*tabla de contado*/

        $('#tabla_ventas_contado > tbody > tr').each(function(){
                var monto = $(this).find('td').eq(2).html();
                var status = $(this).find('td').eq(3).html();
                monto=monto.replace(",","");
                monto=parseFloat(monto);
                total_contado+=monto;
             if(status=="CANCELADO"){
               detalle_cancelado_contado+=monto;
               }
             if(status=="ACTIVA"){
               detalle_contado+=monto
             }
         $("#total_contado").html("");
         $("#total_contado").html("<span class='label label-success'>Total: $ "+total_contado.toFixed(2)+"</span> | <span class='label label-success'>Cancelaciones: $ "+detalle_cancelado_contado.toFixed(2)+"</span> | <span class='label label-danger'>Venta Neta: $ "+detalle_contado.toFixed(2)+"</span>");
        });

        /*tabla de gastos*/
         $('#tabla_de_gastos > tbody > tr').each(function(){
                var monto = $(this).find('td').eq(5).html();
                monto=monto.replace(",","");
                monto=parseFloat(monto);
                total_gastos+=monto;
         $("#total_de_los_gastos").html("");
         $("#total_de_los_gastos").html("<span class='label label-success'>Total: $ "+total_gastos.toFixed(2)+"</span>");
        });


        /*tabla de abonos*/
         $('#tabla_de_abonos > tbody > tr').each(function(){
                var monto = $(this).find('td').eq(3).html();
                monto=monto.replace(",","");
                monto=parseFloat(monto);
                total_abonos+=monto;
         $("#total_de_los_abonos").html("");
         $("#total_de_los_abonos").html("<span class='label label-success'>Total: $ "+total_abonos.toFixed(2)+"</span>");
        });
        var venta_neta=detalle_contado+detalle;

       $("#global").html("<div class='callout callout-success'><h3>Venta: $"+venta_neta.toFixed(2)+"<br>"+
       "Cancelaciones: $"+(detalle_cancelado_contado+detalle_cancelado)+"<br>"+
       "Abonos de Clientes: $"+total_abonos+"<br>"+
       "Gastos: $"+total_gastos+"<br>"+
       "Total en Caja: $"+((total_contado+total_abonos-total_gastos).toFixed(2))+"<h3></div>");
     })
}
/*********************************************************************************************/
function print1(){
   $(".print1").printArea();
}
/****************************************************/
function print2(){
   $(".print2").printArea();
}
/*************************************************************************/
function pone_lineas(){
        $( document ).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#pone_lineas").html("Recuperando lista de lineas...");
           },
          url: 'pone_lineas.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#pone_lineas").html(x);
            $("#linea").append("<option value='GENERAL' selected>GENERAL</option>");
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
/*******************************************************************************/
 function trae_existencia(){
    $( document ).ready(function(){
         var cual=$('input[name=r1]:checked').attr('id');
        if(cual==undefined){
          alert("Selecciona una opcion de como quieres obtener la existencia...");
          return false;
        }
        if($("#fecha").val()!=""){
        if(cual=='general'){
          var parametros='fecha='+$("#fecha").val()+'&tipo='+'general';
         }
        if(cual=='por_linea'){
          if($("#linea").val()=='0'){
            alert("Selecciona una linea de la lista...");
            return false;
          } else{
          var parametros='fecha='+$("#fecha").val()+'&linea='+$("#linea").val()+'&grupo='+$("#grupo").val()+'&tipo='+'por_linea';
          }
         }

          $.ajax({
          beforeSend: function(){
            $("#existencias").html("Buscando existencias, un momento... <img src=''/>");
           },
          url: 'consulta_existencia.php',
          type: 'POST',
          data: parametros,
          success: function(ladata){
             $("#existencias").html(ladata);
             $(document).ready(function (){
               sumatorias_general();
             })
           },
           error: function(jqXHR,estado,error){
             $("#existencias").html("<div class='callout callout-danger'>Ocurrio un error...Reporta a soporte.... "+estado+"       "+error+"</div>");
           }
           });
           }else{
             alert("Ingresa una fecha valida...");
           }
          });
 }
/***********************************************************************************/
function pone_opcion_existe(){
   $(document).ready(function(){
        $.ajax({
                             beforeSend: function(){
                              },
                             url: 'pone_opcion_existencias.php',
                             type: 'POST',
                             data: null,
                             success: function(x){
                              $("#opcion").html(x);
                              $(".select2").select2();

                              },
                             error: function(jqXHR,estado,error){
                               $("#opcion").html('Error... '+estado+'  '+error);
                              }
                             });
   })
}
/********************************************************************************/
function detalla_por_linea(id){
  var data = id.split("|");
  var f=data[2];
  var l=data[0];
  var g=data[1];
   $(document).ready(function(){
     $("#modal_tabla_detalle_existe").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
              $.ajax({
                             beforeSend: function(){
                               $("#detalle_exis").html("Buscando existencias, un momento...");
                              },
                             url: 'busca_existencias_detalle.php',
                             type: 'POST',
                             data: 'fecha='+f+'&linea='+l+'&grupo='+g,
                             success: function(x){
                               $("#detalle_exis").html(x);
                              },
                             error: function(jqXHR,estado,error){
                               $("#detalle_exis").html(estado+"   "+error);
                              }
                             });
   })
}
/*********************************************************************************/
function print_detalle_existe(){
   $(".printing").printArea();
}
/******************************************************************************/
function sumatorias_general(){
  $(document).ready(function(){
    if($('input[name=r1]:checked').attr('id')=='por_linea'){
       var f=$("#linea option:selected").html();
       var l=$("#grupo option:selected").html();
       var leyenda="Linea: "+f+" | Grupo: "+l;
    }else{
      var leyenda='GENERAL';
    }

    var total_monto=0.00;
    var total_ar=0.00;
    $('#tabla_inventarios > tbody > tr').each(function(){
                mt = $(this).find('td').eq(3).html();
                mt=mt.replace(",","");
                mt=parseFloat(mt);
                total_monto+=mt;
                ar=$(this).find('td').eq(2).html();
                ar=ar.replace(",","");
                ar=parseFloat(ar);
                total_ar+=ar;
         $(".aqui").html("");
         $(".aqui").html("<h4>Existencias a la Fecha: "+$("#fecha").val()+" | "+leyenda+" | <span class='label label-primary'>Total de articulos: "+total_ar.toFixed(2)+"</span> | <span class='label label-primary'>Costo Total: $ "+total_monto.toFixed(2)+"</label></h4><button type='button' class='btn btn-warning btn-xs pull-right no-print' onclick='print_existe_todo();'><i class='fa fa-print'></i> Imprimir</button>");
        });
     })
}
/**************************************************************************************/
function print_existe_todo(){
   $(".print4").printArea();
}
/*************************************************************************************/
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
/**********************************************************************/
function pone_opcion2(){
   $(document).ready(function(){
        $.ajax({
                             beforeSend: function(){
                              },
                             url: 'pone_opcion_repo_venta2.php',
                             type: 'POST',
                             data: null,
                             success: function(x){
                              $("#opcion").html(x);
                              $(".select2").select2();
                              },
                             error: function(jqXHR,estado,error){
                               $("#opcion").html('Error... '+estado+'  '+error);
                              }
                             });
   })
}
/*********************************************************************************/
function trae_venta2(){
  $(document).ready(function(){
    if($("#fi").val()==""){
      alert("Indica un rango de fechas valido...");
      $("#daterange-btn").focus();
    } else{
    var caja=$("#numero_caja").val();
    var cual=$('input[name=r1]:checked').attr('id');
    if(cual=='por_linea'){
      var data_enviar='fechai='+$("#fi").val()+'&fechaf='+$("#ff").val()+'&caja='+caja+'&tipo='+cual+'&linea='+$("#linea").val()+'&grupo='+$("#grupo").val();
     }else{
      var data_enviar='fechai='+$("#fi").val()+'&fechaf='+$("#ff").val()+'&caja='+caja+'&tipo='+cual;
    }
    if(cual=='por_linea'){
      if($("#linea").val()=='0'){
        alert("Selecciona una linea valida...");
        return false;
      }
    }
    $.ajax({
          beforeSend: function(){
            $("#data").html("Buscando ventas, un momento...");
           },
          url: 'busca_ventas_reporte2.php',
          type: 'POST',
          data: data_enviar,
          success: function(datares){
             $("#data").html(datares);
             if(cual=='por_linea'){
               suma_por_lineas();
             }
             if(cual=='general'){
               suma_general();
             }
           },
           error: function(jqXHR,estado,error){
             $("#data").html(error+"    "+estado);
           }
           });
           setTimeout('sumatorias()', 1000);
           }
  })
}
/***********************************************************************************/
function suma_por_lineas(){
   $(document).ready(function(){
    var total_monto=0.00;
    var total_ar=0.00;
    var total_costos=0.00;
    if($("#numero_caja").val()=='0'){
      var msj=" | No de Caja: Todas";
    }else{
      var msj=" | No de Caja: "+$("#numero_caja").val();
    }
    $('#ventas_lineas > tbody > tr').each(function(){
                tip=$(this).find('td').eq(6).html();
                mt = $(this).find('td').eq(5).html();
                mt=mt.replace(",","");
                mt=parseFloat(mt);

                ar=$(this).find('td').eq(2).html();
                ar=ar.replace(",","");
                ar=parseFloat(ar);

                cs=$(this).find('td').eq(3).html();
                cs=cs.replace(",","");
                cs=parseFloat(cs);

             if(tip=='CREDITO' || tip=='CONTADO'){
                total_monto+=mt;
                total_ar+=ar;
                total_costos+=(cs * ar);
                }else{
                total_monto-=mt;
                total_ar-=ar;
                total_costos-=(cs * ar);
                }
         $(".aqui").html("");
         $(".aqui").html("<h5>Ventas registradas del: "+$("#fi").val()+" al "+$("#ff").val()+msj+" | <b>Total de Articulos: "+total_ar.toFixed(2)+"</b>"+" | <b>Total Costo : "+total_costos.toFixed(2)+"</b>"+" | <b>Total Monto : "+total_monto.toFixed(2)+"</b><br></h5><button type='button' class='btn btn-warning btn-xs pull-right no-print' onclick='print5();'><i class='fa fa-print'></i> Imprimir</button>");
        });
     })
}
/*****************************************************************************************/
function print5(){
   $(".print5").printArea();
}
/*************************************************************************************/
function detalla_por_linea2(id){
  var data = id.split("|");
  var fi=data[1];
  var ff=data[2];
  var l=data[0];
  var c=data[3];
   $(document).ready(function(){
     $("#modal_detalle_venta").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
              $.ajax({
                             beforeSend: function(){
                               $("#detalle_de_venta").html("Buscando las ventas, un momento...");
                              },
                             url: 'busca_ventas_detalle.php',
                             type: 'POST',
                             data: 'fechai='+fi+'&fechaf='+ff+'&linea='+l+'&caja='+c,
                             success: function(x){
                               $("#detalle_de_venta").html(x);
                              },
                             error: function(jqXHR,estado,error){
                               $("#detalle_de_venta").html(estado+"   "+error);
                              }
                             });
   })
}
/***************************************************************************************/
function suma_general(){
   $(document).ready(function(){
    var total_monto=0.00;
    var total_ar=0.00;
    var total_costos=0.00;
    if($("#numero_caja").val()=='0'){
      var msj=" | No de Caja: Todas";
    }else{
      var msj=" | No de Caja: "+$("#numero_caja").val();
    }
    $('#ventas_lineas_yy > tbody > tr').each(function(){
                mt = $(this).find('td').eq(3).html();
                mt=mt.replace(",","");
                mt=parseFloat(mt);

                ar=$(this).find('td').eq(1).html();
                ar=ar.replace(",","");
                ar=parseFloat(ar);

                cs=$(this).find('td').eq(2).html();
                cs=cs.replace(",","");
                cs=parseFloat(cs);

                total_monto+=mt;
                total_ar+=ar;
                total_costos+=cs;

         $(".aqui").html("");
         $(".aqui").html("<h5>Ventas registradas del: "+$("#fi").val()+" al "+$("#ff").val()+msj+" | <b>Total de Articulos: "+total_ar.toFixed(2)+"</b>"+" | <b>Total Costo : "+total_costos.toFixed(2)+"</b>"+" | <b>Total Monto : "+total_monto.toFixed(2)+"</b><br></h5><button type='button' class='btn btn-warning btn-xs pull-right no-print' onclick='print6();'><i class='fa fa-print'></i> Imprimir</button>");
        });
     })
}
/*****************************************************************************/
function print6(){
   $(".print6").printArea();
}
/*******************************************************************************/
function busca_gastos(){
  $(document).ready(function (){
    if($("#fi").val()!=""||$("#ff").val()!=""){
       $.ajax({
            beforeSend: function(){
             $("#data").html("Buscando los gastos, un momento...");
             },
            url: 'busca_los_gastos.php',
            type: 'POST',
            data: 'fechai='+$("#fi").val()+'&fechaf='+$("#ff").val(),
            success: function(x){
               $("#data").html(x);
               suma_gastos();
              },
            error: function(jqXHR,estado,error){
               $("#data").html(estado+"   "+error);
              }
          });
     }else{
      alert("Ingresa las fechas de busqueda..");
    }
  })
}
/*****************************************************************************/
function suma_gastos(){
   $(document).ready(function(){
    var gasto=0.00;
    var total_gasto=0.00;
    $('#gastos_registrados > tbody > tr').each(function(){
                gasto = $(this).find('td').eq(4).html();
                etiqueta=$(this).find('td').eq(5).html();
                gasto=gasto.replace(",","");
                gasto=parseFloat(gasto);
                if(etiqueta=='ACTIVO'){
                total_gasto+=gasto;
                }

         $(".aqui").html("");
         $(".aqui").html("<h4>Gastos registrados del: "+$("#fi").val()+" al "+$("#ff").val()+" | <span class='label label-warning'>Total de Gastos: "+total_gasto.toFixed(2)+"</span> | <button class='btn btn-primary no-print' onclick='print_gastos();'><i class='fa fa-print'></i> Imprimir</button></h4>");
        });
     })
}
/*********************************************************************************/
function print_gastos(){
  $(".print7").printArea();
}
/************************************************************************************/
function delete_gasto(g){
  var n = noty({
                  text: "Seguro de cancelar el gasto...?",
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
            url: 'cancela_gasto.php',
            type: 'POST',
            data: 'idgasto='+g,
            success: function(x){
              alert("Se cancelo el gasto...");
              busca_gastos();
              },
            error: function(jqXHR,estado,error){
               $("#data").html(estado+"   "+error);
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
}
/************************************************************************/
function detalla_gasto(num_){
   $("#modal_detalle_gasto").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
                       $.ajax({
                          beforeSend: function(){
                            $("#detalle_de_gasto").html("Consultando detalle...");
                          },
                          url: 'consulta_detalle_gasto.php',
                          type: 'POST',
                          data: 'id_gasto='+num_,
                          success: function(x){
                            $("#detalle_de_gasto").html(x);
                           },
                          error: function(jqXHR,estado,error){
                            $("#detalle_de_gasto").html('Hubo un error: '+estado+' '+error);
                          }
                       });
  }
/*****************************************************************************/
  function print_gastos_corte(){
  $(".print8").printArea();
}
/*******************************************************************************/
  function print_abonos_corte(){
  $(".print9").printArea();
}
/**********************************************************************************/