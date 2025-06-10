import { AppConfig, ServerConfig } from '@/types/index';
import { Pool } from 'pg';

let configPool: Pool | null = null;

export async function getServerConfigs(): Promise<ServerConfig[]> {
    if (!configPool) {
        configPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : false
        });
    }

    const result = await configPool.query('SELECT * FROM monitored_servers WHERE enabled = true');
    return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        dbConfig: {
            user: row.username,
            password: row.password,
            server: row.host,
            database: row.database,
            port: row.port,
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        },
        monitoringInterval: row.monitoring_interval,
        enabled: row.enabled
    }));
}

export async function getServerConfigById(id: string): Promise<ServerConfig | null> {
    const configs = await getServerConfigs();
    return configs.find(config => config.id === id) || null;
}