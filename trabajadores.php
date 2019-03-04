<?php
  session_start();

  unset($_SESSION['consulta']);

 ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Trabajadores</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php include "./includes/links.php"; ?>

</head>
<body>
  <nav class="navbar fixed-top flex-md-nowrap p-0 shadow header ">
<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="index.html"><img src="imagenes/logo.png" alt="" class="img-fluid logo"></a>
  <li class="dropdown"> <?php echo $_SESSION['nombre_de_usuario']; ?>
         <a class="dropbtn"data-toggle="dropdown" href="javascript:void(0)"><i class="fas fa-cog out"></i>
         <span class="caret out"></span></a>
         <ul class=" dropdown-content">
           <li><a href="usuarios.php"><i class="fas fa-user color"></i>   Agregar Usuario</a></li>
           <li><a href="includes/logout.php"><i class="fas fa-sign-out-alt color"></i> Cerrar Secion</a></li>
         </ul>
       </li>
</nav>

<div class="container-fluid">
<div class="row">
 <nav class="col-md-2 d-none d-md-block  sidebar">
   <div class="sidebar-sticky">
     <ul class="nav flex-column">
       <li class="nav-item">
         <a class="nav-link" href="inicio.php">
           <i class="fas fa-user color"></i>
           Clientes
         </a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="equipos.php">
           <i class="fas fa-pager color"></i>
           Equipos
         </a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="extractores.php">
           <i class="color fas fa-pager color"></i>
           Extractores
         </a>
       </li>
       <div class="panel-group">
   <div class="panel panel-default">
     <div class="panel-heading">
         <a data-toggle="collapse" href="#collapse1" class="nav-link"><i class="fas fa-tools color"></i> Insumos <i class="fas fa-sort-down down"></i></a>
     </div>
     <div id="collapse1" class="panel-collapse collapse">
       <ul class="list-group">
         <li class=""><a class="nav-link" href="insumos_ME.php">Material Eléctrico</a></li>
         <li class=""><a class="nav-link" href="insumos_MH.php">Material Hidraulico</a></li>
         <li class=""><a class="nav-link" href="insumos_T.php">Tornilleria</a></li>
         <li class=""><a class="nav-link" href="insumos_D.php">Ducterias</a></li>
         <li class=""><a class="nav-link" href="insumos_G.php">Gases</a></li>
         <li class=""><a class="nav-link" href="insumos_H.php">Herreria</a></li>
         <li class=""><a class="nav-link" href="insumos_M.php">Motores</a></li>
         <li class=""><a class="nav-link" href="insumos_S.php">Seguridad</a></li>
         <li class=""><a class="nav-link" href="insumos_Hrra.php">Herramienta</a></li>
         <li class=""><a class="nav-link" href="insumos_entrada.php"><i class="fas fa-plus color"></i> Entrada de Insumos</a></li>
       </ul>
     </div>
   </div>
 </div>
       <li class="nav-item">
         <a class="nav-link active"  href="trabajadores.php">
           <i class="fas fa-briefcase color"></i>
           Trabajadores
         </a>
       </li>
       <div class="panel-group">
   <div class="panel panel-default">
     <div class="panel-heading">
         <a data-toggle="collapse" href="#collapse2" class="nav-link"><i class="fas fa-shopping-basket color"></i>
         Ventas <i class="fas fa-sort-down down"></i></a>
     </div>
     <div id="collapse2" class="panel-collapse collapse">
       <ul class="list-group">
         <li class=""><a class="nav-link" href="#">Reporte de Ventas</a></li>
       </ul>
     </div>
   </div>
 </div>
       <li class="nav-item">
         <a class="nav-link" href="prestamos.php">
           <i class="fas fa-exchange-alt color"></i>
           Prestamos
         </a>
       </li>
     </ul>

   </div>
 </nav>

 <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
   <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
     <h1 class="h2">Trabajadores</h1>
     <a class="nav-link agregar" href="#" data-toggle="modal" data-target="#myModal"><i class="fas fa-briefcase color"></i></i> <i class="fas fa-plus color"></i>
       Agregar Trabajador
     </a>
     <div class="btn-toolbar mb-2 mb-md-0">
       <div class="btn-group mr-2" id="buscador">
       </div>
     </div>
   </div>

<div id="tabla"></div>

</main>
</div>
</div>


<!-- Modal Agregar  -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">

      <!-- Modal content-->
      <form  class="wpcf7-form">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body row">
          <div class="col-md-4 form-group">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre" name="">
        </div>
        <div class="col-md-4 form-group">
          <label for="apellido_p">Apellido Paterno</label>
          <input type="text" class="form-control" id="apellido_p" name="">
        </div>
        <div class="col-md-4 form-group">
          <label for="apellido_m">Apellido Materno</label>
          <input type="text" class="form-control" id="apellido_m" name="">
        </div>
        <div class="col-md-12 form-group">
          <label for="puesto">Puesto</label>
          <input type="text" class="form-control" id="puesto" name="">
        </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-dismiss="modal" id="guardarnuevo">
          <i class="fas fa-save color"></i>
          </button>
        </div>

      </div>
</form>
    </div>
  </div>

  <!-- Modal Editar  -->
    <div class="modal fade" id="modalEditar" role="dialog">
      <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <form  class="wpcf7-form">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body row">
            <input type="text" hidden="" id="idtrabajador" name="">
            <div class="col-md-4 form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombreu" name="">
          </div>
          <div class="col-md-4 form-group">
            <label for="apellido_p">Apellido Paterno</label>
            <input type="text" class="form-control" id="apellido_pu" name="">
          </div>
          <div class="col-md-4 form-group">
            <label for="apellido_m">Apellido Materno</label>
            <input type="text" class="form-control" id="apellido_mu" name="">
          </div>
          <div class="col-md-12 form-group">
            <label for="puesto">Puesto</label>
            <input type="text" class="form-control" id="puestou" name="">
          </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn" id="actualizadatos" data-dismiss="modal"><i class="fas fa-save color"></i></button>
          </div>

        </div>
  </form>
      </div>
    </div>


       <!-- REQUIRED JS SCRIPTS -->
       <div class="MsjAjaxForm"></div>
        <script src="js/jquery-3.3.1.min.js"></script>
       <script src="dist/js/source_trabajador.js"></script>
       <script src="librerias/select2/js/select2.js"></script>




       <script type="text/javascript">
       	$(document).ready(function(){
       		$('#tabla').load('lista_trabajadores.php');
           $('#buscador').load('buscar_trabajadores.php');
       	});
       </script>

       <script type="text/javascript">
           $(document).ready(function(){
               $('#guardarnuevo').click(function(){
                 nombre=$('#nombre').val();
                 apellido_p=$('#apellido_p').val();
                 apellido_m=$('#apellido_m').val();
                 puesto=$('#puesto').val();
                   agregardatos(nombre,apellido_p,apellido_m,puesto);
               });



               $('#actualizadatos').click(function(){
                 actualizaDatos();
               });

           });
       </script>


   </body>


</html>
