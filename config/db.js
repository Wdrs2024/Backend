import mysql from 'mysql2';

// A T E N Ç Ã O: Para ambientes de produção (como o Render), 
// você DEVE usar o hostname (endereço externo) e credenciais do seu serviço de banco de dados.
// Usamos process.env para carregar as variáveis de ambiente com segurança.
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'ped_hospitalar',
  // A porta 3306 é padrão, mas é bom usar uma variável de ambiente para flexibilidade
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  
  // Adiciona a opção SSL para provedores de nuvem que a exigem.
  // Muitas vezes, a opção `rejectUnauthorized: false` é necessária para certificados auto-assinados em nuvens.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

connection.connect((err) => {
  if (err) {
    // É importante usar 'process.exit(1)' aqui para parar o servidor se a conexão falhar
    console.error('Erro ao conectar no banco de dados:', err.message);
    console.error('Verifique se as variáveis de ambiente DB_HOST, DB_USER, DB_PASSWORD e DB_NAME foram configuradas corretamente no Render.');
    process.exit(1); 
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Exporta a conexão usando a sintaxe de ES Modules
export default connection;
