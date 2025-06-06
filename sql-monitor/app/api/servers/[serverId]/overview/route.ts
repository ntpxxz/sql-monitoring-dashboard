// ============================================================================
// FILE: nextjs-app/app/api/servers/[serverId]/overview/route.ts
// ============================================================================
import { NextResponse } from 'next/server';
import { queryDatabase } from '@/app/lib/mssql';
import sqlQueries from '@/app/lib/sql-queries';
import { serverConfigs } from '@/app/lib/server-config';

type ServerId = keyof typeof serverConfigs;

export async function GET(
  request: Request,
  { params }: { params: { serverId: string } }
) {
  const { serverId } = params;

  if (!Object.keys(serverConfigs).includes(serverId)) {
     return new NextResponse('Invalid Server ID', { status: 400 });
  }

  try {
    const kpiData = await queryDatabase(serverId as ServerId, sqlQueries.kpis);
    const slowQueriesData = await queryDatabase(serverId as ServerId, sqlQueries.slowQueries);
    
    return NextResponse.json({
        kpis: kpiData[0] || {},
        slowQueries: slowQueriesData,
    });
  } catch (error) {
    console.error(`Error fetching overview for ${serverId}:`, error);
    return new NextResponse(`Failed to fetch overview for ${serverId}`, { status: 500 });
  }
}