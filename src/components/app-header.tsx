import { Settings } from "lucide-react";
import type { View } from "@/types/miniapp";

type AppHeaderProps = {
  view: View;
  onOpenSettings: () => void;
};

export function AppHeader({ view, onOpenSettings }: AppHeaderProps) {
  const title = view === "dashboard" ? "Compass Proxy" : view === "settings" ? "Proxy Settings" : "Select Node";

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      {view === "dashboard" ? (
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface"
          aria-label="Open settings"
        >
          <Settings size={20} strokeWidth={2} />
        </button>
      ) : <div className="h-10 w-10" />}
    </header>
  );
}
