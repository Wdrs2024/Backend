const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3000;
=======
const port = process.env.PORT || 5000;

>>>>>>> 80d197142cf69f55fe45e3dcbd248bdd43f771b8

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

<<<<<<< HEAD
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Erro ao salvar contato:', err);
            return res.status(500).json({ error: 'Erro ao salvar contato' });
        }
        console.log('Contato inserido com sucesso, ID:', result.insertId);
        res.status(201).json({ message: 'Contato salvo com sucesso!' });
    });
=======
    res.status(200).json({ message: 'Mensagem recebida com sucesso!' });
>>>>>>> 80d197142cf69f55fe45e3dcbd248bdd43f771b8
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
