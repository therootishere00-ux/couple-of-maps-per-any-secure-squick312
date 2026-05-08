type ProfileChipProps = {
  displayName: string;
  username: string;
  avatarUrl: string | null;
};

export function ProfileChip({ displayName, username, avatarUrl }: ProfileChipProps) {
  return (
    <section className="flex items-center gap-3 rounded-[12px] border border-border bg-surface px-3 py-2">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={displayName} className="h-10 w-10 rounded-full border border-border" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-xs font-bold">
          {displayName.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs text-fg/70">{displayName}</p>
        <p className="truncate text-sm font-semibold">{username}</p>
      </div>
    </section>
  );
}
