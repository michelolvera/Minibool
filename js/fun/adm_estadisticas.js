var phpPath = "../php/Selector.php";
var langPath = "../json/string.json";
var grafica;
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
    $.ajax({
        method: "POST",
        url: phpPath,
        data: { funcion: "esAdministrador", userName: getCookie("user"), userPass: getCookie("pass")}
    })
    .done(function (msg) {
        if (msg == 1) {
            $("#admSet").css('display', 'block');
        }
    });
}

function CargarTextosPagina() {
    //Titulo
    $("#tituloEstadisticas").text(JsonIdioma["TituloEstadisticas"]);
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
    //Epecifico
    inicializacion();//Necesita tener idioma cargado antes de poder ejecutarse.
}

function inicializacion() {
    grafica_ejercicios_det();
    grafica_ejercicios_alea();
    grafica_paises();
}

function grafica_ejercicios_det() {
    var correctos_det = [];
    var incorrectos_det = [];
    var $myCanvas = $('#grafica_deterministicos');

    var datos = {
        labels: ["3 "+JsonIdioma["Variables"], "4 "+JsonIdioma["Variables"], "5 "+JsonIdioma["Variables"]],
        datasets: [{
            label: JsonIdioma["Correctos"],
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        },
        {
            label: JsonIdioma["Incorrectos"],
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        }]
    };

    $.ajax({
        method: "post",
        url: phpPath,
        data: {
            funcion: "grafica",
            userName: getCookie("user"),
            userPass: getCookie("pass"),
            tipo: "Deterministico",
            correcto: 1
        },
        dataType: "json"
    })
    .done(function (jsonObject) {
        jsonObject.forEach(element => {
            correctos_det.push(element["count(*)"]);
        });
        datos.datasets[0].data = correctos_det;
        $.ajax({
            method: "post",
            url: phpPath,
            data: {
                funcion: "grafica",
                userName: getCookie("user"),
                userPass: getCookie("pass"),
                tipo: "Deterministico",
                correcto: 0
            },
            dataType: "json"
        })
        .done(function (jsonObject) {
            jsonObject.forEach(element => {
                incorrectos_det.push(element["count(*)"]);
            });
            datos.datasets[1].data = incorrectos_det;
            grafica = new Chart($myCanvas, {
                type: "bar",
                data: datos,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    responsive: true,
                    title: {
                        display: true,
                        text: JsonIdioma["EjerciciosDeterministicos"]
                    }
                }
            });

        })
        .fail(function () {
            alert("No tienes los privilegios para ver esto");
        });
    })
    .fail(function () {
        alert("No tienes los privilegios para ver esto");
    });
}

function grafica_ejercicios_alea() {
    var correctos_ale = [];
    var incorrectos_ale = [];
    var $myCanvas = $('#grafica_aleatorios');

    var datos = {
        labels: ["3 "+JsonIdioma["Variables"], "4 "+JsonIdioma["Variables"], "5 "+JsonIdioma["Variables"]],
        datasets: [{
            label: JsonIdioma["Correctos"],
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        },
        {
            label: JsonIdioma["Incorrectos"],
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        }]
    };




    $.ajax({
        method: "post",
        url: phpPath,
        data: {
            funcion: "grafica",
            userName: getCookie("user"),
            userPass: getCookie("pass"),
            tipo: "Aleatorio",
            correcto: 1
        },
        dataType: "json"
    })
    .done(function (jsonObject) {
        jsonObject.forEach(element => {
            correctos_ale.push(element["count(*)"]);
        });
        datos.datasets[0].data = correctos_ale;
        $.ajax({
            method: "post",
            url: phpPath,
            data: {
                funcion: "grafica",
                userName: getCookie("user"),
                userPass: getCookie("pass"),
                tipo: "Aleatorio",
                correcto: 0
            },
            dataType: "json"
        })
        .done(function (jsonObject) {
            jsonObject.forEach(element => {
                incorrectos_ale.push(element["count(*)"]);
            });
            datos.datasets[1].data = incorrectos_ale;
            grafica = new Chart($myCanvas, {
                type: "bar",
                data: datos,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    responsive: true,
                    title: {
                        display: true,
                        text: JsonIdioma["EjerciciosAleatorios"]
                    }
                }
            });

        })
        .fail(function () {
            alert("No tienes los privilegios para ver esto");
        });
    })
    .fail(function () {
        alert("No tienes los privilegios para ver esto");
    });
}

function grafica_paises() {
    var datos_usuario = [];
    var colores_usuario = [];
    var labels_paises = [];

    var datos = {
        type: "pie",
        data: {
            datasets: [{
                data: [
                1,
                1,
                ],
                backgroundColor: [
                dame_color_aleatorio(),
                dame_color_aleatorio(),
                ],
            }],
            labels: [
            "dato1",
            "dato2",
            ]
        }
    };

    $.ajax({
        method: "post",
        url: phpPath,
        data: {
            funcion: "graficaUsuarios",
            userName: getCookie("user"),
            userPass: getCookie("pass")
        },
        dataType: "json"
    })
    .done(function (jsonObject) {
        jsonObject.forEach(element => {
            datos_usuario.push(element["total"]);
            colores_usuario.push(dame_color_aleatorio());
            labels_paises.push(element["pais"]);
        });
        datos.data.datasets[0].data = datos_usuario;
        datos.data.datasets[0].backgroundColor = colores_usuario;
        datos.data.labels = labels_paises;
        var $myCanvas = $('#grafica_estudiantes');
        grafica = new Chart($myCanvas, datos);
    })
    .fail(function () {
        alert("No tienes los privilegios para ver esto");
    });
}

function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

function dame_color_aleatorio() {
    hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    var color_aleatorio = "#";
    for (i = 0; i < 6; i++) {
        posarray = aleatorio(0, hexadecimal.length)
        color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
}

