const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Erro ao salvar contato:', err);
      res.status(500).json({ error: 'Erro ao salvar contato' });
    } else {
      res.status(201).json({ message: 'Contato salvo com sucesso' });
    }
  });
});

module.exports = router;
