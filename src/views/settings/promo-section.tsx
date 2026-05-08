export function PromoSection() {
  return (
    <section className="rounded-[12px] border border-border bg-surface p-3">
      <p className="mb-2 text-xs uppercase tracking-widest text-fg/70">Промокод</p>
      <div className="flex gap-2">
        <input
          placeholder="ВВЕДИТЕ ПРОМОКОД"
          className="h-11 w-full rounded-[12px] border border-border bg-bg px-3 text-sm outline-none"
        />
        <button
          type="button"
          className="h-11 rounded-[12px] border border-fg bg-fg px-4 text-sm font-semibold text-bg active:opacity-70"
        >
          Применить
        </button>
      </div>
    </section>
  );
}
