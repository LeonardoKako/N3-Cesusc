const sql = require("mssql");
const config = require("../db/config");

// Listar todos os produtos
exports.listar = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Produto");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

// Buscar produto por ID
exports.buscarPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await sql.connect(config);
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    const result = await request.query("SELECT * FROM Produto WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

// Criar novo produto via Stored Procedure
exports.criar = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      quantidade_estoque,
      categoria_id,
      fornecedor_id,
    } = req.body;

    if (
      !nome ||
      preco <= 0 ||
      quantidade_estoque < 0 ||
      !categoria_id ||
      !fornecedor_id
    ) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    await sql.connect(config);
    const request = new sql.Request();
    request.input("nome", sql.VarChar(100), nome);
    request.input("descricao", sql.Text, descricao);
    request.input("preco", sql.Decimal(10, 2), preco);
    request.input("quantidade_estoque", sql.Int, quantidade_estoque);
    request.input("categoria_id", sql.Int, categoria_id);
    request.input("fornecedor_id", sql.Int, fornecedor_id);

    await request.execute("InserirProduto");

    res.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

// Atualizar produto
exports.atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      nome,
      descricao,
      preco,
      quantidade_estoque,
      categoria_id,
      fornecedor_id,
      data_validade,
    } = req.body;

    await sql.connect(config);
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("nome", sql.VarChar(100), nome);
    request.input("descricao", sql.Text, descricao);
    request.input("preco", sql.Decimal(10, 2), preco);
    request.input("quantidade_estoque", sql.Int, quantidade_estoque);
    request.input("categoria_id", sql.Int, categoria_id);
    request.input("fornecedor_id", sql.Int, fornecedor_id);
    request.input("data_validade", sql.Date, data_validade);

    await request.query(`
      UPDATE Produto SET 
        nome = @nome, 
        descricao = @descricao,
        preco = @preco,
        quantidade_estoque = @quantidade_estoque,
        categoria_id = @categoria_id,
        fornecedor_id = @fornecedor_id,
        data_validade = @data_validade
      WHERE id = @id
    `);

    res.json({ mensagem: "Produto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};

// Deletar produto se estoque zero
exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await sql.connect(config);

    const checkRequest = new sql.Request();
    checkRequest.input("id", sql.Int, id);
    const result = await checkRequest.query(
      "SELECT quantidade_estoque FROM Produto WHERE id = @id"
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    if (result.recordset[0].quantidade_estoque > 0) {
      return res.status(400).json({ erro: "Produto ainda tem estoque" });
    }

    const deleteRequest = new sql.Request();
    deleteRequest.input("id", sql.Int, id);
    await deleteRequest.query("DELETE FROM Produto WHERE id = @id");

    res.json({ mensagem: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } finally {
    sql.close();
  }
};
