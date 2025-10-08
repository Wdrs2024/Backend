// controllers/contactController.js

export const handleContactForm = (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Validação simples
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  // Aqui você pode salvar os dados no banco ou enviar por email
  console.log('Formulário recebido:', { nome, email, mensagem });

  res.status(200).json({ mensagem: 'Mensagem recebida com sucesso!' });
};
