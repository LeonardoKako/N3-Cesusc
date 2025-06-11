CREATE DATABASE SupermercadoDB;
GO

USE SupermercadoDB;
GO

CREATE TABLE Categoria (
    id INT PRIMARY KEY IDENTITY,
    nome VARCHAR(100) NOT NULL
);
GO


CREATE TABLE Fornecedor (
    id INT PRIMARY KEY IDENTITY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20)
);
GO

CREATE TABLE Produto (
    id INT PRIMARY KEY IDENTITY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    categoria_id INT FOREIGN KEY REFERENCES Categoria(id),
    fornecedor_id INT FOREIGN KEY REFERENCES Fornecedor(id)
);
GO