// ============================================================================
// FILE: nextjs-app/app/api/servers/route.ts (MODIFIED)
// ============================================================================
import { NextResponse } from 'next/server';
<<<<<<< HEAD
import { getMonitoredServers } from '@/app/lib/configDb';

export const dynamic = 'force-dynamic';
=======
import { serverConfigs } from '@/app/lib/server-config';
>>>>>>> parent of 13c443f (Queri V1-Done)

export async function GET() {
  const serverList = await getMonitoredServers();
  return NextResponse.json(serverList);
}
