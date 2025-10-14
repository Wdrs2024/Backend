// Arquivo: db/setup.js (Localização: na pasta 'db' na raiz do projeto)

import pkg from 'pg';
const { Client } = pkg;

// Configuração de conexão usando as variáveis de ambiente do Render
// As credenciais PGMETHOD, PGHOSH, PGUSER, etc. são usadas aqui.
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    // ESSENCIAL para a conexão segura no Render
    ssl: {
        rejectUnauthorized: false
    }
});

async function setupDatabase() {
    try {
        console.log("Iniciando setup do banco de dados...");
        await client.connect();
        
        // Comando SQL para criar a tabela 'contatos' se ela não existir
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contatos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mensagem TEXT,
                data_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- ADICIONE ESTA LINHA
                created_at TIMESTAMP WITH TIME ZONE -- Remova ou renomeie se quiser usar apenas data_envio
            );
        `;
        
        await client.query(createTableQuery);
        console.log("✅ Tabela 'contatos' verificada/criada com sucesso.");

    } catch (err) {
        console.error("❌ ERRO FATAL ao configurar o banco de dados:", err);
        // Garante que o deploy falhe se a criação da tabela falhar
        process.exit(1); 
    } finally {
        // Encerra a conexão após a conclusão (sucesso ou falha)
        await client.end();
        console.log("Conexão de setup encerrada.");
    }
}

setupDatabase();