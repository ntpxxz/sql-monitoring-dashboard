// ============================================================================
// FILE: nextjs-app/lib/server-config.ts
// ============================================================================
// **สำคัญ:** ใส่ข้อมูลการเชื่อมต่อที่ถูกต้องของคุณที่นี่
// ในโปรดักชันจริง ควรดึงข้อมูลนี้มาจาก Environment Variables เพื่อความปลอดภัย
export const serverConfigs = {
    'prod-db-1': {
      id: 'prod-db-1',
      name: 'Production DB (Primary)',
      user: process.env.PROD_DB_USER || 'your_user',
      password: process.env.PROD_DB_PASSWORD || 'your_password',
      server: process.env.PROD_DB_HOST || 'localhost',
      database: 'master',
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    },
    'dev-db-1': {
      id: 'dev-db-1',
      name: 'Development DB',
      user: process.env.DEV_DB_USER || 'your_user',
      password: process.env.DEV_DB_PASSWORD || 'your_password',
      server: process.env.DEV_DB_HOST || 'localhost',
      database: 'master',
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    },
  };
  