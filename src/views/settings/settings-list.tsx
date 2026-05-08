type SettingsListProps = {
  activeServer: string;
  userId: string;
  onOpenServers: () => void;
};

export function SettingsList({ activeServer, userId, onOpenServers }: SettingsListProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-border bg-surface">
      <button
        type="button"
        onClick={onOpenServers}
        className="flex w-full items-center justify-between border-b border-border px-4 py-4 text-left"
      >
        <span className="text-sm font-medium">Сервер</span>
        <span className="text-sm text-fg/70">{activeServer}</span>
      </button>
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <span className="text-sm font-medium">Протокол</span>
        <span className="text-sm text-fg/70">MTProto</span>
      </div>
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-sm font-medium">ID пользователя</span>
        <span className="text-sm text-fg/70">{userId}</span>
      </div>
    </section>
  );
}
