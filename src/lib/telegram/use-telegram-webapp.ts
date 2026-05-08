"use client";

import { useEffect } from "react";
import type { View } from "@/types/miniapp";

type UseTelegramWebAppProps = {
  view: View;
  onBack: () => void;
  onOpenSettings: () => void;
};

export function useTelegramWebApp({ view, onBack, onOpenSettings }: UseTelegramWebAppProps) {
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const webApp = window.Telegram?.WebApp;
    const backButton = webApp?.BackButton;
    if (!backButton) return;

    if (view === "dashboard") {
      backButton.hide();
      return;
    }

    backButton.show();
    backButton.onClick(onBack);

    return () => {
      backButton.offClick(onBack);
      backButton.hide();
    };
  }, [onBack, view]);
}
