//Variables Globales
var JsonIdioma;

//El documento se ha cargado completamente, ahora se puede añadir funcionamiento.
$(document).ready(function () {
    var lang = getCookie("lang");
    if(lang != ""){
        CargarIdioma(lang);
    }else{
        CargarIdioma("es-MX");
        lang = "es-MX"
    }
    setCookie("lang", lang, 30);
});

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
            alert("Error: Idioma no cargado, recargar pagina.");
        });
}

function CargarFunciones() {
    $("#login_form").submit(function (event) {
        var usuario = $("#in_usuario").val();
        var contraseña = $("#in_contrasena").val();
        $.ajax({
            method: "POST",
            url: "php/Selector.php",
            data: { funcion: "login", userName: usuario, userPass: contraseña }
        })
            .done(function (msg) {
                if (msg == 1) {
                    location.href = "principal.html";
                } else {
                    alert(JsonIdioma["loginFallido"]);
                }
            });
    });

    $("#new_user_form").submit(function (event) {
        var usuario = $("#in_usuario").val();
        var nombre = $("#in_nombre").val();
        var apellidoPaterno = $("#in_apellido_paterno").val();
        var apellidoMaterno = $("#in_apellido_materno").val();
        var correo = $("#in_correo").val();
        var contraseña = $("#in_contrasena").val();
        var pais = $("#combo_pais").val();
        var estudiante = $('[name=in_estudia_si]:checked').val();
        var escuela = $("#in_escuela").val();
        var carrera = $("#in_carrera").val();
        var semestre = $("#in_semestre").val();

        $.ajax({
            method: "POST",
            url: "php/Selector.php",
            data: {
                funcion: "nuevoUsuario",
                nombreUsuario: usuario,
                nombreReal: nombre,
                apellidoP: apellidoPaterno,
                apellidoM: apellidoMaterno,
                correoElectronico: correo,
                passUsuario: contraseña,
                codigoPais: pais,
                esEstudiante: estudiante,
                nombreEscuela: escuela,
                nombreCarrera: carrera,
                numSemestre: semestre
            }
        })
            .done(function (msg) {
                if (msg == 1) {
                    alert(JsonIdioma["registroExitoso"]);
                    location.href = "login.html";
                }
                else if(msg == 2){
                    alert(JsonIdioma["registroExiste"]);
                } 
                else {
                    alert(JsonIdioma["registroFallido"]);
                }
            });
    });

    $("input[type=radio][name=in_estudia_si]").change(function (event){
        if(this.value == 1){
            $("#PreguntasEstudiante").css("display","block");
        }else{
            $("#PreguntasEstudiante").css("display","none");
        }
    });
}

function ComprobarRegex(regex, expresion) {
    return regex.test(expresion);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}