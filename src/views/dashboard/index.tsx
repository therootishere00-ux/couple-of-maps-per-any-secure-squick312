import { KeyCard } from "./connection-card";
import { StatsSubscription } from "./stats-subscription";
import { ProfileChip } from "@/components/profile-chip";

type DashboardViewProps = {
  proxyUrl: string;
  isKeyVisible: boolean;
  isCopied: boolean;
  isKeyRegenerated: boolean;
  serverLabel: string;
  pingMs: number;
  onToggleKeyVisibility: () => void;
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
  isKeyVisible,
  isCopied,
  isKeyRegenerated,
  serverLabel,
  pingMs,
  onToggleKeyVisibility,
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
        isKeyVisible={isKeyVisible}
        isCopied={isCopied}
        onToggleKeyVisibility={onToggleKeyVisibility}
        onSetupInTelegram={onSetupInTelegram}
        onCopyLink={onCopyLink}
      />
      <StatsSubscription
        serverLabel={serverLabel}
        pingMs={pingMs}
        onRegenerateKey={onRegenerateKey}
        isKeyRegenerated={isKeyRegenerated}
      />
    </>
  );
}
