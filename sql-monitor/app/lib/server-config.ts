// ============================================================================
// FILE: nextjs-app/lib/server-config.ts
// ============================================================================

export const serverConfigs = {
  'monitoring-demo': {
    id: 'monitoring-demo',
    name: 'E-commerce Demo DB',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',
    // สำคัญ: ระบุฐานข้อมูลที่ถูกต้อง
    database: 'MonitoringDemoDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  'hr-system-demo': {
    id: 'hr-system-demo',
    name: 'HR System Demo DB',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'HR_SystemDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  'sales-analytics-demo': {
    id: 'sales-analytics-demo',
    name: 'Sales Analytics Demo DB',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',
    database: 'SalesAnalyticsDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  'inventory-demo': {
    id: 'inventory-demo',
    name: 'Inventory Demo (Slow Trigger)',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',    database: 'InventoryDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  'logging-demo': {
    id: 'logging-demo',
    name: 'Logging Demo (No Index)',
    user: process.env.DEMO_DB_USER || 'sa',
    password: process.env.DEMO_DB_PASSWORD || '123456',
    server: process.env.DEMO_DB_HOST || 'localhost',    database: 'LoggingDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
};
