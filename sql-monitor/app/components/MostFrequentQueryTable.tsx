"use client";

import React from 'react';
import { FrequentQuery } from '@/types';

interface MostFrequentQueryTableProps {
  queries: FrequentQuery[] | undefined;
  isLoading: boolean;
}

export const MostFrequentQueryTable: React.FC<MostFrequentQueryTableProps> = ({ queries, isLoading }) => {
  if (isLoading) {
      return <p className="text-slate-500">Loading queries...</p>
  }

  if (!queries || queries.length === 0) {
      return <p className="text-slate-500">No frequent queries recorded.</p>
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 uppercase bg-slate-800">
          <tr>
            <th className="p-3">Execution Count</th>
            <th className="p-3">Database</th>
            <th className="p-3">Avg Duration (ms)</th>
            <th className="p-3">Query Text</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => (
            <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/50">
              <td className="p-3 font-mono text-sky-400">{query.execution_count}</td>
              <td className="p-3">{query.DatabaseName}</td>
              <td className="p-3 font-mono">{Number(query.AvgDuration_ms).toFixed(2)}</td>
              <td className="p-3 font-mono text-slate-400 truncate max-w-md">{query.QueryText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
