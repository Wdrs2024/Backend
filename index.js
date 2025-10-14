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
  ssl: { rejectUnauthorized: false } // necessário no Render
});

// ✅ Disponibiliza pool para rotas (middleware simples)
app.set('db', pool);

// ✅ Permitir apenas o frontend hospedado no Vercel
app.use(cors({
  origin: 'https://ped-hospitalar.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// ✅ Middleware JSON
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
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
