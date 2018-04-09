function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //$('.alert').alert('close')
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

    $('#exampleModal').on('shown.bs.modal', function () {
        $('#exampleModal').trigger('focus')
    })

function mFuncion(){
    document.getElementById("intFuncion").style.display = block;
    $('.alert').alert('close')
}
function oFuncion(){
    document.getElementById("intFuncion").style.display = none;
}