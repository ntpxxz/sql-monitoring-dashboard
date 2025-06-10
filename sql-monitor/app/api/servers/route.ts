// ============================================================================
// FILE: nextjs-app/app/api/servers/route.ts (MODIFIED)
// ============================================================================
import { NextResponse } from 'next/server';
import { getMonitoredServers } from '@/lib/configDb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const serverList = await getMonitoredServers();
  return NextResponse.json(serverList);
}
