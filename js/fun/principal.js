var langPath = "../json/string.json";

function CargarFunciones() {
    $("#btn_usuario_cerrar").click(function (event) {
        CerrarSesion();
    });
}

function ValidarCookie() {
    if (getCookie("user") == "" && getCookie("pass") == "") {
        location.replace("../");
    } else {
        $.ajax({
            method: "POST",
            url: "../php/Selector.php",
            data: { funcion: "login", userName: getCookie("user"), userPass: getCookie("pass") }
        }).done(function (msg) {
            if (msg == 0) {
                CerrarSesion();
            }
        });
    }
}

function CargarTextosPagina() {
    $("#btnTitulo").text(JsonIdioma["SimplificacionBolenana"]);
    $("#btnEjercicios").text(JsonIdioma["Ejercicios"]);
    $("#btnAelatorio").text(JsonIdioma["Aleatorio"]);
    $("#btnConocido").text(JsonIdioma["Conocido"]);
    $("#btnRanking").text(JsonIdioma["Clasificacion"]);
    $("#btnEstadistica").text(JsonIdioma["Estadisticas"]);
    $("#btnAdmin").text(JsonIdioma["Administración"]);
    $("#btn_adm_ponderacion").text(JsonIdioma["Ponderacion"]);
    $("#btn_adm_notificaciones").text(JsonIdioma["Notificacion"]);
    $("#btn_adm_usuarios").text(JsonIdioma["Usuarios"]);
    $("#btn_adm_estadisticas").text(JsonIdioma["Estadisticas"]);
    $("#btn_dd_usuario_actual").text(JsonIdioma["Usuario"]+": "+getCookie("user"));
    $("#btn_usuario_cuenta").text(JsonIdioma["ConfigurarCuenta"]);
    $("#btn_usuario_resultados").text(JsonIdioma["MisResultados"]);
    $("#btn_usuario_cerrar").text(JsonIdioma["CerrarSesion"]);

    //Modal
    $("#labelTituloModal1").text(JsonIdioma["ModoAleatorio"]);
    $("#labelVariablesAleatorio").text(JsonIdioma["Variables"]+":");
    $("#Resolverpor").text(JsonIdioma["ResolverPor"]+":");
    $("#spanSumadeP").text(JsonIdioma["SumaProductos"]);
    $("#spanProddeS").text(JsonIdioma["ProductosSuma"]);
    $("#btnCerrarAleatorio").text(JsonIdioma["Cancelar"]);
    $("#btnIniciarAleatorio").text(JsonIdioma["Iniciar"]);
    $("#labelTituloModal2").text(JsonIdioma["ModoConocido"]);
    $("#labelVariablesConocido").text(JsonIdioma["Variables"]+":");
    $("#datosTitulo").text(JsonIdioma["DatosEn"]+":");
    $("#spanFun").text(JsonIdioma["Funcion"]);
    $("#spanTablaVerdad").text(JsonIdioma["TablaVerdad"]);
    $("#spanMapaK").text(JsonIdioma["MapaKarnaugh"]);
    $("#spaninputFuncion").text(JsonIdioma["Funcion"]+":");
    $("#btnCerrarConocido").text(JsonIdioma["Cancelar"]);
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
    $("#labelResolverpor").text(JsonIdioma["ResolverPor"]+":");
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
}

function CerrarSesion() {
    setCookie("user", "", -1);
    setCookie("pass", "", -1);
    location.replace("../");
}