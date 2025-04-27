// src/app/faq/page.tsx
"use client";

import React from "react";
import { useLanguage } from "../_components/LanguageProvider"; // Путь к вашим компонентам
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { HelpCircle, MessageSquare, Send, LifeBuoy } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton"; // Для лоадера

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const { t, language, content, isLoadingContent } = useLanguage();

  // Парсим FAQ из строки JSON
  let faqItems: FaqItem[] = [];
  const faqItemsContent = content.find((c) => c.key === "faq_items");

  if (!isLoadingContent && faqItemsContent) {
    try {
      const parsedData = JSON.parse(
        language === "ru" ? faqItemsContent.valueRu : faqItemsContent.valueEn
      );
      if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'object' && 'question' in item && 'answer' in item)) {
        faqItems = parsedData as FaqItem[];
      } else {
         console.error("Parsed FAQ data is not a valid array of {question, answer} objects.");
      }
    } catch (e) {
      console.error("Error parsing FAQ items JSON:", e);
    }
  }

   const supportChannelLink = t('support_channel_link', '#');
   const developerContactLink = t('developer_contact_link', '#');
   const feedbackContactLink = t('feedback_contact_link', developerContactLink);

   const supportSectionTitle = t('support_section_title', language === "ru" ? "Поддержка и сообщество" : "Support & Community");
   const supportChannelCardTitle = t('support_channel_card_title', language === "ru" ? "Канал поддержки" : "Support Channel");
   const supportChannelCardText = t('support_channel_card_text', language === "ru" ? "Присоединяйтесь к нашему официальному каналу, чтобы получать обновления, советы и поддержку:" : "Join our official channel for updates, tips, and support:");
   const supportChannelButtonText = t('support_channel_button', language === "ru" ? "Перейти в канал" : "Go to Channel");
   const developerContactCardTitle = t('developer_contact_card_title', language === "ru" ? "Связаться с разработчиком" : "Contact Developer");
   const developerContactCardText = t('developer_contact_card_text', language === "ru" ? "Для прямой связи с разработчиком или предложения идей:" : "For direct contact with the developer or to suggest ideas:");
   const developerContactButtonText = t('developer_contact_button', language === "ru" ? "Написать сообщение" : "Send Message");
   const faqSectionTitle = t('faq_section_title', language === "ru" ? "Часто задаваемые вопросы" : "Frequently Asked Questions");
   const feedbackCardTitle = t('feedback_card_title', language === "ru" ? "Предложить идею или сообщить об ошибке" : "Suggest an Idea / Report a Bug");
   const feedbackCardText = t('feedback_card_text', language === "ru" ? "Мы ценим вашу обратную связь и постоянно работаем над улучшением Летописца Чата." : "We value your feedback and are constantly working to improve Chat Chronicler.");
   const feedbackButtonText = t('feedback_button', language === "ru" ? "Отправить отзыв" : "Send Feedback");

    if (isLoadingContent && faqItems.length === 0) {
       // Лоадер для FAQ
        return (
            <div className="container mx-auto px-4 py-16">
                 <Skeleton className="h-10 w-1/2 md:w-1/3 mx-auto mb-12" />
                 {/* Лоадер для секции поддержки */}
                 <Skeleton className="h-8 w-1/3 mb-6" />
                 <div className="grid md:grid-cols-2 gap-6 mb-12">
                     <Skeleton className="h-40 w-full rounded-lg" />
                     <Skeleton className="h-40 w-full rounded-lg" />
                 </div>
                 {/* Лоадер для FAQ */}
                 <Skeleton className="h-8 w-1/3 mb-6" />
                 <div className="space-y-6">
                     {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
                 </div>
                 {/* Лоадер для Feedback */}
                 <Skeleton className="h-40 w-full rounded-lg mt-12" />
            </div>
        );
    }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center text-foreground">
        {t('faq_page_title', language === "ru" ? "Поддержка / FAQ" : "Support / FAQ")}
      </h1>

      {/* Секция Поддержки */}
      <section className="mb-14 md:mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center md:text-left text-foreground">
          {supportSectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Карточка Канала поддержки */}
          <Card className="bg-card border border-border shadow-sm flex flex-col rounded-lg overflow-hidden">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary flex-shrink-0"/>
                {supportChannelCardTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-grow flex flex-col justify-between">
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                {supportChannelCardText}
              </p>
              {supportChannelLink && supportChannelLink !== '#' && supportChannelLink !== '[support_channel_link]' && (
                // --- ИСПРАВЛЕНО ЗДЕСЬ ---
                <Button asChild className="w-full mt-auto" size="default" variant="default"><a href={supportChannelLink} target="_blank" rel="noopener noreferrer">{supportChannelButtonText}</a></Button>
                // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
              )}
            </CardContent>
          </Card>

          {/* Карточка Связи с разработчиком */}
          <Card className="bg-card border border-border shadow-sm flex flex-col rounded-lg overflow-hidden">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Send className="h-5 w-5 text-primary flex-shrink-0"/>
                {developerContactCardTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-grow flex flex-col justify-between">
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                {developerContactCardText}
              </p>
              {developerContactLink && developerContactLink !== '#' && developerContactLink !== '[developer_contact_link]' && (
                 // --- ИСПРАВЛЕНО ЗДЕСЬ ---
                 <Button asChild className="w-full mt-auto" size="default" variant="default"><a href={developerContactLink} target="_blank" rel="noopener noreferrer">{developerContactButtonText}</a></Button>
                 // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Секция FAQ */}
      <section className="mb-14 md:mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center md:text-left flex items-center gap-2 text-foreground">
          <HelpCircle className="h-6 w-6 text-primary"/>
          {faqSectionTitle}
        </h2>
        <div className="space-y-4">
          {faqItems.length > 0 ? (
            faqItems.map((item, index) => (
              <Card key={index} className="bg-card border border-border shadow-sm overflow-hidden rounded-lg">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-base font-semibold text-foreground">{item.question}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-5">
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-2 max-w-none md:max-w-prose">
                    {item.answer.split('\n').map((line, i) => line.trim() && <p key={i}>{line}</p>)}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-card border-border shadow-sm rounded-lg">
              <CardContent className="pt-6 pb-6">
                <p className="text-muted-foreground text-center">{t('faq_loading_or_error', language === 'ru' ? 'Вопросы не найдены или произошла ошибка загрузки.' : 'Questions not found or failed to load.')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Секция Фидбека */}
      <section>
         <Card className="bg-muted border-border shadow-sm rounded-lg">
            <CardHeader className="px-5 pt-5 pb-3">
               <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                   <LifeBuoy className="h-5 w-5 text-primary"/>
                  {feedbackCardTitle}
               </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
               <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                  {feedbackCardText}
               </p>
               {feedbackContactLink && feedbackContactLink !== '#' && feedbackContactLink !== '[feedback_contact_link]' && (
                   // --- ИСПРАВЛЕНО ЗДЕСЬ ---
                   <Button asChild size="default"><a href={feedbackContactLink} target="_blank" rel="noopener noreferrer">{feedbackButtonText}</a></Button>
                    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
               )}
           </CardContent>
        </Card>
      </section>

    </div>
  );
}