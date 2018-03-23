//Variables Globales
var JsonIdioma;

//El documento se ha cargado completamente, ahora se puede añadir funcionamiento.
$(document).ready(function () {
    CargarIdioma("es-MX")

});

function CargarFunciones() {
    $("#login_form").submit(function (event) {
        var usuario = $("#in_usuario").val();
        var contraseña = $("#in_contrasena").val();
        $.ajax({
            method: "POST",
            url: "php/selector.php",
            data: { funcion: "login", userName: usuario, userPass: contraseña }
        })
            .done(function (msg) {
                if (msg.value) {
                    alert("Login Correcto");
                } else {
                    alert(JsonIdioma["loginFallido"]);
                }
            });
    });
}

function CargarIdioma(idioma) {
    $.ajax({
        method: "post",
        url: "json/string.json",
        dataType: "json"
    })
        .done(function (jsonObject) {
            JsonIdioma = jsonObject[idioma];
            CargarFunciones();
        })
        .fail(function () {
            alert("Idioma no cargado, recargar pagina.");
        });
}

function ComprobarRegex(regex, expresion) {
    return regex.test(expresion);
}