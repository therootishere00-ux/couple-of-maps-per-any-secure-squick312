import { Signal } from "lucide-react";

type StatsSubscriptionProps = {
  serverLabel: string;
  pingMs: number;
  onRegenerateKey: () => void;
  isKeyRegenerated: boolean;
};

export function StatsSubscription({
  serverLabel,
  pingMs,
  onRegenerateKey,
  isKeyRegenerated,
}: StatsSubscriptionProps) {
  return (
    <>
      <section className="grid grid-cols-2 gap-3">
        <article className="aspect-square rounded-[12px] border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-widest text-fg/70">ЛОКАЦИЯ</p>
          <p className="mt-3 text-base font-semibold">{serverLabel}</p>
        </article>
        <article className="aspect-square rounded-[12px] border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-widest text-fg/70">ЗАДЕРЖКА</p>
          <p className="mt-3 flex items-center gap-2 text-base font-semibold">
            <Signal size={16} strokeWidth={1.75} />
            {pingMs} мс
          </p>
        </article>
      </section>

      <section className="rounded-[12px] border border-border bg-surface p-3">
        <button
          type="button"
          onClick={onRegenerateKey}
          className="h-10 w-full rounded-[8px] border border-fg bg-transparent px-4 text-sm font-semibold text-fg active:opacity-70"
        >
          Регенерировать ключ
        </button>
        <p className={`mt-2 text-xs ${isKeyRegenerated ? "text-fg" : "text-fg/55"}`}>
          {isKeyRegenerated ? "Ключ обновлен!" : "Нажмите для генерации нового ключа."}
        </p>
        <div className="mt-2 border-t border-border pt-2">
          <p className="text-sm text-fg/85">Подписка активна: еще 24 дня</p>
        </div>
      </section>
    </>
  );
}
