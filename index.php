<html>
  <head>
    <title>Inicio de sesion</title>
    <?php include "./class_lib/links.php"; ?>
    <link href="dashboard.css" rel="stylesheet">
  </head>
  <body>
    <form action="valida_usr.php" method="post" class="AjaxForms MainLogin" data-type-form="login" autocomplete="off" style="text-align:center">
        <img src="imagenes/logo.png" alt="" class="img-fluid logo" ><br><br>
        <div class="form-group" style="text-align:left">
          <label class="control-label" for="UserName">Usuario</label>
          <input class="form-control" name="usuario" id="UserName" type="text" required="" style="background-color: #FFFFFF">
        </div>
        <div class="form-group" style="text-align:left">
          <label class="control-label" for="Pass">Contraseña</label>
          <input class="form-control" name="pass" id="Pass" type="password" required="">
        </div>
        <p class="text-center">
            <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
        </p>
    </form>
    <div class="MsjAjaxForm"></div>
    <?php include "./class_lib/scripts.php"; ?>
  </body>
</html>
