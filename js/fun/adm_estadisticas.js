var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var grafica;
var homePath = "../../";
function CargarFunciones() {
    inicializacion();
}

function ValidarCookie() {
    comprobarAdminPagina();
}

function CargarTextosPagina() {
    $("#btn_dd_usuario_actual").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
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
        labels: ["3 Variables", "4 Variables", "5 Variables"],
        datasets: [{
            label: "Correctos",
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        },
        {
            label: "Incorrectos",
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
                                text: "Ejercicos deterministicos"
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
        labels: ["3 Variables", "4 Variables", "5 Variables"],
        datasets: [{
            label: "Correctos",
            backgroundColor: dame_color_aleatorio(),
            data: [0, 0, 0]
        },
        {
            label: "Incorrectos",
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
                                text: "Ejercicos aleatorios"
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

