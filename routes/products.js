const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
