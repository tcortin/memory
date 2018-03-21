class Game {

    constructor(){
        this.messages = ["images/message1.png","images/message2.png","images/message3.png","images/message4.png","images/message5.png"];
        this.msg = document.getElementById('message');
        this.msgi = document.getElementById('image');
        this.mn = document.getElementById('menu');
        this.opt = document.getElementById('options');
        this.tries = document.getElementById('essais');
        this.coverall = document.getElementsByClassName('cover');
        this.game = document.getElementsByClassName('jeu');
        this.precedente = -1; // UTILISEE POUR STOCKER L'ID DE LA PRECEDENTE CARTE
        this.attente = 0; // UTILISEE POUR AUTORISER OU NON LE CLIC
        this.result = 0;
        this.laps = 0;
        this.cover;
        this.coverp;
        this.img;
        this.imgp;
        this.nbcarte;
    }

    // SWITCHER LES SOURCES DE DEUX CARTES 200 FOIS //

    initgame(nombre) {

        $(this.opt).removeClass('is-success');
        $(this.coverall).fadeIn();
        $(this.mn).removeClass('is-success');
        this.result = 0;
        this.laps = 0;
        this.tries.innerHTML = this.laps;
        this.nbcarte = nombre;

        for (let a = 2 ; a <= 16 ; a = a + 2) { // REMETTRE LES CARTES A LEUR EMPLACEMENT D'ORIGINE
            const b = a-1;
            const c = a/2;
            const image1 = document.getElementById(`img${b}`);
            const image2 = document.getElementById(`img${a}`);

            image1.src = `images/sneakers-0${c}.png`;
            image2.src = image1.src;
        }

        for (let i = 1 ; i <= 200 ; i++) { // MELANGER LES CARTES
            const n1 = Math.ceil(nombre*Math.random());
            const n2 = Math.ceil(nombre*Math.random());
            const img1 = document.getElementById(`img${n1}`);
            const img2 = document.getElementById(`img${n2}`);
            const src1 = img1.src;
            const src2 = img2.src;
            
            img1.src = src2;
            img2.src = src1;
        }
    }

    // CHOISIR SA DIFFICULTE //

    difficulty(x) {
        for (let i=1; i<=16; i++){
            const caseId = document.getElementById(`case${i}`);
            if (i<=x){
                $(caseId).show();
            } else {
                $(caseId).hide();            
            }
        if (x == 8){
            $(this.game).removeClass('normal');
            $(this.game).addClass('easy');
        }else if (x == 12){
            $(this.game).removeClass('easy');
            $(this.game).addClass('normal');
        }else{
            $(this.game).removeClass('easy');
            $(this.game).removeClass('normal');
        }
        }
        this.initgame(x);
    }

    // CACHER LES DEUX DERNIERES CARTES CLIQUEES //

    reset() {
        $(this.cover).fadeIn();
        $(this.coverp).fadeIn();
        this.attente = 0;
    }

    // REDEFINIR LA DIFFICULTE //

    restart() {
        $(this.mn).removeClass('is-success');
        $(this.opt).addClass('is-success');
    }

    // AFFICHER UN MESSAGE D'ENCOURAGEMENT //

    success() {
        const m = Math.ceil(this.messages.length*Math.random()-1);

        this.msgi.src = this.messages[m];
        $(this.msg).addClass("is-success");
        setTimeout(() => {
            $(this.msg).removeClass("is-success");
        }, 1500);
    }

    // FADEOUT ET VERIFIER LA SOURCE DES DEUX CARTES AFFICHEES //

    clic(n) {
        if (this.attente != 1) { // AFFICHE LA PREMIERE CARTE
            this.img = document.getElementById(`img${n}`);
            this.cover = document.getElementById(`cover${n}`);
            $(this.cover).fadeOut();
            if (this.precedente < 0) {
                this.precedente = n; // STOCKE L'ID DE CETTE CARTE
            } 
            else if (n != this.precedente) { // AFFICHE LA DEUXIEME CARTE
                this.laps++;
                this.imgp = document.getElementById(`img${this.precedente}`);
                this.coverp = document.getElementById(`cover${this.precedente}`);
                this.tries.innerHTML = this.laps;
                if (this.imgp.src == this.img.src) { // VERIFICATION DE LA SOURCE DE CHACUNE DES CARTES
                    this.result++;
                    if (this.result > 0 && this.result < this.nbcarte/2) {
                        this.success(); // AFFICHER LE MESSAGE //
                    }
                    else if (this.result == this.nbcarte/2) {
                        document.getElementById('bravo').innerHTML = `Félicitations ! Tu as trouvé toutes les paires en ${this.laps} essais !`;                    
                        $(this.mn).addClass('is-success'); // AFFICHER LE MENU //
                    }                
                } 
                else { // ECHEC = REINITIALISATION
                    this.attente = 1;
                    setTimeout(this.reset.bind(this) ,800);
                }            
                this.precedente = -1; // REINITIALISATION DE LA VALEUR DE LA VARIABLE "PRECEDENTE"
            }
        }
    }
}

let sneakersMemory = new Game();