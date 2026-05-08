import "./globals.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Компас Proxy",
  description: "MTProto менеджер ключей для Telegram",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-bg text-fg font-sans antialiased">
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
