// index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactsRoutes from './routes/contacts.js';

const app = express();

// Permitir frontend do Vercel
app.use(cors({
  origin: 'https://ped-hospitalar.vercel.app'
}));

// Middleware
app.use(bodyParser.json());

// Rotas principais
app.use('/api/contacts', contactsRoutes);

// Rota padrão para teste
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API PED Hospitalar está online!',
    info: 'Use a rota POST /api/contacts para enviar mensagens.'
  });
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
