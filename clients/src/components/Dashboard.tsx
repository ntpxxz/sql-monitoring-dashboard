// ============================================================================
// FILE: client/src/components/Dashboard.tsx
// ============================================================================
import React, { useState, useEffect } from 'react';
import { Server as ServerType, ServerOverview, KpiData } from '../types';
import { getServerOverview } from '../services/api';
import { KPIWidget } from './KPIWidget';
import { SlowQueryTable } from './SlowQueryTable';
import { useSocket } from '../hooks/useSocket';

interface DashboardProps {
  server: ServerType;
}

export const Dashboard: React.FC<DashboardProps> = ({ server }) => {
  const [overview, setOverview] = useState<ServerOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { socket, isConnected } = useSocket(server.id);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getServerOverview(server.id);
        setOverview(data);
      } catch (err) {
        setError(`Failed to fetch data for ${server.name}.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [server.id]);
  
  // Listen for real-time KPI updates
  useEffect(() => {
    if (socket) {
      const handleKpiUpdate = (data: KpiData) => {
        setOverview(prev => (prev ? { ...prev, kpis: data } : null));
      };
      
      socket.on('kpi_update', handleKpiUpdate);

      return () => {
        socket.off('kpi_update', handleKpiUpdate);
      };
    }
  }, [socket]);


  if (loading) return <div className="text-center p-10">Loading dashboard for {server.name}...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!overview) return null;
  
  const memUsed = (overview.kpis.memory_total_mb ?? 0) - (overview.kpis.memory_available_mb ?? 0);
  const memTotal = overview.kpis.memory_total_mb ?? 0;
  const memUsagePercent = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{server.name}</h1>
      <p className={`text-sm font-semibold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
        {isConnected ? '● Connected' : '● Disconnected'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <KPIWidget title="CPU (SQL Process)" value={`${overview.kpis.cpu_sql_process_percent?.toFixed(1) ?? 'N/A'}%`} />
        <KPIWidget title="Memory Usage" value={`${memUsagePercent.toFixed(1)}%`} total={`${memUsed.toFixed(0)} / ${memTotal.toFixed(0)} MB`}/>
        <KPIWidget title="Active Connections" value={overview.kpis.active_connections?.toString() ?? 'N/A'} />
        <KPIWidget title="CPU Cores" value={overview.kpis.cpu_count?.toString() ?? 'N/A'} />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Top Slow Queries</h2>
        <SlowQueryTable queries={overview.slowQueries} serverId={server.id} />
      </div>
    </div>
  );
};


// ============================================================================
// FILE: client/src/components/KPIWidget.tsx
// ============================================================================
import React from 'react';

interface KPIWidgetProps {
  title: string;
  value: string;
  total?: string;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({ title, value, total }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {total && <p className="text-xs text-gray-500 mt-1">{total}</p>}
    </div>
  );
};
