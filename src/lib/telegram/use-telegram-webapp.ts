"use client";

import { useEffect } from "react";

export function useTelegramWebApp() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    webApp.ready();
    webApp.expand();
    webApp.disableVerticalSwipes?.();
    webApp.setHeaderColor?.("#000000");
    webApp.setBackgroundColor?.("#000000");
  }, []);
}
