const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function enviaPergunta(mensagem) {
    const url = 'http://localhost:3000/chat';

    const dados = {
        mensagem: mensagem
    };

    try {
        const resposta = await axios.post(url, dados);
        const respostaServidor = resposta.data.resposta;
        await imprimirLetraPorLetra(`\nG.A.I.A: ${respostaServidor}\n\n`);
    } catch (error) {
        console.error('Ocorreu um erro na requisição:', error.message);
    }
}

function questionPromise(prompt) {
    const stringFormatada = `\nvocê: ${prompt}`;
    return new Promise((resolve) => {
        rl.question(stringFormatada, resolve);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function imprimirLetraPorLetra(mensagem) {
    for (let i = 0; i < mensagem.length; i++) {
        process.stdout.write(mensagem.charAt(i));
        await delay(50); // Atraso de 50 milissegundos entre cada caractere
    }
}

async function loopInfinito() {
    // console.clear();
    const resposta = await questionPromise('');

    if (resposta.toLowerCase() === 'sair') {
        rl.close();
    } else {
        await enviaPergunta(resposta);
        loopInfinito();
    }
}

console.clear();
loopInfinito();
