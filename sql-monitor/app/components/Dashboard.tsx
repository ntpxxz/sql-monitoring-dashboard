// ============================================================================
// FILE: nextjs-app/app/components/Dashboard.tsx
// ============================================================================
"use client";

import React from 'react';
import useSWR from 'swr';
import { Server, ServerOverview } from '@/types';
import { KPIWidget } from './KPIWidget';
import { SlowQueryTable } from './SlowQueryTable';
  
interface DashboardProps {
  server: Server;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const Dashboard: React.FC<DashboardProps> = ({ server }) => {
  const { data, error, isLoading } = useSWR<ServerOverview>(
    `/api/servers/${server.id}/overview`, 
    fetcher,
    {
        refreshInterval: 5000, // Polling every 5 seconds
        revalidateOnFocus: true,
    }
  );
  
<<<<<<< HEAD:sql-monitor/app/components/Dashboard.tsx
  const memUsed = (data?.kpis.memory_total_mb ?? 0) - (data?.kpis.memory_available_mb ?? 0);
  const memTotal = data?.kpis.memory_total_mb ?? 0;
  const memUsagePercent = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;
=======
  // FIX: Ensure all values from the API are treated as numbers before calculations or method calls.
  const totalMb = Number(data?.kpis.memory_total_mb ?? 0);
  const availableMb = Number(data?.kpis.memory_available_mb ?? 0);
  const cpuPercent = Number(data?.kpis.cpu_sql_process_percent ?? 0);

  const memUsed = totalMb - availableMb;
  const memTotal = totalMb;  const memUsagePercent = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;
>>>>>>> parent of 91e4265 (Queri V1-Done):sql-monitor/app/api/servers/[serverId]/components/Dashboard.tsx
  
  let statusColor = 'text-gray-500';
  if (error) statusColor = 'text-red-400';
  if (data) statusColor = 'text-green-400';
  if (isLoading && !data) statusColor = 'text-yellow-400';


  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{server.name}</h1>
       <p className={`text-sm font-semibold ${statusColor}`}>
        {isLoading && !data && '● Initializing...'}
        {data && '● Connected'}
        {error && '● Connection Error'}
      </p>
<<<<<<< HEAD:sql-monitor/app/components/Dashboard.tsx

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <KPIWidget title="CPU (SQL Process)" value={`${data?.kpis.cpu_sql_process_percent?.toFixed(1) ?? '--'}%`} />
=======

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">

        <KPIWidget title="CPU (SQL Process)" value={`${cpuPercent.toFixed(1)}%`} />

>>>>>>> parent of 91e4265 (Queri V1-Done):sql-monitor/app/api/servers/[serverId]/components/Dashboard.tsx
        <KPIWidget title="Memory Usage" value={`${memUsagePercent.toFixed(1)}%`} total={`${memUsed.toFixed(0)} / ${memTotal.toFixed(0)} MB`}/>
        <KPIWidget title="Active Connections" value={data?.kpis.active_connections?.toString() ?? '--'} />
        <KPIWidget title="CPU Cores" value={data?.kpis.cpu_count?.toString() ?? '--'} />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Top Slow Queries</h2>
        <SlowQueryTable queries={data?.slowQueries} serverId={server.id} isLoading={isLoading && !data}/>
      </div>
    </div>
  );
};
