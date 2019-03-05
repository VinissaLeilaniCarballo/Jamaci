function revisa_compras(){
   $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_compras").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_compras_ini.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_compras").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_compras").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
              }
            });
   })
}
/****************************************************/
function revisa_ventas(){
 $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_ventas").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_ventas_ini.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_ventas").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_ventas").html("Ocurrio un error al cargar la informacion de ventas..."+estado+"    "+error);
              }
            });
   })
}
/*********************************************************************************/
function pone_gastos(){
 $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_gastos").html("Cargando... <img src='dist/img/default.gif'></img>")
               },
               url: 'pone_gastos_ini.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_gastos").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_gastos").html("Ocurrio un error al cargar la informacion de gastos..."+estado+"    "+error);
              }
            });
   })
}
/**************************************************************************************/
function pone_users(){
 $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_users").html("Cargando... <img src='dist/img/default.gif'></img>")
               },
               url: 'pone_users_ini.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_users").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_users").html("Ocurrio un error al cargar la informacion de usuarios..."+estado+"    "+error);
              }
            });
   })
}
/*************************************************************************************/
function genera_grafica(){
 $(document).ready(function(){
     $.getJSON("genera_array_grafica.php", function(json){

          var donut = new Morris.Donut({
    element: 'line-chart-ventas',
    resize: true,
    colors: ["#3c8dbc", "#f56954", "#00a65a"],
    data: json,
    hideHover: 'auto'
  });
             });

       });
   }
/*****************************************************************************/
function genera_grafica_existe(){
 $(document).ready(function(){
     $.getJSON("genera_array_existencias.php", function(json){

          var donut = new Morris.Donut({
    element: 'line-chart-existe',
    resize: true,
    colors: ["#3c8dbc", "#f56954", "#00a65a"],
    data: json,
    hideHover: 'auto'
  });
             });

       });
   }
 /****************************************************************************/

function revisa_caducidades(){
  $(document).ready(function(){
      $.ajax({
          beforeSend: function(){
              $("#").html("Cargando... <img src='dist/img/default.gif'></img>")
          },
          url: 'analiza_cad_prods.php',
          type: 'POST',
          dataType: 'json',
          data: null,
          success: function(x){
              if (x.length > 0) {
                  $.each(x, function (y, item){
                      $(".arti_caducos").append("<li><a href='#'><i class='fa fa-barcode'></i>El producto "+x[y].codigo+" esta por caducar...!</a></li>");
                  });

                  $(".num_noti").html("");
                  $(".num_noti").html(x.length);
              }
          },
          error: function(jqXHR,estado,error){
          }
      });
  })
}
/******************************************************************************/
