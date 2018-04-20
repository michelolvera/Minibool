
function comprobarAdminPagina() {
    var usuario = getCookie("user");
    var contraseña = getCookie("pass");

    $.ajax({
        method: "POST",
        url: phpPath,
        data: { funcion: "esAdministrador", userName: usuario, userPass: contraseña }
    })
        .done(function (msg) {
            if (msg == 1) {
            } else {
                location.href = "../../principal/";
            }
        });
}