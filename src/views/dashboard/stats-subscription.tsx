import { Signal } from "lucide-react";

type StatsSubscriptionProps = {
  serverLabel: string;
  pingMs: number;
  onRegenerateKey: () => void;
};

export function StatsSubscription({ serverLabel, pingMs, onRegenerateKey }: StatsSubscriptionProps) {
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

      <button
        type="button"
        onClick={onRegenerateKey}
        className="h-11 w-full rounded-[12px] border border-fg bg-transparent px-4 text-sm font-semibold text-fg active:opacity-70"
      >
        Регенерировать ключ
      </button>

      <section className="rounded-[12px] border border-border bg-surface px-4 py-3">
        <p className="text-sm text-fg/85">Подписка активна: еще 24 дня</p>
      </section>
    </>
  );
}
