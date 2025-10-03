const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { nome, email, telefone } = req.body;
  const query = 'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)';
  db.query(query, [nome, email, telefone], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar cliente:', err);
      res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    } else {
      res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
    }
  });
});

module.exports = router; // 🔴 ESSA LINHA É OBRIGATÓRIA!
