var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var grafica;
function CargarFunciones() {
    inicializacion();
}

function ValidarCookie() {
    comprobarAdminPagina();
}

function CargarTextosPagina() {

}

function inicializacion(){
    var datos_usuario=[];
    var colores_usuario=[];
    var labels_paises=[];
    $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "GraficaUsuarios",
          userName: getCookie("user"),
          userPass: getCookie("pass")
        },
        dataType: "json"
      })
        .done(function (jsonObject) {
          jsonObject.forEach(element => {
              
          });
        })
        .fail(function () {
          alert("No tienes los privilegios para ver esto");
        });
    for(var i=0; i<5 ;i++){
        datos_usuario.push(i);
        colores_usuario.push(dame_color_aleatorio());
        labels_paises.push("dato"+i);
    }
    var datos = {
        type : "pie",
        data : {
            datasets : [{
                data :[
                    1,
                    4,
                ],
                backgroundColor : [
                    dame_color_aleatorio(),
                    dame_color_aleatorio(),
                ],
            }],
            labels :[
                "dato1",
                "dato2",
            ]
        }
    };
    datos.data.datasets[0].data=datos_usuario;
    datos.data.datasets[0].backgroundColor=colores_usuario;
    datos.data.labels=labels_paises;
    var $myCanvas = $('#grafica_estudiantes');
    grafica = new Chart($myCanvas,datos);
}

function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
 } 

function dame_color_aleatorio(){
    hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
    var color_aleatorio = "#";
    for (i=0;i<6;i++){
       posarray = aleatorio(0,hexadecimal.length)
       color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
 } 

 