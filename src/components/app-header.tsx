import { ArrowLeft, Settings, X } from "lucide-react";
import type { View } from "@/types/miniapp";

type AppHeaderProps = {
  view: View;
  onOpenSettings: () => void;
  onBack: () => void;
  onClose: () => void;
};

export function AppHeader({ view, onOpenSettings, onBack, onClose }: AppHeaderProps) {
  const title = view === "dashboard" ? "Compass" : view === "settings" ? "Settings" : "Select Server";

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
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface"
            aria-label="Back"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      )}
    </header>
  );
}
