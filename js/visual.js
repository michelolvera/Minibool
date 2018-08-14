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
    if ($('#labelCVarN').hasClass('active')) {
      $('#botonporMapaK').addClass('disabled');
    }

}
var crear = function (tabla, isAl) {//isAl true es aleatorio, false es deterministico
    var mainFuncion = "";
    var valores = new Array();
    var f = "";
    var res = "";
    var tablaContent = "";
    var vueltas = 0;
    var entrado = false;
    limpiar(tabla);
    $("#tablaMapaKMini").hide();
    if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
        numero_variable = 3;
    }
    if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
        numero_variable = 4;
    }
    if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
        numero_variable = 5;
    }
    if ($('#labelVarN').hasClass('active')) {
      numero_variable = parseInt(($('#NVariables').val()));
    }
    if ($('#labelCVarN').hasClass('active')) {
      numero_variable = parseInt(($('#CNVariables').val()));
    }
    vueltas= Math.pow(2,numero_variable);
    // Entrada de la funcion
    if ($('#botonporFuncion').hasClass('active')) {
        mainFuncion = $("#inputFuncion").val();
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
        '<tr>';
          var tope = 65+numero_variable;
          for (var i = 65; i < tope ; i++) {
            if (i==70) {
              i++;
              tope++;
            }
            tablaContent += '<th scope="col">'+ String.fromCharCode(i) +'</th>';
          }
        tablaContent += '<th scope="col">F</th>';
        tablaContent += '</tr>' +
        '</thead>' +
        '<tbody>';
    }
    // CASO TABLA DE VERDAD MINI
    if (tabla == "#tablaVerdadMini") {
        tablaContent = '<thead>' +
        '<tr>' ;
        var tope = 65+numero_variable;
        for (var i = 65; i < tope ; i++) {
          if (i==70) {
            i++;
            tope++;
          }
          tablaContent += '<th scope="col">'+ String.fromCharCode(i) +'</th>';
        }
        tablaContent += '<th scope="col">F</th>';
        tablaContent += '</tr>' +
        '</thead>' +
        '<tbody>';
    }
    //Caso los dos mapas de Karnaugh
    if (tabla == "#tablaMapaK" || tabla == "#tablaMapaKMini") {
        if (!$('#labelVarN').hasClass('active') && !$('#labelCVarN').hasClass('active')) {
          $("#tablaMapaKMini").show();
          tablaContent = '  <div class="row no-gutters">';
          tablaContent += '</span>' +
          '</div>' +
          '<div class="col-12">' +
          '  <div  class="table-responsive">' +
          '    <div id="varsDer" class="mx-auto" style="width: 100px;">';
        }
        if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
            tablaContent += '<b>BC</b>';
        }
        else if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
            tablaContent += '<b>CD</b>';
        }
        else if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            tablaContent += '<b>CDE</b>';
        }
        if (!$('#labelVarN').hasClass('active') && !$('#labelCVarN').hasClass('active')) {
          tablaContent += '</div>' +
          '<table  class="table table-striped table-bordered table-hover">' +
          '<thead>' +
          '<tr>' +
          '<th scope="col">'+(($('#var3').is(':checked') || $('#Cvar3').is(':checked')) ? "A" : "AB")+'</th>';
        }
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
          if (!$('#labelVarN').hasClass('active') && !$('#labelCVarN').hasClass('active')) {
            tablaContent += '<th scope="col">00</th>' +
            '<th scope="col">01</th>' +
            '<th scope="col">11</th>' +
            '<th scope="col">10</th>';
          }
        }
        if (!$('#labelVarN').hasClass('active') && !$('#labelCVarN').hasClass('active') ) {
          tablaContent += '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>';
        }
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
        if ($('#labelVarN').hasClass('active')) {
          tablaContent += '</tr>' +
          '</tbody>' +
          '</table>' +
          '</div></div></div>';
        }
    }
    //caso tablas de verdad
    if (tabla == "#tablaVerdadMini" || tabla == "#tablaVerdad") {
        //Generar los resultados aleatorios
       let cerosunos = true;
       while(cerosunos){
            for (var num = 0; num < vueltas; num++){
                resultados[num] = getRandom();
                if (resultados[num-1]!=resultados[num])
                    cerosunos = false;
            }
        }
        for (var num = 0; num < vueltas; num++) {
            tablaContent += '<tr>';
                tablaContent += '<td scope="row">' + dec2bin(num, numero_variable).charAt(0) + '</th>';
                valores[0] = dec2bin(num, numero_variable).charAt(0);
              for (var i = 1; i < numero_variable; i++) {
                tablaContent += '<td>' + dec2bin(num, numero_variable).charAt(i) + '</th>';
                valores[i] = dec2bin(num, numero_variable).charAt(i);
              }
            // Tabla de verdad dentro de las dos tablas
            if (tabla == "#tablaVerdad") {
                if (isAl) {
                    tablaContent += '<td class="table-success">' + resultados[num] + '</td>';
                }
                else {
                    if ($('#botonporFuncion').hasClass('active')) {
                        replaceFuncion = mainFuncion;
                        try {
                            replaceFuncion = booleanFun.parse(mainFuncion);
                            mainFuncion = mainFuncion.toUpperCase();
                            console.log(mainFuncion);
                            var mayus=65;
                              for (var j = 0; j < numero_variable; j++) {
                                if (mayus==70) {
                                  mayus++;
                                }
                                console.log(String.fromCharCode(mayus));
                                replaceFuncion = replaceFuncion.replace(eval("/"+String.fromCharCode(mayus)+"/g"), valores[j]);
                                mayus++;
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
                        var mayus = 65;
                        for (var i = 0; i <numero_variable; i++) {
                          if (i==5) {
                            mayus++;
                          }
                          if (valores[i] == '1') {
                              mainFuncion += String.fromCharCode(mayus);
                          }
                          if (valores[i] == '0') {
                              mainFuncion += String.fromCharCode(mayus)+"'";
                          }
                          mayus++;
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
    if (num < 0.5) return 1;  //probabilidad 0.5
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
            cadenaResultado += "<a href='#' onmouseover='resaltarResultados([" + resultadosConCombinacion[2][[...resultadosConCombinacion[1][i]][aux]]["minterms"] + "])'>" + multi + (productosSumas ? "</a>+" : '</a>');
            aux++;
        }
        cadenaResultado = productosSumas ? cadenaResultado.substring(0, cadenaResultado.length - 1) : cadenaResultado;
        if (repuestaCorrecta == i) {
            correcto = true;
            $('#resulados').append("<div class='alert alert-success' role='alert'><p>" + cadenaResultado + "</p><hr><p class='mb-0'>Tu solucion.</p></div>");
        } else{
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
function activarNVariablesAleatorio(){
    if ($('#var3').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 3;
    }
    if ($('#var4').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 4;
    }
    if ($('#var5').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 5;
    }

    $("#inputNVariables").css('display', 'flex');
    $("#var3").prop('disabled', true);
    $("#labelVar3").addClass('disabled');
    $("#var4").prop('disabled', true);
    $("#labelVar4").addClass('disabled');
    $("#var5").prop('disabled', true);
    $("#labelVar5").addClass('disabled');
    $("#cancelarNVariables").click(function (event){
        $("#labelVarN").removeClass('active');
        $("#inputNVariables").css('display', 'none');
        $("#var3").prop('disabled', false);
        $("#labelVar3").removeClass('disabled');
        $("#var4").prop('disabled', false);
        $("#labelVar4").removeClass('disabled');
        $("#var5").prop('disabled', false);
        $("#labelVar5").removeClass('disabled');
        //ActivarUltimoControl
        $("#var"+document.getElementById("cancelarNVariables").value).prop('checked', true);
        $("#labelVar"+document.getElementById("cancelarNVariables").value).addClass('active');
    });
}
function activarNVariablesConocido(){
    if ($('#Cvar3').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 3;
    }
    if ($('#Cvar4').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 4;
    }
    if ($('#Cvar5').is(':checked')) {
        document.getElementById("cancelarNVariables").value = 5;
    }
    $("#inputCNVariables").css('display', 'flex');
    $("#Cvar3").prop('disabled', true);
    $("#labelCVar3").addClass('disabled');
    $("#Cvar4").prop('disabled', true);
    $("#labelCVar4").addClass('disabled');
    $("#Cvar5").prop('disabled', true);
    $("#labelCVar5").addClass('disabled');
    $("#cancelarCNVariables").click(function (event){
        $("#labelCVarN").removeClass('active');
        $("#inputCNVariables").css('display', 'none');
        $("#Cvar3").prop('disabled', false);
        $("#labelCVar3").removeClass('disabled');
        $("#Cvar4").prop('disabled', false);
        $("#labelCVar4").removeClass('disabled');
        $("#Cvar5").prop('disabled', false);
        $("#labelCVar5").removeClass('disabled');
        //ActivarUltimoControl
        $("#var"+document.getElementById("cancelarNVariables").value).prop('checked', true);
        $("#labelVar"+document.getElementById("cancelarNVariables").value).addClass('active');
    });
}
function desactivarNVariables(ultimo){
    $("#labelVarN").removeClass('active');
    $("#inputNVariables").css('display', 'none');
    $("#var3").prop('disabled', false);
    $("#labelVar3").removeClass('disabled');
    $("#var4").prop('disabled', false);
    $("#labelVar4").removeClass('disabled');
    $("#var5").prop('disabled', false);
    $("#labelVar5").removeClass('disabled');
    //ActivarUltimoControl
    $("#var"+ultimo).prop('checked', true);
    $("#labelVar3"+ultimo).addClass('active');
}
