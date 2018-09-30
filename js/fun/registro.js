var langPath = "../json/string.json";

function CargarFunciones() {
  $("#new_user_form").submit(function (event) {
    var usuario = $("#in_usuario").val();
    var nombre = $("#in_nombre").val();
    var apellidoPaterno = $("#in_apellido_pat").val();
    var apellidoMaterno = $("#in_apellido_mat").val();
    var correo = $("#in_correo").val();
    var contraseña = $("#in_contrasenia").val();
    var correoConfirmar = $("#in_confirmar_correo").val();
    var contraseñaConfirmar = $("#in_confirmar_contrasenia").val();
    var pais = $("#combo_pais").val();
    var estudiante = $('[name=in_estudia_si]:checked').val();
    var escuela = $("#in_escuela").val();
    var carrera = $("#in_carrera").val();
    var semestre = $("#in_semestre").val();

    if (correo == correoConfirmar) {
      if (contraseña == contraseñaConfirmar) {
        $.ajax({
          method: "POST",
          url: "../php/Selector.php",
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
            console.log(msg);
            if (msg == 1) {
              alert(JsonIdioma["registroExitoso"]);
              location.href = "../";
            }
            else if (msg == 2) {
              alert(JsonIdioma["registroExiste"]);
            }
            else {
              alert(JsonIdioma["registroFallido"]);
            }
          });
      } else
        alert(JsonIdioma["PassError"]);
    } else
      alert(JsonIdioma["CorreoError"]);

  });

  $("input[type=radio][name=in_estudia_si]").change(function (event) {
    if (this.value == 1) {
      $("#PreguntasEstudiante").css("display", "block");
    } else {
      $("#PreguntasEstudiante").css("display", "none");
    }
  });
}

function CargarTextosPagina() {
  $("#titulo").text(JsonIdioma["TituloRegistro"]);
  $("#text_nueva_cuenta").text(JsonIdioma["NuevaCuenta"]);
  $("#lb_usuario").text(JsonIdioma["Usuario"]);
  $("#in_usuario").attr("placeholder", JsonIdioma["UsuarioRequisitos"]);
  $("#lb_nombre").text(JsonIdioma["Nombre"]);
  $("#in_nombre").attr("placeholder", JsonIdioma["NombreCompleto"]);
  $("#lb_apellido_pat").text(JsonIdioma["ApellidoPaterno"]);
  $("#in_apellido_pat").attr("placeholder", JsonIdioma["ApellidoPaternoRequisitos"]);
  $("#lb_apellido_mat").text(JsonIdioma["ApellidoMaterno"]);
  $("#in_apellido_mat").attr("placeholder", JsonIdioma["ApellidoMaternoRequisitos"]);
  $("#lb_correo").text(JsonIdioma["CorreoElectronico"]);
  $("#in_correo").attr("placeholder", JsonIdioma["CorreoElectronico"]);
  $("#lb_confirmar_correo").text(JsonIdioma["ConfirmarCorreo"]);
  $("#in_confirmar_correo").attr("placeholder", JsonIdioma["CorreoElectronico"]);
  $("#lb_contrasenia").text(JsonIdioma["Pass"]);
  $("#in_contrasenia").attr("placeholder", JsonIdioma["RequisitosPass"]);
  $("#lb_confirmar_contrasenia").text(JsonIdioma["ConfirmarPass"]);
  $("#in_confirmar_contrasenia").attr("placeholder", JsonIdioma["RequisitosPass"]);
  $("#lb_pais").text(JsonIdioma["Pais"]);
  //Combo ciudad en diferentes idiomas? No creo sea util, tal vez ingles sea suficiente.
  $("#sp_estudiante").text(JsonIdioma["EstudiantePregunta"]);
  $("#lb_estudia_si").text(JsonIdioma["Si"]);
  $("#lb_estudia_no").text(JsonIdioma["No"]);
  $("#lb_escuela").text(JsonIdioma["Escuela"]);
  $("#in_escuela").attr("placeholder", JsonIdioma["NombreEscuela"]);
  $("#lb_carrera").text(JsonIdioma["Especialidad"]);
  $("#in_carrera").attr("placeholder", JsonIdioma["NombreEspecialidad"]);
  $("#lb_semestre").text(JsonIdioma["Semestre"]);
  $("#in_semestre").attr("placeholder", JsonIdioma["NumeroSemestre"]);
  $("#btn_cancelar").text(JsonIdioma["Cancelar"]);
  $("#btn_registrar").text(JsonIdioma["CrearCuenta"]);
}

function ValidarCookie() {
  //No necesario ya que se registrara.
}
