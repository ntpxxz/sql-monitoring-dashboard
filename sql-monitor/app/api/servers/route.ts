// ============================================================================
// FILE: nextjs-app/app/api/servers/route.ts
// ============================================================================
import { NextResponse } from 'next/server';
import { serverConfigs } from '@/app/lib/server-config';
export const dynamic = 'force-dynamic';
export async function GET() {
  const serverList = Object.values(serverConfigs).map(s => ({
    id: s.id,
    name: s.name,
  }));
  return NextResponse.json(serverList);
}

