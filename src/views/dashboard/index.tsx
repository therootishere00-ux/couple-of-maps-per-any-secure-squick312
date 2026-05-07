import { KeyCard } from "./connection-card";
import { StatsSubscription } from "./stats-subscription";
import { ProfileChip } from "@/components/profile-chip";

type DashboardViewProps = {
  proxyUrl: string;
  serverLabel: string;
  pingMs: number;
  onSetupInTelegram: () => void;
  onCopyLink: () => void;
  onRegenerateKey: () => void;
  profile: {
    displayName: string;
    username: string;
    avatarUrl: string | null;
  };
};

export function DashboardView({
  proxyUrl,
  serverLabel,
  pingMs,
  onSetupInTelegram,
  onCopyLink,
  onRegenerateKey,
  profile,
}: DashboardViewProps) {
  return (
    <>
      <ProfileChip
        displayName={profile.displayName}
        username={profile.username}
        avatarUrl={profile.avatarUrl}
      />
      <KeyCard
        proxyUrl={proxyUrl}
        onSetupInTelegram={onSetupInTelegram}
        onCopyLink={onCopyLink}
      />
      <StatsSubscription
        serverLabel={serverLabel}
        pingMs={pingMs}
        onRegenerateKey={onRegenerateKey}
      />
    </>
  );
}
