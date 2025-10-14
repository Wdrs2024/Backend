import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';
import contactsRoutes from './routes/contacts.js';

const { Pool } = pkg;

const app = express();

// ✅ Conexão com PostgreSQL (Render fornece DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Certifique-se de que esta linha está presente
});

// ✅ Disponibiliza pool para rotas (middleware simples)
app.set('db', pool);

// ----------------------------------------------------------------------
// ✅ CONFIGURAÇÃO CORS CORRIGIDA
// ----------------------------------------------------------------------

// **ATENÇÃO:** Garanta que a lista 'origin' inclua o domínio exato que falhou no console.
const allowedOrigins = [
  'https://ped-hospitalar.vercel.app', // Domínio principal de produção
  'http://localhost:8080', // Desenvolvimento local
  
  // ** DOMÍNIO DE PREVIEW DA VERCEL **
  'https://frontend-amc1l4117-wesleys-projects-3d707875.vercel.app', 
  
  // Se o seu frontend mudar de subdomínio, você terá que adicionar o novo aqui também!
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (como ferramentas REST) ou se a origem estiver na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Rejeita a requisição CORS
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Permite os métodos necessários para a API
  allowedHeaders: ['Content-Type'], // Permite o cabeçalho Content-Type
}));

// ----------------------------------------------------------------------
// ✅ REMOVEMOS A LINHA 'app.options('*', cors())' REDUNDANTE
//    O middleware acima já lida com as requisições OPTIONS
// ----------------------------------------------------------------------

// ✅ Middleware JSON
// body-parser é um middleware comum, mas o Express já o inclui. 
// O Express usa: app.use(express.json());
// Seu uso de bodyParser.json() está correto, mas use express.json() se quiser modernizar.
app.use(bodyParser.json()); 


// ✅ Rotas
app.use('/api/contacts', (req, res, next) => {
  req.db = pool; // injeta conexão no request
  next();
}, contactsRoutes);


// ✅ Rota de teste
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API PED Hospitalar está online!',
    info: 'Use a rota POST /api/contacts para enviar mensagens.'
  });
});

// ✅ Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});

