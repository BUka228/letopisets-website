// src/app/privacy/page.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown"; // Импортируем компонент для рендеринга Markdown
import remarkGfm from 'remark-gfm'; // Импортируем плагин для поддержки GitHub Flavored Markdown
import { Button } from "~/components/ui/button"; // Компонент кнопки
import { useLanguage } from "../_components/LanguageProvider"; // Хук для получения языка и текстов
import { Skeleton } from "~/components/ui/skeleton"; // Компонент для отображения загрузки
import { Card, CardContent } from "~/components/ui/card"; // Обертка для контента

export default function PrivacyPage() {
  // Получаем функцию перевода t, текущий язык и статус загрузки контента
  const { t, language, isLoadingContent } = useLanguage();

  // Получаем полный текст политики конфиденциальности для текущего языка
  // Используем пустую строку как fallback, если ключ не найден или контент еще грузится
  const privacyContent = t("privacy_policy_text", "");

  // --- ПОЛУЧЕНИЕ ССЫЛОК ДЛЯ КНОПОК ---
  // Получаем ссылки из контента. Используем '#' как fallback,
  // чтобы в случае отсутствия ключа ссылка была неактивной, но кнопка могла отрендериться
  // (хотя текущая логика скроет кнопку, если ссылка равна '#')
  const supportChannelLink = t('support_channel_link', '#');
  const developerContactLink = t('developer_contact_link', '#');
  // ------------------------------------

  // Отображаем скелетон/лоадер, пока контент загружается
  if (isLoadingContent && !privacyContent) {
    return (
      <div className="container mx-auto px-4 py-16">
        {/* Скелетон заголовка */}
        <Skeleton className="h-10 w-1/2 md:w-1/3 mx-auto mb-12 rounded-md" />
        {/* Скелетон для карточки с контентом */}
        <div className="max-w-4xl mx-auto bg-card p-6 md:p-10 rounded-lg shadow-md border border-border">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <br />
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <br />
             {/* Скелетон для секции контактов */}
            <Skeleton className="h-6 w-1/3 mt-10 pt-6 border-t border-border rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
               <Skeleton className="h-10 w-36 rounded-md" />
               <Skeleton className="h-10 w-48 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Отображаем реальную страницу после загрузки контента
  return (
    <div className="container mx-auto px-4 py-16"> {/* Основной контейнер страницы */}
      {/* Заголовок страницы */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground">
        {t("privacy_policy_title", "Privacy Policy")}
      </h1>

      {/* Карточка для основного контента политики */}
      <Card className="max-w-4xl mx-auto bg-card p-6 md:p-10 rounded-lg shadow-md border border-border">
        <CardContent> {/* Возвращаем CardContent для стандартных отступов */}
          {/* Контейнер для применения кастомных стилей Markdown */}
          <div className="markdown-content"> {/* Используем кастомный класс */}
            {/* Рендеринг Markdown текста политики */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacyContent}</ReactMarkdown>
          </div>

          {/* Секция контактов */}
          <div className="mt-10 pt-6 border-t border-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {t('contact_info_title', language === "ru" ? "Контактная информация" : "Contact Information")}
            </h2>
            <p className="text-muted-foreground mb-5">
              {t('contact_info_text', language === "ru" ? "Если у вас есть вопросы по поводу политики конфиденциальности, свяжитесь с нами:" : "If you have questions about this privacy policy, please contact us:")}
            </p>
            {/* Кнопки контактов */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* --- ИЗМЕНЕНА ЛОГИКА ПРОВЕРКИ ССЫЛОК --- */}
              {/* Проверяем, что ссылка не пустая, не равна '#' и не равна плейсхолдеру ключа */}
              {supportChannelLink && supportChannelLink !== '#' && supportChannelLink !== '[support_channel_link]' && (
                  <Button asChild variant="outline" className="bg-background border-border hover:bg-accent">
                    <a href={supportChannelLink} target="_blank" rel="noopener noreferrer">
                      {/* Получаем текст кнопки через t() */}
                      {t('support_channel_button', language === "ru" ? "Канал поддержки" : "Support Channel")}
                    </a>
                  </Button>
              )}
              {developerContactLink && developerContactLink !== '#' && developerContactLink !== '[developer_contact_link]' && (
                  <Button asChild variant="outline" className="bg-background border-border hover:bg-accent">
                    <a href={developerContactLink} target="_blank" rel="noopener noreferrer">
                       {/* Получаем текст кнопки через t() */}
                      {t('developer_contact_button', language === "ru" ? "Связаться с разработчиком" : "Contact Developer")}
                    </a>
                  </Button>
              )}
              {/* --- КОНЕЦ ИЗМЕНЕНИЙ ЛОГИКИ ПРОВЕРКИ --- */}
            </div>
          </div>
        </CardContent> {/* Закрываем CardContent */}
      </Card> {/* Закрываем Card */}
    </div>
  );
}