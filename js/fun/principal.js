var langPath = "../json/string.json";
var phpPath = "../php/Selector.php"
function CargarFunciones() {
    $("#btn_usuario_cerrar").click(function (event) {
        CerrarSesion();
    });
    consulta_numero_notificaciones();
}

function ValidarCookie() {
    if (getCookie("user") == "" && getCookie("pass") == "") {
        location.replace("../");
    } else {
        $.ajax({
            method: "POST",
            url: phpPath,
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
    $("#botonporFuncion").text(JsonIdioma["Funcion"]);
    $("#botonporTabladeVerdad").text(JsonIdioma["TablaVerdad"]);
    $("#botonporMapaK").text(JsonIdioma["MapaKarnaugh"]);
    $("#btnCerrarConocido").text(JsonIdioma["Cancelar"]);
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
    $("#labelResolverpor").text(JsonIdioma["ResolverPor"]+":");
}

function CerrarSesion() {
    setCookie("user", "", -1);
    setCookie("pass", "", -1);
    location.replace("../");
}

function cargar_notificaciones(){
    $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "consultaNotificaciones",
        },
        dataType: "json"
      })
        .done(function (jsonObject) {
          $("#lista_notificaciones").empty();
          jsonObject.forEach(row => {
            $("#lista_notificaciones").append("<div class='alert alert-"+row["tipo"]+"' role='alert'>"+ row["notificacion"] +"</div>");
          });
        })
        .fail(function () {
          alert("Error");
        });
}
function consulta_numero_notificaciones(){
    $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "consultaNumeroNotificaciones",
        },
        dataType: "json"
      })
        .done(function (jsonObject) {
            console.log(jsonObject);
            $("#btn_mostrar_notificaciones span").text(jsonObject[0]["suma"]);
        })
        .fail(function () {
          alert("Error");
        });
}
