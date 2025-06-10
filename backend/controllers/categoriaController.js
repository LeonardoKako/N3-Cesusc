const sql = require('mssql');
const config = require('../db/config');

exports.listar = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Categoria');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;
    if(!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });

    await sql.connect(config);
    const request = new sql.Request();
    request.input('nome', sql.VarChar(100), nome);
    await request.query('INSERT INTO Categoria (nome) VALUES (@nome)');

    res.status(201).json({ mensagem: 'Categoria criada' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await sql.connect(config);

    const checkRequest = new sql.Request();
    checkRequest.input('categoria_id', sql.Int, id);
    const produtos = await checkRequest.query('SELECT * FROM Produto WHERE categoria_id = @categoria_id');

    if (produtos.recordset.length > 0) {
      return res.status(400).json({ erro: 'Categoria possui produtos' });
    }

    const deleteRequest = new sql.Request();
    deleteRequest.input('id', sql.Int, id);
    await deleteRequest.query('DELETE FROM Categoria WHERE id = @id');

    res.json({ mensagem: 'Categoria deletada' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};
