"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { AddServerModal } from './AddServerModal';
import { Server } from '@/app/types';

interface ClientLayoutProps {
  servers: Server[];
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ servers }) => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(servers.length > 0 ? servers[0] : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen font-sans">
        <Sidebar 
          servers={servers} 
          selectedServer={selectedServer} 
          onSelectServer={setSelectedServer}
          onAddServer={() => setIsModalOpen(true)}
        />
        <main className="flex-1 p-6 overflow-y-auto bg-slate-800/50">
          {selectedServer ? (
            <Dashboard key={selectedServer.id} server={selectedServer} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl text-slate-500">
                  {servers.length > 0 ? "Select a server to begin." : "No servers configured."}
              </p>
            </div>
          )}
        </main>
      </div>
      <AddServerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ClientLayout;
