var langPath = "../json/string.json";

function CargarFunciones() {
    $("#btnCerrarSesion").click(function (event) {
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
    $("#textoUsuario").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
    $("#btnTitulo").text(JsonIdioma["SimplificacionBolenana"]);
    $("#btnEjercicios").text(JsonIdioma["Ejercicios"]);
    $("#btnAelatorio").text(JsonIdioma["Aelatorio"]);
    $("#btnConocido").text(JsonIdioma["Conocido"]);
    $("#btnRanking").text(JsonIdioma["Clasificacion"]);
    $("#btnEstadistica").text(JsonIdioma["Estadisticas"]);
    $("#btnAdministracion").text(JsonIdioma["Administración"]);
    $("#btnTituloSB").text(JsonIdioma["SimplificacionBolenana"]);
    $("#textoUsuario").text(JsonIdioma["Usuario"]);
    $("#btnConfigurarCuenta").text(JsonIdioma["ConfigurarCuenta"]);
    $("#btnMisResultados").text(JsonIdioma["MisResultados"]);
    $("#btnCerrarSesion").text(JsonIdioma["CerrarSesion"]);
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
}

function CerrarSesion() {
    setCookie("user", "", -1);
    setCookie("pass", "", -1);
    location.replace("../");
}