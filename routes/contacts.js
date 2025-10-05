import express from 'express';
// IMPORTANTE: Módulos locais precisam da extensão .js.
import db from '../config/db.js'; 

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validação simples (recomendado para produção)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos (nome, email, mensagem) são obrigatórios.' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Erro ao salvar contato:', err);
      // Evite expor detalhes internos do erro ao cliente
      res.status(500).json({ error: 'Erro interno ao salvar contato no banco de dados.' });
    } else {
      res.status(201).json({ message: 'Contato salvo com sucesso', id: result.insertId });
    }
  });
});

// Exporta o roteador usando a sintaxe de ES Modules
export default router;
