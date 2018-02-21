
let precedente = -1;
let attente = 0;
let cover;
let coverp;
let img;
let imgp;

function reset () {
    $(cover).fadeIn();
    $(coverp).fadeIn();
    attente = 0;
}

function clic (n) {
    if (attente != 1) {
        img = document.getElementById('img' + n);
        cover = document.getElementById('cover' + n);
        $(cover).fadeOut();
        if (precedente < 0) {
            precedente = n;
        } 
        else {
            imgp = document.getElementById('img' + precedente);
            coverp = document.getElementById('cover' + precedente);
            if (imgp.src == img.src) {
            } 
            else {
                attente = 1;
                setTimeout('reset();',800);
            }
            precedente = -1;
        }
    }
}

function initgame () {
    for (let i = 1 ; i <= 200 ; i++) {
        let n1 = Math.ceil(16*Math.random());
        let n2 = Math.ceil(16*Math.random());
        let img1 = document.getElementById('img' + n1);
        let img2 = document.getElementById('img' + n2);
        let src1 = img1.src;
        let src2 = img2.src;
        img1.src = src2;
        img2.src = src1;        
    }
}