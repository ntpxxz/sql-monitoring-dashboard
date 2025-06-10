// ============================================================================
// FILE: nextjs-app/app/components/ClientLayout.tsx
// ============================================================================
"use client"; // This marks the component as a Client Component

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { Server } from '@/app/types';

interface ClientLayoutProps {
  servers: Server[];
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ servers }) => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(servers.length > 0 ? servers[0] : null);

  return (
    <div className="flex h-screen font-sans">
      <Sidebar servers={servers} selectedServer={selectedServer} onSelectServer={setSelectedServer} />
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedServer ? (
          <Dashboard key={selectedServer.id} server={selectedServer} /> // Use key to force re-mount
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-500">
                {servers.length > 0 ? "Select a server to begin." : "No servers configured."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientLayout;