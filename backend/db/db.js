const sql = require("mssql");
const config = require("./config");

// Cria e conecta o pool imediatamente
const pool = new sql.ConnectionPool(config);
const poolPromise = pool
  .connect()
  .then(() => {
    console.log("Conectado ao SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Erro na conexão:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  pool,
  poolPromise,
};
