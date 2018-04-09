function CargarFunciones() {
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

function CargarTextosPagina(){

}

function ValidarCookie() {
//No necesario ya que se registrara.
}
