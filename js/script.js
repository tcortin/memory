const messages = ["images/message1.png","images/message2.png","images/message3.png","images/message4.png","images/message5.png"];
const msg = document.getElementById('message');
const msgi = document.getElementById('image');
const mn = document.getElementById('menu');
const opt = document.getElementById('options');
const tries = document.getElementById('essais');
const audio = document.getElementById('music');
const coverall = document.getElementsByClassName('cover');
const mdm = document.getElementsByClassName('medium');
const hrd = document.getElementsByClassName('hard');

let precedente = -1; // UTILISEE POUR STOCKER L'ID DE LA PRECEDENTE CARTE
let attente = 0; // UTILISEE POUR AUTORISER OU NON LE CLIC
let result = 0;
let laps = 0;
let cover;
let coverp;
let img;
let imgp;
let nbcarte;

// SWITCHER LES SOURCES DE DEUX CARTES 200 FOIS //

const initgame = (nombre) => {

    $(opt).removeClass('is-success');
    $(coverall).fadeIn();
    $(mn).removeClass('is-success');
    result = 0;
    laps = 0;
    tries.innerHTML = laps;
    nbcarte = nombre;

    for (let a = 2 ; a <= 16 ; a = a + 2) { // REMETTRE LES CARTES A LEUR EMPLACEMENT D'ORIGINE
        const b = a-1;
        const c = a/2;
        const image1 = document.getElementById('img' + b);
        const image2 = document.getElementById('img' + a);

        image1.src = "images/sneakers-0"+ c +".png";
        image2.src = image1.src;
    }

    for (let i = 1 ; i <= 200 ; i++) { // MELANGER LES CARTES
        const n1 = Math.ceil(nombre*Math.random());
        const n2 = Math.ceil(nombre*Math.random());
        const img1 = document.getElementById('img' + n1);
        const img2 = document.getElementById('img' + n2);
        const src1 = img1.src;
        const src2 = img2.src;
        
        img1.src = src2;
        img2.src = src1;
    }
}

// CHOISIR SA DIFFICULTE //

const easy = () => {
    $(mdm).fadeOut();
    $(hrd).fadeOut();
    initgame(8);    
}

const normal = () => {
    $(mdm).fadeIn();
    $(hrd).fadeOut();
    initgame(12);
}

const hard = () => {
    $(mdm).fadeIn();
    $(hrd).fadeIn();
    initgame(16);
}

// CACHER LES DEUX DERNIERES CARTES CLIQUEES //

const reset = () => {
    $(cover).fadeIn();
    $(coverp).fadeIn();
    attente = 0;
}

// REDEFINIR LA DIFFICULTE //

const restart = () => {
    $(mn).removeClass('is-success');
    $(opt).addClass('is-success');
}

// AFFICHER UN MESSAGE D'ENCOURAGEMENT //

const success = () => {
    const m = Math.ceil(5*Math.random()-1);

    msgi.src = messages[m];
    $(msg).addClass("is-success");
    setTimeout(function() {
        $(msg).removeClass("is-success");
    }, 1500);
}

// FADEOUT ET VERIFIER LA SOURCE DES DEUX CARTES AFFICHEES //

const clic = n => {
    if (attente != 1) { // AFFICHE LA PREMIERE CARTE
        img = document.getElementById('img' + n);
        cover = document.getElementById('cover' + n);
        $(cover).fadeOut();
        if (precedente < 0) {
            precedente = n; // STOCKE L'ID DE CETTE CARTE
        } 
        else if (n != precedente) { // AFFICHE LA DEUXIEME CARTE
            laps++;
            imgp = document.getElementById('img' + precedente);
            coverp = document.getElementById('cover' + precedente);
            tries.innerHTML = laps;
            if (imgp.src == img.src) { // VERIFICATION DE LA SOURCE DE CHACUNE DES CARTES
                result++;
                if (result > 0 && result < nbcarte/2) {
                    success(); // AFFICHER LE MESSAGE //
                }
                else if (result == nbcarte/2) {
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