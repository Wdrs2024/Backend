const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

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

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Erro ao salvar contato:', err);
            return res.status(500).json({ error: 'Erro ao salvar contato' });
        }
        console.log('Contato inserido com sucesso, ID:', result.insertId);
        res.status(201).json({ message: 'Contato salvo com sucesso!' });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
