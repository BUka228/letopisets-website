// src/app/_components/SiteLayout.tsx
"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link"; // Используем Link из Next.js для навигации
import { usePathname } from "next/navigation"; // Хук для получения текущего пути
import { useLanguage } from "./LanguageProvider"; // Наш хук для доступа к языку и переводам
import { Button } from "~/components/ui/button"; // Импортируем UI компоненты (shadcn/ui)
import { Menu, X, Globe } from "lucide-react"; // Иконки

// Определяем тип для пропсов компонента
interface SiteLayoutProps {
  children: ReactNode; // Дочерние элементы, которые будут обернуты макетом (наши страницы)
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  // Получаем необходимые данные и функции из контекста языка
  const { language, setLanguage, t } = useLanguage();
  // Состояние для открытия/закрытия мобильного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Получаем текущий путь страницы
  const pathname = usePathname();

  // Эффект для автоматического закрытия мобильного меню при смене страницы
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // Зависимость от pathname

  // Функция для переключения языка
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ru" ? "en" : "ru"));
  };

  // Получаем имя пользователя бота для ссылки "Добавить в Telegram"
  const botUsername = t("telegram_bot_username", "LetopisetsChatBot");
  const telegramLink = `https://t.me/${botUsername}?startgroup=true`;

  // Массив навигационных ссылок для удобства рендеринга
  const navLinks = [
    { href: "/", labelKey: "hero_title", split: true },
    { href: "/features", labelKey: "features_title" },
    { href: "/setup", labelKey: "setup_title" },
    { href: "/privacy", labelKey: "privacy_policy_title" },
    { href: "/faq", labelKey: "faq_page_title",
      labelRu: "Поддержка / FAQ", labelEn: "Support / FAQ"
     },
  ];

  // Хелпер функция для получения текста ссылки
  const getNavLinkLabel = (link: typeof navLinks[0]): string => {
      if (link.labelRu && language === 'ru') return link.labelRu;
      if (link.labelEn && language === 'en') return link.labelEn;
      const translated = t(link.labelKey);
      return link.split ? translated.split(":")[0] : translated;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Шапка сайта */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Логотип/Название сайта */}
           <Link href="/" className="text-xl font-bold mr-4 flex-shrink-0">
             {t('site_name', language === "ru" ? "Летописец Чата" : "Chat Chronicler")}
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex flex-grow items-center gap-1 lg:gap-2 justify-end"> {/* Уменьшены gap */}
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref> {/* Убран legacyBehavior */}
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  size="sm" // Уменьшен размер кнопок навигации
                  asChild
                >
                  {/* Тег <a> НЕ НУЖЕН */}
                  <span>{getNavLinkLabel(link)}</span>
                </Button>
              </Link>
            ))}
             {/* Кнопка смены языка */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t('toggle_language_aria', 'Toggle language')}
            >
              <Globe className="h-5 w-5" />
            </Button>
             {/* Кнопка "Добавить в Telegram" */}
            <Button asChild size="sm">
               {/* Убран тег <a> */}
              <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                {t("cta_button", "Add to Telegram")}
              </a>
            </Button>
          </nav>

           {/* Кнопки для мобильного меню */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t('toggle_language_aria', 'Toggle language')}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('toggle_menu_aria', 'Toggle menu')}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Выпадающее мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background shadow-md">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} passHref> {/* Убран legacyBehavior */}
                     <Button
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        className="w-full justify-start text-base"
                        asChild
                     >
                        {/* Тег <a> НЕ НУЖЕН */}
                       <span>{getNavLinkLabel(link)}</span>
                    </Button>
                  </Link>
                ))}
                <Button asChild className="mt-4 text-base">
                   {/* Убран тег <a> */}
                  <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                    {t("cta_button", "Add to Telegram")}
                  </a>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Основной контент страницы (передается через children) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Подвал сайта */}
      <footer className="bg-muted py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t("footer_copyright", `© ${new Date().getFullYear()} Chat Chronicler`)}
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2"> {/* Добавлен flex-wrap */}
               {/* Убран legacyBehavior и тег <a> */}
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("privacy_policy_title", "Privacy Policy")}
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                   {t('faq_link_footer', language === "ru" ? "Поддержка / FAQ" : "Support / FAQ")}
              </Link>
               {/* Ссылка на канал поддержки */}
               {t('support_channel_link', '#') !== '#' && t('support_channel_link') !== '[support_channel_link]' && ( // Улучшенная проверка
                 <a href={t('support_channel_link')} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                   {t('support_channel_text', 'Support Channel')}
                 </a>
               )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}