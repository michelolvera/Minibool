//Variables de informacion
var cantidadVariables = 0;
var kmapResultado = [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0];
var cantidadUnos = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5];
var numBinarios = ["00000","00001","00010","00011","00100","00101","00110","00111","01000","01001","01010","01011","01100","01101","01110","01111","10000","10001","10010","10011","10100","10101","10110","10111","11000","11001","11010","11011","11100","11101","11110","11111"];

//Variables de grupos de cantidades de 1s
var grupoIndice0 = Array();
var grupoIndice1 = Array();
var grupoIndice2 = Array();
var grupoIndice3 = Array();
var grupoIndice4 = Array();
var grupoIndice5 = Array();

function ObtenerKmapAMinTerms(funcionResultado) {
    //Calcular cantidad de variables
    let cantidadResultados = funcionResultado.length;
    while (cantidadResultados>=2){
        cantidadVariables++;
        cantidadResultados/=2;
    }
    
    var minTerms = Array();
    for (let index = 0; index < funcionResultado.length; index++) {
        if (funcionResultado[index] == 1) {
            //Nuevo MinTerm en la posicion index
            minTerms.push(index);
        }
    }
    return minTerms;
}

function AgruparMinTerms(minTerms) {
    for (let index = 0; index < minTerms.length; index++) {
        switch (cantidadUnos[minTerms[index]]) {
            case 0:
                grupoIndice0.push(minTerms[index]);
                break;
            case 1:
                grupoIndice1.push(minTerms[index]);
                break;
            case 2:
                grupoIndice2.push(minTerms[index]);
                break;
            case 3:
                grupoIndice3.push(minTerms[index]);
                break;
            case 4:
                grupoIndice4.push(minTerms[index]);
                break;
            case 5:
                grupoIndice5.push(minTerms[index]);
                break;
        }
    }
}

function compararMinTerms(mTerm1, mTerm2){
    let cantidadDiferencias = 0;
    let posCambio;
    for (let index = 0; index < cantidadVariables; index++) {
        if(mTerm1.charAt(index) != mTerm2.charAt(index)){
            cantidadDiferencias++;
            posCambio = index;
        }
    }
    if (cantidadDiferencias == 1){
        //Nuevo MinTermino
    }
}

console.log(ObtenerKmapAMinTerms(kmapResultado));
console.log("Cantidad de Varibles: "+cantidadVariables);
AgruparMinTerms(ObtenerKmapAMinTerms(kmapResultado));
console.log("Grupo 0:");
console.log(grupoIndice0);
console.log("Grupo 1:");
console.log(grupoIndice1);
console.log("Grupo 2:");
console.log(grupoIndice2);
console.log("Grupo 3:");
console.log(grupoIndice3);
console.log("Grupo 4:");
console.log(grupoIndice4);
console.log("Grupo 5:");
console.log(grupoIndice5);
