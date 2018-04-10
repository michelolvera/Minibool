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
}

function CerrarSesion() {
    setCookie("user", "", -1);
    setCookie("pass", "", -1);
    location.replace("../");
}