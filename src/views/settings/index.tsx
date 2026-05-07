import { PromoSection } from "./promo-section";
import { SettingsList } from "./settings-list";

type SettingsViewProps = {
  activeServer: string;
  onOpenServers: () => void;
};

export function SettingsView({ activeServer, onOpenServers }: SettingsViewProps) {
  return (
    <>
      <SettingsList activeServer={activeServer} onOpenServers={onOpenServers} />
      <PromoSection />
    </>
  );
}
