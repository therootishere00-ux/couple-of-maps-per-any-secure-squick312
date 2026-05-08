"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Eye, EyeOff, Gauge, Home, Server, User, Wifi } from "lucide-react";
import { SERVERS } from "@/data/servers";
import { useTelegramWebApp } from "@/lib/telegram/use-telegram-webapp";
import { useTelegramUser } from "@/lib/telegram/use-telegram-user";

type Tab = "dashboard" | "servers" | "profile";

function createProxyUrl(serverId: string): string {
  const secret = Math.random().toString(16).slice(2, 18);
  return `tg://proxy?server=${serverId}.compass.host&port=443&secret=${secret}`;
}

function Label({ text }: { text: string }) {
  return <p className="text-[12px] uppercase tracking-[0.05em] text-fg/50">{text}</p>;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [activeServerId, setActiveServerId] = useState("de");
  const [proxyUrl, setProxyUrl] = useState(() => createProxyUrl("de"));
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoadingKey, setIsLoadingKey] = useState(false);

  const profile = useTelegramUser();
  const activeServer = useMemo(
    () => SERVERS.find((item) => item.id === activeServerId) ?? SERVERS[0],
    [activeServerId],
  );

  useTelegramWebApp({
    onOpenSettings: () => setActiveTab("profile"),
  });

  const handleCopyKey = useCallback(async () => {
    await navigator.clipboard.writeText(proxyUrl);
    setIsCopied(true);
  }, [proxyUrl]);

  const handleSetupInTelegram = useCallback(() => {
    window.open(proxyUrl, "_blank");
  }, [proxyUrl]);

  const handleRegenerateKey = useCallback(() => {
    setIsLoadingKey(true);
    window.setTimeout(() => {
      setProxyUrl(createProxyUrl(activeServerId));
      setIsLoadingKey(false);
    }, 1000);
  }, [activeServerId]);

  useEffect(() => {
    if (!isCopied) return;
    const timeoutId = window.setTimeout(() => setIsCopied(false), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const tabItems: Array<{ id: Tab; label: string; icon: typeof Home }> = [
    { id: "dashboard", label: "Главная", icon: Home },
    { id: "servers", label: "Серверы", icon: Server },
    { id: "profile", label: "Профиль", icon: User },
  ];

  return (
    <main className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-[#000000]">
      <header className="sticky top-0 z-20 bg-[#000000] px-4 pb-2 pt-4">
        <h1 className="text-[24px] font-semibold leading-none">Compass</h1>
      </header>

      <AnimatePresence>
        {isCopied ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-[18px] border border-border bg-fg px-4 py-1.5 text-sm text-bg"
          >
            Скопировано в буфер
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col gap-3 pt-1"
          >
            {activeTab === "dashboard" ? (
              <>
                <article className="flex items-center gap-3 rounded-[24px] border border-border bg-[#1C1C1E] px-3 py-2.5">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatarUrl} alt={profile.displayName} className="h-10 w-10 rounded-full border border-border" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#2C2C2E] text-sm font-semibold">
                      {profile.displayName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{profile.username}</p>
                    <p className="text-xs text-fg/60">{profile.displayName}</p>
                  </div>
                </article>

                <article className="rounded-[38px] border border-border bg-[#1C1C1E] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[16px]">Статус: Защищен</p>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#34C759]" />
                  </div>
                  <p className="mt-2 text-sm text-fg/70">
                    Ваш трафик шифруется через сервер Frankfurt-01
                  </p>
                </article>

                <article className="rounded-[38px] border border-border bg-[#1C1C1E] p-5">
                  <Label text="Прокси-ключ" />
                  <div className="mt-2 flex items-center gap-2 rounded-[18px] border border-border bg-[#2C2C2E] px-3 py-2.5">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isKeyVisible ? "visible" : "masked"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-w-0 flex-1 truncate text-[16px]"
                      >
                        {isLoadingKey
                          ? ""
                          : isKeyVisible
                            ? proxyUrl
                            : "● ● ● ● ● ● ● ● ● ● ● ●"}
                      </motion.p>
                    </AnimatePresence>
                    {isLoadingKey ? (
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full border border-fg border-t-transparent" />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setIsKeyVisible((current) => !current)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[18px] border border-border bg-[#1C1C1E] transition-all duration-200 active:opacity-60"
                      aria-label="Показать или скрыть ключ"
                    >
                      {isKeyVisible ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[18px] border border-border bg-[#1C1C1E] transition-all duration-200 active:opacity-60"
                      aria-label="Копировать ключ"
                    >
                      <Copy size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2">
                    <button
                      type="button"
                      onClick={handleSetupInTelegram}
                      className="h-16 rounded-[24px] border border-fg bg-fg text-base font-semibold text-bg transition-all duration-200 active:opacity-60"
                    >
                      Установить в Telegram
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="h-14 rounded-[24px] border border-fg bg-transparent text-base transition-all duration-200 active:opacity-60"
                    >
                      Поделиться ключом
                    </button>
                  </div>
                </article>

                <section className="grid grid-cols-2 gap-3">
                  <article className="rounded-[24px] border border-border bg-[#1C1C1E] p-4">
                    <Label text="Локация" />
                    <p className="mt-2 text-[16px]">
                      {activeServer.flag} {activeServer.country}
                    </p>
                  </article>
                  <article className="rounded-[24px] border border-border bg-[#1C1C1E] p-4">
                    <Label text="Задержка" />
                    <p className="mt-2 flex items-center gap-2 text-[16px]">
                      <Wifi size={16} strokeWidth={1.5} />
                      {activeServer.pingMs} мс
                    </p>
                  </article>
                </section>
              </>
            ) : null}

            {activeTab === "servers" ? (
              <>
                <h2 className="text-[22px] font-semibold">Доступные узлы</h2>
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
                      className={`flex h-20 items-center justify-between rounded-[32px] border px-4 text-left transition-all duration-200 active:scale-[0.98] active:opacity-60 ${
                        activeServerId === server.id ? "border-fg bg-[#1C1C1E]" : "border-border bg-[#1C1C1E]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{server.flag}</span>
                        <div>
                          <p className="text-[16px]">{server.city}</p>
                          <p className="text-xs text-fg/60">{server.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="flex items-center gap-2 text-sm text-fg/80">
                          <Gauge size={14} strokeWidth={1.5} />
                          {server.pingMs} мс
                        </p>
                        {activeServerId === server.id ? (
                          <p className="mt-1 text-[11px] uppercase tracking-[0.05em] text-fg/60">Активен</p>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {activeTab === "profile" ? (
              <>
                <article className="rounded-[38px] border border-border bg-[#1C1C1E] p-5">
                  <h2 className="text-[22px] font-semibold">Компас Premium</h2>
                  <ul className="mt-3 space-y-1 text-sm text-fg/75">
                    <li>Приоритетный канал</li>
                    <li>Нулевой лог</li>
                    <li>24/7 Поддержка</li>
                  </ul>
                  <button
                    type="button"
                    className="mt-4 h-10 rounded-[24px] border border-fg bg-fg px-4 text-sm font-semibold text-bg transition-all duration-200 active:opacity-60"
                  >
                    Продлить подписку
                  </button>
                </article>

                <article className="overflow-hidden rounded-[38px] border border-border bg-[#1C1C1E]">
                  <button
                    type="button"
                    onClick={handleRegenerateKey}
                    className="flex w-full items-center justify-between border-b border-border px-5 py-4 text-left text-[16px] transition-all duration-200 active:opacity-60"
                  >
                    <span>Регенерировать ключ</span>
                    <span className="text-[#ff453a]">●</span>
                  </button>
                  <button
                    type="button"
                    className="w-full border-b border-border px-5 py-4 text-left text-[16px] transition-all duration-200 active:opacity-60"
                  >
                    Сбросить статистику
                  </button>
                  <button
                    type="button"
                    className="w-full px-5 py-4 text-left text-[16px] transition-all duration-200 active:opacity-60"
                  >
                    Служба поддержки
                  </button>
                </article>

                <p className="mt-auto pb-1 text-center text-xs text-fg/55">Версия 2.0.4. ID: 8823194</p>
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </section>

      <nav className="absolute bottom-6 left-4 right-4 z-20 rounded-[999px] border border-border bg-[#1C1C1E]/90 p-1 backdrop-blur-2xl">
        <div className="relative grid grid-cols-3">
          {tabItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className="relative z-10 inline-flex h-12 items-center justify-center rounded-[24px] transition-all duration-200 active:opacity-60"
                aria-label={item.label}
              >
                {isActive ? (
                  <motion.div
                    layoutId="dock-capsule"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-1 rounded-[24px] bg-[#2C2C2E]"
                  />
                ) : null}
                <Icon size={19} strokeWidth={1.5} className={`relative ${isActive ? "text-fg" : "text-[#48484A]"}`} />
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
