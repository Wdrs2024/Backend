import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// IMPORTANTE: Em ES Modules, módulos locais precisam da extensão completa (.js).
import contactsRoutes from './routes/contacts.js'; 

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota principal
app.use('/api/contacts', contactsRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor backend rodando em http://localhost:3000');
});