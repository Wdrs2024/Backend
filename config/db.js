// config/db.js
import pg from 'pg';

// Cria um Pool de Conexões.
// O pacote 'pg' automaticamente detecta e utiliza as seguintes variáveis de ambiente:
// PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT.
const pool = new pg.Pool({
    // Necessário no Render, pois a conexão é feita via TLS/SSL.
    ssl: {
        rejectUnauthorized: false
    }
});

// Testa a conexão ao iniciar o servidor
pool.connect()
    .then(client => {
        console.log('PostgreSQL: Conectado com sucesso ao banco de dados.');
        client.release(); // Libera o cliente de volta para o pool
    })
    .catch(err => {
        console.error('PostgreSQL: Erro ao conectar ao banco de dados:', err.message);
    });

// O Pool é exportado para que os controllers possam executar queries (consultas) SQL.
export default pool;
