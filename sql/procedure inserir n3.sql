CREATE PROCEDURE InserirProduto
    @nome VARCHAR(100),
    @descricao TEXT
    @preco DECIMAL(10,2),
    @estoque INT,
    @categoria_id INT,
    @fornecedor_id INT
AS
BEGIN
    IF @preco < 0
    BEGIN
        RAISERROR('O preço não pode ser negativo.', 16, 1);
        RETURN;
    END

    INSERT INTO Produto (nome, descricao, preco, estoque, categoria_id, fornecedor_id)
    VALUES (@nome, @descricao @preco, @estoque, @categoria_id, @fornecedor_id);
END;
GO