
<<<<<<< HEAD
import path from 'path';
import { promises as fs } from 'fs';

// Define the shape of a server config from the JSON file
interface ServerConfigJson {
    id: string;
    name: string;
    zone: string;
    server: string;
    database: string;
    user_env: string;
    password_env: string;
}

// Define the shape of the final, processed server configuration object
export interface ProcessedServerConfig {
    id: string;
    name: string;
    zone: string;
    server: string;
    database: string;
    user: string;
    password?: string;
    options: {
      encrypt: boolean;
      trustServerCertificate: boolean;
    };
    pool: {
      max: number;
      min: number;
      idleTimeoutMillis: number;
    };
    requestTimeout: number;
    connectionTimeout: number;
}

// A simple in-memory cache to avoid reading the file on every request
let configCache: Record<string, ProcessedServerConfig> | null = null;

/**
 * Reads servers.json, combines it with environment variables, and returns
 * a full configuration object suitable for the mssql library.
 * The result is cached in memory.
 */
export async function getServerConfigs(): Promise<Record<string, ProcessedServerConfig>> {
    if (configCache) {
        return configCache;
    }

    try {
        const filePath = path.join(process.cwd(), 'servers.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const servers: ServerConfigJson[] = JSON.parse(fileContent);

        const processedConfigs: Record<string, ProcessedServerConfig> = {};

        for (const server of servers) {
            const user = process.env[server.user_env];
            const password = process.env[server.password_env];

            if (!user) {
                console.warn(`Warning: Environment variable ${server.user_env} for server ${server.id} is not set.`);
                continue; // Skip this server if essential config is missing
            }
            if (!password) {
                 console.warn(`Warning: Environment variable ${server.password_env} for server ${server.id} is not set.`);
            }

            processedConfigs[server.id] = {
                id: server.id,
                name: server.name,
                zone: server.zone,
                server: server.server,
                database: server.database,
                user: user,
                password: password,
                options: {
                    encrypt: false,
                    trustServerCertificate: true
                },
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 30000
                },
                requestTimeout: 15000,
                connectionTimeout: 15000
            };
        }
        
        configCache = processedConfigs;
        return processedConfigs;

    } catch (error) {
        console.error("Error reading or parsing servers.json:", error);
        // Return an empty object or throw to prevent the app from running without config
        return {};
    }
}
=======
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
>>>>>>> parent of 91e4265 (Queri V1-Done)
