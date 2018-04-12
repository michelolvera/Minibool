
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
var mFuncion = function (){
  console.log("molis");
    document.getElementById("inpFuncion").style.visibility = true;
    var x = document.getElementById("botonporTabladeVerdad");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
var oFuncion = function(){
    console.log("olis");
    document.getElementById("inpFuncion").style.visibility = false;
    var x = document.getElementById("botonporTabladeVerdad");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

var crear = function(){
  closeNav();
  $('#content').load('tablaDeVerdad.html');
  if($('#var4').is(':checked')){
    console.log('cuatro');
     $('td:nth-child(2),th:nth-child(2)').hide();
  }
  if($('#var5').is(':checked')){
    $('td:nth-child(3),th:nth-child(3)').hide();
  }

};
