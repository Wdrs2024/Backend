const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // coloque sua senha se tiver
  database: 'ped_hospitalar' // ⬅️ Aqui você muda para o nome correto
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

module.exports = connection;
