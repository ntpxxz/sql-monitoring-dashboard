// ============================================================================
// FILE: nextjs-app/app/page.tsx
// ============================================================================
import ClientLayout from "@/app/components/ClientLayout";
import { Server } from "@/types";
// This is a Server Component, it runs on the server.
<<<<<<< HEAD
import { getMonitoredServers } from "@/app/lib/configDb";
import { getDbPool } from '@/app/lib/configDb';
=======
export default function Home() {
    // We can prepare server-side data here.
    const servers: Server[] = Object.values(serverConfigs).map(s => ({
        id: s.id,
        name: s.name,
    }));
>>>>>>> parent of 91e4265 (Queri V1-Done)

export default async function Home() {
  try {
    const pool = getDbPool();
    // Fetch the list of monitored servers from the database
    const Server: Server[] = await getMonitoredServers();

    // Render the ClientLayout component with the serverList prop
    return <ClientLayout servers={Server} />;
  } catch (error) {
    console.error('Database connection error:', error);
    return (
      <div className="p-4">
        <h1 className="text-red-500">Error connecting to database</h1>
        <p>Please check your database configuration</p>
      </div>
    );
<<<<<<< HEAD
  }
}
=======
}


>>>>>>> parent of 91e4265 (Queri V1-Done)
