// ============================================================================
// FILE: client/src/components/Sidebar.tsx
// ============================================================================
import React from 'react';
import { Server } from 'lucide-react';
import { Server as ServerType } from '../types';

interface SidebarProps {
  servers: ServerType[];
  selectedServer: ServerType | null;
  onSelectServer: (server: ServerType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ servers, selectedServer, onSelectServer }) => {
  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-white">SQL Monitor AI</div>
      <nav className="flex-1">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Servers</h3>
        <ul>
          {servers.map(server => (
            <li key={server.id}>
              <button
                onClick={() => onSelectServer(server)}
                className={`w-full text-left p-3 rounded-lg flex items-center transition-colors duration-200 ${
                  selectedServer?.id === server.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Server size={18} className="mr-3" />
                {server.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-xs text-gray-500">v1.0.0</div>
    </aside>
  );
};
