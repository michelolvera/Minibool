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

  case 'consultaNotificacion':
      $id_notificacion=$_REQUEST["id_notificacion"]; 
      $respuesta = consultaSQL("SELECT notificacion, tipo FROM notificaciones WHERE id='".$id_notificacion."';");
      echo json_encode($respuesta);
    break;

  case 'consultaNumeroNotificaciones':
      $respuesta = consultaSQL("SELECT count(*) as suma from notificaciones;");
      echo json_encode($respuesta);
    break;

  case 'crearNotificacion':
      $userName = $_REQUEST["userName"];
      $userPass = $_REQUEST["userPass"];
      $notificacion = $_REQUEST["notificacion"];
      $tipo = $_REQUEST["tipo"];
      $respuesta = consultaSQL("CALL sp_crear_notificacion('".$userName."','".$userPass."','".$notificacion."','".$tipo."');");
      echo $respuesta[0]['Creado'];
    break;  

  case 'eliminarNotificacion':
      $userName = $_REQUEST["userName"];
      $userPass = $_REQUEST["userPass"];
      $id_notificacion=$_REQUEST["id_notificacion"]; 
      $respuesta = consultaSQL("CALL sp_elimiar_notificacion('".$userName."','".$userPass."','".$id_notificacion."');");
      echo $respuesta[0]['Elimiada'];
    break;

  case 'actualizarNotificacion':
      $userName = $_REQUEST["userName"];
      $userPass = $_REQUEST["userPass"];
      $notificacion = $_REQUEST["notificacion"];
      $tipo = $_REQUEST["tipo"];
      $id_notificacion=$_REQUEST["id_notificacion"];
      $respuesta = consultaSQL("CALL sp_actualizar_notificacion('".$userName."','".$userPass."','".$notificacion."','".$tipo."','".$id_notificacion."');");
    echo $respuesta[0]['Actualizada'];
    break;

  case 'esAdministrador':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("SELECT administrador FROM usuarios WHERE usuario = '".$userName."' AND contrasenia = AES_ENCRYPT('".$userPass."', '%b_learning%')");
    echo $respuesta[0]["administrador"];
  break;

  case 'graficaUsuarios':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("SELECT COUNT(*) as total, pais from usuarios GROUP BY pais;");
    echo json_encode($respuesta);
  break;

  case 'grafica':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $tipo = $_REQUEST["tipo"];
    $correcto = $_REQUEST["correcto"];
    $respuesta = consultaSQL("CALL sp_estadisticas('".$userName."','".$userPass."','".$tipo."','".$correcto."');");
    echo json_encode($respuesta);
  break;

  case 'obtenerRanking':
    $respuesta = consultaSQL("SELECT U.usuario, SUM(E.puntos) AS total FROM ejercicio_usuario as EU INNER JOIN usuarios as U ON EU.id_usuario=U.id_usuario INNER JOIN ejercicios AS E ON EU.id_ejercicio= E.id_ejercicio WHERE EU.correcto=1 GROUP BY U.usuario ORDER BY SUM(E.puntos) DESC; ");
    echo json_encode($respuesta);
  break;

  case 'GestionarUsuario':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $respuesta = consultaSQL("CALL sp_gestionar_usuario('".$userName."','".$userPass."');");
    echo json_encode($respuesta);
  break;

  case 'guardarUsuario':
  $userName = $_REQUEST["userName"];
  $userPass = $_REQUEST["userPass"];
  $nombreUsuario = $_REQUEST["nombreUsuario"];
  $nombreReal = $_REQUEST["nombreReal"];
  $apellidoP = $_REQUEST["apellidoP"];
  $apellidoM = $_REQUEST["apellidoM"];
  $correoElectronico = $_REQUEST["correoElectronico"];
  $codigoPais = $_REQUEST["codigoPais"];
  $esEstudiante = $_REQUEST["esEstudiante"];
  $nombreEscuela = $_REQUEST["nombreEscuela"];
  $nombreCarrera = $_REQUEST["nombreCarrera"];
  $numSemestre = $_REQUEST["numSemestre"];
  $respuesta = consultaSQL("CALL sp_guardar_usuario('".$userName."','".$userPass."','".$nombreUsuario."','".$nombreReal."','".$apellidoP."','".$apellidoM."','".$correoElectronico."','".$codigoPais."','".$esEstudiante."','".$nombreEscuela."','".$nombreCarrera."','".$numSemestre."');");
  echo $respuesta[0]['Actualizado'];
  break;

  case 'detallesUsuarioAmd':
    $idUsuario = $_REQUEST["idUsuario"];
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $indice = $_REQUEST["indice"];
    $respuesta = consultaSQL("CALL sp_detalles_usuario_adm('".$userName."','".$userPass."','".$idUsuario."','".$indice."');");
    echo json_encode($respuesta);
  break;

  case 'detallesUsuario':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $indice = $_REQUEST["indice"];
    $respuesta = consultaSQL("CALL sp_detalles_usuario('".$userName."','".$userPass."','".$indice."');");
    echo json_encode($respuesta);
  break;

  case 'registroEjercicio':
    $userName = $_REQUEST["userName"];
    $userPass = $_REQUEST["userPass"];
    $ej_correcto = $_REQUEST["ej_correcto"];
    $nu_variable = $_REQUEST["nu_variable"];
    $respuesta = consultaSQL("CALL sp_registrar_ejercicio('".$userName."','".$userPass."','".$ej_correcto."','".$nu_variable."');");
    echo $respuesta[0]["Registro"];
  break;
}
?>
