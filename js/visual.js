
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

    $('#exampleModal').on('shown.bs.modal', function () {
        $('#exampleModal').trigger('focus')
    })

    $("#botonporTabladeVerdad").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = false;
    });
    $("#botonporMapaK").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = false;
    });
    $("#botonporFuncion").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = true;
    });
function mFuncion(){
    document.getElementById("inpFuncion").style.visibility = true;
    var x = document.getElementById("botonporTabladeVerdad");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function oFuncion(){
    document.getElementById("inpFuncion").style.visibility = false;
    var x = document.getElementById("botonporTabladeVerdad");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
var crear = function(){
  $('#content').html ='
      hola
  ';
}
