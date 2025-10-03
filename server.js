const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); 
app.use(cors()); 

// --- NOVO CÓDIGO AQUI: Rota de teste para o endereço raiz (/) ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'API PED Hospitalar está online!',
        info: 'Use as rotas /api/clients, /api/products e /api/contacts (POST).'
    });
});
// -----------------------------------------------------------------

// Rota para receber dados do formulário de contato
app.post('/api/contacts', (req, res) => {
    // ... seu código da rota POST continua aqui ...
    const { name, email, message } = req.body;

    // Apenas para demonstração, mostre os dados no console
    console.log('--- Novo Contato Recebido ---');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensagem: ${message}`);

    // Envie uma resposta de sucesso ao frontend
    res.status(200).json({ message: 'Mensagem recebida com sucesso!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    // Apenas envia um status de sucesso e uma mensagem
    res.status(200).json({ 
        message: "API PED Hospitalar está online!",
        endpoints: [
            "/api/clients", 
            "/api/products", 
            "/api/contacts"
        ]
    });
});