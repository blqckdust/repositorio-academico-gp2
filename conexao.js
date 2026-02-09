// ============================================
// CONEXÃO - Sistema do Repositório Acadêmico
// ============================================

const express = require('express');
const caminho = require('path');
const sistemaDeArquivos = require('fs');

const aplicativo = express();
const PORTA = 3000;

// Dizer onde estão os arquivos do site
aplicativo.use(express.static('paginas'));
aplicativo.use('/estilos', express.static('estilos'));
aplicativo.use('/scripts', express.static('scripts'));
aplicativo.use('/dados', express.static('dados'));

// Página inicial
aplicativo.get('/', (requisicao, resposta) => {
    resposta.sendFile(caminho.join(__dirname, 'paginas', 'inicio.html'));
});

// Buscar áreas de conhecimento
aplicativo.get('/buscar-areas', (requisicao, resposta) => {
    const conteudo = sistemaDeArquivos.readFileSync(
        caminho.join(__dirname, 'dados', 'areas-de-conhecimento.json'), 
        'utf8'
    );
    resposta.json(JSON.parse(conteudo));
});

// Buscar documentos
aplicativo.get('/buscar-documentos', (requisicao, resposta) => {
    const conteudo = sistemaDeArquivos.readFileSync(
        caminho.join(__dirname, 'dados', 'documentos.json'), 
        'utf8'
    );
    resposta.json(JSON.parse(conteudo));
});

// Estatísticas para a página inicial
aplicativo.get('/informacoes-do-site', (requisicao, resposta) => {
    const areas = JSON.parse(sistemaDeArquivos.readFileSync(
        caminho.join(__dirname, 'dados', 'areas-de-conhecimento.json'), 'utf8'
    ));
    const documentos = JSON.parse(sistemaDeArquivos.readFileSync(
        caminho.join(__dirname, 'dados', 'documentos.json'), 'utf8'
    ));
    
    resposta.json({
        totalDeArtigos: documentos.length * 100,
        totalDeAreas: areas.length,
        totalDeDownloads: 200
    });
});

// Ligar o sistema
aplicativo.listen(PORTA, () => {
    console.log('========================================');
    console.log('📚 REPOSITÓRIO ACADÊMICO');
    console.log('========================================');
    console.log('Seu trabalho está no ar!');
    console.log('Acesse: http://localhost:' + PORTA);
    console.log('========================================');
});