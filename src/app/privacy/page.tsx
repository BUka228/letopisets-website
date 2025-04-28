// src/app/privacy/page.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Button } from "~/components/ui/button";
import { useLanguage } from "../_components/LanguageProvider"; // Путь к вашим компонентам
// УБРАЛИ Skeleton, он больше не нужен
import { Card, CardContent } from "~/components/ui/card";

export default function PrivacyPage() {
  // УБРАЛИ isLoadingContent из деструктуризации
  const { t, language } = useLanguage();

  // Получаем текст политики напрямую из currentContent или через t()
  // const privacyContent = currentContent?.privacy_policy_text || ""; // Вариант 1
  const privacyContent = t("privacy_policy_text", ""); // Вариант 2 (оставляем)

  // Получаем ссылки (остается как было)
  const supportChannelLink = t('support_channel_link', '#');
  const developerContactLink = t('developer_contact_link', '#');

  // --- УБРАЛИ БЛОК ЛОАДЕРА ---
  // if (isLoadingContent && !privacyContent) {
  //   return (
  //     ... скелетон ...
  //   );
  // }
  // --- КОНЕЦ УДАЛЕНИЯ ---

  // Сразу рендерим реальную страницу
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground">
        {t("privacy_policy_title", "Privacy Policy")}
      </h1>
      <Card className="max-w-4xl mx-auto bg-card p-6 md:p-10 rounded-lg shadow-md border border-border">
        <CardContent>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacyContent}</ReactMarkdown>
          </div>
          {/* Секция контактов */}
          <div className="mt-10 pt-6 border-t border-border">
             {/* ... код секции контактов ... */}
             <h2 className="text-xl font-semibold mb-4 text-foreground">
               {t('contact_info_title', language === "ru" ? "Контактная информация" : "Contact Information")}
            </h2>
             <p className="text-muted-foreground mb-5">
               {t('contact_info_text', language === "ru" ? "Если у вас есть вопросы по поводу политики конфиденциальности, свяжитесь с нами:" : "If you have questions about this privacy policy, please contact us:")}
            </p>
             <div className="flex flex-col sm:flex-row gap-3">
               {supportChannelLink && supportChannelLink !== '#' && supportChannelLink !== '[support_channel_link]' && (
                   <Button asChild variant="outline" className="bg-background border-border hover:bg-accent">
                     <a href={supportChannelLink} target="_blank" rel="noopener noreferrer">
                       {t('support_channel_button', language === "ru" ? "Канал поддержки" : "Support Channel")}
                    </a>
                  </Button>
              )}
               {developerContactLink && developerContactLink !== '#' && developerContactLink !== '[developer_contact_link]' && (
                   <Button asChild variant="outline" className="bg-background border-border hover:bg-accent">
                     <a href={developerContactLink} target="_blank" rel="noopener noreferrer">
                       {t('developer_contact_button', language === "ru" ? "Связаться с разработчиком" : "Contact Developer")}
                    </a>
                  </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}