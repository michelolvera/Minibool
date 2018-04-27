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

  case 'consultarUsuario':
    $idUsuario = $_REQUEST["idUsuario"];
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("CALL sp_consultar_usuario('".$userName."','".$userPass."','".$idUsuario."');");
    echo json_encode($respuesta);
  break;

  case 'eliminarUsuario':
    $idUsuario = $_REQUEST["idUsuario"];
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("CALL sp_eliminar_usuario('".$userName."','".$userPass."','".$idUsuario."');");
    echo $respuesta[0]['Eliminado'];
  break;

  case 'actualizarUsuario':
  $userName = $_REQUEST["userName"];
  $userPass = $_REQUEST["userPass"];
  $idUsuario = $_REQUEST["idUsuario"];
  $nombreUsuario = $_REQUEST["nombreUsuario"];
  $nombreReal = $_REQUEST["nombreReal"];
  $apellidoP = $_REQUEST["apellidoP"];
  $apellidoM = $_REQUEST["apellidoM"];
  $correoElectronico = $_REQUEST["correoElectronico"];
  $administrador = $_REQUEST["administrador"];
  $codigoPais = $_REQUEST["codigoPais"];
  $esEstudiante = $_REQUEST["esEstudiante"];
  $nombreEscuela = $_REQUEST["nombreEscuela"];
  $nombreCarrera = $_REQUEST["nombreCarrera"];
  $numSemestre = $_REQUEST["numSemestre"];
  $respuesta = consultaSQL("CALL sp_actualizar_usuario('".$userName."','".$userPass."','".$idUsuario."','".$nombreUsuario."','".$nombreReal."','".$apellidoP."','".$apellidoM."','".$correoElectronico."','".$codigoPais."','".$administrador."','".$esEstudiante."','".$nombreEscuela."','".$nombreCarrera."','".$numSemestre."');");
  echo $respuesta[0]['Actualizado'];
  break;

  case'consultarPonderaciones':
    $respuesta = consultaSQL("SELECT id_ejercicio, puntos FROM ejercicios;");
    echo json_encode($respuesta);
  break;

  case 'actualizarPonderaciones':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $in_al_3 = $_REQUEST["in_al_3"];
    $in_al_4 = $_REQUEST["in_al_4"];
    $in_al_5 = $_REQUEST["in_al_5"];
    $in_det_3 = $_REQUEST["in_det_3"];
    $in_det_4 = $_REQUEST["in_det_4"];
    $in_det_5 = $_REQUEST["in_det_5"];
    $respuesta = consultaSQL("CALL sp_actualizar_ponderaciones('".$userName."','".$userPass."','".$in_al_3."','".$in_al_4."','".$in_al_5."','".$in_det_3."','".$in_det_4."','".$in_det_5."');");
    echo $respuesta[0]['Actualizado'];
  break;

  case 'consultaNotificaciones':
    $respuesta = consultaSQL("SELECT id, notificacion, fecha, tipo FROM notificaciones;");
    echo json_encode($respuesta);
  break;

  case 'esAdministrador':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("SELECT administrador FROM usuarios WHERE usuario = '".$userName."' AND contrasenia = AES_ENCRYPT('".$userPass."', '%b_learning%')");
    echo $respuesta[0]["administrador"];
  break;
}
?>
