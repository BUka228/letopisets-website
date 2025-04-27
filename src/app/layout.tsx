// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers"; // Путь к вашему файлу провайдеров
import SiteLayout from "./_components/SiteLayout"; // Путь к вашему макету

const inter = Inter({ subsets: ["latin"] }); // Или ваш выбранный шрифт

export const metadata: Metadata = {
  title: "Летописец Чата | Chat Chronicler", // Можно сделать динамическим
  description: "Ваш ИИ-ассистент для Telegram-групп, который анализирует историю сообщений и генерирует уникальные сводки дня.",
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Применяем темный класс и язык по умолчанию (провайдер может его изменить)
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <SiteLayout>
            {children}
          </SiteLayout>
        </Providers>
      </body>
    </html>
  );
}