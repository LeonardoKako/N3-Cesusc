const sql = require("mssql");

const config = {
  user: "estoque_user",
  password: "estoque123",
  server: "localhost", // Usando a instância que já está rodando
  database: "SupermercadoDB",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Remove this block
// sql
//   .connect(config)
//   .then((pool) => {
//     console.log("Conectado!");
//   })
//   .catch((err) => {
//     console.error("Erro ao conectar: ", err);
//   });

module.exports = config; // Make sure to export the config
