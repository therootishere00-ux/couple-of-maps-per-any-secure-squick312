import { Power } from "lucide-react";
import type { ConnectionStatus } from "@/types/miniapp";

type ConnectionCardProps = {
  status: ConnectionStatus;
  onToggleStatus: () => void;
};

export function ConnectionCard({ status, onToggleStatus }: ConnectionCardProps) {
  const isConnected = status === "SECURE";

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_0%,_rgba(0,0,0,0)_60%)]" />
      <p className="text-xs font-bold tracking-[0.2em] text-fg/85">
        {isConnected ? "PROXY ACTIVE" : "PROXY OFFLINE"}
      </p>
      <button
        type="button"
        onClick={onToggleStatus}
        className="inline-flex h-40 w-40 items-center justify-center rounded-full border border-border bg-fg text-bg"
      >
        <Power size={44} strokeWidth={2} />
      </button>
      <p className="text-sm text-fg/70">{isConnected ? "Traffic routed through secure proxy node" : "Tap to route traffic via proxy"}</p>
    </section>
  );
}
