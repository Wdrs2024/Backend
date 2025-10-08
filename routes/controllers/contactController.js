// controllers/contactController.js

// Importa o pool de conexões do nosso arquivo db.js
import db from '../db.js';

// --- Controller Functions ---

/**
 * Lista todos os contatos do banco de dados.
 */
export const getContacts = async (req, res) => {
    try {
        // Executa a consulta SQL para selecionar todos os registros
        const result = await db.query('SELECT id, name, email, phone FROM contacts ORDER BY id ASC');
        
        // Retorna os dados com status 200 (OK)
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao listar contatos:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar contatos.' });
    }
};

/**
 * Adiciona um novo contato ao banco de dados.
 */
export const addContact = async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Todos os campos (name, email, phone) são obrigatórios.' });
    }

    try {
        // Query de inserção usando parâmetros ($1, $2, $3) para prevenir SQL Injection.
        const sql = 'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone';
        const values = [name, email, phone];
        
        const result = await db.query(sql, values);
        
        // O RETURNING devolve a linha inserida (incluindo o ID gerado)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar contato:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao adicionar contato.' });
    }
};

/**
 * Obtém um contato específico pelo ID.
 */
export const getContactById = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'O ID fornecido não é um número válido.' });
    }

    try {
        // Query para buscar um contato pelo ID
        const result = await db.query('SELECT id, name, email, phone FROM contacts WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Contato com ID ${id} não encontrado.` });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar contato por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar contato.' });
    }
};

/**
 * Atualiza um contato existente pelo ID.
 */
export const updateContact = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'O ID fornecido não é um número válido.' });
    }
    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Todos os campos (name, email, phone) são obrigatórios para a atualização.' });
    }

    try {
        // Query de atualização usando RETURNING * para obter o registro atualizado
        const sql = 'UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING id, name, email, phone';
        const values = [name, email, phone, id];

        const result = await db.query(sql, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Contato com ID ${id} não encontrado.` });
        }

        // Retorna o contato atualizado
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar contato:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar contato.' });
    }
};

/**
 * Exclui um contato pelo ID.
 */
export const deleteContact = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'O ID fornecido não é um número válido.' });
    }

    try {
        // Query de exclusão. Usamos RETURNING * para verificar se algo foi excluído
        const result = await db.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Contato com ID ${id} não encontrado para exclusão.` });
        }

        // Retorna uma resposta de sucesso sem conteúdo (No Content) ou o item excluído.
        // Optamos por 200 (OK) e o item excluído.
        res.status(200).json({ message: `Contato com ID ${id} excluído com sucesso.`, deletedContact: result.rows[0] });
    } catch (error) {
        console.error('Erro ao excluir contato:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao excluir contato.' });
    }
};
