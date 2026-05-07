export function PromoSection() {
  return (
    <section className="rounded-xl border border-border bg-surface p-3">
      <p className="mb-2 text-xs uppercase tracking-widest text-fg/70">Promo code</p>
      <div className="flex gap-2">
        <input
          placeholder="ENTER CODE"
          className="h-10 w-full border border-border bg-bg px-3 text-sm outline-none"
        />
        <button
          type="button"
          className="h-10 border border-border bg-fg px-4 text-sm font-semibold text-bg"
        >
          Redeem
        </button>
      </div>
    </section>
  );
}
