//Variables de informacion
var cantidadVariables = 0;
var kmapResultado = [1, 0, 1, 1, 1, 1, 0, 1];
//var kmapResultado = [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
//var kmapResultado = [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1];

function ObtenerMiniTerminos(tablaVerdad) {
    //Calcular cantidad de variables
    cantidadVariables = Math.log2(tablaVerdad.length);
    var minTerms = Array();
    for (let index = 0; index < tablaVerdad.length; index++) {
        if (tablaVerdad[index] == 1) {
            //Nuevo MinTerm en la posicion index
            minTerms.push({ "minterms": [index], "bin": GenerarBinariosATexto(index), "indice": ContarUnos(GenerarBinariosATexto(index)), "combinado": false });
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
    for (let index = 0; index < cantidadVariables; index++) {
        if (mTerm1["bin"].charAt(index) != mTerm2["bin"].charAt(index)) {
            cantidadDiferencias++;
            if (cantidadDiferencias >= 2)
                return false;
            posCambio = index;
        }
    }

    if (cantidadDiferencias == 0)
        return mTerm1;

    //Agrega todos los miniterminos que componen el nuevo minitermino
    let newMinTerm = { "minterms": Array(), "bin": "", "indice": 0, "combinado": false };
    for (let i = 0; i < mTerm1["minterms"].length; i++) {
        newMinTerm["minterms"].push(mTerm1["minterms"][i]);
    }

    for (let j = 0; j < mTerm2["minterms"].length; j++) {
        if (!newMinTerm["minterms"].includes(mTerm2["minterms"][j]))
            newMinTerm["minterms"].push(mTerm2["minterms"][j]);
    }
    newMinTerm["bin"] = mTerm1["bin"].substring(0, posCambio) + "-" + mTerm1["bin"].substring(posCambio + 1, mTerm1["bin"].length);
    newMinTerm["indice"] = ContarUnos(newMinTerm["bin"]);
    return newMinTerm;
}

function ReductorRecursivo(miniTerms) {
    console.log(miniTerms);
    let contadorConbinaciones = 0;
    let implicantesPrimarios = Array();
    for (let i = 0; i < miniTerms.length; i++) {
        if (j = i + 1 != null)
            for (let j = i + 1; j < miniTerms.length; j++) {
                if (miniTerms[i]["indice"] == miniTerms[j]["indice"]) {
                    continue;
                }
                let miniTerm = CompararMinTerms(miniTerms[i], miniTerms[j]);
                if (miniTerm) {
                    contadorConbinaciones++;
                    implicantesPrimarios.push(miniTerm);
                    miniTerms[i]["combinado"] = true;
                    miniTerms[j]["combinado"] = true;
                }
            }
        if (!miniTerms[i]["combinado"]){
            implicantesPrimarios.push(miniTerms[i]);
        }   
    }
    return contadorConbinaciones == 0 ? miniTerms : ReductorRecursivo(implicantesPrimarios);
}

function GenerarTablaImplicantesPrimos(miniTerminos, implicantesPrimos){
    //Ordenar mini terminos de mayor a menor en valor binario
    let miniTermino;
    for (let i = 0; i < miniTerminos.length; i++) {
        for (let j = 0; j < miniTerminos.length - 1; j++) {
            if (miniTerminos[j]["minterms"][0] > miniTerminos[j + 1]["minterms"][0]) {
                miniTermino = miniTerminos[j]
                miniTerminos[j] = miniTerminos[j + 1];
                miniTerminos[j + 1] = miniTermino;
            }
        }
    }

    let tabla = Array();
    for (let i = 0; i < implicantesPrimos.length; i++) {
        let fila = Array();
        for (let j = 0; j < miniTerminos.length; j++) {
            fila.push(implicantesPrimos[i]["minterms"].includes(miniTerminos[j]["minterms"][0]) ? true : false);
        }
        tabla.push(fila);
    }

    return tabla;
}

function OrdenarMiniTerminos(cantidadUnos){
    
}

function IniciarReduccion() {
    var miniTerminos = ObtenerMiniTerminos(kmapResultado);
    var implicantes = ReductorRecursivo(miniTerminos);
    //Limpiar Implicantes Duplicados
    let posRepetido = Array();
    for (let i = 0; i < implicantes.length - 1; i++) {
        for (let j = i + 1; j < implicantes.length; j++) {
            if (implicantes[i]["bin"] == implicantes[j]["bin"]) {
                posRepetido.push(j);
            }
        }
    }
    let aux = Array();
    for (let index = 0; index < implicantes.length; index++) {
        if(!posRepetido.includes(index))
            aux.push(implicantes[index]);
    }
    implicantes=aux;
    console.log(implicantes);
    var tablaImplicantes = GenerarTablaImplicantesPrimos(miniTerminos, implicantes);
    console.log(tablaImplicantes);
}