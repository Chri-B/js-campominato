/*  VERSIONE DOPO LEZIONE 26/02
    SCOPO DEL GIOCO:
    1. Il computer deve generare 16 numeri casuali tra 1 e 100.
    2. In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
    3. Se il numero è presente nella lista dei numeri generati, la partita termina,
    altrimenti si continua chiedendo all’utente un altro numero.
    La partita termina o quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
    5. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

    BONUS: all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali.
    Con difficoltà 0=> tra 1 e 100, con difficoltà 1 =>  tra 1 e 80, con difficoltà 2=> tra 1 e 50

    1. genero 16 numeri random diversi da 1 a 100
        1.1 array vuoto per le bombe
        1.2 inserisco bombe nell'array
            1.2.1 controllo che i numeri siano univoci
    2. Selezione utente
        2.1 creo array vuoto per i tentativi
        2.2 chiedo all'utente un numero tra 1 e 100
    3. controlli logici del gioco (while)
        - ripetizione del numero (if)
            1. il numero inserito è incluso nell'array numeriInseriti
        - prende una bomba (if)
            1. il numero inserito è incluso nell'array bombe
        - inserire numero nell'array numeriInseriti
        - se numeriInseriti.length  == numeri senza mine ALLORA ----> "HAI VINTOO!!!"


    ULTIMO. Gestione errori.
        1. numero >= 1, numero <= 100.
        2. numero deve essere un NUMERO
*/


// var dimensioneCampo = 100; //scelta statica
var dimensioneCampo = sceltaLivello();
var totaleMine = 16;
var bandierineMax = dimensioneCampo - totaleMine;

var posizioneMine = minaIlCampo(dimensioneCampo, totaleMine); // l'array generato dalle mine ora è questo
console.log(posizioneMine);
var bandierinePiazzate = [];

var boom = false; // variabile sentinella: finchè bomba resta falsa il ciclo continua
while ((bandierinePiazzate.length < bandierineMax) && (boom === false)) {
    var bandierinaDaPiazzare = parseInt(prompt('Scrivi un numero da 1 a ' + dimensioneCampo));
    if (!bandierinePiazzate.includes(bandierinaDaPiazzare)) {
        if (!isNaN(bandierinaDaPiazzare) && (bandierinaDaPiazzare >= 1) && (bandierinaDaPiazzare <= dimensioneCampo)) { // controllo errori: il ciclo si interrompe se l'utente inserisce una parola o un numero non compreso nell'intervallo 1-100 (estremi inclusi)
            if (!posizioneMine.includes(bandierinaDaPiazzare)) {
                bandierinePiazzate.push(bandierinaDaPiazzare);
                if (bandierinePiazzate.length == bandierineMax) {
                    alert('Hai vinto!');
                } else {
                    alert('Hai piazzato una bandierina');
                }
            } else {
                alert('BOOOM! Hai perso! hai piazzato ' + bandierinePiazzate.length + ' bandierine');
                boom = true;
            }
        } else {
            alert('Si richiede l\'inserimento di un numero da 1 a ' + dimensioneCampo); // controllo errore con inserimento parola
        }
    } else {
        alert('Hai già inserito questo numero');
    }
}




function sceltaLivello() {
    var scelta = parseInt(prompt('Inserisci la difficoltà tra 0 1 2'));
    switch (scelta) {
        case 0:
            var dimCampo = 100;
            break;
        case 1:
            var dimCampo = 80;
            break;
        case 2:
            var dimCampo = 50;
            break;
        default:
            var dimCampo = 100;
    }
    return dimCampo;
}

function minaIlCampo(dimCampo, totMine) { // funzione che genera numeri random univoci
    var posizMine = [];
    while (posizMine.length < totMine) {
        var minaDaPiazzare = generaRandomMinMax(1, dimCampo);
        if (!posizMine.includes(minaDaPiazzare)) { // controllo che le mine generate non siano già presenti = evito ripetizioni!
            posizMine.push(minaDaPiazzare);
        }
    }
    return posizMine;
}

function generaRandomMinMax(min, max) { // funzione che genera numeri random inserendo due input
    numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroRandom;
}






// /*   VERSIONE INIZIALE prima della correzione in classe del 26/02 mattina
//     SCOPO DEL GIOCO:
//     1. Il computer deve generare 16 numeri casuali tra 1 e 100.
//     2. In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
//     3. Se il numero è presente nella lista dei numeri generati, la partita termina,
//     altrimenti si continua chiedendo all’utente un altro numero.
//     La partita termina o quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
//     5. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
//
//     BONUS: all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali.
//     Con difficoltà 0=> tra 1 e 100, con difficoltà 1 =>  tra 1 e 80, con difficoltà 2=> tra 1 e 50
//
//     1. genero 16 numeri casuali diversi
//     2. creo un array di numeri inseriti dall'utente
//     3. chiedo all'utente di inserire un numero per N-TENTATIVI: !controllo = numero da 1 a 100
//         3.1 controllo se il numero inserito dall'utente è già dentro l'array:
//             3.1.1 già inserito: gli dico numero già inserito
//                 non ancora inserito: verifico che sia diverso dai numeri mina:
//                     se diverso, lo inserisco nell'array
//                     se uguale, HAI PERSO!
//     4. finiti i tentativi, stampo "HAI VINTO"
// */
//
// var listaNumeriMina = [];
// var quantitaMine = 16;
// var estremoSup = 0; // definisco la variabile della difficoltà del gioco uguale a zero
//
// var livelloGioco = parseInt(prompt('Scegli la difficoltà del gioco: 0 - semplice, 1 - intermedio, 2 - difficile'));
// switch (livelloGioco) { // sovrascrivo la variabile della difficoltà gioco in base alla scelta dell'utente: ripeto lo script per ogni caso
//     case 0:
//         estremoSup = 100;
//         var tentativi = estremoSup - quantitaMine;
//         var numeriSceltiUtente = [];
//         // console.log('tentativi:', tentativi);
//
//         // costruzione array listaNumeriMina
//         while (listaNumeriMina.length < quantitaMine) {
//             var numeroCasuale = generaRandom(1, estremoSup);
//             if (!listaNumeriMina.includes(numeroCasuale)) {
//                 listaNumeriMina.push(numeroCasuale);
//             }
//         }
//         console.log(listaNumeriMina);
//
//         // ciclo while per permettere all'utente i vari tentativi di gioco
//         while (numeriSceltiUtente.length < tentativi) {
//             var numeroInserito = parseInt(prompt('Inserisci un numero da 1 a ' + estremoSup + ' e scopri sei hai colpito una mina!'));
//             if (!isNaN(numeroInserito) && !isNaN(livelloGioco)) {
//                 if ((numeroInserito > estremoSup) || (numeroInserito < 1)) {
//                     alert('Devi inserire un numero compreso tra 1 e ' + estremoSup);
//                 } else {
//                     if (!numeriSceltiUtente.includes(numeroInserito)) {
//                         if (!listaNumeriMina.includes(numeroInserito)) {
//                             numeriSceltiUtente.push(numeroInserito);
//                             console.log(numeriSceltiUtente);
//                         } else {
//                             alert('Hai perso!');
//                             break;
//                         }
//                     } else {
//                         alert('Questo numero è già stato provato! Ritenta con un numero nuovo!');
//                     }
//                 }
//             } else {
//                 alert('Inserisci un numero!');
//             }
//         }
//
//         if (numeriSceltiUtente.length == tentativi) {
//             alert('HAI VINTO!');
//         }
//         break;
//
//     case 1:
//         estremoSup = 80;
//         var tentativi = estremoSup - quantitaMine;
//         var numeriSceltiUtente = [];
//         // console.log('tentativi:', tentativi);
//
//         // costruzione array listaNumeriMina
//         while (listaNumeriMina.length < quantitaMine) {
//             var numeroCasuale = generaRandom(1, estremoSup);
//             if (!listaNumeriMina.includes(numeroCasuale)) {
//                 listaNumeriMina.push(numeroCasuale);
//             }
//         }
//         console.log(listaNumeriMina);
//
//         // ciclo while per permettere all'utente i vari tentativi di gioco
//         while (numeriSceltiUtente.length < tentativi) {
//             var numeroInserito = parseInt(prompt('Inserisci un numero da 1 a ' + estremoSup + ' e scopri sei hai colpito una mina!'));
//             if (!isNaN(numeroInserito) && !isNaN(livelloGioco)) {
//                 if ((numeroInserito > estremoSup) || (numeroInserito < 1)) {
//                     alert('Devi inserire un numero compreso tra 1 e ' + estremoSup);
//                 } else {
//                     if (!numeriSceltiUtente.includes(numeroInserito)) {
//                         if (!listaNumeriMina.includes(numeroInserito)) {
//                             numeriSceltiUtente.push(numeroInserito);
//                             console.log(numeriSceltiUtente);
//                         } else {
//                             alert('Hai perso!');
//                             break;
//                         }
//                     } else {
//                         alert('Questo numero è già stato provato! Ritenta con un numero nuovo!');
//                     }
//                 }
//             } else {
//                 alert('Inserisci un numero!');
//             }
//         }
//
//         if (numeriSceltiUtente.length == tentativi) {
//             alert('HAI VINTO!');
//         }
//         break;
//
//     case 2:
//         estremoSup = 50;
//         var tentativi = estremoSup - quantitaMine;
//         var numeriSceltiUtente = [];
//         // console.log('tentativi:', tentativi);
//
//         // costruzione array listaNumeriMina
//         while (listaNumeriMina.length < quantitaMine) {
//             var numeroCasuale = generaRandom(1, estremoSup);
//             if (!listaNumeriMina.includes(numeroCasuale)) {
//                 listaNumeriMina.push(numeroCasuale);
//             }
//         }
//         console.log(listaNumeriMina);
//
//         // ciclo while per permettere all'utente i vari tentativi di gioco
//         while (numeriSceltiUtente.length < tentativi) {
//             var numeroInserito = parseInt(prompt('Inserisci un numero da 1 a ' + estremoSup + ' e scopri sei hai colpito una mina!'));
//             if (!isNaN(numeroInserito) && !isNaN(livelloGioco)) {
//                 if ((numeroInserito > estremoSup) || (numeroInserito < 1)) {
//                     alert('Devi inserire un numero compreso tra 1 e ' + estremoSup);
//                 } else {
//                     if (!numeriSceltiUtente.includes(numeroInserito)) {
//                         if (!listaNumeriMina.includes(numeroInserito)) {
//                             numeriSceltiUtente.push(numeroInserito);
//                             console.log(numeriSceltiUtente);
//                         } else {
//                             alert('Hai perso!');
//                             break;
//                         }
//                     } else {
//                         alert('Questo numero è già stato provato! Ritenta con un numero nuovo!');
//                     }
//                 }
//             } else {
//                 alert('Inserisci un numero!');
//             }
//         }
//
//         if (numeriSceltiUtente.length == tentativi) {
//             alert('HAI VINTO!');
//         }
//         break;
//     default: console.log('ricarica la pagina e inserisci un numero da 0 a 2');
// }
//
//
//
// function generaRandom(min, max) {
//     numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
//     return numeroRandom;
// }
