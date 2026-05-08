"use client";

import { useEffect } from "react";

type UseTelegramWebAppProps = {
  onOpenSettings: () => void;
};

export function useTelegramWebApp({ onOpenSettings }: UseTelegramWebAppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    webApp.ready();
    webApp.expand();
    webApp.disableVerticalSwipes?.();
    webApp.setHeaderColor?.("#000000");
    webApp.setBackgroundColor?.("#000000");

    const handleSettingsClick = () => onOpenSettings();
    webApp.SettingsButton?.show();
    webApp.onEvent?.("settingsButtonClicked", handleSettingsClick);

    return () => {
      webApp.offEvent?.("settingsButtonClicked", handleSettingsClick);
      webApp.SettingsButton?.hide();
    };
  }, [onOpenSettings]);
}
