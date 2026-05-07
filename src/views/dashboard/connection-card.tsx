import { Power } from "lucide-react";
import type { ConnectionStatus } from "@/types/miniapp";

type ConnectionCardProps = {
  status: ConnectionStatus;
  onToggleStatus: () => void;
};

export function ConnectionCard({ status, onToggleStatus }: ConnectionCardProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-surface p-6">
      <p className="text-xs font-bold tracking-[0.2em] text-fg/85">{status}</p>
      <button
        type="button"
        onClick={onToggleStatus}
        className="inline-flex h-40 w-40 items-center justify-center rounded-full bg-fg text-bg"
      >
        <Power size={44} strokeWidth={2} />
      </button>
    </section>
  );
}
