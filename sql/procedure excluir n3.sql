CREATE PROCEDURE DeletarProduto
    @id INT
AS
BEGIN
    DELETE FROM Produto WHERE id = @id;
END;
GO