console.log('FLAPPY BOARD');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const flappBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    desenha() {
        contexto.drawImage(
            sprites,
            flappBird.spriteX, flappBird.spriteY,
            flappBird.largura, flappBird.altura,
            flappBird.x, flappBird.y,
            flappBird.largura, flappBird.altura
        )
    },
    atualiza() {
        flappBird.velocidade = flappBird.velocidade + flappBird.gravidade;
        flappBird.y += flappBird.velocidade;
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
        )
    }
}


const mensagemGetReady = {
    spriteX:134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 172 /2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        );
    }
}
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
    }
}

let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappBird.desenha()
            mensagemGetReady.desenha();
        }, 
        atualiza() {

        },
        click() {
            mudarParaTela(Telas.JOGO);
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappBird.desenha()
    },
    atualiza() {
        flappBird.atualiza();
    },
    click() {
        
    }
}

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

mudarParaTela(Telas.INICIO);
loop();
