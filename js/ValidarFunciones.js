function teclaAClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"A");
  validarEntrada();
}
function teclaBClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"B");
  validarEntrada();
}
function teclaCClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"C");
  validarEntrada();
}
function teclaDClick(){
  if($('#teclaD').hasClass('btn-primary')) {
    $('#inputFuncion').val($('#inputFuncion').val()+"D");
    validarEntrada();
  }
}
function teclaEClick(){
  if($('#teclaE').hasClass('btn-primary')) {
    $('#inputFuncion').val($('#inputFuncion').val()+"E");
    validarEntrada();
  }
}
function teclaIzqClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"(");
  validarEntrada();
}
function teclaDerClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+")");
  validarEntrada();
}
function teclaNegClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"'");
  validarEntrada();
}
function teclaMasClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"+");
  validarEntrada();
}
function teclaPorClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"*");
  validarEntrada();
}


////////////////////  FUNCIONES PARA VALIDAR FUNCIONES  ///////////////////
function validarEntrada(){
  if($("#inputFuncion").val()===null){
    $("#invalidMessage").text(JsonIdioma["invalidParenthMessage"]);
  }
  isBalanced();
  if($("#inputFuncion").hasClass('is-invalid')){
    return false;
  }
  var regNUM =/\([ABC\+']+\)/gi
  console.log($( "#inputFuncion" ).val())

  if(regNUM.test($("#inputFuncion").val())){
    $( "#inputFuncion" ).removeClass('is-invalid')
    $( "#inputFuncion" ).addClass('is-valid')
    $('#btnIniciarConocido').show();
    return true;
  }
  else{
    $( "#inputFuncion" ).removeClass('is-valid')
    $( "#inputFuncion" ).addClass('is-invalid')
    $('#btnIniciarConocido').hide();
    return false;
  }
}

var tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];
// *** Check if character is an opening bracket ***
function isOpenParenthesis(parenthesisChar) {
  for (var j = 0; j < tokens.length; j++) {
    if (tokens[j][0] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

// *** Check if opening bracket matches closing bracket ***
function matches(topOfStack, closedParenthesis) {
  for (var k = 0; k < tokens.length; k++) {
    if (tokens[k][0] === topOfStack && tokens[k][1] === closedParenthesis) {
      return true;
    }
  }
  return false;
}

// *** Checks if item is any sort of paranthesis ***
function isParanthesis(char) {
  var str = '{}[]()';
  if (str.indexOf(char) > -1) {
    return true;
  } else {
    return false;
  }
}

// *** Prints answer of the string to the HTML page  ***
function printToScreen(bool) {
  var parensStr = document.getElementById('inputFuncion');
  var inputStr = parensStr.value

  if (bool) {
    $( "#inputFuncion" ).removeClass('is-invalid')
    $( "#inputFuncion" ).addClass('is-valid')
    $('#btnIniciarConocido').show();
    $("#invalidMessage").text("");
  } else {
    $( "#inputFuncion" ).removeClass('is-valid')
    $( "#inputFuncion" ).addClass('is-invalid')
    $('#btnIniciarConocido').hide();
    $("#invalidMessage").text(JsonIdioma["invalidParenthMessage"]);
  }
}

// *** We excute this function upon the event ***
function isBalanced() {
  var parensStr = document.getElementById('inputFuncion');
  var inputStr = parensStr.value
  if (inputStr === null) { printToScreen(true); }

  var expression = inputStr.split('');
  var stack = [];

  for (var i = 0; i < expression.length; i++) {
    if (isParanthesis(expression[i])) {
      if (isOpenParenthesis(expression[i])) {
        stack.push(expression[i]);
      } else {
        if (stack.length === 0) {
          return printToScreen(false);
        }
        var top = stack.pop(); // pop off the top element from stack
        if (!matches(top, expression[i])) {
          return printToScreen(false);
        }
      }
    }
  }

  var returnValue = stack.length === 0 ? true : false;
  printToScreen(returnValue)
}
