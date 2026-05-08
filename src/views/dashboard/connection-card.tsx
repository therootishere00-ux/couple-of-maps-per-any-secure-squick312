type KeyCardProps = {
  proxyUrl: string;
  onSetupInTelegram: () => void;
  onCopyLink: () => void;
};

function obfuscateLink(url: string) {
  if (url.length < 24) return url;
  return `${url.slice(0, 24)}...${url.slice(-10)}`;
}

export function KeyCard({ proxyUrl, onSetupInTelegram, onCopyLink }: KeyCardProps) {
  return (
    <section className="rounded-[12px] border border-border bg-surface p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.12em] text-fg/70">АКТИВНЫЙ КЛЮЧ</p>
      <p className="rounded-[12px] border border-border bg-bg px-3 py-3 text-sm">{obfuscateLink(proxyUrl)}</p>
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={onSetupInTelegram}
          className="h-11 w-full rounded-[12px] border border-fg bg-fg px-3 text-sm font-semibold text-bg active:opacity-70"
        >
          Подключить
        </button>
        <button
          type="button"
          onClick={onCopyLink}
          className="h-11 w-full rounded-[12px] border border-fg bg-transparent px-3 text-sm font-semibold text-fg active:opacity-70"
        >
          Копировать
        </button>
      </div>
    </section>
  );
}
