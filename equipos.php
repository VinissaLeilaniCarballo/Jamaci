<?php include "./class_lib/sesionSecurity.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Equipos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php include "./includes/links.php"; ?>

</head>
<body onload="pone_equipos_registrados();">
  <nav class="navbar fixed-top flex-md-nowrap p-0 shadow header ">
<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"><img src="imagenes/logo.png" alt="" class="img-fluid logo"></a>
  <li class="dropdown"> <?php echo $_SESSION['nombre_de_usuario']; ?>
         <a class="dropbtn"data-toggle="dropdown" href="javascript:void(0)"><i class="fas fa-cog out"></i>
         <span class="caret out"></span></a>
         <ul class=" dropdown-content">
           <li><a href="usuarios.php"><i class="fas fa-user color"></i>  Agregar Usuario</a></li>
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
         <a class="nav-link active" href="equipo.php">
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
         <a class="nav-link"  href="trabajadores.php">
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
     <h1 class="h2">Equipos</h1>
     <a class="nav-link agregar" href="#" data-toggle="modal" data-target="#myModal"><i class="fas fa-pager color"></i> <i class="fas fa-plus color"></i>
       Agregar Equipo
     </a>
     <div class="btn-toolbar mb-2 mb-md-0">
       <div class="btn-group mr-2">
         <input class="form-control  w-100 search" type="text" placeholder="Buscar" aria-label="Buscar">
       </div>
     </div>


   </div>

   <div class='col-md-12'>
   <div id='equipos_registrados'></div>
   </div>



     <!-- Modal -->
       <div class="modal fade" id="myModal" role="dialog">
         <div class="modal-dialog modal-lg">

           <!-- Modal content-->
           <form  class="wpcf7-form" method="POST" action="alta_equipos.php">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div>
             <div class="modal-body row">
               <div class="col-md-2 form-group">
               <label for="codigo">Codigo</label>
               <input type="text" class="form-control" id="codigo" name="codigo">
             </div>
             <div class="col-md-10 form-group">
               <label for="codigo">Producto</label>
               <input type="text" class="form-control" id="nombre" name="nombre">
             </div>
             <div class="col-md-6 form-group">
               <label for="codigo">Modelo</label>
               <input type="text" class="form-control" id="modelo" name="modelo">
             </div>
             <div class="col-md-6 form-group">
               <label for="codigo_medida">provedor</label>
               <input type="text" class="form-control" id="provedor" name="provedor">
             </div>
             <div class="col-md-3 form-group">
               <label for="codigo">Valor de Adquisicion </label>
               <input type="text" class="form-control cantidades" id='valor_adquisicion' name="valor_adquisicion"
                data-inputmask="'alias': 'numeric', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'placeholder': '0'">
             </div>
             <div class="col-md-3 form-group">
               <label for="codigo">Precio Publico</label>
               <input type="text" class="form-control cantidades" id='precio_publico' name="precio_publico"
                data-inputmask="'alias': 'numeric', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'placeholder': '0'">
             </div>
             <div class="col-md-3 form-group">
               <label for="codigo">Precio Tecnico</label>
               <input type="text" class="form-control cantidades" id='precio_tecnico' name="precio_tecnico"
                data-inputmask="'alias': 'numeric', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'placeholder': '0'">
             </div>
             <div class="col-md-3 form-group">
               <label for="codigo">Precio Gobierno</label>
               <input type="text" class="form-control cantidades" id='precio_gobierno' name="precio_gobierno"
                data-inputmask="'alias': 'numeric', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'placeholder': '0'">
             </div>


             </div>
             <div class="modal-footer">
               <button type='submit' class='btn btn-default'  id='btn-reg-equipos'><i class="fas fa-save color"></i></button>
             </div>

           </div>
</form>
         </div>
       </div>



   </div>
 </main>
</div>
</div>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
   <script>window.jQuery || document.write('<script src="/docs/4.2/assets/js/vendor/jquery-slim.min.js"><\/script>')</script><script src="/docs/4.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-zDnhMsjVZfS3hiP7oCBRmfjkQC4fzxVxFhBx8Hkz2aZX8gEvA/jsP3eXRCvzTofP" crossorigin="anonymous"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
     <script src="dashboard.js"></script></body>
     <!-- REQUIRED JS SCRIPTS -->
     <div class="MsjAjaxForm"></div>
     <?php include "./class_lib/scripts.php"; ?>
     <script src="plugins/fastclick/fastclick.min.js"></script>
     <script src="plugins/datatables/jquery.dataTables.min.js"></script>
     <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
     <script src="plugins/noty/packaged/jquery.noty.packaged.min.js"></script>
     <script src="plugins/number/jquery.inputmask.bundle.js"></script>
     <script src="plugins/noty/packaged/jquery.noty.packaged.min.js"></script>
     <script src="plugins/select2/select2.full.min.js"></script>
     <script src="plugins/datatables/jquery.dataTables.min.js"></script>
     <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
     <script src="dist/js/source_equipos.js"></script>
     <script>
       $(document).ready(function(){
         $(".cantidades").inputmask();
       });
     </script>

     <script>

       function cambiar (ID){
         location.href="equipos_modelo.php?id="+ID;
       }

     </script>


</html>
