// Arquivo: controllers/contactController.js

// Este arquivo é responsável por lidar com a lógica de envio de formulários de contato.

/**
 * Lida com a requisição POST para salvar um novo contato no banco de dados.
 * Assume que a conexão do pool do PostgreSQL está injetada em req.db.
 */
export const handleContactForm = async (req, res) => {
  // 1. Desestrutura os dados do corpo da requisição
  const { nome, email, mensagem } = req.body;

  // 2. Validação básica (verifica se todos os campos estão presentes)
  if (!nome || !email || !mensagem) {
    // Retorna 400 Bad Request se os dados estiverem incompletos
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    // 3. Executa o comando SQL para inserir o novo contato.
    // A coluna 'data_envio' foi CORRIGIDA para 'created_at' para corresponder 
    // à definição da tabela em db/setup.js.
    const sql = `
      INSERT INTO contatos (nome, email, mensagem)
      VALUES ($1, $2, $3)
      RETURNING id, created_at
    `;

    const result = await req.db.query(
      sql,
      [nome, email, mensagem]
    );

    // 4. Sucesso: Loga e retorna 201 Created
    const novoId = result.rows[0].id;
    console.log(`Contato salvo com sucesso! ID: ${novoId}`);

    res.status(201).json({ 
      mensagem: 'Mensagem salva com sucesso!',
      contatoId: novoId
    });

  } catch (err) {
    // 5. Erro: Loga o erro do banco de dados (crucial para debug no Render)
    console.error('Erro ao salvar contato:', err.message || err);
    
    // Se o erro for devido a email duplicado (UNIQUE NOT NULL na tabela), 
    // você pode retornar um erro 409:
    if (err.code === '23505') { // Código de erro PostgreSQL para violação de UNIQUE/PRIMARY KEY
       return res.status(409).json({ erro: 'Este e-mail já foi cadastrado.' });
    }

    // Retorna 500 Internal Server Error para outros erros.
    res.status(500).json({ erro: 'Erro interno ao salvar contato.' });
  }
};