// ============================================================================
// FILE: nextjs-app/lib/configDb.ts (NEW)
// Service to connect to the PostgreSQL config database.
"use server"
import { Pool } from 'pg';
import { Server } from '@/types';

let pool: Pool;

function getDbPool(): Pool {
    if (!pool) {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL environment variable is not set.");
        }
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : undefined
        });
    }
    return pool;
}



export async function getMonitoredServers(): Promise<Server[]> {
    const dbPool = getDbPool();
    const res = await dbPool.query('SELECT display_id as id, name, zone FROM monitored_servers ORDER BY zone, name');
    return res.rows;
}

export async function getServerConfigById(serverId: string) {
    const dbPool = getDbPool();
    const res = await dbPool.query('SELECT * FROM monitored_servers WHERE display_id = $1', [serverId]);
    if (res.rows.length === 0) return null;

    const dbRow = res.rows[0];
    
    return {
        id: dbRow.display_id,
        name: dbRow.name,
        zone: dbRow.zone,
        server: dbRow.host,
        database: dbRow.database_name,
        user: dbRow.db_user,
        password: dbRow.db_password,
        options: { encrypt: false, trustServerCertificate: true },
        requestTimeout: 15000,
        connectionTimeout: 15000
    };
}
