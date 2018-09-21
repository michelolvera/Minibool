<?php
$sqlUser="minibool";
$sqlPass="6/A7G!je)sYrh>?SA3";

function iniciaConexion(){
  GLOBAL $sqlUser, $sqlPass;
  $conexionMySQL = @mysqli_connect("localhost", $sqlUser, $sqlPass, "minibool");
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
