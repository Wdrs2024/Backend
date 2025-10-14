import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import contactsRoutes from './routes/contacts.js';

const { Pool } = pkg;

const app = express();

// ======================================================================
// CONFIGURAÇÃO DO BANCO DE DADOS (POSTGRESQL)
// ======================================================================

// O Pool lerá automaticamente as variáveis PGHOST, PGUSER, PGDATABASE, etc., 
// ou a DATABASE_URL do ambiente Render.
const pool = new Pool({
    // Necessário para conexões seguras no Render
    ssl: { 
        rejectUnauthorized: false 
    } 
});

// ======================================================================
// CONFIGURAÇÃO CORS - SOLUÇÃO PARA O ERRO DE REDE
// ======================================================================

// Lista de domínios que podem acessar esta API (FRONTEND)
const allowedOrigins = [
    'https://ped-hospitalar.vercel.app', // Seu domínio de produção no Vercel
    // Se precisar testar localmente:
    'http://localhost:8080', 
    'http://localhost:3000', 
];

app.use(cors({
    origin: (origin, callback) => {
        // Permite se a origem não estiver definida (requisições como Postman/cURL)
        // OU se a origem estiver na nossa lista de permissão
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: Origin not allowed - ${origin}`);
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'], // Permite os métodos necessários, incluindo OPTIONS (para preflight request)
    allowedHeaders: ['Content-Type'], // Permite o cabeçalho Content-Type
}));

// ======================================================================
// MIDDLEWARES GERAIS E ROTAS
// ======================================================================

// Middleware para processar JSON do corpo da requisição (substitui o body-parser.json())
app.use(express.json()); 


// Rota de teste/status da API
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API PED Hospitalar está online!',
        info: 'Use a rota POST /api/contacts para enviar mensagens.'
    });
});

// Middleware que injeta a conexão (pool) na requisição antes de chamar as rotas de contato
app.use('/api/contacts', (req, res, next) => {
    // Adiciona o pool de conexão, acessível no controller via req.db
    req.db = pool; 
    next();
}, contactsRoutes);


// ======================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================================

// Render usa a variável de ambiente PORT (se não definida, usa 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});