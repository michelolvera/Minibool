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
}
