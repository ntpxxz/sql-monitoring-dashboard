// ============================================================================
// FILE: nextjs-app/app/api/servers/[serverId]/optimize/route.ts
// ============================================================================
import { NextResponse } from 'next/server';
import axios from 'axios';
import { queryDatabase } from '@/app/lib/mssql'
import sqlQueries from '@/app/lib/sql-queries';
import { serverConfigs } from '@/app/lib/server-config';

type ServerId = keyof typeof serverConfigs;

export async function POST(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    const { serverId } = params;
    const { query_text, database_name } = await request.json();

    if (!query_text || !database_name) {
        return new NextResponse('query_text and database_name are required.', { status: 400 });
    }
     if (!Object.keys(serverConfigs).includes(serverId)) {
     return new NextResponse('Invalid Server ID', { status: 400 });
  }

    try {
        const schemaQuery = sqlQueries.getSchema(database_name);
        const schemaResult = await queryDatabase(serverId as ServerId, schemaQuery);
        const db_schema_string = schemaResult.map(row => 
            `Table: ${row.TABLE_NAME}, Column: ${row.COLUMN_NAME}, Type: ${row.DATA_TYPE}`
        ).join('\n');

        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000/optimize-query';
        const aiResponse = await axios.post(aiServiceUrl, {
            query_text,
            db_schema: db_schema_string
        });
        
        return NextResponse.json(aiResponse.data);
    } catch (error) {
        console.error('Error in /optimize route:', error);
        return new NextResponse('Failed to get AI optimization.', { status: 500 });
    }
}