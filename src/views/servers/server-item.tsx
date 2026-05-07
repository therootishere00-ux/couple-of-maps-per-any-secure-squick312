import { Check } from "lucide-react";
import type { Server } from "@/types/miniapp";

type ServerItemProps = {
  server: Server;
  isActive: boolean;
  onSelect: (serverId: string) => void;
};

export function ServerItem({ server, isActive, onSelect }: ServerItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(server.id)}
      className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-4 text-left"
    >
      <div>
        <p className="text-sm font-semibold">{server.country}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-fg/70">
          Signal {server.signalLevel}/3
        </p>
      </div>
      {isActive ? <Check size={18} strokeWidth={2} /> : null}
    </button>
  );
}
