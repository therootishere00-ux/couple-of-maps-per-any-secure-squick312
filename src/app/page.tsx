"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Eye, EyeOff, Globe, Home, Signal, User } from "lucide-react";
import { SERVERS } from "@/data/servers";
import { useTelegramWebApp } from "@/lib/telegram/use-telegram-webapp";
import { useTelegramUser } from "@/lib/telegram/use-telegram-user";
type Tab = "home" | "servers" | "profile";

function createProxyUrl(serverId: string): string {
  const secret = Math.random().toString(16).slice(2, 18);
  return `tg://proxy?server=${serverId}.compass.host&port=443&secret=${secret}`;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [activeServerId, setActiveServerId] = useState("de");
  const [proxyUrl, setProxyUrl] = useState(() => createProxyUrl("de"));
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRegeneratingKey, setIsRegeneratingKey] = useState(false);
  const profile = useTelegramUser();
  const handleOpenSettings = useCallback(() => setActiveTab("profile"), []);
  useTelegramWebApp({ onOpenSettings: handleOpenSettings });

  const activeServer = useMemo(
    () => SERVERS.find((item) => item.id === activeServerId) ?? SERVERS[0],
    [activeServerId],
  );

  const handleOpenTelegramSetup = useCallback(() => {
    window.open(proxyUrl, "_blank");
  }, [proxyUrl]);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(proxyUrl);
    setIsCopied(true);
  }, [proxyUrl]);

  const handleRegenerateKey = useCallback(() => {
    setIsRegeneratingKey(true);
    window.setTimeout(() => {
      setProxyUrl(createProxyUrl(activeServerId));
      setIsRegeneratingKey(false);
    }, 1000);
  }, [activeServerId]);

  useEffect(() => {
    if (!isCopied) return;
    const timeoutId = window.setTimeout(() => setIsCopied(false), 900);
    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const obfuscatedKey = "••••••••••••••••••••••••••••••••••";

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-bg">
      <header className="sticky top-0 z-20 bg-bg px-4 py-3">
        <h1 className="text-xl font-semibold">Compass</h1>
      </header>

      {isCopied ? (
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-[12px] border border-border bg-[#1C1C1E] px-3 py-1.5 text-sm">
          Скопировано!
        </div>
      ) : null}

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-28">
        {activeTab === "home" ? (
          <div className="flex h-full flex-col gap-3 overflow-hidden py-1">
            <article className="flex items-center gap-3 rounded-[24px] border border-border bg-surface px-3 py-2">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatarUrl} alt={profile.displayName} className="h-10 w-10 rounded-full border border-border" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-xs font-bold">
                  {profile.displayName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs text-fg/70">{profile.displayName}</p>
                <p className="text-sm font-semibold">{profile.username}</p>
              </div>
            </article>

            <article className="rounded-[32px] border border-border bg-surface p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#34C759]" />
                <p className="text-sm">Ваш прокси активен</p>
              </div>
            </article>

            <article className="rounded-[32px] border border-border bg-surface p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-fg/70">ПРОКСИ-КЛЮЧ</p>
              <div className="flex items-center gap-2 rounded-[24px] border border-border bg-[#2C2C2E] px-3 py-2">
                <p className="min-w-0 flex-1 truncate text-sm">
                  {isRegeneratingKey ? "··· ··· ··· ···" : isKeyVisible ? proxyUrl : obfuscatedKey}
                </p>
                <button
                  type="button"
                  onClick={() => setIsKeyVisible((current) => !current)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-[#1C1C1E] active:opacity-60"
                  aria-label="Переключить видимость ключа"
                >
                  {isKeyVisible ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-[#1C1C1E] active:opacity-60"
                  aria-label="Копировать ключ"
                >
                  <Copy size={16} strokeWidth={1.75} />
                </button>
              </div>

              <div className="mt-3 grid gap-2">
                <button
                  type="button"
                  onClick={handleOpenTelegramSetup}
                  className="h-11 rounded-[24px] border border-fg bg-fg text-sm font-semibold text-bg active:opacity-60"
                >
                  Подключить Compass
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="h-11 rounded-[24px] border border-fg bg-transparent text-sm font-semibold text-fg active:opacity-60"
                >
                  Поделиться
                </button>
              </div>
            </article>

            <section className="grid grid-cols-2 gap-3">
              <article className="rounded-[24px] border border-border bg-surface p-3">
                <p className="text-xs text-fg/70">Локация</p>
                <p className="mt-1 text-sm font-semibold">{activeServer.flag} {activeServer.country}</p>
              </article>
              <article className="rounded-[24px] border border-border bg-surface p-3">
                <p className="text-xs text-fg/70">Задержка</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <Signal size={14} strokeWidth={1.75} />
                  {activeServer.pingMs} мс
                </p>
              </article>
            </section>
          </div>
        ) : null}

        {activeTab === "servers" ? (
          <div className="flex h-full flex-col gap-3 overflow-hidden py-1">
            <h2 className="text-base font-semibold">Выберите локацию</h2>
            <div className="grid gap-2">
              {SERVERS.map((server) => (
                <button
                  key={server.id}
                  type="button"
                  onClick={() => {
                    setActiveServerId(server.id);
                    setProxyUrl(createProxyUrl(server.id));
                    setIsKeyVisible(false);
                  }}
                  className={`flex items-center justify-between rounded-[32px] border px-4 py-3 text-left active:opacity-60 ${
                    activeServerId === server.id ? "border-fg bg-surface" : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{server.flag}</span>
                    <div>
                      <p className="text-sm font-semibold">{server.city}</p>
                      <p className="text-xs text-fg/70">{server.country}</p>
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-fg/80">
                    <Signal size={14} strokeWidth={1.75} />
                    {server.pingMs} мс
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "profile" ? (
          <div className="flex h-full flex-col gap-3 overflow-hidden py-1">
            <article className="rounded-[32px] border border-border bg-surface p-4">
              <p className="text-sm font-semibold">Компас Premium. Безлимитный доступ.</p>
              <button
                type="button"
                className="mt-3 h-9 rounded-[24px] border border-fg bg-fg px-4 text-sm font-semibold text-bg active:opacity-60"
              >
                Продлить подписку
              </button>
            </article>

            <article className="overflow-hidden rounded-[32px] border border-border bg-surface">
              <button
                type="button"
                onClick={handleRegenerateKey}
                className="w-full border-b border-border px-4 py-3 text-left text-sm text-[#ff453a] active:opacity-60"
              >
                Обновить ключ
              </button>
              <button type="button" className="w-full border-b border-border px-4 py-3 text-left text-sm active:opacity-60">
                Служба поддержки
              </button>
              <button type="button" className="w-full px-4 py-3 text-left text-sm active:opacity-60">
                Промокод
              </button>
            </article>

            <div className="mt-auto px-1 pb-1 text-xs text-fg/60">
              <p>ID пользователя: {profile.id}</p>
              <p>Версия 2.0.1</p>
            </div>
          </div>
        ) : null}
      </section>

      <nav className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-[999px] border border-border bg-surface/90 p-1 backdrop-blur">
        <div className="flex items-center gap-1">
          {[
            { key: "home", icon: Home, label: "Главная" },
            { key: "servers", icon: Globe, label: "Серверы" },
            { key: "profile", icon: User, label: "Профиль" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key as Tab)}
                className="inline-flex h-11 w-14 items-center justify-center rounded-[24px] active:opacity-60"
                aria-label={item.label}
              >
                <Icon size={18} strokeWidth={1.75} color={isActive ? "#FFFFFF" : "#48484A"} />
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
