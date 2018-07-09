var resultados = new Array();
productosSumas = true; //true, se regresaran Sumas de Productos, si es falsa se retornan productos de sumas.

var es_aleatorio = false;
var numero_variable = 0;

$(document).ready(function () {

    $("#inpFuncion").hide();
    $('#inpTabla').hide();
    $('#inpTablaK').hide();
    $('#circuitoContenedor').hide();
    $('#inputFuncion').val("");
    $('#btnIniciarConocido').hide();
    $('#mapaContenedor').hide();
    $("#respCont").hide();
});
$('#conocidoModal').on('shown.bs.modal', function () {
    $('#exampleModal').trigger('focus')
})

var func = function () {
    $('#botonporFuncion').addClass('active');
    $('#botonporTabladeVerdad').removeClass('active');
    $('#botonporMapaK').removeClass('active');
    $("#inpFuncion").show();
    $('#inpTabla').hide();
    $('#inpTablaK').hide();
    $("#tablaMapaKMini").hide();
    $('#inputFuncion').focus();
    if ($('#Cvar3').is(':checked')) {
        $('#teclaD').addClass('disabled')
        $('#teclaD').removeClass('btn-primary')
        $('#teclaE').addClass('disabled')
        $('#teclaE').removeClass('btn-primary')
    }
    if ($('#Cvar4').is(':checked')) {
        $('#teclaD').removeClass('disabled')
        $('#teclaE').addClass('disabled')
        $('#teclaD').addClass('btn-primary')
        $('#teclaE').removeClass('btn-primary')
    }
    if ($('#Cvar5').is(':checked')) {
        $('#teclaD').removeClass('disabled')
        $('#teclaE').addClass('btn-primary')
        $('#teclaD').addClass('btn-primary')
        $('#teclaE').removeClass('disabled')
    }
    $('#btnIniciarConocido').hide();
}
var tabla = function () {
    $('#botonporTabladeVerdad').addClass('active');
    $('#botonporFuncion').removeClass('active');
    $('#botonporMapaK').removeClass('active');
    $("#inpFuncion").hide();
    $('#inpTablaK').hide();
    crear('#tablaVerdadMini', false);
    $('#inpTabla').show();
    $('#btnIniciarConocido').show();
    $("#tablaMapaKMini").hide();
}
function mapak() {
    $('#botonporMapaK').addClass('active');
    $('#botonporTabladeVerdad').removeClass('active');
    $('#botonporFuncion').removeClass('active');
    $("#inpFuncion").hide();
    $('#inpTabla').hide();
    $('#tablaMapaKMini').show();
    $("#tablaMapaKMini").hide();
    crear('#tablaMapaKMini', false)
    $('#btnIniciarConocido').show();
}
var limpiar = function (tabla) {
    $(tabla).html('');
}
var reinciarEjercicios = function () {
    $('#btnEjercicios').removeClass('disabled');

}
var cambioCvar = function () {
    if ($('#botonporFuncion').hasClass('active')) {
        func();
        validarEntrada();
    }
    else if ($('#botonporTabladeVerdad').hasClass('active')) {
        tabla();
    }
    else if ($('#botonporMapaK').hasClass('active')) {
        mapak();
        //$('#btnIniciarConocido').show();
    }

}
var crear = function (tabla, isAl) {//isAl true es aleatorio, false es deterministico
    var mainFuncion = "";
    var valA = "";
    var valB = "";
    var valC = "";
    var valD = "";
    var valE = "";
    var vars = "";
    var f = "";
    var res = "";
    var tablaContent = "";
    var vueltas = 0;
    var entrado = false;
    limpiar(tabla);
    $("#tablaMapaKMini").hide();
    if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
        vueltas = 8;
        numero_variable = 3;
    }
    if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
        vueltas = 16;
        numero_variable = 4;
    }
    if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
        vueltas = 32;
        numero_variable = 5;
    }
    // Entrada de la funcion
    if ($('#botonporFuncion').hasClass('active')) {
        mainFuncion = $("#inputFuncion").val();
    }
    else {

    }
    //Caso tabla de verdad grande
    if (tabla == "#tablaVerdad") {
        $("#respCont").show();
        $('#tabtablaVerdad').removeClass('disabled');
        $('#tabtablaVerdad').addClass('active');
        $('#tabMapakarnaugh').removeClass('disabled');
        $('#tabCircuito').removeClass('disabled');
        $('#resulados').empty();
        tablaContent = '<thead>' +
            '<tr>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">C</th>';
        if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
            tablaContent += '<th scope="col">D</th>';
        }

        if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            tablaContent += '<th scope="col">D</th>';
            tablaContent += '<th scope="col">E</th>';
        }
        tablaContent += '<th scope="col">F</th>';
        tablaContent += '</tr>' +
            '</thead>' +
            '<tbody>';
    }
    // CASO TABLA DE VERDAD MINI
    if (tabla == "#tablaVerdadMini") {
        tablaContent = '<thead>' +
            '<tr>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">C</th>';
        if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
            tablaContent += '<th scope="col">D</th>';
        }

        if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            tablaContent += '<th scope="col">D</th>';
            tablaContent += '<th scope="col">E</th>';
        }
        tablaContent += '<th scope="col">F</th>';
        tablaContent += '</tr>' +
            '</thead>' +
            '<tbody>';
    }
    //Caso los dos mapas de Karnaugh
    if (tabla == "#tablaMapaK" || tabla == "#tablaMapaKMini") {
        $("#tablaMapaKMini").show();
        tablaContent = '  <div class="row no-gutters">' +
            '<div class="col-2 col-md-1">' +
            '<span id="varsIzq" class="align-middle">' +
            '<br/>' +
            '<br/>' +
            '<br/>' +
            '<br/>';
        if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
            tablaContent += '<b>A</b>';
        }
        else {
            tablaContent += '<br/>' +
                '<br/>' +
                '<b>A</b>' +
                '<br/>' +
                '<br/>' +
                '<br/>' +
                '<b>B</b>';
        }
        tablaContent += '</span>' +
            '</div>' +
            '<div class="col-10 col-sm-6 col-md-11">' +
            '  <div  class="table-responsive">' +
            '    <div id="varsDer" class="mx-auto" style="width: 100px;">';
        if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
            tablaContent += '<b>BC</b>';
        }
        else if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
            tablaContent += '<b>CD</b>';
        }
        else if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            tablaContent += '<b>CDE</b>';
        }
        tablaContent += '</div>' +
            '<table  class="table table-striped table-bordered table-hover">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col"></th>';
        if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            tablaContent += '<th scope="col">000</th>' +
                '<th scope="col">001</th>' +
                '<th scope="col">011</th>' +
                '<th scope="col">010</th>' +
                '<th scope="col">110</th>' +
                '<th scope="col">111</th>' +
                '<th scope="col">101</th>' +
                '<th scope="col">100</th>';
        }
        else {
            tablaContent += '<th scope="col">00</th>' +
                '<th scope="col">01</th>' +
                '<th scope="col">11</th>' +
                '<th scope="col">10</th>';
        }
        tablaContent += '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>';
        for (var num = 0; num < vueltas; num++) {
            var aux = 0;
            // CASO MAPA DE KARNAUGH MINI DENTRO DE LOS DOS KARNAUGH
            if (tabla == "#tablaMapaKMini") {
                if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">0</th>'
                    }
                    if (num == 4) {
                        tablaContent += '</tr><tr><th scope="row">1</th>'
                    }
                    //aqui seccion de los valores
                    if (num == 2 || num == 6) {
                        aux = num + 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 3 || num == 7) {
                        aux = num - 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else {
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + num + '" class="btn btn-primary" onClick="cambiarNum(' + num + ')">0</button>' +
                            '</td>';
                    }
                }
                if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">00</th>'
                    }
                    else if (num == 4) {
                        tablaContent += '</tr><tr><th scope="row">01</th>'
                    }
                    else if (num == 12) {
                        tablaContent += '</tr><tr><th scope="row">11</th>'
                    }
                    else if (num == 8) {
                        tablaContent += '</tr><tr><th scope="row">10</th>'
                    }
                    //aqui seccion de los valores
                    if (num == 2 || num == 6 || num == 14 || num == 10) {
                        aux = num + 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 3 || num == 7 || num == 15 || num == 11) {
                        aux = num - 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                        if (num == 7) {
                            num += 4;
                        }
                        if (entrado && num == 11) {
                            num = 15;
                        }
                        if (num == 15 && !entrado) {
                            num -= 8;
                            entrado = true;
                        }
                    }
                    else {
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + num + '" class="btn btn-primary" onClick="cambiarNum(' + num + ')">0</button>' +
                            '</td>';
                    }
                }
                if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">00</th>'
                    }
                    else if (num == 8) {
                        tablaContent += '</tr><tr><th scope="row">01</th>'
                    }
                    else if (num == 24) {
                        tablaContent += '</tr><tr><th scope="row">11</th>'
                    }
                    else if (num == 16) {
                        tablaContent += '</tr><tr><th scope="row">10</th>'
                    }
                    //aqui la seccion de los valores
                    if (num == 7) {
                        aux = num - 3;
                    }
                    if (num == 15) {
                        aux = num - 3;
                        num += 8;
                    }
                    if (entrado && num == 23) {
                        aux = num - 3;
                        num = 31;
                    }
                    if (num == 31 && !entrado) {
                        aux = num - 3;
                        num -= 16;
                        entrado = true;
                    }
                    if (num == 2 || num == 10 || num == 18 || num == 26) {
                        aux = num + 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 3 || num == 11 || num == 19 || num == 27) {
                        aux = num - 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 4 || num == 12 || num == 20 || num == 28 || num == 5 || num == 13 || num == 21 || num == 29) {
                        aux = num + 2;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 7 || num == 15 || num == 23 || num == 31) {

                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else if (num == 6 || num == 14 || num == 22 || num == 30) {
                        aux = num - 1;
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + aux + '" class="btn btn-primary" onClick="cambiarNum(' + aux + ')">0</button>' +
                            '</td>';
                    }
                    else {
                        tablaContent += '<td>' +
                            '<button id="btnMapak' + num + '" class="btn btn-primary" onClick="cambiarNum(' + num + ')">0</button>' +
                            '</td>';
                    }
                }
            }
            //CASO TABLA MAPA DE KARNAUGH GRANDE DENTRO DE LOS DOS KARNAUGH
            if (tabla == "#tablaMapaK") {
                if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">0</th>'
                    }
                    else if (num == 4) {
                        tablaContent += '</tr><tr><th scope="row">1</th>'
                    }
                    //aqui seccion de los valores
                    if (num == 2 || num == 6) {
                        aux = num + 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 3 || num == 7) {
                        aux = num - 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else {
                        tablaContent += '<td id="celda' + num + '">' + resultados[num] + '</td>';;
                    }
                }
                if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">00</th>'
                    }
                    else if (num == 4) {
                        tablaContent += '</tr><tr><th scope="row">01</th>'
                    }
                    else if (num == 8) {
                        tablaContent += '</tr><tr><th scope="row">11</th>'
                    }
                    else if (num == 12) {
                        tablaContent += '</tr><tr><th scope="row">10</th>'
                    }
                    //aqui seccion de los valores
                    if (num == 2 || num == 6 || num == 14 || num == 10) {
                        aux = num + 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 3 || num == 7 || num == 15 || num == 11) {
                        aux = num - 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                        if (num == 7) {
                            num += 4;
                        }
                        if (entrado && num == 11) {
                            num = 15;
                        }
                        if (num == 15 && !entrado) {
                            num -= 8;
                            entrado = true;
                        }
                    }
                    else {
                        tablaContent += '<td id="celda' + num + '">' + resultados[num] + '</td>';
                    }
                }
                if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">00</th>'
                    }
                    else if (num == 8) {
                        tablaContent += '</tr><tr><th scope="row">01</th>'
                    }
                    else if (num == 24) {
                        tablaContent += '</tr><tr><th scope="row">11</th>'
                    }
                    else if (num == 16) {
                        tablaContent += '</tr><tr><th scope="row">10</th>'
                    }
                    //aqui seccion de los valores
                    if (num == 7) {
                        aux = num - 3;
                    }
                    if (num == 15) {
                        aux = num - 3;
                        num += 8;
                    }
                    if (entrado && num == 23) {
                        aux = num - 3;
                        num = 31;
                    }
                    if (num == 31 && !entrado) {
                        aux = num - 3;
                        num -= 16;
                        entrado = true;
                    }
                    if (num == 2 || num == 10 || num == 18 || num == 26) {
                        aux = num + 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 3 || num == 11 || num == 19 || num == 27) {
                        aux = num - 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 4 || num == 12 || num == 20 || num == 28 || num == 5 || num == 13 || num == 21 || num == 29) {
                        aux = num + 2;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 7 || num == 15 || num == 23 || num == 31) {
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else if (num == 6 || num == 14 || num == 22 || num == 30) {
                        aux = num - 1;
                        tablaContent += '<td id="celda' + aux + '">' + resultados[aux] + '</td>';
                    }
                    else {
                        tablaContent += '<td id="celda' + num + '">' + resultados[num] + '</td>';
                    }
                }

            }
        }
        tablaContent += '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div></div></div>';

    }
    //caso tablas de verdad
    if (tabla == "#tablaVerdadMini" || tabla == "#tablaVerdad") {
        for (var num = 0; num < vueltas; num++) {
            tablaContent += '<tr>';
            if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
                valA = dec2bin(num, 3).charAt(0);
                valB = dec2bin(num, 3).charAt(1);
                valC = dec2bin(num, 3).charAt(2);
                tablaContent += '<td scope="row">' + dec2bin(num, 3).charAt(0) + '</th>' +
                    '<td>' + dec2bin(num, 3).charAt(1) + '</td>' +
                    '<td>' + dec2bin(num, 3).charAt(2) + '</td>';
            }
            if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
                valA = dec2bin(num, 4).charAt(0);
                valB = dec2bin(num, 4).charAt(1);
                valC = dec2bin(num, 4).charAt(2);
                valD = dec2bin(num, 4).charAt(3);
                tablaContent += '<td scope="row">' + dec2bin(num, 4).charAt(0) + '</th>' +
                    '<td>' + dec2bin(num, 4).charAt(1) + '</td>' +
                    '<td>' + dec2bin(num, 4).charAt(2) + '</td>' +
                    '<td>' + dec2bin(num, 4).charAt(3) + '</td>';
            }

            if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
                valA = dec2bin(num, 5).charAt(0);
                valB = dec2bin(num, 5).charAt(1);
                valC = dec2bin(num, 5).charAt(2);
                valD = dec2bin(num, 5).charAt(3);
                valE = dec2bin(num, 5).charAt(4);
                tablaContent += '<td scope="row">' + dec2bin(num, 5).charAt(0) + '</th>' +
                    '<td>' + dec2bin(num, 5).charAt(1) + '</td>' +
                    '<td>' + dec2bin(num, 5).charAt(2) + '</td>' +
                    '<td>' + dec2bin(num, 5).charAt(3) + '</td>' +
                    '<td>' + dec2bin(num, 5).charAt(4) + '</td>';
            }
            // Tabla de verdad dentro de las dos tablas
            if (tabla == "#tablaVerdad") {
                if (isAl) {
                    resultados[num] = getRandom();
                    tablaContent += '<td class="table-success">' + resultados[num] + '</td>';
                }
                else {
                    if ($('#botonporFuncion').hasClass('active')) {
                        replaceFuncion = mainFuncion;
                        try {
                            replaceFuncion = booleanFun.parse(mainFuncion);
                            for (var i = 0; i < replaceFuncion.length; i++) {
                                replaceFuncion = replaceFuncion.replace('A', valA)
                                replaceFuncion = replaceFuncion.replace('B', valB)
                                replaceFuncion = replaceFuncion.replace('C', valC)
                                replaceFuncion = replaceFuncion.replace('D', valD)
                                replaceFuncion = replaceFuncion.replace('E', valE)
                                replaceFuncion = replaceFuncion.replace('a', valA)
                                replaceFuncion = replaceFuncion.replace('b', valB)
                                replaceFuncion = replaceFuncion.replace('c', valC)
                                replaceFuncion = replaceFuncion.replace('d', valD)
                                replaceFuncion = replaceFuncion.replace('e', valE)
                                mainFuncion = mainFuncion.replace('a', 'A')
                                mainFuncion = mainFuncion.replace('b', 'B')
                                mainFuncion = mainFuncion.replace('c', 'C')
                                mainFuncion = mainFuncion.replace('d', 'D')
                                mainFuncion = mainFuncion.replace('e', 'E')
                            }
                        } catch (e) {
                            error = e;
                        }
                        try {
                            if (!!eval(replaceFuncion)) {
                                resultados[num] = 1;
                                res = "1"
                            } else {
                                resultados[num] = 0;
                                res = "0"
                            }
                        } catch (e) {
                            console.log("Error al evaluar la función " + e);
                        }
                        resultados[num] = res;
                    }
                    if ($('#botonporTabladeVerdad').hasClass('active')) {
                        resultados[num] = $('#btnTabla' + num).html();
                    }
                    if ($('#botonporMapaK').hasClass('active')) {
                        resultados[num] = $('#btnMapak' + num).html();
                    }
                    tablaContent += '<td class="table-success">' + resultados[num] + '</td>';
                }
                if (!$('#botonporFuncion').hasClass('active')) {
                    if (resultados[num] == 1) {
                        if (entrado) {
                            mainFuncion += '+';
                        }
                        entrado = true;
                        if (valA == '1') {
                            mainFuncion += 'A';
                        }
                        if (valA == '0') {
                            mainFuncion += "A'";
                        }
                        if (valB == '1') {
                            mainFuncion += 'B';
                        }
                        if (valB == '0') {
                            mainFuncion += "B'";
                        }
                        if (valC == '1') {
                            mainFuncion += 'C';
                        }
                        if (valC == '0') {
                            mainFuncion += "C'";
                        }
                        if (valD == '1') {
                            mainFuncion += 'D';
                        }
                        if (valD == '0') {
                            mainFuncion += "D'";
                        }
                        if (valE == '1') {
                            mainFuncion += 'E';
                        }
                        if (valE == '0') {
                            mainFuncion += "E'";
                        }
                    }
                }
            }
            // Tabla de verdad mini dentro de las dos tablas
            if (tabla == "#tablaVerdadMini") {
                tablaContent += '<td class="no-border"><button id="btnTabla' + num + '" class="btn btn-primary"  onClick="cambiarNum(' + num + ')">0</button></td>';
            }
            tablaContent += '</tr>';
        }
        tablaContent += '</tbody>';
        if (tabla == "#tablaVerdad") { $('#cardFuncion').html('F=' + mainFuncion) }
    }
    $(tabla).append(tablaContent);
    if (tabla != '#tablaMapaK' && tabla != '#tablaMapaKMini') {
        if (isAl) {
            crear('#tablaMapaK', true);
        } else {
            crear('#tablaMapaK', false);
        }
        ////////////////////////////////// HAGO CONSTAR QUE ESTO NO ME GUSTA ATT. Michel  ////////////////////////////////
        if (tabla == "#tablaVerdad") {
            $("#contenedorBoton").empty();
            $("#contenedorBoton").append('<button class="btn btn-outline-primary" id="btnEnviarRes" href="#">Enviar respuesta</button>');
            $("#btnEnviarRes").click(function (event) {
                validarRes();
            });
            productosSumas = isAl ? $('input:radio[name=resolverPorAleatorio]:checked').val() == 1 ? true : false : $('input:radio[name=resolverPorDeterministico]:checked').val() == 1 ? true : false;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
};

function dec2bin(dec, c) {
    var num = (dec >>> 0).toString(2);
    while (num.length < c) {
        num = '0' + num;
    }
    return num;
}
function getRandom() {
    var num = Math.random();
    if (num < 0.6) return 1;  //probabilidad 0.8
    else return 0;  //probabilidad 0.2
}
function cambiarNum(num) {
    if ($('#btnTabla' + num).html() == '0') {
        $('#btnTabla' + num).html('1');
    }
    else {
        $('#btnTabla' + num).html('0');
    }
    if ($('#btnMapak' + num).html() == '0') {
        $('#btnMapak' + num).html('1');
    }
    else {
        $('#btnMapak' + num).html('0');
    }
}

function validarRes() {
    if (!productosSumas) {
        //Invertir 0s y 1s!!
        for (let i = 0; i < resultados.length; i++) {
            resultados[i] = resultados[i] == 1 ? 0 : 1;
        }
    }
    var resultadosConCombinacion = IniciarReduccion(resultados, productosSumas);
    var resultadosOptimos = resultadosConCombinacion[0];
    //Limpiar los resultados redundantes o mas largos que el mas optimo
    let optimoLargo = 0;
    for (let i = 0; i < resultadosOptimos.length; i++) {
        if (optimoLargo == 0)
            optimoLargo = resultadosOptimos[i].size;
        if (resultadosOptimos[i].size < optimoLargo)
            optimoLargo = resultadosOptimos[i].size;
    }
    let auxResultado = Array();
    let auxImplicante = Array();
    for (let i = 0; i < resultadosOptimos.length; i++) {
        if (!(resultadosOptimos[i].size > optimoLargo)) {
            auxResultado.push(resultadosOptimos[i]);
            auxImplicante.push(resultadosConCombinacion[1][i]);
        }
    }
    resultadosOptimos = auxResultado;
    resultadosConCombinacion[1] = auxImplicante;

    var repuestaCorrecta = ComprobarRespuesta(resultadosOptimos, productosSumas);
    let correcto = false;
    $('#resulados').empty();
    $('#resulados').append("<p class='alert alert-warning' role='alert'>Posibles soluciones:</p>");
    $("#contenedorBoton").empty();
    for (let i = 0; i < resultadosOptimos.length; i++) {
        let cadenaResultado = "";
        let aux = 0;
        for (let multi of resultadosOptimos[i]) {
            cadenaResultado += "<a href='#' onmouseover='resaltarResultados([" + resultadosConCombinacion[2][[...resultadosConCombinacion[1][i]][aux].charCodeAt(0) - 65]["minterms"] + "])'>" + multi + (productosSumas ? "</a>+" : '</a>');
            aux++;
        }
        cadenaResultado = productosSumas ? cadenaResultado.substring(0, cadenaResultado.length - 1) : cadenaResultado;
        if (repuestaCorrecta == i) {
            correcto = true;
            //Reproducir sonido correcto
            $('#resulados').append("<div class='alert alert-success' role='alert'><p>" + cadenaResultado + "</p><hr><p class='mb-0'>Tu solucion.</p></div>");
        } else{
            //Reproducir sonido incorrecto
            $('#resulados').append("<p class='alert alert-info' role='alert'>" + cadenaResultado + "</p>");
        }

        if(correcto)
            document.getElementById('sonidoCorrecto').play();
        else
            document.getElementById('sonidoIncorrecto').play();

    }

    //La variable correcto indica si el ejercicio es correcto o no.

    if (obtener_id_ejercicio() != 0) {
        if (correcto) {
            $.ajax({
                method: "post",
                url: phpPath,
                data: {
                    funcion: "registroEjercicio",
                    userName: getCookie("user"),
                    userPass: getCookie("pass"),
                    ej_correcto: 1,
                    nu_variable: obtener_id_ejercicio()
                },
                dataType: "json"
            })
                .done(function (respuesta) {

                })
                .fail(function () {
                    alert("Error");
                });
        } else {
            $.ajax({
                method: "post",
                url: phpPath,
                data: {
                    funcion: "registroEjercicio",
                    userName: getCookie("user"),
                    userPass: getCookie("pass"),
                    ej_correcto: 0,
                    nu_variable: obtener_id_ejercicio()
                },
                dataType: "json"
            })
                .done(function (respuesta) {

                })
                .fail(function () {
                    alert("Error");
                });
        }
    }

    $("#inputResp").removeClass("ejercicioCorrecto");
    $("#inputResp").removeClass("ejercicioIncorrecto");
    $("#inputResp").addClass(correcto ? "ejercicioCorrecto" : "ejercicioIncorrecto");
}

function tipo_ejercicio(valor_tipo) {
    switch (valor_tipo) {
        case 'aleatorio':
            es_aleatorio = true
            break;
        case 'deterministico':
            es_aleatorio = false;
            break;
    }
}

function obtener_id_ejercicio() {

    if (es_aleatorio) {
        switch (numero_variable) {
            case 0:
                return 0;
                break;
            case 3:
                return 1;
                break;
            case 4:
                return 2;
                break;
            case 5:
                return 3;
                break;
        }
    }
    else {
        switch (numero_variable) {
            case 0:
                return 0;
                break;
            case 3:
                return 4;
                break;
            case 4:
                return 5;
                break;
            case 5:
                return 6;
                break;
        }
    }
}

function resaltarResultados(arrayResaltar) {
    for (let i = 0; i < Math.pow(2,cantidadVariables); i++) {
        $("#celda" + i).removeClass("celdaMarcada");
    }
    for (let i = 0; i < arrayResaltar.length; i++) {
        $("#celda" + arrayResaltar[i]).addClass("celdaMarcada");
    }
}