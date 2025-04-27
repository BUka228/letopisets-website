// src/app/faq/page.tsx
"use client";

import React from "react";
import { useLanguage } from "../_components/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { HelpCircle, MessageSquare, Send } from "lucide-react";
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

  // Парсим только если контент загружен
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
   const feedbackContactLink = t('feedback_contact_link', developerContactLink); // Ссылка для фидбека = ссылка на разработчика по умолчанию

    if (isLoadingContent && faqItems.length === 0) {
       // Лоадер для FAQ
        return (
            <div className="container mx-auto px-4 py-16">
                 <Skeleton className="h-10 w-1/2 md:w-1/3 mx-auto mb-12" />
                 <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-3">
                     <div className="lg:col-span-2 space-y-6">
                         <Skeleton className="h-6 w-1/3 mb-6" />
                         {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-lg" />)}
                     </div>
                     <div className="lg:col-span-1 space-y-6">
                         <Skeleton className="h-40 w-full rounded-lg" />
                         <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div className="container mx-auto px-4 py-16">
       <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
         {t('faq_page_title', language === "ru" ? "Поддержка / FAQ" : "Support / FAQ")}
       </h1>

       <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-3">

         {/* FAQ Section */}
         <section className="lg:col-span-2 space-y-6">
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
             <HelpCircle className="h-6 w-6 text-primary"/>
             {t('faq_section_title', language === "ru" ? "Часто Задаваемые Вопросы" : "Frequently Asked Questions")}
          </h2>
          {faqItems.length > 0 ? (
            faqItems.map((item, index) => (
              <Card key={index} className="bg-card border-border shadow-sm">
                 <CardHeader className="pb-3"> {/* Уменьшим паддинг снизу */}
                   <CardTitle className="text-lg font-semibold">{item.question}</CardTitle>
                 </CardHeader>
                 <CardContent>
                    {/* Используем div и map для рендеринга параграфов, если в ответе есть переносы строк */}
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                     {item.answer.split('\n').map((line, i) => line.trim() && <p key={i}>{line}</p>)}
                   </div>
                 </CardContent>
              </Card>
            ))
          ) : (
              <Card className="bg-card border-border shadow-sm">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center">{t('faq_loading_or_error', language === 'ru' ? 'Вопросы загружаются или не найдены...' : 'Questions are loading or not found...')}</p>
                  </CardContent>
              </Card>
          )}
        </section>

         {/* Support Section */}
         <aside className="lg:col-span-1 space-y-6">
            {/* Support Channel Card */}
           <Card className="bg-card border-border shadow-sm">
             <CardHeader>
                 <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary"/>
                    {t('support_channel_card_title', language === "ru" ? "Канал поддержки" : "Support Channel")}
                </CardTitle>
             </CardHeader>
            <CardContent>
               <p className="mb-4 text-sm text-muted-foreground">
                 {t('support_channel_card_text', language === "ru" ? "Присоединяйтесь к нашему официальному каналу для новостей, анонсов и обсуждений." : "Join our channel for news, announcements, and discussions.")}
               </p>
                {supportChannelLink && supportChannelLink !== '#' && supportChannelLink !== '[support_channel_link]' && (
                    <Button asChild className="w-full" size="sm">
                      <a href={supportChannelLink} target="_blank" rel="noopener noreferrer">
                        {t('support_channel_button', language === "ru" ? "Перейти в Канал" : "Go to Channel")}
                      </a>
                    </Button>
                )}
            </CardContent>
          </Card>

            {/* Contact Developer Card */}
           <Card className="bg-card border-border shadow-sm">
             <CardHeader>
                 <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary"/>
                   {t('developer_contact_card_title', language === "ru" ? "Связаться с Разработчиком" : "Contact Developer")}
                </CardTitle>
             </CardHeader>
            <CardContent>
               <p className="mb-4 text-sm text-muted-foreground">
                 {t('developer_contact_card_text', language === "ru" ? "Есть идеи, предложения или нашли ошибку? Напишите напрямую." : "Have ideas, suggestions, or found a bug? Contact directly.")}
               </p>
                 {developerContactLink && developerContactLink !== '#' && developerContactLink !== '[developer_contact_link]' && (
                    <Button asChild className="w-full" size="sm">
                      <a href={developerContactLink} target="_blank" rel="noopener noreferrer">
                        {t('developer_contact_button', language === "ru" ? "Написать Сообщение" : "Send Message")}
                      </a>
                    </Button>
                )}
            </CardContent>
          </Card>

           {/* Feedback Section (внутри aside) */}
            <Card className="bg-muted border-border shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        {t('feedback_card_title', language === "ru" ? "Предложить идею / Сообщить об ошибке" : "Suggest an Idea / Report a Bug")}
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                        {t('feedback_card_text', language === "ru" ? "Ваша обратная связь помогает нам улучшать Летописца Чата." : "Your feedback helps us improve Chat Chronicler.")}
                    </p>
                     {feedbackContactLink && feedbackContactLink !== '#' && feedbackContactLink !== '[feedback_contact_link]' && (
                        <Button asChild className="w-full" size="sm">
                            <a href={feedbackContactLink} target="_blank" rel="noopener noreferrer">
                                {t('feedback_button', language === "ru" ? "Отправить отзыв" : "Send Feedback")}
                            </a>
                        </Button>
                     )}
                </CardContent>
             </Card>
        </aside>

      </div>
    </div>
  );
}