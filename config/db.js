import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // coloque sua senha se tiver
  database: 'ped_hospitalar' // Aqui você muda para o nome correto
});

connection.connect((err) => {
  if (err) {
    // É importante usar 'process.exit(1)' aqui para parar o servidor se a conexão falhar
    console.error('Erro ao conectar no banco de dados:', err.message);
    process.exit(1); 
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Exporta a conexão usando a sintaxe de ES Modules
export default connection;
