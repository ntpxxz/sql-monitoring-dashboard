// ============================================================================
// FILE: nextjs-app/app/page.tsx
// ============================================================================
import ClientLayout from "@/app/components/ClientLayout";
import { Server } from "@/types";
// This is a Server Component, it runs on the server.
import { getMonitoredServers } from "@/lib/configDb";

export default async function Home() {
  // Fetch the list of monitored servers from the database
  const Server: Server[] = await getMonitoredServers();

  // Render the ClientLayout component with the serverList prop
  return <ClientLayout servers={Server} />;
}