// ============================================================================
// FILE: nextjs-app/app/page.tsx
// ============================================================================
"use client";
import ClientLayout from "@/app/api/servers/[serverId]/components/ClientLayout";
import { serverConfigs } from "@/app/lib/server-config";
import { Server } from "@/app/types";

// This is a Server Component, it runs on the server.
export default function Home() {
    // We can prepare server-side data here.
    const servers: Server[] = Object.values(serverConfigs).map(s => ({
        id: s.id,
        name: s.name,
    }));

    return (
        <ClientLayout servers={servers} />
    );
}


