// server/api/index.js
// Main router that combines all other route files.

const express = require('express');
const router =express.Router();

const serverRoutes = require('./servers.routes');

// Mount the server-specific routes under /servers
router.use('/servers', serverRoutes);

module.exports = router;

// -------------------------------------------------------------------

// server/api/servers.routes.js
// Defines all API endpoints related to server monitoring and optimization.

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { queryDatabase } = require('../services/mssql.service');
const { serverConfigs } = require('../config/server.config');
const sqlQueries = require('../config/sql.queries');

// GET /api/servers -> Get a list of all configured servers for the UI sidebar.
router.get('/', (req, res) => {
  // Return a simplified list of servers (without sensitive info)
  const serverList = Object.values(serverConfigs).map(s => ({
    id: s.id,
    name: s.name,
  }));
  res.json(serverList);
});

// GET /api/servers/:serverId/overview -> Get dashboard data for a specific server.
router.get('/:serverId/overview', async (req, res) => {
    const { serverId } = req.params;
    try {
        const kpiData = await queryDatabase(serverId, sqlQueries.kpis);
        const slowQueriesData = await queryDatabase(serverId, sqlQueries.slowQueries);
        res.json({
            kpis: kpiData[0] || {},
            slowQueries: slowQueriesData,
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch overview for ${serverId}` });
    }
});

// POST /api/servers/:serverId/optimize -> Forward a query to the Python AI service for optimization.
router.post('/:serverId/optimize', async (req, res) => {
    const { serverId } = req.params;
    const { query_text, database_name } = req.body;

    if (!query_text || !database_name) {
        return res.status(400).json({ error: 'query_text and database_name are required.' });
    }

    try {
        // Step 1: Get the database schema for context.
        const schemaQuery = sqlQueries.getSchema(database_name);
        const schemaResult = await queryDatabase(serverId, schemaQuery);
        const db_schema_string = schemaResult.map(row => 
            `Table: ${row.TABLE_NAME}, Column: ${row.COLUMN_NAME}, Type: ${row.DATA_TYPE}`
        ).join('\n');

        // Step 2: Call the Python AI service (expected to be on port 8000).
        const aiServiceUrl = 'http://localhost:8000/optimize-query';
        const aiResponse = await axios.post(aiServiceUrl, {
            query_text: query_text,
            db_schema: db_schema_string
        });

        // Step 3: Return the AI's suggestion to the frontend.
        res.json(aiResponse.data);

    } catch (error) {
        console.error('Error in /optimize route:', error.message);
        res.status(500).json({ error: 'Failed to get AI optimization.' });
    }
});

module.exports = router;