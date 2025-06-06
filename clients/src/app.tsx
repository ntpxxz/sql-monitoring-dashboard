// ============================================================================
// FILE: client/src/App.tsx
// ============================================================================
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Server } from './types';
import { getServers } from './services/api';

function App() {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const serverList = await getServers();
        setServers(serverList);
        if (serverList.length > 0) {
          setSelectedServer(serverList[0]);
        }
      } catch (err) {
        setError('Failed to connect to backend service. Please ensure it is running.');
        console.error(err);
      }
    };
    fetchServers();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-red-800 p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-2xl font-bold mb-4">Connection Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-800 text-gray-200 font-sans">
      <Sidebar servers={servers} selectedServer={selectedServer} onSelectServer={setSelectedServer} />
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedServer ? (
          <Dashboard server={selectedServer} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-500">Select a server to begin.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;