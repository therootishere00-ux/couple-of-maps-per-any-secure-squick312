export type View = "dashboard" | "settings" | "servers";

export type Server = {
  id: string;
  flag: string;
  country: string;
  city: string;
  pingMs: number;
};
