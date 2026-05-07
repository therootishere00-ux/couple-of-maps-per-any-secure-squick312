import { ConnectionCard } from "./connection-card";
import { StatsSubscription } from "./stats-subscription";
import type { ConnectionStatus } from "@/types/miniapp";

type DashboardViewProps = {
  status: ConnectionStatus;
  onToggleStatus: () => void;
};

export function DashboardView({ status, onToggleStatus }: DashboardViewProps) {
  return (
    <>
      <ConnectionCard status={status} onToggleStatus={onToggleStatus} />
      <StatsSubscription />
    </>
  );
}
