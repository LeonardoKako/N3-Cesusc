USE SupermercadoDB;
GO

-- Exemplo de inser��o de produtos usando a Stored Procedure InserirProduto

-- Voc� precisar� saber os IDs das categorias e fornecedores que voc� acabou de inserir.
-- Por exemplo, se 'Mercearia' � ID 2, 'Hortifruti' � ID 3, e 'Fornecedor A' � ID 1, 'Fornecedor B' � ID 2.

-- Produto 1: Arroz (Mercearia, Fornecedor A)
EXEC InserirProduto
    @nome = 'Arroz Tipo 1',
    @descricao = 'Arroz branco de alta qualidade, pacote 5kg',
    @preco = 25.99,
    @estoque = 150,
    @categoria_id = 2, -- ID da categoria 'Mercearia'
    @fornecedor_id = 1; -- ID do 'Fornecedor A'

-- Produto 2: Ma�� Fuji (Hortifruti, Fornecedor B)
EXEC InserirProduto
    @nome = 'Ma�� Fuji',
    @descricao = 'Ma��s frescas e crocantes, por quilo',
    @preco = 8.50,
    @estoque = 200,
    @categoria_id = 3, -- ID da categoria 'Hortifruti'
    @fornecedor_id = 2; -- ID do 'Fornecedor B'

-- Produto 3: Sab�o em P� (Limpeza, Fornecedor C)
-- Lembre-se que a categoria 'Limpeza' tem ID 5 na sua lista de categorias!
EXEC InserirProduto
    @nome = 'Sab�o em P� Concentrado',
    @descricao = 'Sab�o em p� para roupas brancas e coloridas, pacote 1kg',
    @preco = 18.90,
    @estoque = 80,
    @categoria_id = 5, -- ID da categoria 'Limpeza' (ajuste conforme o ID real no seu DB)
    @fornecedor_id = 3; -- ID do 'Fornecedor C'

-- Produto 4: P�o Franc�s (Padaria, Fornecedor A)
-- Lembre-se que a categoria 'Padaria' tem ID 4 na sua lista de categorias!
EXEC InserirProduto
    @nome = 'P�o Franc�s',
    @descricao = 'P�o fresco, assado diariamente, unidade',
    @preco = 0.80,
    @estoque = 500,
    @categoria_id = 4, -- ID da categoria 'Padaria' (ajuste conforme o ID real no seu DB)
    @fornecedor_id = 1; -- ID do 'Fornecedor A'

-- Produto 5: Refrigerante Cola (Bebidas, Fornecedor B)
-- Lembre-se que a categoria 'Bebidas' tem ID 6 na sua lista de categorias!
EXEC InserirProduto
    @nome = 'Refrigerante Cola 2L',
    @descricao = 'Refrigerante sabor cola, garrafa de 2 litros',
    @preco = 7.99,
    @estoque = 120,
    @categoria_id = 6, -- ID da categoria 'Bebidas' (ajuste conforme o ID real no seu DB)
    @fornecedor_id = 2; -- ID do 'Fornecedor B'

GO

-- Para verificar se os produtos foram inseridos corretamente:
SELECT * FROM Produto;
GO