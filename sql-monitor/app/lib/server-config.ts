// ============================================================================
// FILE: nextjs-app/lib/server-config.ts
// ============================================================================

export const serverConfigs = {
  'monitoring-demo': {
    id: 'monitoring-demo',
    name: 'E-commerce Demo',
    zone: 'Demo Databases',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'MonitoringDemoDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 15000, // 15 seconds
    connectionTimeout: 15000 // 15 seconds
  },
  'hr-system-demo': {
    id: 'hr-system-demo',
    name: 'HR System Demo',
    zone: 'Demo Databases',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'HR_SystemDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 15000, // 15 seconds
    connectionTimeout: 15000 // 15 seconds
  },
  'sales-analytics-demo': {
    id: 'sales-analytics-demo',
    name: 'Sales Analytics Demo',
    zone: 'Production',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'SalesAnalyticsDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 15000, // 15 seconds
    connectionTimeout: 15000 // 15 seconds
  },
  'inventory-demo': {
    id: 'inventory-demo',
    name: 'Inventory (Slow Trigger)',
    zone: 'Production',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'InventoryDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 15000, // 15 seconds
    connectionTimeout: 15000 // 15 seconds
  },
  'logging-demo': {
    id: 'logging-demo',
    name: 'Logging (No Index)',
    zone: 'Internal Tools',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'LoggingDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    requestTimeout: 15000, // 15 seconds
    connectionTimeout: 15000 // 15 seconds
  },
};


