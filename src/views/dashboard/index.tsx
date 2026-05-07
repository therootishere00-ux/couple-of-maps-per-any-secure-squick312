import { ConnectionCard } from "./connection-card";
import { StatsSubscription } from "./stats-subscription";
import type { ConnectionStatus } from "@/types/miniapp";
import { ProfileChip } from "@/components/profile-chip";

type DashboardViewProps = {
  status: ConnectionStatus;
  onToggleStatus: () => void;
  profile: {
    displayName: string;
    username: string;
    avatarUrl: string | null;
  };
};

export function DashboardView({ status, onToggleStatus, profile }: DashboardViewProps) {
  return (
    <>
      <ProfileChip
        displayName={profile.displayName}
        username={profile.username}
        avatarUrl={profile.avatarUrl}
      />
      <ConnectionCard status={status} onToggleStatus={onToggleStatus} />
      <StatsSubscription />
    </>
  );
}
