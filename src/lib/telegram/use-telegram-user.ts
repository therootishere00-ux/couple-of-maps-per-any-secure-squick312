"use client";

import { useMemo } from "react";

export type TelegramUserProfile = {
  displayName: string;
  username: string;
  avatarUrl: string | null;
};

export function useTelegramUser(): TelegramUserProfile {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        displayName: "Guest",
        username: "@guest",
        avatarUrl: null,
      };
    }

    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const firstName = user?.first_name?.trim() ?? "";
    const lastName = user?.last_name?.trim() ?? "";
    const displayName = `${firstName} ${lastName}`.trim() || "Guest";
    const username = user?.username ? `@${user.username}` : "@telegram-user";

    return {
      displayName,
      username,
      avatarUrl: user?.photo_url ?? null,
    };
  }, []);
}
