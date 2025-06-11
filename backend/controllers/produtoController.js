const sql = require("mssql");
const { poolPromise } = require("../db/db"); // Import poolPromise

// Listar todos os produtos
exports.listar = async (req, res) => {
  try {
    const pool = await poolPromise; // Get the connected pool
    const result = await pool.request().query("SELECT * FROM Produto"); // Use pool.request()
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
  // No finally block for sql.close() when using a pool
};

// Buscar produto por ID
exports.buscarPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pool = await poolPromise; // Get the connected pool
    const request = pool.request(); // Use pool.request()
    request.input("id", sql.Int, id);
    const result = await request.query("SELECT * FROM Produto WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
  // No finally block for sql.close() when using a pool
};

// Criar novo produto via Stored Procedure
exports.criar = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria_id, fornecedor_id } =
      req.body;

    if (!nome || preco <= 0 || estoque < 0 || !categoria_id || !fornecedor_id) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const pool = await poolPromise; // Get the connected pool
    const request = pool.request(); // Use pool.request()

    request.input("nome", sql.VarChar(100), nome);
    request.input("descricao", sql.Text, descricao);
    request.input("preco", sql.Decimal(10, 2), preco);
    request.input("estoque", sql.Int, estoque);
    request.input("categoria_id", sql.Int, categoria_id);
    request.input("fornecedor_id", sql.Int, fornecedor_id);

    await request.execute("InserirProduto");
    res.status(201).json({ mensagem: "Produto criado" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
  // No finally block for sql.close() when using a pool
};

// Atualizar produto
exports.atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, estoque, categoria_id, fornecedor_id } =
      req.body;

    const pool = await poolPromise; // Get the connected pool
    const request = pool.request(); // Use pool.request()
    request.input("id", sql.Int, id);
    request.input("nome", sql.VarChar(100), nome);
    request.input("descricao", sql.Text, descricao);
    request.input("preco", sql.Decimal(10, 2), preco);
    request.input("estoque", sql.Int, estoque);
    request.input("categoria_id", sql.Int, categoria_id);
    request.input("fornecedor_id", sql.Int, fornecedor_id);

    await request.query(`
      UPDATE Produto SET
        nome = @nome,
        descricao = @descricao,
        preco = @preco,
        estoque = @estoque,
        categoria_id = @categoria_id,
        fornecedor_id = @fornecedor_id
      WHERE id = @id
    `);

    res.json({ mensagem: "Produto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
  // No finally block for sql.close() when using a pool
};

// Deletar produto se estoque zero
exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pool = await poolPromise; // Get the connected pool

    const checkRequest = pool.request(); // Use pool.request()
    checkRequest.input("id", sql.Int, id);
    const result = await checkRequest.query(
      "SELECT estoque FROM Produto WHERE id = @id"
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    if (result.recordset[0].estoque > 0) {
      return res.status(400).json({ erro: "Produto ainda tem estoque" });
    }

    const deleteRequest = pool.request(); // Use pool.request()
    deleteRequest.input("id", sql.Int, id);
    await deleteRequest.query("DELETE FROM Produto WHERE id = @id");

    res.json({ mensagem: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
  // No finally block for sql.close() when using a pool
};
