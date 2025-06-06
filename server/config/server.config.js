// ============================================================================
// FILE: server/config/server.config.js
// Central configuration for all target SQL servers.
// ============================================================================
const serverConfigs = {
  // IMPORTANT: Add your actual server connection details here
  'prod-db-1': {
    id: 'prod-db-1',
    name: 'Production DB (Primary)',
    user: 'your_prod_user',
    password: 'your_prod_password',
    server: 'prod_server_ip_or_hostname',
    database: 'master',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  'dev-db-1': {
    id: 'dev-db-1',
    name: 'Development DB',
    user: 'your_dev_user',
    password: 'your_dev_password',
    server: 'localhost', // Example for a local dev server
    database: 'master',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
};

module.exports = { serverConfigs };