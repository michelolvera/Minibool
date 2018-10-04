var langPath = "../json/string.json";
var phpPath = "../php/Selector.php"
var homePath = "../";
function CargarFunciones() {
    $("#btn_usuario_cerrar").click(function (event) {
        CerrarSesion();
    });
    consulta_numero_notificaciones();
    $("input[type=radio][name=in_estudia_si_gestion]").change(function (event) {
        if (this.value == 1) {
            $("#PreguntasEstudiante_gestion").css("display", "block");
        } else {
            $("#PreguntasEstudiante_gestion").css("display", "none");
        }
    });
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
            $.ajax({
                method: "POST",
                url: phpPath,
                data: { funcion: "esAdministrador", userName: getCookie("user"), userPass: getCookie("pass") }
            })
                .done(function (msg) {
                    if (msg == 1) {
                        $("#admSet").css('display', 'block');
                    }
                });
        });
    }
}

function CargarTextosPagina() {
    //Titulo
    $("#tituloPrincipal").text(JsonIdioma["TituloPrincipal"]);
    //Basico
    $("#btnEjercicios").text(JsonIdioma["Ejercicios"]);
    $("#btnRanking").text(JsonIdioma["Clasificacion"]);
    $("#btnEstadistica").text(JsonIdioma["Estadisticas"]);
    $("#btnAdmin").text(JsonIdioma["Administración"]);
    $("#btn_adm_ponderacion").text(JsonIdioma["Ponderacion"]);
    $("#btn_adm_notificaciones").text(JsonIdioma["Notificacion"]);
    $("#btn_adm_usuarios").text(JsonIdioma["Usuarios"]);
    $("#btn_adm_estadisticas").text(JsonIdioma["Estadisticas"]);
    $("#btn_dd_usuario_actual").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
    $("#btn_usuario_cuenta").text(JsonIdioma["ConfigurarCuenta"]);
    $("#btn_usuario_resultados").text(JsonIdioma["MisResultados"]);
    $("#btn_usuario_cerrar").text(JsonIdioma["CerrarSesion"]);
    $("#btn_acercade").text(JsonIdioma["AcercaDe"]);
    $("#text_titulo_usuario_gestion").text(JsonIdioma["ConfigurarCuenta"]);
    $("#lb_usuario_gestion").text(JsonIdioma["Usuario"]);
    $("#lb_nombre_gestion").text(JsonIdioma["Nombre"]);
    $("#lb_apellido_pat_gestion").text(JsonIdioma["ApellidoPaterno"]);
    $("#lb_apellido_mat_gestion").text(JsonIdioma["ApellidoMaterno"]);
    $("#lb_correo_gestion").text(JsonIdioma["CorreoElectronico"]);
    $("#lb_contrasenia_gestion").text(JsonIdioma["Pass"]);
    $("#lb_pais_gestion").text(JsonIdioma["Pais"]);
    $("#sp_estudiante_gestion").text(JsonIdioma["EstudiantePregunta"]);
    $("#lb_estudia_si_gestion").text(JsonIdioma["Si"]);
    $("#lb_estudia_no_gestion").text(JsonIdioma["No"]);
    $("#lb_escuela_gestion").text(JsonIdioma["Escuela"]);
    $("#lb_carrera_gestion").text(JsonIdioma["Especialidad"]);
    $("#lb_semestre_gestion").text(JsonIdioma["Semestre"]);
    $("#btn_guardar_acualizar_gestion").text(JsonIdioma["Actualizar"]);
    $("#text_titulo_detalles").text(JsonIdioma["MisResultados"]);
    $("#text_titulo_acercade_principal").text(JsonIdioma["AcercaDe"]);
    $("#AcercaDeModal").text(JsonIdioma["Descripcion"]);
    $("#profesoresColab").text(JsonIdioma["ProfColab"]);
    $("#joseDesc").text(JsonIdioma["JoseDesc"]);
    $("#octavioDesc").text(JsonIdioma["OctavioDesc"]);
    $("#nellyDesc").text(JsonIdioma["NellyDesc"]);
    $("#miriamDesc").text(JsonIdioma["MiriamDesc"]);
    $("#desarrolladores").text(JsonIdioma["Desarrolladores"]);
    $("#descJorge").text(JsonIdioma["DescJorge"]);
    $("#descMichel").text(JsonIdioma["DescMichel"]);
    $("#descAlan").text(JsonIdioma["DescAlan"]);
    $("#agradecimientoEspecial").text(JsonIdioma["AgradecimientoEspecial"]);
    $("#TecMex").text(JsonIdioma["TecMex"]);
    $("#TecMor").text(JsonIdioma["TecMor"]);
    //Especifico
    $("#ejemplos").text(JsonIdioma["ejemplos"]);
    $("#labelTituloModal1").text(JsonIdioma["ModoAleatorio"]);
    $("#labelVariablesAleatorio").text(JsonIdioma["Variables"] + ":");
    $("#Resolverpor").text(JsonIdioma["ResolverPor"] + ":");
    $("#spanSumadeP").text(JsonIdioma["SumaProductos"]);
    $("#btnAelatorio").text(JsonIdioma["Aleatorio"]);
    $("#btnConocido").text(JsonIdioma["Conocido"]);
    $("#spanProddeS").text(JsonIdioma["ProductosSuma"]);
    $("#btnCerrarAleatorio").text(JsonIdioma["Cancelar"]);
    $("#btnIniciarAleatorio").text(JsonIdioma["Iniciar"]);
    $("#labelTituloModal2").text(JsonIdioma["ModoConocido"]);
    $("#labelVariablesConocido").text(JsonIdioma["Variables"] + ":");
    $("#datosTitulo").text(JsonIdioma["DatosEn"] + ":");
    $("#botonporFuncion").text(JsonIdioma["Funcion"]);
    $("#botonporTabladeVerdad").text(JsonIdioma["TablaVerdad"]);
    $("#botonporMapaK").text(JsonIdioma["MapaKarnaugh"]);
    $("#btnCerrarConocido").text(JsonIdioma["Cancelar"]);
    $("#btnIniciarConocido").text(JsonIdioma["Iniciar"]);
    $("#labelResolverpor").text(JsonIdioma["ResolverPor"] + ":");
    $("#cardFuncion").text(JsonIdioma["Instrucciones"]);
    $("#descripcionTexto").text(JsonIdioma["Descripcion"]);
    $("#entradaRespuesta").text(JsonIdioma["EntradaRespuesta"]);
    $("#textoAlertaVariablesAlt").text(JsonIdioma["AlertaVariables"]);
    $("#textoAlertaVariablesCon").text(JsonIdioma["AlertaVariables"]);
    $("#labelResolverporAleatorio").text(JsonIdioma["ResolverPor"]);
    $("#labelResolverporDeterministico").text(JsonIdioma["ResolverPor"]);
    $("#spanSumadePC").text(JsonIdioma["SumaProductos"]);
    $("#spanProddeSC").text(JsonIdioma["ProductosSuma"]);
}
