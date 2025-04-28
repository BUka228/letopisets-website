// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Providers } from "./providers"; // <-- УДАЛИТЬ
import { LanguageProvider } from "./_components/LanguageProvider"; // <-- ИМПОРТИРОВАТЬ
import SiteLayout from "./_components/SiteLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { /* ... */ };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* Используем LanguageProvider напрямую */}
        <LanguageProvider>
          <SiteLayout>
            {children}
          </SiteLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}