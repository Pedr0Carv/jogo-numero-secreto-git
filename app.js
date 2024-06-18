let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagensDeExibicao() {
     exibirTextoNaTela('h1', 'Jogo do Número Secreto');
     exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

mensagensDeExibicao();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemDeTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagemDeTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}` );
        } else {
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}`);
        }
 
        tentativas++;
        limparCampo();
    }
}

//Função para gerar um número aleatório
function gerarNumeroAleatorio() {
   let numeroSecretoEscolhido = parseInt((Math.random() * numeroLimite + 1));
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroSecretoEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroSecretoEscolhido);
    return numeroSecretoEscolhido;
   }
  
}


//Função para limpar o campo de input
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Função para reiniciar o jogo
function reiniciarJogo() {
    mensagensDeExibicao();
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 1;
    
}