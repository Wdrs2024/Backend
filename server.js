const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());

// Rota de teste para o endereço raiz (/)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API PED Hospitalar está online!',
        info: 'Use as rotas /api/clients, /api/products e /api/contacts (POST).'
    });
});

// Rota para receber dados do formulário de contato
app.post('/api/contacts', (req, res) => {
    const { name, email, message } = req.body;

    console.log('--- Novo Contato Recebido ---');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensagem: ${message}`);

    res.status(200).json({ message: 'Mensagem recebida com sucesso!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
