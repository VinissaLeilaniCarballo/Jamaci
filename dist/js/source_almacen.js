/***************************************************************************/
function lista_proveedores(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#pone_provs").html("Recuperando proveedores...");
           },
          url: 'pone_provs_entrada.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#pone_provs").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
/***************************************************************************/
function busca_articulo(){
          if($("#codigo").val()!=""){
         $(document).ready(function(){
          $.ajax({
          beforeSend: function(){
            $("#descripcion").html("Buscando informacion del articulo...");
           },
          url: 'busca_data_articulo_almacen.php',
          type: 'POST',
          dataType: 'json',
          data: 'codigo='+$("#codigo").val(),
          success: function(x){
            if(x=='0'){
            alert("El codigo del articulo, no existe...");
            $("#codigo").val("");
            $('#codigo').focus();
            }else{
             $("#descripcion").val(x.descripcion);
             $("#costo").val(x.costo);
             $("#costo").attr("disabled", false);
             $("#cantidad").val("");
             $("#cantidad").attr("disabled", false);
             $("#btn-add-article").attr("disabled", false);
             $("#btn-cancel-article").attr("disabled", false);
             $("#costo").select();
             $("#costo").focus();
             }
           },
           error: function(jqXHR,estado,error){
             $("#data_articulo").html('Hubo un error: '+estado+' '+error);
           }
           });
          });
          }else{
          }
         }
/****************************************************************************/
function cancela_add(){
   $("#descripcion").val("");
   $("#costo").val("");
   $("#cantidad").val("");
   $("#costo").attr('disabled', true);
   $("#cantidad").attr('disabled', true);
   $("#btn-add-article").attr('disabled', true);
   $("#btn-cancel-article").attr('disabled', true);
   $("#codigo").val("");
   $('#codigo').focus();
}
/********************************************************************************/
function agrega_a_lista(){
            var articulo=$("#codigo").val();
            var descripcion=$("#descripcion").val();
            var costou=$("#costo").val();
            var cantidad=$("#cantidad").val();
            var monto=cantidad*costou;
            var descuento=monto*$("#descuento").val()/100;
            $("#tabla_articulos > tbody").append("<tr><td>"+articulo+"</td><td>"+descripcion+"</td><td>"+cantidad+"</td><td>"+costou+"</td><td>"+monto.toFixed(2)+"</td><td>"+descuento.toFixed(2)+"</td><td><button id='"+articulo+"' class='btn btn-danger btn-xs elimina_articulo' onclick='actualiza_entrada_temp(this.id);'><i class='fa fa-times'></i></button></td></tr>");
            /*graba la entrada temporalmente*/
             $.ajax({
          beforeSend: function(){
           },
          url: 'save_temp_entrada.php',
          type: 'POST',
          data: "proveedor="+$("#proveedor").val()+"&fecha="+$("#fecha").val()+"&num_fact="+$("#factura").val()+
          "&impuesto="+$("#impuesto").val()+"&descuento="+$("#descuento").val()+"&articulo="+articulo+
          "&costo="+$("#costo").val()+"&cantidad="+$("#cantidad").val()+"&tipo="+"EC"+
          "&descripcion_articulo="+descripcion+"&descripcion_prov="+$("#proveedor option:selected").html(),
          success: function(z){
             if(z=="0"){
               alert("No fue posible guardar el registro temporalmente, por favor consulte a soporte de inmediato...");
             }
           },
           error: function(jqXHR,estado,error){
           }
           });
          /*******************************************/

            $("#codigo").val("");
            resumen();
            cancela_add();
            $("#codigo").select();
         }
/***********************************************************************************/
$(function(){
         // Evento que selecciona la fila y la elimina
	      $(document).on("click",".elimina_articulo",function(){
	     	var parent = $(this).parents().parents().get(0);
		  $(parent).remove();
          resumen();
       	});
       });
/***********************************************************************************/
function resumen(){
            var totales=0.00;
            var de=0.00;
            var t=0.00;
            var ar=0.00;
            $('#tabla_articulos > tbody > tr').each(function(){
            var montoss = parseFloat($(this).find("td").eq(4).html());
            var descs=    parseFloat($(this).find('td').eq(5).html());
            ar +=parseFloat($(this).find('td').eq(2).html());
            totales = totales+montoss;
            de = de+descs;
            t=t+(montoss-descs);
            });
            $("#net").val("$ "+totales.toFixed(2));
            $("#des").val("$ "+de.toFixed(2));
            var im=$("#impuesto").val();
            var impuesto_moneda=t*(im/100);
            $("#tot").val("$ "+(t+impuesto_moneda).toFixed(2));
            $("#arts").val(ar.toFixed(2));
            if(totales>0){
              $("#btn-procesa").prop('disabled', false);
              $("#btn-cancela").prop('disabled', false);
            }else{
              $("#btn-procesa").prop('disabled', true);
              $("#btn-cancela").prop('disabled', true);
            }
          }
/*************************************************************************************/
function revisa_entrada_ini(){
  $(document).ready(function(){
      $.ajax({
          beforeSend: function(){
           },
          url: 'search_temp_entrada.php',
          type: 'POST',
          dataType: 'json',
          data: null,
          success: function(result){
             if(result!="0"){
               var prov_id='';
               var impuesto_id='';
              $.each(result, function(i, item){
                prov_id=result[i].proveedor;
                impuesto_id=result[i].impuesto_porcentaje;
                var costot=(result[i].cantidad * result[i].costo).toFixed(2);
                var descuentot=(costot * result[i].desc_porcentaje/100).toFixed(2);
                //alert(result[i].articulo);
                $("#fecha").val(result[i].fecha);
                $("#factura").val(result[i].num_fact_nota);
                $("#descuento").val(result[i].desc_porcentaje);
                $("#tabla_articulos > tbody").append("<tr><td>"+result[i].articulo+"</td><td>"+result[i].descripcion_articulo+"</td><td>"+result[i].cantidad+"</td><td>"+result[i].costo+"</td>"+
                "<td>"+costot+"</td><td>"+descuentot+"</td><td><button id='"+result[i].articulo+"' onclick='actualiza_entrada_temp(this.id);' class='btn btn-danger btn-xs elimina_articulo'><i class='fa fa-times'></i></button></td></tr>");
              })
              //alert(impuesto_id);
              //$("#proveedor").prepend("<option value='"+prov_id+"' selected>"+prov_desc+"</option>");
              //$('#proveedor option[value="'+prov_id+'"]').attr("selected", "selected");
              //$(".js-programmatic-set-val").on("click", function (){ $proveedor.val(prov_id).trigger("change"); });
              $("#proveedor").select2('val', prov_id);
              $("#impuesto").select2('val', parseInt(impuesto_id));
               resumen();
               alert("Se encontro una Entrada X Compra pendiente, si no deseas que vuelva a aparecer, elimina la entrada...");
             }
           },
           error: function(jqXHR,estado,error){
           }
           });
        })
   }
/****************************************************************************************/
function actualiza_prov_temp(){
     $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_prov_entrada.php',
          type: 'POST',
          data: 'id_prov='+$("#proveedor").val()+"&nombre_prov="+$("#proveedor option:selected").html(),
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/*******************************************************************************************/
function actualiza_fecha_temp(){
     $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_fecha_entrada.php',
          type: 'POST',
          data: 'fecha='+$("#fecha").val(),
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/*********************************************************************************/
function actualiza_num_fac_entrada_temp(){
     $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_factura_entrada.php',
          type: 'POST',
          data: 'num_fact='+$("#factura").val(),
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/*********************************************************************************/
function actualiza_impuesto_temp(){
     $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_impuesto_entrada.php',
          type: 'POST',
          data: 'impuesto='+$("#impuesto").val(),
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/************************************************************************************/
function actualiza_descuento_temp(){
     $(document).ready(function(){
       //alert($("#descuento").val());
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_descuento_entrada.php',
          type: 'POST',
          data: 'descuento='+$("#descuento").val(),
          success: function(t){
            if(t=="0"){
              alert("No se pudo actualizar el descuento en los registros temporales de la entrada... Consulte a Soporte!!!");
            }
           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/*****************************************************************************************/
function actualiza_entrada_temp(codigo){
   //alert(codigo);
   var art=codigo;
   $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'update_articulos_en_tempentrada.php',
          type: 'POST',
          data: 'articulo='+art,
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
           });
       })
}
/**************************************************************************************/
function cancela_entrada_all(){
   $(document).ready(function(){
         $.ajax({
          beforeSend: function(){
           },
          url: 'cancela_tempentrada.php',
          type: 'POST',
          data: null,
          success: function(t){

           },
           error: function(jqXHR,estado,error){
           }
          });
       })
    $("#tabla_articulos > tbody:last").children().remove();
     cancela_add();
     resumen();
     //alert("Se cancelo el proceso de Entrada X Compra....");
    $("#fecha").val("");
    $("#factura").val("");
    $("#impuesto").select2('val', 0);
    $("#proveedor").focus();
}
/**************************************************************************************/
function procesa_entrada(){
  //alert($("#descuento").val());
          if($("#proveedor").val()==""||$("#fecha").val()==""||$("#factura").val()==""){
            window.alert("Los campos Proveedor, Fecha, #Factura no pueden estar vacios...");
            return false;
          }
          $("#btn-procesa").prop('disabled', true);
           var n = noty({
                  text: "Deseas procesar la entrada...?",
                  theme: 'relax',
                  layout: 'center',
                  type: 'information',
                  modal: 'true',
                  buttons     : [
                    {addClass: 'btn btn-primary',
                     text    : 'Si',
                     onClick : function ($noty){
                          $noty.close();
                          $('#tabla_articulos > tbody > tr').each(function(){
                             var cod = $(this).find('td').eq(0).html();
                             var can = $(this).find('td').eq(2).html();
                             var cu  = $(this).find('td').eq(3).html();
                             $.ajax({
                             beforeSend: function(){
                              },
                             url: 'procesa_entrada.php',
                             type: 'POST',
                             data: 'codigo='+cod+'&cantidad='+can+'&fecha='+$("#fecha").val()+'&costou='+cu+
                             '&proveedor='+$("#proveedor").val()+'&descuento='+$("#descuento").val()+
                             '&tasa_iva='+$("#impuesto").val()+'&num_entrada='+$("#num_entrada2").val()+
                             '&num_fact='+$("#factura").val(),
                             success: function(x){
                                if(x=="0"){
                                   var n = noty({
                                   text: "Hubo un error al procesar el articulo: "+cod+'. Consulte a soporte inmediatamente...!',
                                   theme: 'relax',
                                   layout: 'topLeft',
                                   type: 'success',
                                  })
                                  }else{

                                   var n = noty({
                                   text: "Se proceso el articulo: "+cod,
                                   theme: 'relax',
                                   layout: 'topLeft',
                                   type: 'success',
                                   timeout: 4000,
                                  })
                                  }
                              },
                             error: function(jqXHR,estado,error){
                              }
                             });
                           });
                             $.ajax({
                             beforeSend: function(){
                              },
                             url: 'update_entrada.php',
                             type: 'POST',
                             data: null,
                             success: function(x){
                               $("#fecha").val("");
                               $("#factura").val("");
                               $("#descuento").val('0.00');
                               $("#btn-procesa").prop('disabled', true);
                               $("#tabla_articulos > tbody:last").children().remove();
                               cancela_add();
                               resumen();
                               pone_num_entrada();
                              },
                             error: function(jqXHR,estado,error){
                               $("#btn-procesa").html("Ocurrio un error al actualizar el numero de entrada...!!    "+estado+"   "+error);
                               $("#btn-add-article").html("Ocurrio un error al actualizar el numero de entrada...!!    "+estado+"   "+error);
                              }
                             });
                            cancela_entrada_all();
                          }

                   },
                   {addClass: 'btn btn-danger',
                    text    : 'No',
                    onClick : function ($noty){
                       $("#btn-procesa").prop('disabled', false);
                       $noty.close();
                    }
                    }
                  ]
              });
         }
/********************************************************************************************/
function pone_num_entrada(){
             $(document).ready(function(){
              $.ajax({
               beforeSend: function(){
               $("#num_entrada").html("Buscando prox. entrada...");
               },
             url: 'busca_num_entrada.php',
             type: 'POST',
             data: null,
             success: function(x){
             $("#num_entrada").html('Entrada # '+x);
             $("#num_entrada2").val(x);
             },
             error: function(jqXHR,estado,error){
             $("#num_entrada").html('Hubo un error!!!'+' '+estado +' '+error);
             }
            });
            });
           }
/*******************************************************************************************/