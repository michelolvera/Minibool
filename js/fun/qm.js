//Variables de informacion
var cantidadVariables = 0;
var kmapResultado = [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1];

//Arreglo de mini terminos
var miniTerminos = Array();

function ObtenerMiniTerminos(tablaVerdad) {
    //Calcular cantidad de variables
    cantidadVariables = Math.log2(tablaVerdad.length);
    var minTerms = Array();
    for (let index = 0; index < tablaVerdad.length; index++) {
        if (tablaVerdad[index] == 1) {
            //Nuevo MinTerm en la posicion index
            minTerms.push({ "minterms": [index], "bin": GenerarBinariosATexto(index), "indice": ContarUnos(GenerarBinariosATexto(index)) });
        }
    }

    //Ordenarlos de menor a mayor cantidad de unos mendiante burbuja
    let miniTermino;
    for (let i = 0; i < minTerms.length; i++) {
        for (let j = 0; j < minTerms.length - 1; j++) {
            if (minTerms[j]["indice"] > minTerms[j + 1]["indice"]) {
                miniTermino = minTerms[j]
                minTerms[j] = minTerms[j + 1];
                minTerms[j + 1] = miniTermino;
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
    let newMinTerm = { "minterms": Array(), "bin": "", "indice": 0 };
    for (let index = 0; index < cantidadVariables; index++) {
        if (mTerm1["bin"].charAt(index) != mTerm2["bin"].charAt(index)) {
            cantidadDiferencias++;
            if (cantidadDiferencias >= 2)
                return false;
            posCambio = index;
        }
    }

    //Agrega todos los miniterminos que componen el nuevo minitermino
    for (let i = 0; i < mTerm1["minterms"].length; i++) {
        newMinTerm["minterms"].push(mTerm1["minterms"][i]);
    }

    for (let j = 0; j < mTerm2["minterms"].length; j++) {
        newMinTerm["minterms"].push(mTerm2["minterms"][j]);
    }

    newMinTerm["bin"] = mTerm1["bin"].substring(0, posCambio) + "-" + mTerm1["bin"].substring(posCambio + 1, mTerm1["bin"].length);

    return newMinTerm;
}

function IniciarReduccion() {

}