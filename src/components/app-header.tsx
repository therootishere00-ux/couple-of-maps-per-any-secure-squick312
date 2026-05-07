import { ArrowLeft, Settings } from "lucide-react";
import type { View } from "@/types/miniapp";

type AppHeaderProps = {
  view: View;
  onOpenSettings: () => void;
  onBack: () => void;
};

export function AppHeader({ view, onOpenSettings, onBack }: AppHeaderProps) {
  const title = view === "dashboard" ? "COMPASS" : view === "settings" ? "Settings" : "Servers";

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3">
      {view === "dashboard" ? (
        <h1 className="text-xl font-bold tracking-[0.08em]">{title}</h1>
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-surface active:opacity-70"
          aria-label="Back"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
      )}

      {view !== "dashboard" ? (
        <h1 className="text-base font-semibold">{title}</h1>
      ) : null}

      {view === "dashboard" ? (
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-surface active:opacity-70"
          aria-label="Open settings"
        >
          <Settings size={18} strokeWidth={1.75} />
        </button>
      ) : (
        <div className="h-9 w-9" />
      )}
    </header>
  );
}
