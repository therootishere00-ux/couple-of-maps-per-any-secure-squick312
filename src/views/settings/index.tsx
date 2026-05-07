import { PromoSection } from "./promo-section";
import { SettingsList } from "./settings-list";

type SettingsViewProps = {
  activeServer: string;
  userId: string;
  onOpenServers: () => void;
};

export function SettingsView({ activeServer, userId, onOpenServers }: SettingsViewProps) {
  return (
    <>
      <SettingsList activeServer={activeServer} userId={userId} onOpenServers={onOpenServers} />
      <PromoSection />
    </>
  );
}
