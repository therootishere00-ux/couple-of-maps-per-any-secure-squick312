export type View = "dashboard" | "settings" | "servers";
export type ConnectionStatus = "DISCONNECTED" | "SECURE";

export type Server = {
  id: string;
  country: string;
  signalLevel: 1 | 2 | 3;
};
