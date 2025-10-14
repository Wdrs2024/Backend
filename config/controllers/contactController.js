export const handleContactForm = async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const result = await req.db.query(
      'INSERT INTO contacts (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING id',
      [nome, email, mensagem]
    );

    console.log('Contato salvo com sucesso! ID:', result.rows[0].id);
    res.status(201).json({ mensagem: 'Mensagem salva com sucesso!' });
  } catch (err) {
    console.error('Erro ao salvar contato:', err);
    res.status(500).json({ erro: 'Erro interno ao salvar contato.' });
  }
};
