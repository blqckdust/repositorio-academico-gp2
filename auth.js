// ============================================
// SISTEMA DE AUTENTICAÇÃO - LEGWER'S
// ============================================

const AUTH_CONFIG = {
    SESSION_KEY: 'legwers_session',
    USER_KEY: 'legwers_user',
    SESSION_DURATION: 24 * 60 * 60 * 1000 // 24 horas
};

// ============================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================

function fazerLogin(email, senha, lembrar = false) {
    // Simula autenticação (substituir por API real)
    const usuarios = JSON.parse(localStorage.getItem('legwers_usuarios') || '[]');
    
    // Usuário de teste se não houver cadastrados
    const usuarioTeste = {
        id: 1,
        nome: 'Aluno Teste',
        email: 'aluno@legwers.edu',
        senha: '123456', // Em produção, senha seria hash
        matricula: '202400001',
        curso: 'Ciência da Computação'
    };
    
    const todosUsuarios = usuarios.length > 0 ? usuarios : [usuarioTeste];
    
    const usuario = todosUsuarios.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
        return { sucesso: false, erro: 'Email ou senha incorretos' };
    }
    
    // Cria sessão
    const sessao = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        matricula: usuario.matricula,
        curso: usuario.curso,
        loginEm: new Date().toISOString(),
        expiraEm: new Date(Date.now() + AUTH_CONFIG.SESSION_DURATION).toISOString()
    };
    
    // Salva sessão
    if (lembrar) {
        localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(sessao));
    } else {
        sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(sessao));
    }
    
    return { sucesso: true, usuario: sessao };
}

function fazerLogout() {
    localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    
    // Redireciona para login
    window.location.href = 'area-aluno.html';
}

function verificarAutenticacao() {
    const sessao = JSON.parse(
        localStorage.getItem(AUTH_CONFIG.SESSION_KEY) || 
        sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY) || 
        'null'
    );
    
    if (!sessao) {
        return { autenticado: false };
    }
    
    // Verifica se expirou
    if (new Date() > new Date(sessao.expiraEm)) {
        fazerLogout();
        return { autenticado: false };
    }
    
    return { autenticado: true, usuario: sessao };
}

function protegerRota() {
    const auth = verificarAutenticacao();
    
    if (!auth.autenticado) {
        // Salva URL tentada para redirecionar após login
        sessionStorage.setItem('redirect_apos_login', window.location.href);
        
        // Redireciona para login
        window.location.href = 'area-aluno.html?erro=nao_autenticado';
        return false;
    }
    
    // Atualiza UI com dados do usuário
    atualizarUIUsuario(auth.usuario);
    return true;
}

function atualizarUIUsuario(usuario) {
    // Atualiza elementos com dados do usuário
    const elementosNome = document.querySelectorAll('.user-nome');
    const elementosEmail = document.querySelectorAll('.user-email');
    
    elementosNome.forEach(el => el.textContent = usuario.nome);
    elementosEmail.forEach(el => el.textContent = usuario.email);
}

function cadastrarUsuario(dados) {
    let usuarios = JSON.parse(localStorage.getItem('legwers_usuarios') || '[]');
    
    // Verifica se email já existe
    if (usuarios.find(u => u.email === dados.email)) {
        return { sucesso: false, erro: 'Email já cadastrado' };
    }
    
    const novoUsuario = {
        id: Date.now(),
        ...dados,
        criadoEm: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem('legwers_usuarios', JSON.stringify(usuarios));
    
    return { sucesso: true, usuario: novoUsuario };
}

// ============================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está em página protegida
    const paginasProtegidas = ['areas.html', 'documento.html', 'favoritos.html'];
    const paginaAtual = window.location.pathname.split('/').pop();
    
    if (paginasProtegidas.includes(paginaAtual)) {
        protegerRota();
    }
});