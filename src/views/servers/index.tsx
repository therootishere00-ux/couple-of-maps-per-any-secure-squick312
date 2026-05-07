import { ServerItem } from "./server-item";
import type { Server } from "@/types/miniapp";

type ServersViewProps = {
  servers: Server[];
  activeServerId: string;
  onSelectServer: (serverId: string) => void;
};

export function ServersView({ servers, activeServerId, onSelectServer }: ServersViewProps) {
  return (
    <section className="space-y-2">
      {servers.map((server) => (
        <ServerItem
          key={server.id}
          server={server}
          isActive={server.id === activeServerId}
          onSelect={onSelectServer}
        />
      ))}
    </section>
  );
}
