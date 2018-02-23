const messages = ["images/message1.png","images/message2.png","images/message3.png","images/message4.png","images/message5.png"];
const msg = document.getElementById('message');
const msgi = document.getElementById('image');
const mn = document.getElementById('menu');
const tries = document.getElementById('essais');

let precedente = -1; // UTILISEE POUR STOCKER L'ID DE LA PRECEDENTE CARTE
let attente = 0; // UTILISEE POUR AUTORISER OU NON LE CLIC
let result = 0;
let laps = 0;
let cover;
let coverp;
let img;
let imgp;

// CACHER LES DEUX DERNIERES CARTES //

function reset () {
    $(cover).fadeIn();
    $(coverp).fadeIn();
    attente = 0;
}

// REMETTRE LE JEU A L'ETAT INITIAL //

function restart () {
    const coverall = document.getElementsByClassName('cover');

    $(coverall).fadeIn();
    $(mn).removeClass('is-success');
    initgame();
    result = 0;
    laps = 0;
    tries.innerHTML = laps;
}

// AFFICHER UN MESSAGE A CHAQUE COUP REUSSI //

function success () {
    const m = Math.ceil(5*Math.random()-1);

    msgi.src = messages[m];
    $(msg).addClass("is-success");
    setTimeout(function() {
        $(msg).removeClass("is-success");
    }, 1500);
}

// FADEOUT ET VERIFIER LA SOURCE DES DEUX CARTES AFFICHEES //

function clic (n) {
    if (attente != 1) { // AFFICHE LA PREMIERE CARTE
        img = document.getElementById('img' + n);
        cover = document.getElementById('cover' + n);
        $(cover).fadeOut();
        if (precedente < 0) {
            precedente = n; // STOCKE L'ID DE CETTE CARTE
        } 
        else { // AFFICHE LA DEUXIEME CARTE
            laps++;
            imgp = document.getElementById('img' + precedente);
            coverp = document.getElementById('cover' + precedente);
            tries.innerHTML = laps;
            if (imgp.src == img.src) { // VERIFICATION DE LA SOURCE DE CHACUNE DES CARTES
                result++;
                if (result > 0 && result < 8) {
                    success(); // AFFICHER LE MESSAGE //
                }
                else if (result == 8) {
                    document.getElementById('bravo').innerHTML = "Félicitations ! Tu as trouvé toutes les paires en " + laps + " essais et x temps !";                    
                    $(mn).addClass('is-success'); // AFFICHER LE MENU //
                }                
            } 
            else { // ECHEC = REINITIALISATION
                attente = 1;
                setTimeout('reset();',800);
            }            
            precedente = -1; // REINITIALISATION DE LA VALEUR DE LA VARIABLE "PRECEDENTE"
        }
    }
}

// SWITCHER LES SOURCES DE DEUX CARTES 200 FOIS //

function initgame () {
    for (let i = 1 ; i <= 200 ; i++) {
        const n1 = Math.ceil(16*Math.random());
        const n2 = Math.ceil(16*Math.random());
        const img1 = document.getElementById('img' + n1);
        const img2 = document.getElementById('img' + n2);
        const src1 = img1.src;
        const src2 = img2.src;
        
        img1.src = src2;
        img2.src = src1;        
    }
}