type SettingsListProps = {
  activeServer: string;
  onOpenServers: () => void;
};

export function SettingsList({ activeServer, onOpenServers }: SettingsListProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={onOpenServers}
        className="flex w-full items-center justify-between border-b border-border px-4 py-4 text-left"
      >
        <span className="text-sm font-medium">Select Server</span>
        <span className="text-sm text-fg/70">{activeServer}</span>
      </button>
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <span className="text-sm font-medium">Protocol</span>
        <span className="text-sm text-fg/70">MTProto</span>
      </div>
      <div className="border-b border-border px-4 py-4 text-sm font-medium">Proxy Credentials</div>
      <div className="px-4 py-4 text-sm font-medium">Account ID</div>
    </section>
  );
}
