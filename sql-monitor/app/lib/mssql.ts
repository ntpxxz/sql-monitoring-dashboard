"use server";
import sql from 'mssql';
import { getServerConfigById } from './configDb';

export async function queryDatabase(serverId: string, queryString: string) {
  const config = await getServerConfigById(serverId);
  if (!config) {
    throw new Error(`Configuration for serverId "${serverId}" not found in the database.`);
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
