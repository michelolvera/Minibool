var langPath = "../json/string.json";

function CargarFunciones() {
    $("#btnCerrarSesion").click(function (event) {
        setCookie("user", "", -1);
        setCookie("pass", "", -1);
        location.href = "../";
    });
}

function ValidarCookie() {
    if (getCookie("user") == "" && getCookie("pass") == "") {
        location.href = "../";
    } else {
        $.ajax({
            method: "POST",
            url: "../php/Selector.php",
            data: { funcion: "login", userName: getCookie("user"), userPass: getCookie("pass") }
        }).done(function (msg) {
            if (msg == 0) {
                setCookie("user", "", -1);
                setCookie("pass", "", -1);
                location.href = "../";
            }
        });
    }
}

function CargarTextosPagina() {
    $("#textoUsuario").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
}
