/*
    SCOPO DEL GIOCO:
    1. Il computer deve generare 16 numeri casuali tra 1 e 100.
    2. In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
    3. Se il numero è presente nella lista dei numeri generati, la partita termina,
    altrimenti si continua chiedendo all’utente un altro numero.
    La partita termina o quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
    5. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

    BONUS: all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali.
    Con difficoltà 0=> tra 1 e 100, con difficoltà 1 =>  tra 1 e 80, con difficoltà 2=> tra 1 e 50

    1. genero 16 numeri casuali diversi
    2. creo un array di numeri inseriti dall'utente
    3. chiedo all'utente di inserire un numero per N-TENTATIVI: !controllo = numero da 1 a 100
        3.1 controllo se il numero inserito dall'utente è già dentro l'array:
            3.1.1 già inserito: gli dico numero già inserito
                non ancora inserito: verifico che sia diverso dai numeri mina:
                    se diverso, lo inserisco nell'array
                    se uguale, HAI PERSO!
    4. finiti i tentativi, stampo "HAI VINTO"


*/

var listaNumeriMina = [];
var quantitaMine = 3;
var estremoSup = 10;
var tentativi = estremoSup - quantitaMine;
console.log('tentativi:', tentativi);
var numeriSceltiUtente = [];

// costruzione array listaNumeriMina
while (listaNumeriMina.length < quantitaMine) {
    var numeroCasuale = generaRandom(1, estremoSup);
    if (!listaNumeriMina.includes(numeroCasuale)) {
        listaNumeriMina.push(numeroCasuale);
    }
}
console.log(listaNumeriMina);

while (numeriSceltiUtente.length < tentativi) {
    var numeroInserito = parseInt(prompt('Inserisci un numero da 1 a ' + estremoSup + ' e scopri sei hai colpito una mina!'));
    if ((numeroInserito > estremoSup) && (numeroInserito < 1)) {
        console.log('Devi inserire un numero compreso tra 1 e', estremoSup);
    } else {
        if (!numeriSceltiUtente.includes(numeroInserito)) {
            if (!listaNumeriMina.includes(numeroInserito)) {
                numeriSceltiUtente.push(numeroInserito);
                console.log(numeriSceltiUtente);
            } else {
                console.log('Hai perso!');
                break;
            }
        } else {
            console.log('Questo numero è già stato provato! Ritenta con un numero nuovo!');
        }
    }
}

if (numeriSceltiUtente.length == tentativi) {
    console.log('HAI VINTO!');
}


function generaRandom(min, max) {
    numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroRandom;
}
