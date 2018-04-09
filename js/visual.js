function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

    $('#exampleModal').on('shown.bs.modal', function () {
        $('#exampleModal').trigger('focus')
    })

function mFuncion(){
    document.getElementById("intFuncion").style.display = block;
}
function oFuncion(){
    document.getElementById("intFuncion").style.display = none;
}