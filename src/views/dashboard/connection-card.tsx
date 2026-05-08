import { Copy, Eye, EyeOff } from "lucide-react";

type KeyCardProps = {
  proxyUrl: string;
  isKeyVisible: boolean;
  isCopied: boolean;
  onToggleKeyVisibility: () => void;
  onSetupInTelegram: () => void;
  onCopyLink: () => void;
};

export function KeyCard({
  proxyUrl,
  isKeyVisible,
  isCopied,
  onToggleKeyVisibility,
  onSetupInTelegram,
  onCopyLink,
}: KeyCardProps) {
  return (
    <section className="relative rounded-[12px] border border-border bg-surface p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.12em] text-fg/70">ВАШ КЛЮЧ PROXY</p>
        <span className="inline-flex items-center gap-1 rounded-[8px] border border-border bg-[#2C2C2E] px-2 py-1 text-[11px] text-[#2dd4bf]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" />
          Активен
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-[12px] border border-border bg-bg px-3 py-2.5">
        <p className="min-w-0 flex-1 truncate text-sm">
          {isKeyVisible ? proxyUrl : "••••••••••••••••••••••••••••••••"}
        </p>
        <button
          type="button"
          onClick={onToggleKeyVisibility}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-[#2C2C2E] active:opacity-70"
          aria-label="Показать или скрыть ключ"
        >
          {isKeyVisible ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
        </button>
        <button
          type="button"
          onClick={onCopyLink}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-[#2C2C2E] active:opacity-70"
          aria-label="Копировать ключ"
        >
          <Copy size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={onSetupInTelegram}
          className="h-11 w-full rounded-[12px] border border-fg bg-fg px-3 text-sm font-semibold text-bg active:opacity-70"
        >
          Установить в Telegram
        </button>
        <button
          type="button"
          onClick={onCopyLink}
          className="h-11 w-full rounded-[12px] border border-fg bg-transparent px-3 text-sm font-semibold text-fg active:opacity-70"
        >
          Копировать ссылку
        </button>
      </div>

      {isCopied ? (
        <div className="pointer-events-none absolute inset-x-4 top-3 rounded-[8px] border border-border bg-bg px-3 py-1.5 text-center text-xs font-medium">
          Скопировано!
        </div>
      ) : null}
    </section>
  );
}
