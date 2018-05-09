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

    return OrdenarMiniTerminos(minTerms, true);
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
        if (!miniTerms[i]["combinado"]) {
            implicantesPrimarios.push(miniTerms[i]);
        }
    }
    return contadorConbinaciones == 0 ? miniTerms : ReductorRecursivo(implicantesPrimarios);
}

function GenerarTablaImplicantesPrimos(miniTerminos, implicantesPrimos) {
    //Ordenar mini terminos de mayor a menor en valor binario
    miniTerminos = OrdenarMiniTerminos(miniTerminos);

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

function OrdenarMiniTerminos(miniTerminos, cantidadUnos = false) {
    let miniTermino;

    if (cantidadUnos) {
        for (let i = 0; i < miniTerminos.length; i++) {
            for (let j = 0; j < miniTerminos.length - 1; j++) {
                if (miniTerminos[j]["indice"] > miniTerminos[j + 1]["indice"]) {
                    miniTermino = miniTerminos[j]
                    miniTerminos[j] = miniTerminos[j + 1];
                    miniTerminos[j + 1] = miniTermino;
                }
            }
        }
    } else {
        for (let i = 0; i < miniTerminos.length; i++) {
            for (let j = 0; j < miniTerminos.length - 1; j++) {
                if (miniTerminos[j]["minterms"][0] > miniTerminos[j + 1]["minterms"][0]) {
                    miniTermino = miniTerminos[j]
                    miniTerminos[j] = miniTerminos[j + 1];
                    miniTerminos[j + 1] = miniTermino;
                }
            }
        }
    }

    return miniTerminos;
}

function MetodoDePetrick(productosDeSumas) {
    let productosRecursivos = Array();
    if (productosDeSumas.length > 1) {
        //Distribuir y buscar similares con las reglas x+x=x, xx=x y x+xy=x, volver a llamar este metodo.
        let distribuido = Array();
        for (let i = 0; i < productosDeSumas[0].length; i++) {
            for (let j = 0; j < productosDeSumas[1].length; j++) {
                //Unir conjuntos
                distribuido.push(new Set([...productosDeSumas[0][i],...productosDeSumas[1][j]]));
            }
        }
        let prueba = new Set([new Set(["A","B"])]);
        prueba.add(new Set(["B","A"]));
        console.log(prueba);
    } else if (productosDeSumas.length == 1) {
        //Buscar terminos semejantes con ayuda de las reglas x+x=x, xx=x y x+xy=x y retornar el ultimo resultado
    } else
        return Array();
}

function ObtenerProductosDeSumas(implicantes) {
    let productosDeSumas = Array();
    for (let i = 0; i < implicantes.length; i++) {
        for (let j = i + 1; j < implicantes.length; j++) {
            for (let k = 0; k < implicantes[i].length; k++) {
                if (implicantes[i][k] && implicantes[j][k]) {
                    let suma = Array();
                    suma.push(new Set().add(String.fromCharCode(65 + i)));
                    suma.push(new Set().add(String.fromCharCode(65 + j)));
                    productosDeSumas.push(suma);
                    break;
                }
            }
        }
    }
    return productosDeSumas;
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
        if (!posRepetido.includes(index))
            aux.push(implicantes[index]);
    }
    implicantes = aux;
    /////////////////////////////
    console.log(implicantes);
    var tablaImplicantes = GenerarTablaImplicantesPrimos(miniTerminos, implicantes);
    console.log(tablaImplicantes);
    var productosDeSumas = ObtenerProductosDeSumas(tablaImplicantes);
    console.log(productosDeSumas);
    var terminosPetrick = MetodoDePetrick(productosDeSumas);
}