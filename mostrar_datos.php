<?php
session_start();
if($_SESSION['autorizado']<>1){
    header("Location: index.php");
}
error_reporting(0);
require('class_lib/conexion.php');

$db=new ConexionMySQL();

$cadena="Select * from clientes as C INNER JOIN numeros as N on C.idcliente=N.idcliente  group by C.idcliente";
$exe=$db->consulta($cadena);
if($db->numero_de_registros($exe)>0){
  echo "Hola";
 while($e=$db->buscar_array($exe)){

 echo '<h4>'.$e['empresa'].'</h4>';
/*echo "<div class='modal fade' id='editar' role='dialog'>";
echo "<div class='modal-dialog modal-lg'>";
      // <!-- Modal content-->
echo "<form  class='wpcf7-form'>";
echo "<div class='modal-content'>";
echo "<div class='modal-header'>";
echo "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
echo "</div>";
echo "<div class="modal-body row">
           <div class="col-md-12 form-group">
           <label for="usr">Empresa</label>
           <input type="text" class="form-control" id="empresa" name="empresa">
         </div>
         <div class="col-md-3 form-group">
           <label for="usr">Nombre del contacto</label>
           <input type="text" class="form-control" id="nombre" name="nombre" required>
         </div>
         <div class="col-md-3 form-group">
           <label for="usr">Apellido Paterno</label>
           <input type="text" class="form-control" id="apellido_p" name="apellido_p" required>
         </div>
         <div class="col-md-3 form-group">
           <label for="usr">Apellido Materno</label>
           <input type="text" class="form-control" id="apellido_m" name="apellido_m" required>
         </div>
         <div class="col-md-3 form-group">
           <label for="usr">Puesto</label>
           <input type="text" class="form-control" id="puesto" name="puesto" required>
         </div>
         <div  id ="telefono" class="col-md-3 form-group">
           <label for="usr">Telefono</label>
           <input type="text" name="telefono" class="form-control" id="telefono"required >
         </div>
         <div id="extencion" class="col-md-3 form-group">
           <label for="usr">Extension</label>
           <input type="text" class="form-control" id="extencion" name="extencion" required>
         </div>
         <div id="celular" class="col-md-5 form-group">
           <label for="usr">Celular</label>
           <input type="text" class="form-control" id="celular" name="celular" required>
         </div>
         <div class="col-md-1 form-group">
            <label for="usr">.</label>
            <button id="agregar" type='button' class='btn btn-default' ><i class="fas fa-plus-circle color"></i></button>
         </div>
           <div class="col-md-6 form-group">
             <label for="usr">Correo Electronico</label>
             <input type="email" style="background: #D9D9D9" class="form-control" id="email" name="email" required>
           </div>
           <div class="col-md-6 form-group">
             <label for="usr">RFC</label>
             <input type="text" class="form-control" id="RFC" name="RFC" required>
           </div>
           <div class="col-md-12 form-group">
             <label for="usr">Datos Bancarios</label>
             <input type="text" class="form-control" id="datos_bancarios" name="datos_bancarios" required>
           </div>
         <div class="col-md-12 form-group">
           <label for="usr">Dirección</label>
           <input type="text" class="form-control" id="direccion" name="direccion" required>
         </div>
         </div>
         <div class="modal-footer">
            <button type='submit' class='btn btn-default'  id='btn-reg-clientes'><i class="fas fa-save color"></i></button>
            <!--onclick='registra_clientes();'-->
          </div>


        </div>
   </form>
      </div>
    </div>

   echo "<tr>";
   echo "<td style='text-align: center;'>".strtoupper($e['empresa'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['numero'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['extencion'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['celular'])."</td>";
   echo "<td style='text-align: center;'>".strtoupper($e['email'])."</td>";
   echo "<td style='text-align: center;'><button data-toggle='modal'  data-target='#editar' class=' openBtn btn btn-default onclick'funcion(".strtoupper($e['idcliente']).")><i class='fas fa-eye color'></i></i></button></td>";

   echo "</tr>";*/
 }

}else{
 echo "<b>Actualmente no hay clientes registrados...</b>";
}
?>
