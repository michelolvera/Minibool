    $(document).ready(function () {
        $("#inpFuncion").hide();
        $('#inpTabla').hide();
        $('#inpTablaK').hide();
        $('#tablaMapaK').hide();
        $('#circuitoContenedor').hide();
        $('#inputFuncion').val("");
        $('#btnIniciarConocido').hide();
        $('#mapaContenedor').hide();
    });
    $(document).on('click', '.modal', function () {

        // su acción
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
    }
    function mapak() {
        $('#botonporMapaK').addClass('active');
        $('#botonporTabladeVerdad').removeClass('active');
        $('#botonporFuncion').removeClass('active');
        $("#inpFuncion").hide();
        $('#inpTabla').hide();
        $('#tablaMapaKMini').show();
        $('#btnIniciarConocido').show();
        crear('#tablaMapaKMini', false)
    }
    var limpiar = function (tabla) {
        $(tabla).html('');
    }
    var activarEjercicios = function () {
        $('#btnEjercicios').removeClass('disabled')
    }
    var cambioCvar = function () {
        if ($('#botonporFuncion').hasClass('active')) {
            func();
        }
        else if ($('#botonporTabladeVerdad').hasClass('active')) {
            tabla();
        }
        else if ($('#botonporMapaK').hasClass('active')) {
            mapak();
        }
    }
    var crear = function (tabla, isAl) {
        var mainFuncion = "";
        var valA = "";
        var valB = "";
        var valC = "";
        var valD = "";
        var valE = "";
        var vars = "";
        var f = "";
        var tablaContent = "";
        var vueltas = 0;
        limpiar(tabla);
        limpiar("#tablaMapaKMini");
        if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
            vueltas = 8;
        }
        if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
            vueltas = 16;
        }
        if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
            vueltas = 32;
        }
        // Entrada de la funcion
        if ($('#botonporFuncion').hasClass('active')) {
            mainFuncion = $("#inputFuncion").val();
        }
        else {

        }
        //Caso tabla de verdad grande
        if (tabla == "#tablaVerdad") {
            $('#btnEjercicios').addClass('disabled')
            $('#cardFuncion').html('F=' + mainFuncion + '<button href="./principal" class="btn btn-outline-danger derecha" onclick="activarEjercicios(), location.reload()" data-toggle="modal">Detener ejercicio</button>')
            $('#tabtablaVerdad').removeClass('disabled')
            $('#tabtablaVerdad').addClass('active')
            $('#tabMapakarnaugh').removeClass('disabled')
            $('#tabCircuito').removeClass('disabled')
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
          console.log('si entro al caso de la tabla tablaMapaKMini');
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
              '<div class="col-12 col-sm-6 col-md-11">' +
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
          tablaContent += '</div>'+
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
                // CASO MAPA DE KARNAUGH MINI DENTRO DE LOS DOS KARNAUGH
                  if (tabla == "#tablaMapaKMini") {
                      if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
                          if (num == 0) {
                            tablaContent += '<th scope="row">0</th>'
                          }
                      else if (num == 4) {
                          tablaContent += '</tr><tr><th scope="row">1</th>'
                      }
                      tablaContent += '<td>' +
                          '<button id="btnMapak' + num + '" class="btn verde" onClick="cambiarNum(' + num + ')">0</button>' +
                          '</td>';
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
                      tablaContent += '<td>' +
                          '<button id="btnMapak' + num + '" class="btn verde" onClick="cambiarNum(' + num + ')">0</button>' +
                          '</td>';
                  }
                  if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
                      if (num == 0) {
                          tablaContent += '<th scope="row">00</th>'
                      }
                      else if (num == 8) {
                          tablaContent += '</tr><tr><th scope="row">01</th>'
                      }
                      else if (num == 16) {
                          tablaContent += '</tr><tr><th scope="row">11</th>'
                      }
                      else if (num == 24) {
                          tablaContent += '</tr><tr><th scope="row">10</th>'
                      }
                      tablaContent += '<td>' +
                          '<button id="btnMapak' +num+ '" class="btn verde" onClick="cambiarNum(' + num + ')">0</button>' +
                          '</td>';
                  }
                  console.log($('#btnMapak' + num).html());
                }
                //CASO TABLA MAPA DE KARNAUGH GRANDE DENTRO DE LOS DOS KARNAUGH
                if (tabla == "#tablaMapaK") {
                  if ($('#botonporMapaK').hasClass('active')) {
                    if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
                        if (num == 0) {
                          tablaContent += '<th scope="row">0</th>'
                        }
                    else if (num == 4) {
                        tablaContent += '</tr><tr><th scope="row">1</th>'
                    }
                    tablaContent += '<td>' + $('#btnMapak' + num).html()+'</td>';
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
                    tablaContent += '<td>' + $('#btnMapak' + num).html()+'</td>';
                }
                if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
                    if (num == 0) {
                        tablaContent += '<th scope="row">00</th>'
                    }
                    else if (num == 8) {
                        tablaContent += '</tr><tr><th scope="row">01</th>'
                    }
                    else if (num == 16) {
                        tablaContent += '</tr><tr><th scope="row">11</th>'
                    }
                    else if (num == 24) {
                        tablaContent += '</tr><tr><th scope="row">10</th>'
                    }
                    tablaContent += '<td>' + $('#btnMapak' + num).html()+'</td>';
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
                if (tabla == "#tablaVerdad") {
                    if (isAl) {
                        tablaContent += '<td>' + getRandom() + '</td>';
                    }
                    else {
                        if ($('#botonporFuncion').hasClass('active')) {
                            var replaceFuncion = mainFuncion;
                            var res = "";
                            replaceFuncion = replaceFuncion.replace('A', valA)
                            replaceFuncion = replaceFuncion.replace('B', valB)
                            replaceFuncion = replaceFuncion.replace('C', valC)
                            replaceFuncion = replaceFuncion.replace('D', valD)
                            replaceFuncion = replaceFuncion.replace('E', valE)
                            replaceFuncion = replaceFuncion.replace('*', "&&")
                            replaceFuncion = replaceFuncion.replace("1'", "0")
                            replaceFuncion = replaceFuncion.replace("0'", "1")
                            if (!!eval(replaceFuncion)) {
                                res = "1"
                            } else {
                                res = "0"
                            }
                            tablaContent += '<td>' + res + '</td>';
                        }
                        if ($('#botonporTabladeVerdad').hasClass('active')) {
                            tablaContent += '<td>' + $('#btnTabla' + num).html() + '</td>';
                        }
                        if ($('#botonporMapaK').hasClass('active')) {
                            tablaContent += '<td>' + $('#btnMapak' + num).html() + '</td>';
                        }
                    }
                }
                else if (tabla == "#tablaVerdadMini") {
                    tablaContent += '<td class="no-border"><button id="btnTabla' + num + '" class="btn verde"  onClick="cambiarNum(' + num + ')">0</button></td>';
                }
                tablaContent += '</tr>';
            }
            tablaContent += '</tbody>';
        }
        $(tabla).append(tablaContent);
        if(tabla!='#tablaMapaK' && tabla!='#tablaMapaKMini'){
          crear('#tablaMapaK', false);
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
        return Math.floor(Math.random() * (2 - 0)) + 0;
    }
    function cambiarNum(num) {
        console.log('entre a la funcion cambiarNum');
        if ($('#btnTabla' + num).html() == '0') {
            $('#btnTabla' + num).html('1');
            console.log('entre al if');
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

    var tabTablaclick = function () {
        $('#tablaContenedor').show();
        $('#tablaMapaK').hide();
        $('#circuitoContenedor').hide();
    }
    var tabMapaclick = function () {
        $('#tablaContenedor').hide();
        $('#tablaMapaK').show();
        $('#circuitoContenedor').hide();

    }
    var tabCircuitoclick = function () {
        $('#tablaContenedor').hide();
        $('#tablaMapaK').hide();
        $('#circuitoContenedor').show();
    }
