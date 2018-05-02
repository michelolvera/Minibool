//Variables de informacion
var cantidadVariables = 0;
var kmapResultado = [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0];

//Arreglo de mini terminos
var miniTerminos = Array();

function ObtenerMiniTerminos(tablaVerdad) {
    //Calcular cantidad de variables
    cantidadVariables = Math.log2(tablaVerdad.length);
    var minTerms = Array();
    for (let index = 0; index < tablaVerdad.length; index++) {
        if (tablaVerdad[index] == 1) {
            //Nuevo MinTerm en la posicion index
            minTerms.push({ "dec": index, "bin": GenerarBinariosATexto(index), "indice": ContarUnos(GenerarBinariosATexto(index)) });
        }
    }

    //Ordenarlos de menor a mayor cantidad de unos mendiante burbuja
    let miniTermino;
    for (let i = 0; i < minTerms.length; i++) {
        for (let j = 0; j < minTerms.length - 1; j++) {
            if (minTerms[j]["indice"] > minTerms[j + 1]["indice"]){
                miniTermino = minTerms[j]
                minTerms[j]= minTerms[j + 1];
                minTerms[j+1]=miniTermino;
            }
        }
    }

    return minTerms;
}

function GenerarBinariosATexto(numDec) {
    if (numDec.toString(2).length < cantidadVariables) {
        let stringAux = "";
        for (let index = 0; index < cantidadVariables - numDec.toString(2).length; index++) {
            stringAux += "0";
        }
        return stringAux + numDec.toString(2);
    }
    return numDec.toString(2);
}

function ContarUnos(StringBool) {
    let aux = 0;
    for (let index = 0; index < StringBool.length; index++) {
        if (StringBool.charAt(index) == '1')
            aux++;
    }
    return aux;
}

function CompararMinTerms(mTerm1, mTerm2) {
    let cantidadDiferencias = 0;
    let posCambio;
    for (let index = 0; index < cantidadVariables; index++) {
        if (mTerm1.charAt(index) != mTerm2.charAt(index)) {
            cantidadDiferencias++;
            posCambio = index;
        }
    }
    if (cantidadDiferencias == 1) {
        //Nuevo MinTermino
    }
}

function IniciarReduccion() {

}