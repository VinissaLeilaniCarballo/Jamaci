<?php include "./class_lib/sesionSecurity.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Extractores</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>

      <!-- Custom styles for this template -->
      <link href="dashboard.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar fixed-top flex-md-nowrap p-0 shadow header ">
<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"><img src="imagenes/logo.png" alt="" class="img-fluid logo"></a>
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
         <a class="nav-link active" href="extractores.php">
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
     <h1 class="h2">Extractores</h1>
     <a class="nav-link agregar" href="#" data-toggle="modal" data-target="#myModal"><i class="fas fa-pager color"></i> <i class="fas fa-plus color"></i>
       Agregar Extractor
     </a>
     <div class="btn-toolbar mb-2 mb-md-0">
       <div class="btn-group mr-2">
         <input class="form-control  w-100 search" type="text" placeholder="Buscar" aria-label="Buscar">
       </div>
     </div>
   </div>

<div class="container">
   <div class="table-responsive">
     <table class="table table-striped table-sm">
       <thead>
         <tr>
           <th>ID</th>
           <th>Modelo</th>
           <th>Equipo</th>
           <th>Existencia</th>
           <th>Valor de adquisicion</th>
           <th>Precio Publico</th>
           <th>Precio Tecnico</th>
           <th>Precio Gobierno</th>
           <th></th>

         </tr>
       </thead>
       <tbody>
         <tr>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
            <td></td>
             <td></td>
             <td></td>
             <td></td>
           <td><a class="nav-link" href=""><i class="fas fa-eye color"></i></a> </td>
         </tr>

       </tbody>
     </table>

     <!-- Modal -->
       <div class="modal fade" id="myModal" role="dialog">
         <div class="modal-dialog modal-lg">

           <!-- Modal content-->
           <form  class="wpcf7-form">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
             </div>
             <div class="modal-body row">
               <div class="col-md-2 form-group">
               <label for="usr">Codigo</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-10 form-group">
               <label for="usr">Equipo</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-6 form-group">
               <label for="usr">Modelo</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-6 form-group">
               <label for="usr">Provedor</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-3 form-group">
               <label for="usr">Valor de Adquisicion</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-3 form-group">
               <label for="usr">Precio Publico</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-3 form-group">
               <label for="usr">Precio Tecnico</label>
               <input type="text" class="form-control" id="usr">
             </div>
             <div class="col-md-3 form-group">
               <label for="usr">Precio Gobierno</label>
              <input type="text" class="form-control" id="usr">
             </div>

             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fas fa-save color"></i></button>
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
     <script src="dist/js/source_extractores.js"></script>


</html>
