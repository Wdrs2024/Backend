import { Pool } from 'pg';

<<<<<<< HEAD
// A variável 'DATABASE_URL' é a convenção padrão do Render para o banco de dados.
const connection = new Pool({
    // Render fornecerá essa variável
    connectionString: process.env.DATABASE_URL,
    
    // Configurações para produção/Render (necessário para SSL)
    ssl: process.env.NODE_ENV === 'production' ? {
=======
// A URL de Conexão é fornecida pelo Render e contém todas as credenciais.
// A variável 'DATABASE_URL' é a convenção padrão do Render para bancos de dados.
const connection = new Pool({
    // Usa a URL do Render em produção, ou uma URL local para desenvolvimento
    connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/ped_hospitalar_local',
    
    // Configurações para produção/Render
    ssl: process.env.NODE_ENV === 'production' ? {
        // Necessário para conexões seguras na nuvem
>>>>>>> 0a9ffa17813f78417faac009dd3b03691f9a3607
        rejectUnauthorized: false 
    } : false,
});

<<<<<<< HEAD
connection.connect((err, client, done) => {
    if (err) {
        // ... (Seu código de log de erro, incluindo o process.exit(1))
        console.error('ERRO CRÍTICO: Falha ao conectar no banco de dados Postgres!');
        process.exit(1); 
    } else {
        client.release(); 
=======
// Teste de conexão (opcional, mas recomendado)
connection.connect((err, client, done) => {
    if (err) {
        console.error('----------------------------------------------------');
        console.error('ERRO CRÍTICO: Falha ao conectar no banco de dados Postgres!');
        console.error('Mensagem de Erro:', err.message);
        console.error('Verifique se a variável DATABASE_URL está configurada corretamente no Render.');
        console.error('----------------------------------------------------');
        process.exit(1); 
    } else {
        client.release(); // Libera o cliente de volta ao pool
>>>>>>> 0a9ffa17813f78417faac009dd3b03691f9a3607
        console.log('Conectado ao banco de dados PostgreSQL');
    }
});

<<<<<<< HEAD
export default connection;
=======
// Exporta o Pool de Conexões (que é melhor que uma única conexão para um servidor web)
export default connection;
>>>>>>> 0a9ffa17813f78417faac009dd3b03691f9a3607
