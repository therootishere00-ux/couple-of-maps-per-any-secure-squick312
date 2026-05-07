"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { SERVERS } from "@/data/servers";
import { useTelegramWebApp } from "@/lib/telegram/use-telegram-webapp";
import type { ConnectionStatus, View } from "@/types/miniapp";
import { DashboardView } from "@/views/dashboard";
import { ServersView } from "@/views/servers";
import { SettingsView } from "@/views/settings";

export default function Page() {
  useTelegramWebApp();

  const [view, setView] = useState<View>("dashboard");
  const [status, setStatus] = useState<ConnectionStatus>("DISCONNECTED");
  const [activeServerId, setActiveServerId] = useState("de");
  const activeServer = useMemo(
    () => SERVERS.find((item) => item.id === activeServerId)?.country ?? "Germany",
    [activeServerId],
  );

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-bg">
      <AppHeader
        view={view}
        onOpenSettings={() => setView("settings")}
        onBack={() => setView(view === "servers" ? "settings" : "dashboard")}
        onClose={() => setView("dashboard")}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        {view === "dashboard" ? (
          <DashboardView
            status={status}
            onToggleStatus={() =>
              setStatus((current) => (current === "DISCONNECTED" ? "SECURE" : "DISCONNECTED"))
            }
          />
        ) : null}

        {view === "settings" ? (
          <SettingsView activeServer={activeServer} onOpenServers={() => setView("servers")} />
        ) : null}

        {view === "servers" ? (
          <ServersView
            servers={SERVERS}
            activeServerId={activeServerId}
            onSelectServer={(serverId) => {
              setActiveServerId(serverId);
              setView("settings");
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
