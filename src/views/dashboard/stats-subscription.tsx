export function StatsSubscription() {
  return (
    <>
      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-fg/70">Route Delay</p>
          <p className="mt-2 text-xl font-semibold">45ms</p>
        </article>
        <article className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-fg/70">Devices</p>
          <p className="mt-2 text-xl font-semibold">1/3</p>
        </article>
      </section>

      <section className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <p className="text-sm text-fg/85">Proxy plan: active until 24.06.2026</p>
        <button
          type="button"
          className="rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium"
        >
          Upgrade
        </button>
      </section>
    </>
  );
}
