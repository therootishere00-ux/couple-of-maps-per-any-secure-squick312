"use client";

import { useCallback, useMemo, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { SERVERS } from "@/data/servers";
import { useTelegramWebApp } from "@/lib/telegram/use-telegram-webapp";
import { useTelegramUser } from "@/lib/telegram/use-telegram-user";
import type { View } from "@/types/miniapp";
import { DashboardView } from "@/views/dashboard";
import { ServersView } from "@/views/servers";
import { SettingsView } from "@/views/settings";

function createProxyUrl(serverId: string) {
  const secret = Math.random().toString(16).slice(2, 18);
  return `tg://proxy?server=${serverId}.compass.host&port=443&secret=${secret}`;
}

export default function Page() {
  const [view, setView] = useState<View>("dashboard");
  const [activeServerId, setActiveServerId] = useState("de");
  const [proxyUrl, setProxyUrl] = useState(() => createProxyUrl("de"));
  const profile = useTelegramUser();
  const handleOpenSettings = useCallback(() => {
    setView("settings");
  }, []);

  const handleBack = useCallback(() => {
    setView((current) => (current === "servers" ? "settings" : "dashboard"));
  }, []);
  useTelegramWebApp({ view, onBack: handleBack, onOpenSettings: handleOpenSettings });

  const activeServer = useMemo(() => SERVERS.find((item) => item.id === activeServerId) ?? SERVERS[0], [activeServerId]);

  const handleOpenTelegramSetup = useCallback(() => {
    window.open(proxyUrl, "_blank");
  }, [proxyUrl]);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(proxyUrl);
  }, [proxyUrl]);

  const handleRegenerateKey = useCallback(() => {
    setProxyUrl(createProxyUrl(activeServerId));
  }, [activeServerId]);

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-bg">
      <AppHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
        {view === "dashboard" ? (
          <DashboardView
            proxyUrl={proxyUrl}
            serverLabel={`${activeServer.flag} ${activeServer.city}`}
            pingMs={activeServer.pingMs}
            profile={profile}
            onSetupInTelegram={handleOpenTelegramSetup}
            onCopyLink={handleCopyLink}
            onRegenerateKey={handleRegenerateKey}
          />
        ) : null}

        {view === "settings" ? (
          <SettingsView
            activeServer={`${activeServer.flag} ${activeServer.country}`}
            userId={profile.id}
            onOpenServers={() => setView("servers")}
          />
        ) : null}

        {view === "servers" ? (
          <ServersView
            servers={SERVERS}
            activeServerId={activeServerId}
            onSelectServer={(serverId) => {
              setActiveServerId(serverId);
              setProxyUrl(createProxyUrl(serverId));
              setView("settings");
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
