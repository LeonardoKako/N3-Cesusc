const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Importa as rotas
const produtoRoutes = require('./routes/produto');
const categoriaRoutes = require('./routes/categoria');

// Middlewares
app.use(cors());              // liberar acesso externo (front-end)
app.use(express.json());      // entender requisições com JSON no body
app.use(morgan('dev'));       // log simples no console

// Usar rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
