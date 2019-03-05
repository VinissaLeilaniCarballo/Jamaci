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
function busca_entradas(){
       var fecha=$("#fi").val();
       var fechaf=$("#ff").val();
       if(fecha!=""||fechaf!=""){
           $.ajax({
               beforeSend: function(){
               $("#tabla_entradas").html("Buscando entradas por compra, un momento...");
               },
               url: 'busca_entradas_compra.php',
               type: 'POST',
               data: 'fechai='+fecha+'&fechaf='+fechaf,
               success: function(x){
                $("#tabla_entradas").html(x);
                $('#tabla').DataTable();
               },
              error: function(jqXHR,estado,error){
               $("#tabla_entradas").html('Hubo un error!!!Reporte a soporte...'+'     '+estado +' '+error);
              }
            });
        }else{
          alert("Proporcione un rango de fechas valido, para realizar la busqueda...");
        }
      }
/*********************************************************************************************/
function detalla_entrada(elid){
        $("#modal_tabla_clientes").modal({
                      show:true,
                      backdrop: 'static',
                      keyboard: false
                    });
          var numero_entrada=elid;
           $.ajax({
               beforeSend: function(){
               $("#detalle_entrada").html("Buscando el detalle de la entrada por compra, un momento...");
               },
               url: 'busca_entradas_compra_detalle.php',
               type: 'POST',
               data: 'entrada='+numero_entrada,
               success: function(x){
                $("#detalle_entrada").html(x);
               },
              error: function(jqXHR,estado,error){
               $("#detalle_entrada").html('Hubo un error!!!Reporte a soporte...'+'     '+estado +' '+error);
              }
            });
      }
/*********************************************************************************************/
function print_entrada(){
   $(".print1").printArea();
}