let body = document.getElementsByTagName('body')[0];
let main = document.getElementsByTagName('main')[0];

let marcador1 = document.getElementById("marcador1");
let marcador2 = document.getElementById("marcador2");

let settings = document.getElementById("settings");
let choosePlayers = document.getElementById("choosePlayers");
let guardar = document.getElementById("guardar");

choosePlayers.setAttribute('onclick', 'displaySettings()');
guardar.setAttribute('onclick', 'guardarNombres()');

let player1Form = document.getElementById('fname');
let player2Form = document.getElementById('lname');

let player1Name = document.getElementById('player1Name');
let player2Name = document.getElementById('player2Name');

let resetB = document.getElementById("reset");

resetB.setAttribute('onclick', 'reset()');

let StartB = document.getElementById("start");

StartB.setAttribute('onclick', 'start()');

let startBoolean = false;

marcador1.textContent = 0;
marcador2.textContent = 0;

let posInicio1 = 0;
let posInicio2 = 0;

let posActual1 = 0;
let posActual2 = 0;

let posObjetivo = 0;
let array;

let div_celd;
let grid_celd;

let puntos1 = 0;
let puntos2 = 0;

let interval = setInterval(timer, 1000);

const tiempoInicial = 5;

let tiempo = tiempoInicial;

let div_contador = document.getElementById("div_contador");

stopTimer();

document.addEventListener('DOMContentLoaded', pintarTablero);
document.addEventListener('keydown', mover);
buttonReset.setAttribute('onclick', 'Reset()');
contador.innerHTML = tiempo;
contador.removeAttribute('class');
array[posActual1].setAttribute('class', 'grid_celd');
let text = "Hello world, welcome to the universe.";
let result = text.includes("world");


function timer() {
    contador.innerHTML = tiempo--;
    if (tiempo < 0) {
        stopTimer();
        document.addEventListener('keydown', mover);
        div_contador.style.zIndex = "-2";
    }
}

/**
 * Funcion para hacer un clear el tablero
 * Se generan aleatoriamente sin repetir mediante unos bucles while las posiciones de objetivo, del player1 y del player2
 * @param NO
 * @return NO
 */

function pintarTablero() {

    div_celd = document.createElement('div');
    div_celd.setAttribute('class', 'div-grid');

    main.appendChild(div_celd);

    posObjetivo = [Math.floor(Math.random() * 100)];

    do {
        posInicio1 = [Math.floor(Math.random() * 100)];

    } while (posInicio1[0] == posObjetivo[0]);

    do {
        posInicio2 = [Math.floor(Math.random() * 100)];
        // if (posInicio2[0] == posObjetivo[0] || posInicio1[0] == posInicio2[0]) {
        //     alert('pos1 ' + posInicio1+' pos2 '+ posInicio2+' posobjetivo '+posObjetivo);
        //     console.log('same')

        // }
    } while (posInicio2[0] == posObjetivo[0] || posInicio1[0] == posInicio2[0]);

    array = [];


    for (let i = 0; i < 100; i++) {
        grid_celd = document.createElement('div');
        grid_celd.setAttribute('class', 'grid_celd')
        // grid_celd.textContent = i;
        array.push(grid_celd);

        div_celd.appendChild(grid_celd);

        if (i == posObjetivo) {
            grid_celd.setAttribute('class', 'objetivo')
        }
        if (i == posInicio1) {
            grid_celd.setAttribute('class', 'actual1')
            posActual1 = i;
        }
        if (i == posInicio2) {
            grid_celd.setAttribute('class', 'actual2')
            posActual2 = i;
        }
    }
}

function stopTimer() {
    clearInterval(interval);
    tiempo = tiempoInicial;
    contador.innerHTML = tiempo;
    contador.removeAttribute('class');

}
// document.addEventListener('keydown', mover);

/**
 * Funcion para detectar cuando se pulsan las teclas correspondientes, se consigue mediante un switch
 * Dentro se usa una funcion para verificar y moverse a posiciones validas
 * @param event
 * @return NO
 */

function mover(event) {
    switch (event['key']) {

        /******Jugador 1******/

        case 'w':
        case 'W':
            console.log('has pulsado la tecla hacia arriba')

            switch (comprobarUP(posActual1 - 10)) {
                case 0:
                    break;
                case 1:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 + 90].setAttribute('class', 'actual1');
                    posActual1 += 90;
                    break;
                case 2, 3:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 - 10].setAttribute('class', 'actual1');
                    posActual1 -= 10;
                    break;
            }

            verificar();
            break;
        case 's':
        case 'S':
            console.log('has pulsado la tecla hacia abajo')
            switch (comprobarUP(posActual1 + 10)) {
                case 0:
                    break;
                case 1, 3:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 + 10].setAttribute('class', 'actual1');
                    posActual1 += 10;
                    break;
                case 2:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 - 90].setAttribute('class', 'actual1');
                    posActual1 -= 90;
                    break;
            }
            verificar();
            break;
        case 'a':
        case 'A':
            console.log('has pulsado la tecla hacia izquierda');
            switch (comprobarRL(posActual1 - 1)) {
                case 0:
                    break;
                case 1:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 + 99].setAttribute('class', 'actual1');
                    posActual1 += 99;
                    break;
                case 2, 3:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 - 1].setAttribute('class', 'actual1');
                    posActual1 -= 1;
                    break;
            }
            verificar();
            break;
        case 'd':
        case 'D':
            console.log('has pulsado la tecla hacia abajo')
            switch (comprobarRL(posActual1 + 1)) {
                case 0:
                    break;
                case 1, 3:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 + 1].setAttribute('class', 'actual1');
                    posActual1 += 1;
                    break;
                case 2:
                    array[posActual1].setAttribute('class', 'grid_celd');
                    array[posActual1 - 99].setAttribute('class', 'actual1');
                    posActual1 -= 99;
                    break;
            }
            verificar();
            break;

        /******Jugador 2******/
        case 'ArrowUp':
            console.log('has pulsado la tecla w')
            console.log(posActual2);
            switch (comprobarUP(posActual2 - 10)) {
                case 0:
                    break;
                case 1: //
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 + 90].setAttribute('class', 'actual2');
                    posActual2 += 90;
                    break;
                case 2, 3:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 - 10].setAttribute('class', 'actual2');
                    posActual2 -= 10;
                    break;
            }
            verificar();

            break;
        case 'ArrowDown':
            console.log('has pulsado la tecla hacia abajo')
            switch (comprobarUP(posActual2 + 10)) {
                case 0:
                    break;
                case 1, 3:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 + 10].setAttribute('class', 'actual2');
                    posActual2 += 10;
                    break;
                case 2:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 - 90].setAttribute('class', 'actual2');
                    posActual2 -= 90;
                    break;
            }
            verificar();

            break;
        case 'ArrowLeft':
            console.log('has pulsado la tecla hacia izquierda');
            switch (comprobarRL(posActual2 - 1)) {
                case 0:
                    break;
                case 1:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 + 99].setAttribute('class', 'actual2');
                    posActual2 += 99;
                    break;
                case 2, 3:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 - 1].setAttribute('class', 'actual2');
                    posActual2 -= 1;
                    break;
            }

            verificar();
            break;
        case 'ArrowRight':
            console.log('has pulsado la tecla hacia abajo')
            switch (comprobarRL(posActual2 + 1)) {
                case 0:
                    break;
                case 1, 3:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 + 1].setAttribute('class', 'actual2');
                    posActual2 += 1;
                    break;
                case 2:
                    array[posActual2].setAttribute('class', 'grid_celd');
                    array[posActual2 - 99].setAttribute('class', 'actual2');
                    posActual2 -= 99;
                    break;
            }
            verificar();
            break;
        default:
            break;
    }
}

/**
 * Funcion para comprobar si un player llega a la posicion objetivo
 * @param NO
 * @return NO
 */

/*****Comprobar si se gana*****/

function verificar() {
    if (posActual1 == posObjetivo) {
        // alert('ganó 1');

        main.removeChild(div_celd);
        //Se puede quitar
        puntos1++;
        marcador1.textContent = parseInt(marcador1.textContent) + 1;
        console.log(marcador1.textContent);

        pintarTablero();
    }
    if (posActual2 == posObjetivo) {
        main.removeChild(div_celd);
        //Se puede quitar
        puntos2++;
        marcador2.textContent = parseInt(marcador2.textContent) + 1;
        //posicionObjetivo = [Math.floor(Math.random() * 100)];
        pintarTablero();
    }
}

/**
 * Funcion para comprobar si la posicion a la que se quiere mover el player es valida o no
 * @param number
 * @return boolean
 */

/*****Funcion para validar si puede mover*****/

/*****Up/Down*****/

function comprobarUP(posComprobar) {

    if (posComprobar == posActual1 || posComprobar == posActual2) {
        return 0;
    }
    else if (posComprobar < 0) {
        console.log(posComprobar + 100)
        if ((posComprobar + 100) == posActual2 || (posComprobar + 100) == posActual1) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else if (posComprobar > 99) {
        console.log(posComprobar - 100)
        if ((posComprobar - 100) == posActual2 || (posComprobar - 100) == posActual1) {
            return 0;
        }
        else {
            return 2;
        }
    }
    else {
        return 3;
    }
}

/*****Funcion para validar si puede mover*****/

/*****Right/Left*****/
function comprobarRL(posComprobar) {
    if (posComprobar == posActual1 || posComprobar == posActual2) {
        return 0;
    }

    //Left
    else if (posComprobar < 0) {
        console.log(posComprobar + 100)
        if ((posComprobar + 100) == posActual2 || (posComprobar + 100) == posActual1) {
            return 0;
        }
        else {
            return 1;
        }
    }
    //Right
    else if (posComprobar > 99) {
        console.log(posComprobar - 100)
        if ((posComprobar - 100) == posActual2 || (posComprobar - 100) == posActual1) {
            return 0;
        }
        else {
            return 2;
        }
    }
    else {
        return 3;
    }
}

/**
 * Funcion para abrir el div para cambiar los nombres, cambiando su display de none a flex respectivamente
 * @param NO
 * @return NO
 */

function displaySettings() {
    if (settings.style.display == "flex") {
        settings.style.display = "none";
        document.addEventListener('keydown', mover);
    }
    else {
        settings.style.display = "flex";
        document.removeEventListener('keydown', mover);
    }
}

/**
 * Funcion para guardar los nombres y volver a poner el div a none
 * @param NO
 * @return NO
 */

function guardarNombres() {
    if (!player1Form.value.replace(/\s+/, '').length) {
        player1Name.textContent = "Player 1";
        if (!player2Form.value.replace(/\s+/, '').length) {
            player2Name.textContent = "Player 2";
        }
        else {
            player2Name.textContent = player2Form.value;
            if (player2Name.textContent.length >= 14) {
                player2Name.textContent = player2Name.textContent.substring(0, 14);
            }
        }
    }
    else {
        player1Name.textContent = player1Form.value;
        if (player1Name.textContent.length >= 14) {
            player1Name.textContent = player1Name.textContent.substring(0, 14);
        }
        if (!player2Form.value.replace(/\s+/, '').length) {
            player2Name.textContent = "Player 2";
        }
        else {
            player2Name.textContent = player2Form.value;
            if (player2Name.textContent.length >= 14) {
                player2Name.textContent = player2Name.textContent.substring(1, 14);
            }
        }
    }
    settings.style.display = "none";
    start();
}

/**
 * Funcion para resetear la página, y así resetear el juego
 * @param NO
 * @return NO
 */

function reset() {
    window.location.reload();
}

function start() {
    contador.setAttribute('class', 'contador');
    div_contador.style.zIndex = "2";
    interval = setInterval(timer, 1000);
}