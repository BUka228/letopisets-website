// src/app/faq/page.tsx
"use client";
import React from "react";
import { useLanguage } from "../_components/LanguageProvider"; // Путь к вашим компонентам
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { HelpCircle, MessageSquare, Send, LifeBuoy } from "lucide-react";

export default function FaqPage() {
   // Получаем весь объект контента
  const { language, currentContent, t } = useLanguage(); // t все еще нужен для fallback/простых строк

  // Берем данные из объекта
  const faqItems = currentContent.faq_items || [];
  const supportChannelLink = currentContent.support_channel_link || '#';
  const developerContactLink = currentContent.developer_contact_link || '#';
  const feedbackContactLink = currentContent.feedback_contact_link || developerContactLink; // Fallback на контакт разраба

  // Тексты берем тоже из объекта
  const supportSectionTitle = currentContent.support_section_title;
  const supportChannelCardTitle = currentContent.support_channel_card_title;
  const supportChannelCardText = currentContent.support_channel_card_text;
  const supportChannelButtonText = currentContent.support_channel_button;
  const developerContactCardTitle = currentContent.developer_contact_card_title;
  const developerContactCardText = currentContent.developer_contact_card_text;
  const developerContactButtonText = currentContent.developer_contact_button;
  const faqSectionTitle = currentContent.faq_section_title;
  const feedbackCardTitle = currentContent.feedback_card_title;
  const feedbackCardText = currentContent.feedback_card_text;
  const feedbackButtonText = currentContent.feedback_button;

  // Лоадер больше не нужен, т.к. данные статичны

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center text-foreground">
        {currentContent.faq_page_title || (language === "ru" ? "Поддержка / FAQ" : "Support / FAQ")}
      </h1>

       {/* Секция Поддержки */}
       <section className="mb-14 md:mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center md:text-left text-foreground">
          {supportSectionTitle}
        </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
               {supportChannelLink && supportChannelLink !== '#' && (
                <Button asChild className="w-full mt-auto" size="default" variant="default"><a href={supportChannelLink} target="_blank" rel="noopener noreferrer">{supportChannelButtonText}</a></Button>
              )}
            </CardContent>
          </Card>
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
               {developerContactLink && developerContactLink !== '#' && (
                 <Button asChild className="w-full mt-auto" size="default" variant="default"><a href={developerContactLink} target="_blank" rel="noopener noreferrer">{developerContactButtonText}</a></Button>
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
                 <p className="text-muted-foreground text-center">{t('faq_loading_or_error')}</p>
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
              {feedbackContactLink && feedbackContactLink !== '#' && (
                <Button asChild size="default"><a href={feedbackContactLink} target="_blank" rel="noopener noreferrer">{feedbackButtonText}</a></Button>
             )}
          </CardContent>
         </Card>
       </section>
    </div>
  );
}