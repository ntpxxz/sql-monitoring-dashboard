// ============================================================================
// FILE: server/services/mssql.service.js
// Handles dynamic connections and queries to SQL Server.
// ============================================================================
const sql = require('mssql');
const { serverConfigs: mssqlServerConfigs } = require('../config/server.config'); // Renamed to avoid scope collision

async function queryDatabase(serverId, queryString) {
  const config = mssqlServerConfigs[serverId];
  if (!config) {
    throw new Error(`Configuration for serverId "${serverId}" not found.`);
  }
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(queryString);
    return result.recordset;
  } catch (err) {
    console.error(`SQL Error on server ${serverId}:`, err.message);
    throw err;
  }
}

module.exports = { queryDatabase };


