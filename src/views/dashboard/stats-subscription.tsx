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
        <article className="rounded-[12px] border border-border bg-surface px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-fg/70">Location</p>
          <p className="mt-2 text-base font-semibold">{serverLabel}</p>
        </article>
        <article className="rounded-[12px] border border-border bg-surface px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-fg/70">Latency</p>
          <p className="mt-2 flex items-center gap-2 text-base font-semibold">
            <Signal size={16} strokeWidth={1.75} />
            {pingMs}ms
          </p>
        </article>
      </section>

      <button
        type="button"
        onClick={onRegenerateKey}
        className="h-10 w-full rounded-[8px] border border-fg bg-transparent px-4 text-sm font-semibold text-fg active:opacity-70"
      >
        Regenerate Key
      </button>

      <section className="rounded-[12px] border border-border bg-surface px-4 py-3">
        <p className="text-sm text-fg/85">Subscription ends in 24 days</p>
      </section>
    </>
  );
}
