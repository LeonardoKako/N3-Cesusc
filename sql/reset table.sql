DELETE FROM Produto;
DELETE FROM Categoria;
DELETE FROM Fornecedor;

USE SupermercadoDB;
GO

DELETE FROM Produto;
DELETE FROM Categoria;
DELETE FROM Fornecedor;

-- 1. Resetar a tabela Produto (se j� estiver vazia)
DBCC CHECKIDENT ('Produto', RESEED, 0); -- Pr�ximo ID ser� 1
GO

-- 2. Resetar a tabela Categoria (se j� estiver vazia)
DBCC CHECKIDENT ('Categoria', RESEED, 0); -- Pr�ximo ID ser� 1
GO

-- 3. Resetar a tabela Fornecedor (se j� estiver vazia)
DBCC CHECKIDENT ('Fornecedor', RESEED, 0); -- Pr�ximo ID ser� 1
GO