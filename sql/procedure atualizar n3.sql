CREATE PROCEDURE AtualizarProduto
    @id INT,
    @nome VARCHAR(100),
    @descricao TEXT
    @preco DECIMAL(10,2),
    @estoque INT,
    @categoria_id INT,
    @fornecedor_id INT
AS
BEGIN
    UPDATE Produto
    SET nome = @nome,
	descricao = @descricao
        preco = @preco,
        estoque = @estoque,
        categoria_id = @categoria_id,
        fornecedor_id = @fornecedor_id
    WHERE id = @id;
END;
GO