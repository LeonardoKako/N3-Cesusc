const sql = require("mssql");
const { poolPromise } = require("../db/db"); // Import poolPromise

exports.listar = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Categoria");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

    const pool = await poolPromise;
    const request = pool.request();
    request.input("nome", sql.VarChar(100), nome);
    await request.query("INSERT INTO Categoria (nome) VALUES (@nome)");

    res.status(201).json({ mensagem: "Categoria criada" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pool = await poolPromise;

    const checkRequest = pool.request();
    checkRequest.input("categoria_id", sql.Int, id);
    const produtos = await checkRequest.query(
      "SELECT * FROM Produto WHERE categoria_id = @categoria_id"
    );

    if (produtos.recordset.length > 0) {
      return res.status(400).json({ erro: "Categoria possui produtos" });
    }

    const deleteRequest = pool.request();
    deleteRequest.input("id", sql.Int, id);
    await deleteRequest.query("DELETE FROM Categoria WHERE id = @id");

    res.json({ mensagem: "Categoria deletada" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
