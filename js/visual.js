
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
  $('#bienvenidos').empty;
  $('#content').html ='<table class="table table-striped">'+
  '<thead>'+
    '<tr>'+
      '<th scope="col">#</th>'+
      '<th scope="col">First</th>'+
      '<th scope="col">Last</th>'+
      '<th scope="col">Handle</th>'+
    '</tr>'+
  '</thead>'+
  '<tbody>'+
    '<tr>'+
      '<th scope="row">1</th>'+
      '<td>Mark</td>'+
      '<td>Otto</td>'+
      '<td>@mdo</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">2</th>'+
      '<td>Jacob</td>'+
      '<td>Thornton</td>'+
      '<td>@fat</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">3</th>'+
      '<td>Larry</td>'+
      '<td>the Bird</td>'+
      '<td>@twitter</td>'+
    '</tr>'+
  '</tbody>'+
'</table>';
};
