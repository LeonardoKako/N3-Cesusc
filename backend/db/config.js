module.exports = {
  user: 'seu_usuario',       // seu usuário do SQL Server
  password: 'sua_senha',     // sua senha do SQL Server
  server: 'localhost',       // endereço do servidor do banco
  database: 'SupermercadoDB',// nome do banco de dados
  options: {
    encrypt: false,          // se estiver usando Azure, pode precisar de true
    enableArithAbort: true   // recomendação para o driver mssql
  }
};
