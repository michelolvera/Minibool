<?php
$sqlUser="sql3451937"; //Your User
$sqlPass="5y31qXTt2I"; //Your Password
$sqlDB ="sql3451937"; //Your DB

function iniciaConexion(){
  GLOBAL $sqlUser, $sqlPass, $sqlDB;
  $conexionMySQL = @mysqli_connect("sql3.freemysqlhosting.net", $sqlUser, $sqlPass, $sqlDB);
  if (!$conexionMySQL) {
    return null;
    die();
  }
  return $conexionMySQL;
}

function consultaSQL($consunta){
  $datos=array();
  $conexionMySQL = iniciaConexion();
  if(!$resultado = @mysqli_query($conexionMySQL, $consunta)){
    return null;
    die();
  }
  $i=0;
  while($row = mysqli_fetch_assoc($resultado))
  {
    $datos[$i] = $row;
    $i++;
  }
  return $datos;
}

function insertSQLMultiple($consunta){
  $conexionMySQL = iniciaConexion();
  $consultasSeparadas = explode(";", $consunta);
  foreach($consultasSeparadas as $cosultita){
    if(!mysqli_query($conexionMySQL, $cosultita)){
      return '0';
      die();
    }
  }
  return true;
}
?>
