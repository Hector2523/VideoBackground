const fs = require('fs');

fs.writeFile('prompt.txt', 'logo que o servidor entrar em contato com o client faca o client enviar a lista dos wallpapers que ele já possui usando IDs para o server salvar em um arquivo JSON e separar na hora de mostrar as opcoes os já baixados dos nao baixados NAO ESQUECA DE ATUALIZAR ESSE JSON NA HORA QUE O USER NAO QUISER MAIS ENVIAR OUTRO VIDEO E ENCERRAR A CONEXAO E DE ATUALIZER SEMPRE LOGO QUE OS DOIS SE CONECTAREM JÁ QUE O USER PODE EXCLUIR SEM ESTAR LIGADO AO SERVIDOR O SERVIDOR TODA VEZ QUE ENVIAR UM ARQUIVO DEVE ADICIONAR NO SEU FINAL O SEU ID QUE DEVE TER 6 NUMEROS POR EXEMPLO "Rain anime school girl ID:123456.mp4" verifique entao por ID', function(err) {
    if(err) throw err;
    console.log('Saved!')
})