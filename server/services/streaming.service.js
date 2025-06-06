// ============================================================================
// FILE: server/services/streaming.service.js
// Service to periodically fetch and stream data over WebSockets.
// ============================================================================
const { queryDatabase: streamQueryDatabase } = require('./mssql.service'); // Renamed to avoid scope collision
const { serverConfigs: streamServerConfigs } = require('../config/server.config');
const { kpis: kpisQuery } = require('../config/sql.queries'); // Renamed to avoid scope collision

const STREAM_INTERVAL_MS = 5000; // 5 seconds

function startMetricsStream(io) {
  console.log(`STREAMING: Service started. Fetching data every ${STREAM_INTERVAL_MS / 1000}s.`);
  
  setInterval(async () => {
    const serverIds = Object.keys(streamServerConfigs);
    for (const serverId of serverIds) {
      try {
        const kpiData = await streamQueryDatabase(serverId, kpisQuery);
        io.to(serverId).emit('kpi_update', kpiData[0] || {});
      } catch (error) {
        io.to(serverId).emit('server_error', { error: `Could not connect to ${serverId}` });
        console.error(`STREAMING: Failed to fetch data for ${serverId}:`, error.message);
      }
    }
  }, STREAM_INTERVAL_MS);
}

module.exports = { startMetricsStream };
