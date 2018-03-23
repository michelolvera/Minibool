<?php
    include 'ManejoSQL.php';
    include 'Usuario.php';

    $funcion = $_REQUEST["funcion"];

    switch ($funcion){
        case "login":
            $userName = $_REQUEST["userName"];
            $userPass = $_REQUEST["userPass"];
            $respuesta = consultaSQL("CALL sp_validar_usuario('".$userName."','".$userPass."');");
            echo $respuesta[0][0];
        break;
    }
?>