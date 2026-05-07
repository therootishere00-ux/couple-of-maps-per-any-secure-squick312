import type { Server } from "@/types/miniapp";

export const SERVERS: Server[] = [
  { id: "de", flag: "🇩🇪", country: "Germany", city: "Frankfurt", pingMs: 42 },
  { id: "nl", flag: "🇳🇱", country: "Netherlands", city: "Amsterdam", pingMs: 46 },
  { id: "us", flag: "🇺🇸", country: "United States", city: "New York", pingMs: 78 },
  { id: "gb", flag: "🇬🇧", country: "United Kingdom", city: "London", pingMs: 51 },
];
