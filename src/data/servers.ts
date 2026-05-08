import type { Server } from "@/types/miniapp";

export const SERVERS: Server[] = [
  { id: "de", flag: "🇩🇪", country: "Германия", city: "Франкфурт", pingMs: 42 },
  { id: "nl", flag: "🇳🇱", country: "Нидерланды", city: "Амстердам", pingMs: 46 },
  { id: "us", flag: "🇺🇸", country: "США", city: "Нью-Йорк", pingMs: 78 },
  { id: "gb", flag: "🇬🇧", country: "Великобритания", city: "Лондон", pingMs: 51 },
];
