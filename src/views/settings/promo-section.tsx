export function PromoSection() {
  return (
    <section className="rounded-[12px] border border-border bg-surface p-3">
      <p className="mb-2 text-xs uppercase tracking-widest text-fg/70">Redeem Promo</p>
      <div className="flex gap-2">
        <input
          placeholder="ENTER PROMO CODE"
          className="h-10 w-full rounded-[8px] border border-border bg-bg px-3 text-sm outline-none"
        />
        <button
          type="button"
          className="h-10 rounded-[8px] border border-fg bg-fg px-4 text-sm font-semibold text-bg active:opacity-70"
        >
          Redeem
        </button>
      </div>
    </section>
  );
}
