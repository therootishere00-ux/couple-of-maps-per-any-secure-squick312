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
      className={`flex w-full items-center justify-between rounded-[12px] border px-4 py-4 text-left active:opacity-70 ${
        isActive ? "border-fg bg-surface" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{server.flag}</span>
        <div>
          <p className="text-sm font-semibold">{server.country}</p>
          <p className="mt-1 text-xs text-fg/70">{server.city}</p>
        </div>
      </div>
      <div className="text-sm text-fg/80">
        <p>{server.pingMs}ms</p>
      </div>
    </button>
  );
}
