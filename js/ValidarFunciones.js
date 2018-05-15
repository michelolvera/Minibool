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
  console.log(BoolAtom($('#inputFuncion').val()));
  if($("#inputFuncion").val()==null){
    $("#invalidMessage").text(JsonIdioma["invalidParenthMessage"]);
  }
  isBalanced();
  if($("#inputFuncion").hasClass('is-invalid')){
    return false;
  }
  var regNUM =/\([ABC\+']+\)/gi
  console.log($( "#inputFuncion" ).val())

  //////////prueba///////////

  var input = $('#inputFuncion').val();
  		try {
  			var min_terms = MinTerms.fromExpression(input);
        $( "#inputFuncion" ).removeClass('is-invalid')
        $( "#inputFuncion" ).addClass('is-valid')
  		} catch(e) {
  			if(e instanceof InvalidTokenException){
  				var message = 'Syntax Error: ';
  				for(var i = 0; i < input.length; i++){
  					if(i + 1 == e.position){
  						message += "<strong class='error'>" + input[i] + "</strong>";
  					}
  					else
  						message += input[i];
  				}
  				$("#invalidMessage").text(message);
          $( "#inputFuncion" ).removeClass('is-valid')
          $( "#inputFuncion" ).addClass('is-invalid')
  				return;
  			} else if(e instanceof MissingTokenException){
  				var message = 'Missing Token: ';
  				for(var i = 0; i < input.length; i++){
  					if(i + 1 == e.position){
  						message += "<strong class='error'>" + input[i] + "</strong>";
  					}
  					else
  						message += input[i];
  				}
  				$('#invalidMessage').text(message);
          $( "#inputFuncion" ).removeClass('is-valid')
          $( "#inputFuncion" ).addClass('is-invalid')
  				return;
  			} else {
  				$('#invalidMessage').text("Invalid Expression!");
          $( "#inputFuncion" ).removeClass('is-valid')
          $( "#inputFuncion" ).addClass('is-invalid')
  				return;
  			}
  		}
  		var f = new BooleanFunction(min_terms);
      console.log(f);
  ///////////////////////////

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
    $("#invalidMessage").text(JsonIdioma["invalidMainMessage"]);
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
//////////////// PARSER/////////////////////
/* Grammer
bool -> bool_term {+ bool_term}
bool_term -> bool_factor {^ bool_factor}
bool_factor -> bool_atom {bool_atom}
bool_atom -> bool_atom' | (bool) | var
*/
Token = {
	hayEspacios : function(c){
		switch(c){
			case " ":
			case "\n":
			case "\t":
			case "\r":
			case "\f":
			case "\v":
			case "\0":
				return true;
		}
		return false;
	},

	esVariable : function(c){
		return ((c >= 'A' && c <= 'E') || (c >= 'a' && c <= 'e'));
	},

	esOperador : function(c){
		switch(c){
			case "+":
			case "^":
			case "'":
			case "(":
			case ")":
				return true;
		}

		return false;
	}
}

function AndExpression(left, right){
	this.eval = function(symbol_values){
		return left.eval(symbol_values) && right.eval(symbol_values);
	}
}

function XorExpression(left, right){
	this.eval = function(symbol_values){
		p = left.eval(symbol_values);
		q = right.eval(symbol_values);
		return (p && !q) || (!p && q);
	}
}

function OrExpression(left, right){
	this.eval = function(symbol_values){
		return left.eval(symbol_values) || right.eval(symbol_values);
	}
}

function VariableExpression(symbol){
	this.eval = function(symbol_values) {
		return !!symbol_values[symbol];
	}
}

function NotExpression(unary){
	this.eval = function(symbol_values){
		return !unary.eval(symbol_values);
	}
}

function Bool(lexer){
	var e = BoolTerm(lexer);
	while(1){
		if(lexer.token() == "+"){
			lexer.match("+");
			e = new OrExpression(e, BoolTerm(lexer));
		} else {
			break;
		}
	}
	return e;
}

function BoolTerm(lexer){
	var e = BoolFactor(lexer);
	while(1){
		if(lexer.token() == "^"){
			lexer.match("^");
			e = new XorExpression(e, BoolFactor(lexer));
		} else {
			break;
		}
	}

	return e;
}

function BoolFactor(lexer){
	var e = BoolAtom(lexer);
	while(1){
		// ANDs can ride up against another variable or a (
		if(Token.esVariable(lexer.token()) || lexer.token() == "("){
			e = new AndExpression(e, BoolAtom(lexer));
		} else {
			break;
		}
	}

	return e;
}

function BoolAtom(lexer){
	var e = null;
 	if(Token.esVariable(lexer.token())){
		e = new VariableExpression(lexer.token());
		lexer.match(lexer.token());
	} else if(lexer.token() == "("){
		lexer.match("(");
		e = Bool(lexer);
		lexer.match(")");
	} else {
		lexer.match('  '); // won't match anything, throws missing token exception
	}

	// look for negative;
	if(lexer.token() == "'"){
		e = new NotExpression(e);
		lexer.match("'")
	}
	return e;
}

function InvalidTokenException(tok, position){
	this.position = position;
	this.tok = tok;
	this.toString = function(){
		return "Simbolo invalido " + this.tok + " en la posición " + this.position;
	}
}

function MissingTokenException(given, expected, position){
	this.position = position;
	this.given = given;
	this.expected = expected;
	this.toString = function(){
		return "Simbolo faltante. Se esperaba " + this.expected + " en la posición " + this.position;
	}
}

function InvalidExpressionException(){
	this.toString = function(){
		return "Expresion invalida";
	}
}

function BooleanExpressionLexer(expr){
	var index = 0;
	var tokens = [];

	var parse = function(){
		// find all the tokens and push them on the stack
		for(var i = 0; i < expr.length; i++){
			var tok = expr[i];
			if(Token.hayEspacios(tok)){
				continue;
			} else if(Token.esVariable(tok) || Token.esOperador(tok)){
				tokens.push(tok);
			} else {
				throw new InvalidTokenException(tok, i + 1);
			}
		}
	}

	// get the next token on the stack
	this.nextToken = function(){
		return tokens[index++];
	}

	// get the current token
	this.token = function(){
		return tokens[index];
	}

	// verify the current token matches the specified token, and move to the next token
	this.match = function(c){
		if(c != this.token()){
			throw new MissingTokenException(this.token(), c, index);
		}
		this.nextToken();
	}

	this.toString = function(){
		return tokens.toString();
	}

	// get a sorted list of all the variables in the expression
	this.variables = function(){
		// use a hash table to eliminate duplicate vars
		var vars = {};
		for(var i = 0; i < tokens.length; i++){
			if(Token.esVariable(tokens[i]))
				vars[tokens[i]] = tokens[i];
		}

		// now load the variables into an array
		var vars_array = []
		for(var k in vars){
			vars_array.push(vars[k]);
		}
		vars_array.sort();

		return vars_array;
	}
	parse();
}
