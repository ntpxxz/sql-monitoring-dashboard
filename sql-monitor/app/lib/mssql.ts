"use server";
import sql from 'mssql';
import { getServerConfigById } from './configDb';

export async function queryDatabase(serverId: string, queryString: string) {
  const config = await getServerConfigById(serverId);
  if (!config) {
    throw new Error(`Configuration for serverId "${serverId}" not found in the database.`);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 91e4265 (Queri V1-Done)
  // To connect to a specific database for a query, we can override the 'database' property.
  // However, the queries from DMVs are instance-level, so connecting to 'master' or any db is fine.
  // For queries specific to a DB (like getSchema), the USE statement handles it.
  const connectionConfig = { ...config };

>>>>>>> parent of 91e4265 (Queri V1-Done)
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(queryString);
    return result.recordset;
  } catch (err) {
    console.error(`SQL Error on server ${serverId}:`, err);
    throw err;
  }
}