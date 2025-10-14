import pg from 'pg';
const { Pool } = pg;

// Cria o pool de conexões usando a variável de ambiente DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário no Render
  },
});

// Testa a conexão
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL: Conectado com sucesso ao banco de dados.');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL: Erro ao conectar ao banco de dados:', err.message);
  });

export default pool;

