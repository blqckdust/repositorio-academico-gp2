# Repositório Acadêmico

Plataforma digital para organização e acesso facilitado a conteúdos acadêmicos (artigos, publicações e materiais em PDF), classificados por áreas de conhecimento.

## Objetivo do Projeto

Criar uma plataforma onde **administradores** organizem e disponibilizem conteúdos acadêmicos por áreas, permitindo que **alunos** acessem, leiam e baixem materiais de forma simples e organizada.

## Públicos-Alvo

- **Administradores**: Responsáveis por inserir, classificar, editar e manter o acervo de conteúdos.
- **Alunos**: Usuários com acesso ao repositório para navegação, leitura online e download de PDFs.

## Funcionalidades Principais

### Para Administradores
- Autenticação e painel administrativo seguro.
- Cadastro e organização de conteúdos por área de conhecimento.
- Upload de artigos, publicações e documentos (PDF e outros).
- Edição e remoção de conteúdos existentes.

### Para Alunos
- Navegação por áreas específicas.
- Leitura de artigos diretamente na plataforma (visualizador PDF embutido).
- Download de arquivos PDF.
- Pesquisa por título, autor ou área.

## Módulos do Sistema

1. **Autenticação**: Login seguro para administradores e alunos.
2. **Gestão de Áreas**: Criação e organização por categorias acadêmicas.
3. **Gestão de Conteúdos**: Cadastro, visualização, edição e exclusão de materiais.
4. **Acesso ao Repositório**: Busca, filtragem e navegação por parte dos alunos.
5. **Relatórios**: Contagem de acessos e downloads por conteúdo/área.

## Tecnologias Utilizadas

- **Frontend**: Angular (SPA modular)
- **Backend**: Laravel (API RESTful)
- **Banco de Dados**: MySQL ou PostgreSQL
- **Autenticação**: JWT (via Laravel Sanctum ou pacote JWT Auth)

### Estrutura Técnica - Backend (Laravel)
- **Modelos**: Usuário, Área, Conteudo, AcessoConteudo
- **Endpoints RESTful principais**:
  - `/api/login`, `/api/logout`, `/api/me`
  - `/api/admin/conteudos` (CRUD admin)
  - `/api/aluno/conteudos` (listagem e busca para alunos)

### Estrutura Técnica - Frontend (Angular)
- **Módulos**: AuthModule, AdminModule, AlunoModule
- **Serviços**: AuthService, ConteudoService, AreaService
- **Guards**: AuthGuard, AdminGuard, AlunoGuard

## Fluxo de Funcionamento

1. Após login, administradores acessam o painel de gestão para cadastrar conteúdos por área.
2. Alunos acessam o repositório, navegam pelas áreas, visualizam/leem documentos e fazem download.

## Possibilidades Futuras

- Sistema de avaliação e comentários por alunos.
- Histórico de leituras e downloads.
- Integração com bibliotecas externas (ex: Google Scholar, SciELO).
- Estatísticas avançadas por área e conteúdo.
