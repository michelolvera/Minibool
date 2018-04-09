<?php
include 'ManejoSQL.php';
include 'Usuario.php';

$funcion = $_REQUEST["funcion"];

switch ($funcion){
  case "login":
  $userName = $_REQUEST["userName"];
  $userPass = $_REQUEST["userPass"];
  $respuesta = consultaSQL("CALL sp_validar_usuario('".$userName."','".$userPass."');");
  echo $respuesta[0]['Login'];
  break;

  case 'nuevoUsuario':
  $nombreUsuario = $_REQUEST["nombreUsuario"];
  $nombreReal = $_REQUEST["nombreReal"];
  $apellidoP = $_REQUEST["apellidoP"];
  $apellidoM = $_REQUEST["apellidoM"];
  $correoElectronico = $_REQUEST["correoElectronico"];
  $passUsuario = $_REQUEST["passUsuario"];
  $codigoPais = $_REQUEST["codigoPais"];
  $esEstudiante = $_REQUEST["esEstudiante"];
  $nombreEscuela = $_REQUEST["nombreEscuela"];
  $nombreCarrera = $_REQUEST["nombreCarrera"];
  $numSemestre = $_REQUEST["numSemestre"];
  $respuesta = consultaSQL("CALL sp_crear_usuario('".$nombreUsuario."','".$nombreReal."','".$apellidoP."','".$apellidoM."','".$correoElectronico."','".$codigoPais."','".$passUsuario."','".$esEstudiante."','".$nombreEscuela."','".$nombreCarrera."','".$numSemestre."','0');");
  echo $respuesta[0]['Creado'];
  break;

  case 'consultaUsuarios':
    $likeNombre = $_REQUEST["likeNombre"];
    $likeApellidoPat = $_REQUEST["likeApellidoPat"];
    $likeApellidoMat = $_REQUEST["likeApellidoMat"];
    $respuesta = consultaSQL("SELECT id_usuario, nombre, apellido_paterno, apellido_materno FROM usuarios WHERE nombre LIKE '%".$likeNombre."%' AND apellido_paterno LIKE '%".$likeApellidoPat."%' AND apellido_materno LIKE '%".$likeApellidoMat."%';");
    echo json_encode($respuesta);
  break;
}
?>
