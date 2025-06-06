// ============================================================================
// FILE: nextjs-app/lib/mssql.ts
// ============================================================================
import sql from 'mssql';
import { serverConfigs } from './server-config';

type ServerId = keyof typeof serverConfigs;

export async function queryDatabase(serverId: ServerId, queryString: string) {
  const config = serverConfigs[serverId];
  if (!config) {
    throw new Error(`Configuration for serverId "${serverId}" not found.`);
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(queryString);
    return result.recordset;
  } catch (err) {
    console.error(`SQL Error on server ${serverId}:`, err);
    throw err;
  }
}
