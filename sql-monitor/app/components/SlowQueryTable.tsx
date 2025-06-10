// ============================================================================
// FILE: nextjs-app/app/components/SlowQueryTable.tsx
// ============================================================================
"use client";

import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { SlowQuery } from '@/types';
import { OptimizationModal } from './OptimizationModal';

interface SlowQueryTableProps {
  queries: SlowQuery[] | undefined;
  serverId: string;
  isLoading: boolean;
}

export const SlowQueryTable: React.FC<SlowQueryTableProps> = ({ queries, serverId, isLoading }) => {
  const [selectedQuery, setSelectedQuery] = useState<SlowQuery | null>(null);
  
  if (isLoading) {
      return <p className="text-gray-500">Loading queries...</p>
  }

  if (!queries || queries.length === 0) {
      return <p className="text-gray-500">No slow queries recorded recently.</p>
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800">
            <tr>
              <th className="p-3">Avg Duration (ms)</th>
              <th className="p-3">Database</th>
              <th className="p-3">Query Text</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="p-3 font-mono">{query.AvgDuration_ms.toFixed(2)}</td>
                <td className="p-3">{query.DatabaseName}</td>
                <td className="p-3 font-mono text-gray-400 truncate max-w-md">{query.QueryText}</td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => setSelectedQuery(query)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md flex items-center justify-center mx-auto transition-colors"
                    title="Get AI Optimization"
                  >
                    <BrainCircuit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedQuery && (
          <OptimizationModal
              isOpen={!!selectedQuery}
              onClose={() => setSelectedQuery(null)}
              query={selectedQuery}
              serverId={serverId}
          />
      )}
    </>
  );
};
