// ============================================
// REPOSITÓRIO ACADÊMICO - Funcionalidades
// ============================================

// Quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarInformacoes();
    carregarAreas();
    carregarDocumentosRecentes();
    configurarNavegacao();
});

// ============================================
// CARREGAR INFORMAÇÕES DO SITE
// ============================================

async function carregarInformacoes() {
    try {
        const resposta = await fetch('/informacoes-do-site');
        const dados = await resposta.json();
        
        document.getElementById('quantidadeArtigos').textContent = dados.totalDeArtigos;
        document.getElementById('quantidadeAreas').textContent = dados.totalDeAreas;
        document.getElementById('quantidadeDownloads').textContent = dados.totalDeDownloads;
        
    } catch (erro) {
        console.log('Usando valores padrão');
        document.getElementById('quantidadeArtigos').textContent = '600';
        document.getElementById('quantidadeAreas').textContent = '6';
        document.getElementById('quantidadeDownloads').textContent = '200';
    }
}

// ============================================
// CARREGAR ÁREAS DE CONHECIMENTO
// ============================================

async function carregarAreas() {
    const lista = document.getElementById('listaDeAreas');
    
    try {
        const resposta = await fetch('/buscar-areas');
        const areas = await resposta.json();
        
        const icones = {
            'Ciências Exatas': '💻',
            'Ciências Biológicas': '🧬',
            'Ciências Humanas': '🏛️',
            'Ciências Sociais': '📊',
            'Artes e Design': '🎨',
            'Ciências Agrárias': '🌱'
        };
        
        lista.innerHTML = areas.map(area => `
            <div class="cartao-area" onclick="entrarNaArea(${area.id})">
                <div class="area-icone">${icones[area.nome] || '📚'}</div>
                <h3 class="area-titulo">${area.nome}</h3>
                <div class="area-quantidade">${area.documentos} documentos</div>
                <p class="area-descricao">${area.descricao}</p>
            </div>
        `).join('');
        
    } catch (erro) {
        lista.innerHTML = '<p class="carregando">Erro ao carregar. Tente recarregar a página.</p>';
    }
}

// ============================================
// CARREGAR DOCUMENTOS RECENTES
// ============================================

async function carregarDocumentosRecentes() {
    const container = document.getElementById('documentosRecentes');
    
    try {
        const resposta = await fetch('/buscar-documentos');
        const documentos = await resposta.json();
        const recentes = documentos.slice(0, 3);
        
        container.innerHTML = recentes.map(doc => `
            <div class="item-documento" onclick="abrirDocumento(${doc.id})">
                <div class="doc-icone">📑</div>
                <div>
                    <h4>${doc.titulo}</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">${doc.autor} • ${doc.area}</p>
                </div>
            </div>
        `).join('');
        
    } catch (erro) {
        // Dados de exemplo se der erro
        container.innerHTML = `
            <div class="item-documento">
                <div class="doc-icone">📑</div>
                <div>
                    <h4>Inteligência Artificial na Educação</h4>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Dr. Silva • Ciência da Computação</p>
                </div>
            </div>
        `;
    }
}

// ============================================
// FUNÇÕES DE INTERAÇÃO
// ============================================

function pesquisar() {
    const termo = document.getElementById('campoPesquisa').value;
    if (termo.trim() === '') {
        alert('Digite algo para pesquisar');
        return;
    }
    alert(`Pesquisando por: "${termo}"\n\nFuncionalidade em desenvolvimento`);
}

function entrarNaArea(id) {
    console.log('Entrando na área:', id);
    alert(`Área ${id} - Em desenvolvimento`);
}

function abrirDocumento(id) {
    console.log('Abrindo documento:', id);
    alert(`Documento ${id} - Em desenvolvimento`);
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
// NAVEGAÇÃO SUAVE
// ============================================

function configurarNavegacao() {
    // Links suaves
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destino = document.querySelector(link.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Sombra no menu ao rolar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(17, 46, 74, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(17, 46, 74, 0.1)';
        }
    });
}