# 🏥 Sistema Web – PED Hospitalar

## 📌 Descrição do Projeto

O **PED Hospitalar** é um sistema web full-stack desenvolvido para otimizar o gerenciamento e o acompanhamento dos contatos de uma empresa de materiais hospitalares. O foco principal é fornecer uma interface eficiente para a gestão de informações de clientes, produtos e o processamento de formulários de contato.

O sistema foi arquitetado em três camadas independentes:

1.  **Frontend (Vue.js + TypeScript):** Interface do Usuário (Single Page Application - SPA).
2.  **Backend (Node.js + Express):** API RESTful que orquestra a lógica de negócio e o acesso aos dados.
3.  **Banco de Dados (PostgreSQL):** Persistência e armazenamento seguro dos dados.

---

## 🔗 Acesso ao Sistema e Deploy

O sistema está implantado e disponível online, utilizando serviços de hospedagem modernos e eficientes:

| Serviço | Plataforma de Deploy | URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Vercel** | [ped-hospitalar.vercel.app](https://ped-hospitalar.vercel.app) | **Deploy em Produção** |
| **Backend (API)** | **Render** | [https://ped-hospitalar-backend.onrender.com/](https://ped-hospitalar-backend.onrender.com/) | **Deployed** |
| **Banco de Dados** | **Render (PostgreSQL)** | *(Acesso via Backend)* | **Available** |

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend** | `Vue.js 3` | Framework principal para a SPA. |
| | `TypeScript` | Adiciona tipagem estática ao código JavaScript. |
| **Backend** | `Node.js` | Ambiente de execução. |
| | `Express.js` | Framework minimalista para criação da API RESTful. |
| **Banco de Dados** | `PostgreSQL` | Sistema de Gerenciamento de Banco de Dados Relacional. |
| **Comunicação** | `APIs REST` | Padrão de comunicação entre Frontend e Backend. |

---

## 📊 Funcionalidades Principais

| Categoria | Funcionalidade | Status |
| :--- | :--- | :--- |
| **Contatos** | ✅ Processamento e persistência de dados do formulário de contato. | **Concluído** |
| **Integração** | ✅ Comunicação API REST robusta entre Frontend e Backend. | **Concluído** |
| **Clientes** | Cadastro e gerenciamento de informações de clientes. | Em Desenvolvimento |
| **Produtos** | Listagem e detalhes de produtos hospitalares. | Em Desenvolvimento |

---

## ⚙️ Estrutura do Projeto

O projeto segue uma arquitetura separada para Frontend e Backend:

### **BACKEND/**

### BACKEND/

├── config/

│   └── db.js  # Configuração de conexão com o banco de dados

├── controllers/

│   └── contactController.js  # Lógica de manipulação para contatos

├── db/

│   └── setup.js  # Scripts de inicialização/configuração do DB (ex: migrações)

├── node_modules/

├── routes/

│   ├── clients.js  # Rotas para recursos de clientes

│   ├── contacts.js  # Rotas para recursos de contatos

│   ├── products.js  # Rotas para recursos de produtos

│   └── index.js  # Ponto de agregação de rotas ou rotas principais

├── index.js  # Ponto de entrada do servidor (onde o Express é iniciado)

├── package-lock.json

└── package.json  # Dependências do backend
  

### FRONTEND/
├── node_modules/

├── public/

│   ├── favicon.ico

│   └── index.html  # Ponto de entrada HTML

├── src/

│   ├── assets/

│   │   ├── img/

│   │   │   └── logo.png  # Imagens

│   ├── components/

│   │   ├── ContatoForm.vue  # Componente de formulário

│   │   └── HelloWorld.vue

│   ├── router/

│   │   └── index.ts  # Configuração das rotas

│   ├── service/

│   │   └── api.ts  # Configuração da API (Axios, etc.)

│   ├── views/

│   │   ├── CadastroCliente.vue

│   │   ├── Home.vue

│   │   └── Produtos.vue  # Páginas/Views principais

│   ├── App.vue  # Componente raiz

│   ├── main.ts  # Ponto de entrada do Vue

│   └── shims-vue.d.ts

├── .env  # Variáveis de ambiente

├── .gitignore

├── babel.config.js

├── package-lock.json

├── package.json  # Dependências do frontend

├── README.md

├── tsconfig.json

└── vue.config.js
  

---
## 🔧 Instalação e Configuração

### 1. Configurar o backend
- cd backend
- npm install
- npm start

### ➡️ O servidor rodará em: http://localhost:3000

### 2. Configurar o frontend

- cd frontend
- npm run dev  

### ➡️ App running at: Local:   http://localhost:8080/

### 3. Configurar o banco de dados

- Criar um banco PostgreSQL chamado ped_hospitalar.

---
## 📊 Funcionalidades

✅ Formulário de contato

✅ API REST integrada entre backend e frontend

---
## 👨‍💻 Autor

### Wesley de Souza Pereira – Projeto desenvolvido para a disciplina de Estágio Supervisionado, Multivix Serra, 2025.



