import React from 'react';
import { Server as ServerIcon, ChevronDown, PlusCircle } from 'lucide-react';
import { Server } from '@/types';

interface SidebarProps {
  servers: Server[];
  selectedServer: Server | null;
  onSelectServer: (server: Server) => void;
  onAddServer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ servers, selectedServer, onSelectServer, onAddServer }) => {
  const groupedServers = servers.reduce((acc, server) => {
    (acc[server.zone] = acc[server.zone] || []).push(server);
    return acc;
  }, {} as Record<string, Server[]>);

  return (
    <aside className="w-72 bg-slate-900 p-4 flex flex-col border-r border-slate-700/50">
      <div className="text-2xl font-bold mb-6 text-white flex items-center">
        <ServerIcon className="mr-3 text-teal-400"/>
        SQL Monitor AI
      </div>
      <nav className="flex-1 overflow-y-auto pr-2">
        {Object.entries(groupedServers).map(([zone, serversInZone]) => (
          <details key={zone} className="group mb-2" open>
            <summary className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 cursor-pointer list-none flex justify-between items-center hover:text-slate-200">
              {zone}
              <ChevronDown className="group-open:rotate-180 transition-transform"/>
            </summary>
            <ul className="pl-2 border-l border-slate-700">
              {serversInZone.map(server => (
                <li key={server.id} className="my-1">
                  <button
                    onClick={() => onSelectServer(server)}
                    className={`w-full text-left p-2.5 rounded-md flex items-center transition-colors duration-200 text-sm ${
                      selectedServer?.id === server.id
                        ? 'bg-teal-600/80 text-white font-semibold'
                        : 'hover:bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 ${selectedServer?.id === server.id ? 'bg-white' : 'bg-slate-500'}`}></div>
                    {server.name}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <button
          onClick={onAddServer}
          className="w-full text-slate-300 hover:bg-teal-600/80 hover:text-white p-3 rounded-md flex items-center justify-center transition-colors duration-200 font-semibold"
        >
          <PlusCircle size={18} className="mr-2" />
          Add New Server
        </button>
      </div>
    </aside>
  );
};
