//Variables de informacion
var cantidadVariables = 0;
//var kmapResultado = [1, 1, 1, 0, 0, 1, 1, 1];//Multiples soluciones wikipedia petrick
//var kmapResultado = [1, 0, 1, 1, 1, 1, 0, 1];//Multiples soluciones qm.pdf
//var kmapResultado = [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];//Solucion unica qm.pdf
//var kmapResultado = [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1]; //Solucion unica sin necesidad de Petrick https://www.youtube.com/watch?v=l1jgq0R5EwQ
//var kmapResultado = [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1];//Solucion unica con multiples soluciones incorrectas https://www.youtube.com/watch?v=VnZLRrJYa2I
//var kmapResultado = [0, 0, 0, 0, 1, 1, 0, 0]; //Ejercicio Profe
//var kmapResultado = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
//var kmapResultado = [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
var kmapResultado = [1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
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

function MetodoDePetrick(productosDeSumas, multiplesIdentidades = true) {
    let productosRecursivos = Array();
    if (productosDeSumas.length > 1) {
        //Distribuir y buscar similares con las reglas x+x=x, xx=x y x+xy=x, volver a llamar este metodo.
        //Distribuir y aplicar xx=x
        let dis1, dis2;
        let distribuido = Array();
        let continuar = true;
        for (let i = 0; i < productosDeSumas.length; i++) {
            for (let j = i + 1; j < productosDeSumas.length; j++) {
                for (let k = 0; k < productosDeSumas[i].length; k++) {
                    for (let l = 0; l < productosDeSumas[j].length; l++) {
                        if (new Set([...productosDeSumas[i][k]].filter(x => productosDeSumas[j][l].has(x))).size != 0) {
                            dis1 = i;
                            dis2 = j;
                            continuar = false;
                            break;
                        }
                        if (!continuar) break
                    }
                    if (!continuar) break
                }
                if (!continuar) break
            }
            if (!continuar) break
        }
        for (let i = 0; i < productosDeSumas[dis1].length; i++) {
            for (let j = 0; j < productosDeSumas[dis2].length; j++) {
                //Unir conjuntos
                distribuido.push(new Set([...productosDeSumas[dis1][i], ...productosDeSumas[dis2][j]]));
            }
        }
        //Llenar arreglo
        for (let i = 0; i < productosDeSumas.length; i++) {
            if (i == dis1 || i == dis2)
                continue;
            productosRecursivos.push(productosDeSumas[i]);
        }
        //Aplicar identidades
        if (multiplesIdentidades)
            distribuido = indentidadesPetrick(distribuido);//Necesario distribuir desde el principio?
        productosRecursivos.push(distribuido);
        return MetodoDePetrick(productosRecursivos, multiplesIdentidades);
    } else if (productosDeSumas.length == 1) {
        //Buscar terminos semejantes con ayuda de las reglas x+x=x, xx=x y x+xy=x?? y retornar el ultimo resultado
        if (!multiplesIdentidades)
            return indentidadesPetrick(productosDeSumas)[0];
        return productosDeSumas[0];
    } else
        return Array();
}

function indentidadesPetrick(sumas) {
    //Aplicar x+x=x encontrando las diferencias de conjuntos.
    //let cambios = 0;//Recursivo
    let eliminar = Array();
    for (let i = 0; i < sumas.length; i++) {
        for (let j = i + 1; j < sumas.length; j++) {
            if (new Set([...sumas[i]].filter(x => !sumas[j].has(x))).size == 0 && new Set([...sumas[j]].filter(x => !sumas[i].has(x))).size == 0) {
                eliminar.push(j);
            }
        }
    }
    let aux = Array();
    for (let i = 0; i < sumas.length; i++) {
        if (eliminar.includes(i)) {
            continue;
            //cambios++;
        }
        aux.push(sumas[i]);
    }
    sumas = aux;
    //Aplicar x+xy=x
    eliminar = Array();
    for (let i = 0; i < sumas.length; i++) {
        for (let j = i + 1; j < sumas.length; j++) {
            if (new Set([...sumas[i]].filter(x => !sumas[j].has(x))).size == 0) {
                eliminar.push(j);
                continue;
            }
            if (new Set([...sumas[j]].filter(x => !sumas[i].has(x))).size == 0) {
                eliminar.push(i);
                continue;
            }
        }
    }
    aux = Array();
    for (let i = 0; i < sumas.length; i++) {
        if (eliminar.includes(i)) {
            continue;
            //cambios++;
        }
        aux.push(sumas[i]);
    }
    //return cambios==0 ? aux : indentidadesPetrick(aux);//Recursivo
    return aux;
}

function ObtenerProductosDeSumas(implicantes) {
    let productosDeSumas = Array();
    for (let i = 0; i < implicantes.length; i++) {
        for (let j = i + 1; j < implicantes.length; j++) {
            for (let k = 0; k < implicantes[i].length; k++) {
                if (implicantes[i][k] && implicantes[j][k]) {
                    let suma = Array();
                    suma.push(new Set().add(String.fromCharCode(65 + i)));//String.fromCharCode(65 + i)
                    suma.push(new Set().add(String.fromCharCode(65 + j)));//String.fromCharCode(65 + j)
                    productosDeSumas.push(suma);
                    break;
                }
            }
        }
    }
    return productosDeSumas;
}

function ConvertirImplicanteAConjuntoExpresion(implicante) {
    let expresion = new Set();
    for (let i = 0; i < implicante["bin"].length; i++) {
        switch (implicante["bin"].charAt(i)) {
            case '0':
                expresion.add({ "var": String.fromCharCode(65 + i), "negada": true });
                break;
            case '1':
                expresion.add({ "var": String.fromCharCode(65 + i), "negada": false });
                break;
        }
    }
    return expresion;
}

function comprobarSolucionesPetrick(soluciones, miniTerminos, tablaImplicantes) {
    let auxPetrick = Array();
    for (let i = 0; i < soluciones.length; i++) {
        let comprobar = Array(miniTerminos.length);
        let agregar = true;
        for (let implicante of soluciones[i]) {
            for (let j = 0; j < tablaImplicantes[implicante.charCodeAt(0) - 65].length; j++) {
                if (tablaImplicantes[implicante.charCodeAt(0) - 65][j])
                    comprobar[j] = true;
            }
        }
        for (let j = 0; j < comprobar.length; j++) {
            if (!comprobar[j])
                agregar = false;
        }
        if (agregar)
            auxPetrick.push(soluciones[i]);
    }
    return auxPetrick;
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
    miniTerminos = OrdenarMiniTerminos(miniTerminos);//Ordenar mini terminos
    var tablaImplicantes = GenerarTablaImplicantesPrimos(miniTerminos, implicantes);
    console.log(tablaImplicantes);
    var productosDeSumas = ObtenerProductosDeSumas(tablaImplicantes);
    console.log(productosDeSumas);

    //Aplicar metodo de Petrick
    var terminosPetrick = MetodoDePetrick(productosDeSumas);
    console.log(terminosPetrick);
    //Limpiar resultados erroneos usando la tabla de implicantes primos
    terminosPetrick = comprobarSolucionesPetrick(terminosPetrick, miniTerminos, tablaImplicantes);
    if (terminosPetrick.length == 0) {
        //Petrick no regreso solucion correcta utilizando multiples identidades, comprobar una sola identidad, por lo tanto la solucion debe ser unica, comprobar solucion
        terminosPetrick = MetodoDePetrick(productosDeSumas, false);
        terminosPetrick = comprobarSolucionesPetrick(terminosPetrick, miniTerminos, tablaImplicantes);
        if (terminosPetrick.length == 0) {
            //No hay soluciones con una sola aplicacion de identidad, se tomaran todos los implicantes como solucion.
            terminosPetrick = [new Set()];
            let comprobar = Array(miniTerminos.length);
            for (let i = 0; i < tablaImplicantes.length; i++) {
                for (let j = 0; j < tablaImplicantes[i].length; j++) {
                    if (tablaImplicantes[i][j]) {
                        comprobar[j] = true;
                    }
                }
                terminosPetrick[0].add(String.fromCharCode(65 + i));
            }
            for (let j = 0; j < comprobar.length; j++) {
                if (!comprobar[j])
                    return null;
            }
        }
    }
    console.log(terminosPetrick);
    //Solucion encontrada, convertir a expresion
    let solucionesFinales = Array();
    for (let i = 0; i < terminosPetrick.length; i++) {
        let solucion = new Set();
        for (let implicante of terminosPetrick[i]) {
            solucion.add(ConvertirImplicanteAConjuntoExpresion(implicantes[implicante.charCodeAt(0) - 65]));
        }
        solucionesFinales.push(solucion);
    }
    return solucionesFinales;
}