import { Pool } from 'pg';

// A variável 'DATABASE_URL' é a convenção padrão do Render para o banco de dados.
const connection = new Pool({
    // Render fornecerá essa variável
    connectionString: process.env.DATABASE_URL,
    
    // Configurações para produção/Render (necessário para SSL)
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false 
    } : false,
});

connection.connect((err, client, done) => {
    if (err) {
        // ... (Seu código de log de erro, incluindo o process.exit(1))
        console.error('ERRO CRÍTICO: Falha ao conectar no banco de dados Postgres!');
        process.exit(1); 
    } else {
        client.release(); 
        console.log('Conectado ao banco de dados PostgreSQL');
    }
});

export default connection;