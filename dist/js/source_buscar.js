function busqueda(){

  var texto = document.getElementById("buscador").value;

  var parametros = {
    "texto" : texto
  };

  $.ajax({
    data: parametros,
    url: 'buscar_trabajadores.php',
    type:"POST",
    success: function(response){
      $("#trabajadores_registrados").html(response);
    }


  });

}
