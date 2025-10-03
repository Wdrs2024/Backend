const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const contactsRoutes = require('./routes/contacts');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/contacts', contactsRoutes);

app.listen(3000, () => {
  console.log('Servidor backend rodando em http://localhost:3000');
});

