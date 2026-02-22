// ============================================
// SITE.JS - JavaScript do Repositório Acadêmico
// ============================================

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarEstatisticas();
    carregarAreas();
    carregarDocumentosRecentes();
});

// ============================================
// CARREGAR ESTATÍSTICAS
// ============================================

async function carregarEstatisticas() {
    try {
        const resposta = await fetch('/api/estatisticas');
        const dados = await resposta.json();
        
        document.getElementById('quantidadeArtigos').textContent = dados.totalDeArtigos;
        document.getElementById('quantidadeAreas').textContent = dados.totalDeAreas;
        document.getElementById('quantidadeDownloads').textContent = dados.totalDeDownloads;
        
    } catch (erro) {
        // Valores padrão se API falhar
        document.getElementById('quantidadeArtigos').textContent = '600';
        document.getElementById('quantidadeAreas').textContent = '6';
        document.getElementById('quantidadeDownloads').textContent = '200';
    }
}

// ============================================
// CARREGAR ÁREAS
// ============================================

async function carregarAreas() {
    const container = document.getElementById('listaDeAreas');
    
    try {
        const resposta = await fetch('/api/areas');
        const areas = await resposta.json();
        
        const icones = {
            'Ciências Exatas': '💻',
            'Ciências Biológicas': '🧬',
            'Ciências Humanas': '🏛️',
            'Ciências Sociais': '📊',
            'Artes e Design': '🎨',
            'Ciências Agrárias': '🌱'
        };
        
        container.innerHTML = areas.map(area => `
            <div class="area-card" onclick="verConteudosArea(${area.id})">
                <div class="area-icon">${icones[area.nome] || '📚'}</div>
                <h3 class="area-title">${area.nome}</h3>
                <div class="area-count">${area.documentos} documentos</div>
                <p class="area-desc">${area.descricao}</p>
            </div>
        `).join('');
        
    } catch (erro) {
        // Dados estáticos se API falhar
        const areasEstaticas = [
            { id: 1, nome: 'Ciências Exatas', descricao: 'Matemática, Física, Química, Computação e Engenharias', documentos: 100 },
            { id: 2, nome: 'Ciências Biológicas', descricao: 'Biologia, Medicina, Biotecnologia e Ciências da Saúde', documentos: 100 },
            { id: 3, nome: 'Ciências Humanas', descricao: 'História, Geografia, Filosofia, Sociologia e Psicologia', documentos: 100 },
            { id: 4, nome: 'Ciências Sociais', descricao: 'Administração, Economia, Direito e Ciências Políticas', documentos: 100 },
            { id: 5, nome: 'Artes e Design', descricao: 'Artes Visuais, Música, Design e Arquitetura', documentos: 100 },
            { id: 6, nome: 'Ciências Agrárias', descricao: 'Agronomia, Zootecnia, Engenharia Florestal e Meio Ambiente', documentos: 100 }
        ];
        
        const icones = {
            'Ciências Exatas': '💻',
            'Ciências Biológicas': '🧬',
            'Ciências Humanas': '🏛️',
            'Ciências Sociais': '📊',
            'Artes e Design': '🎨',
            'Ciências Agrárias': '🌱'
        };
        
        container.innerHTML = areasEstaticas.map(area => `
            <div class="area-card" onclick="verConteudosArea(${area.id})">
                <div class="area-icon">${icones[area.nome] || '📚'}</div>
                <h3 class="area-title">${area.nome}</h3>
                <div class="area-count">${area.documentos} documentos</div>
                <p class="area-desc">${area.descricao}</p>
            </div>
        `).join('');
    }
}

// ============================================
// FUNÇÃO VER CONTEÚDOS DA ÁREA (ATUALIZADA)
// ============================================

// Atualize estas funções para linkar corretamente:

function verConteudosArea(areaId) {
    // Agora vai para areas.html com parâmetro da área
    window.location.href = 'areas.html?area=' + areaId;
}

function verDocumento(id) {
    // Vai para areas.html com parâmetro do documento
    window.location.href = 'areas.html?doc=' + id;
}

// ============================================
// CARREGAR DOCUMENTOS RECENTES
// ============================================

async function carregarDocumentosRecentes() {
    const container = document.getElementById('documentosRecentes');
    
    try {
        const resposta = await fetch('/api/documentos');
        const documentos = await resposta.json();
        const recentes = documentos.slice(0, 3);
        
        container.innerHTML = recentes.map(doc => `
            <div class="doc-item" onclick="verDocumento(${doc.id})">
                <div class="doc-icon">📑</div>
                <div>
                    <h4>${doc.titulo}</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">${doc.autor} • ${doc.area}</p>
                </div>
            </div>
        `).join('');
        
    } catch (erro) {
        // Dados estáticos
        container.innerHTML = `
            <div class="doc-item" onclick="verDocumento(1)">
                <div class="doc-icon">📑</div>
                <div>
                    <h4>Inteligência Artificial na Educação</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Dr. Silva • Ciência da Computação</p>
                </div>
            </div>
            <div class="doc-item" onclick="verDocumento(2)">
                <div class="doc-icon">📑</div>
                <div>
                    <h4>Sustentabilidade Urbana</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Dra. Santos • Engenharia Civil</p>
                </div>
            </div>
            <div class="doc-item" onclick="verDocumento(3)">
                <div class="doc-icon">📑</div>
                <div>
                    <h4>Novas Perspectivas em Psicologia</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Dr. Oliveira • Psicologia</p>
                </div>
            </div>
        `;
    }
}

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

function verDocumento(id) {
    window.location.href = '/documento/' + id;
}

function pesquisar() {
    const termo = document.getElementById('campoPesquisa').value;
    if (termo.trim() === '') {
        alert('Digite algo para pesquisar');
        return;
    }
    alert('Pesquisando por: "' + termo + '"\n\nFuncionalidade em desenvolvimento');
}

function abrirFavoritos() {
    alert('Meus Favoritos - Em desenvolvimento');
}

function abrirHistorico() {
    alert('Histórico - Em desenvolvimento');
}

function abrirDownloads() {
    alert('Downloads - Em desenvolvimento');
}

// ============================================
// FUNÇÕES DE NAVEGAÇÃO - LINKADAS CORRETAMENTE
// ============================================

// Quando clica em uma área (os 6 cards)
function verConteudosArea(areaId) {
    // Link para lista-documentos.html com ID da área
    window.location.href = 'lista-documentos.html?area=' + areaId;
}

// Quando clica em um documento específico
function verDocumento(id) {
    // Link para documento.html com ID do documento
    window.location.href = 'documento.html?id=' + id;
}

// ============================================
// SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
