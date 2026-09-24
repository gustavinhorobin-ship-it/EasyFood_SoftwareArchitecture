# 🍔 EasyFood

O **EasyFood** é uma aplicação web completa (Full-Stack) focada num sistema de delivery. O projeto conta com uma interface front-end moderna (simulando a tela de um smartphone) e uma API back-end robusta, integrada com banco de dados e sistema de autenticação.

## 🚀 Funcionalidades

- **Catálogo de Restaurantes:** Listagem dinâmica de estabelecimentos com interface em formato de cards.
- **Filtros e Busca:** Pesquisa de restaurantes por nome e filtro rápido por categorias (Burger, Pizza, Sushi, etc.).
- **Cadastro de Parceiros:** Formulário interativo para registro de novos restaurantes na plataforma.
- **Segurança (JWT):** Proteção de rotas sensíveis (como o cadastro de restaurantes) através de autenticação via JSON Web Token.
- **Interface Responsiva e Fluida:** Design focado em UX (User Experience) com feedback visual, *spinners* de carregamento e animações suaves.

## 🛠️ Tecnologias Utilizadas

**Front-end (UX):**
- HTML5, CSS3, JavaScript (Vanilla)
- Consumo de API REST via `fetch`

**Back-end (API):**
- **[Node.js](https://nodejs.org/)** com o framework **[Express](https://expressjs.com/)**
- **[Prisma ORM](https://www.prisma.io/)** para modelagem e comunicação com o banco de dados
- Banco de dados relacional **[PostgreSQL](https://www.postgresql.org/)**
- Criptografia de senhas com **Bcrypt** e Autenticação com **JWT**

## 📁 Estrutura do Projeto

A arquitetura do projeto está organizada da seguinte forma:

```text
projeto-easyfood/
├── .agents/ & .windsurf/ # Configurações de ambiente/IDE
├── adrs/                 # Architecture Decision Records (Decisões de arquitetura documentadas)
├── modules/              # Lógica da aplicação dividida por domínios (auth, restaurants)
├── prisma/               # Esquema do banco de dados e histórico de migrações
├── ux/                   # Interface do usuário (Front-end: index.html)
├── .env                  # Variáveis de ambiente (credenciais)
├── app.js                # Configuração do Express, middlewares (CORS) e roteamento principal
├── server.js             # Ponto de entrada que inicia o servidor Node.js
└── package.json          # Dependências e scripts do projeto


🖥️ Como rodar o projeto localmente
npm install

Snippet de código


DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/easyfood?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"

Execute as migrações do Prisma para criar as tabelas no seu PostgreSQL:

Bash


npx prisma migrate dev
Inicie o servidor (a API ficará disponível em http://localhost:3000):

Bash


node server.js
