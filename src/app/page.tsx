// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
// Используем типизированный хук и iconMap
import { useLanguage, iconMap } from "./_components/LanguageProvider";

export default function HomePage() {
  // Получаем весь объект контента для текущего языка и функцию t
  const { currentContent, t } = useLanguage();
  const [showQrCode, setShowQrCode] = useState(false);

  // --- Получение данных из currentContent ---
  // Проверяем наличие данных перед использованием
  const features = currentContent?.features || [];
  const examples = currentContent?.examples || [];
  const displayedFeatures = features.slice(0, 3); // Показываем первые 3 фичи
  const displayedExamples = examples.slice(0, 4); // Показываем первые 4 примера

  // Получаем URL изображения бота, используем t() с fallback для ключа
  const botImageUrl = t('bot_image', '/images/bot-avatar.png');

  // Получаем имя пользователя бота для ссылки
  const botUsername = t("telegram_bot_username", "LetopisetsChatBot");
  const telegramLink = `https://t.me/${botUsername}?startgroup=true`;
  // --- Конец получения данных ---


  // --- Лоадер ---
  // Проверяем, загружен ли вообще объект currentContent (хотя без useQuery он должен быть всегда)
  // Более надежно проверять наличие какого-то ключевого поля
  const isLoading = !currentContent?.hero_title; // Считаем, что грузится, если нет заголовка

  if (isLoading) {
     return (
       <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
         {/* Можно заменить на более красивый спиннер/анимацию */}
         <p>Loading...</p>
       </div>
     );
  }
  // --- Конец Лоадера ---


  return (
    // Обертка для страницы
    <div className="flex flex-col">

      {/* Hero section */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 bg-gradient-dark">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             {/* Текстовый блок */}
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
             >
               {/* Используем t() для получения текста */}
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                 {t("hero_title")}
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                 {t("hero_subtitle")}
               </p>
               {/* Кнопки */}
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                 <Button asChild size="lg">
                   <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                     {t("cta_button")}
                   </a>
                 </Button>
                 <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowQrCode(!showQrCode)}
                    className="flex items-center gap-2 bg-background/10 border-border hover:bg-background/20"
                 >
                   <Smartphone className="h-5 w-5" />
                   {t('qr_code_button')}
                 </Button>
               </div>
               {/* QR Code Popup */}
               {showQrCode && (
                  <motion.div
                     key="qrcode"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{ duration: 0.2 }}
                     className="mt-4 p-3 bg-white rounded-lg inline-flex flex-col items-center shadow-lg"
                   >
                   <QRCodeSVG value={telegramLink} size={128} level="M" includeMargin={false} bgColor="#ffffff" fgColor="#0B1120" className="mb-2"/>
                   <p className="text-center text-xs text-black mt-1 font-medium"> {/* Убрал mt-2, добавил mt-1 */}
                     {t('qr_code_scan_text')}
                   </p>
                  </motion.div>
               )}
             </motion.div>

              {/* Блок с изображением */}
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                 className="flex justify-center md:justify-end"
              >
                {/* Используем next/image для оптимизации, если путь есть */}
                 {botImageUrl && botImageUrl !== '[bot_image]' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img // Или <Image> из next/image, если настроен loader
                       src={botImageUrl}
                       alt={t('bot_image_alt', "Chat Chronicler Demo")}
                       width={450} // Примерная ширина, можно настроить
                       height={450} // Примерная высота
                       className="max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-2xl object-contain"
                    />
                  ) : (
                    // Плейсхолдер, если картинки нет
                    <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center shadow-md">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
               </motion.div>
           </div>
         </div>
       </section>

      {/* Problem/Solution section */}
      <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-card border-border shadow-md">
                      <CardHeader><CardTitle className="text-xl font-semibold">{t("problem_title")}</CardTitle></CardHeader>
                      <CardContent><p className="text-muted-foreground">{t("problem_text")}</p></CardContent>
                  </Card>
                  <Card className="bg-card border-border shadow-md">
                      <CardHeader><CardTitle className="text-xl font-semibold">{t("solution_title")}</CardTitle></CardHeader>
                      <CardContent><p className="text-muted-foreground">{t("solution_text")}</p></CardContent>
                  </Card>
              </div>
          </div>
      </section>

      {/* Features section (Краткий обзор) */}
      <section className="py-16 md:py-20 bg-muted border-t border-b border-border">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-10 text-center">{t("features_title")}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Используем данные из currentContent */}
                  {displayedFeatures.map((feature) => (
                      <Card key={feature.id} className="bg-card border-border shadow-sm h-full flex flex-col">
                          <CardHeader>
                              <div className="flex items-center gap-3">
                                  <span className="text-primary">{iconMap[feature.icon] || iconMap.Default}</span>
                                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                              </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
              <div className="mt-12 text-center">
                   <Button asChild variant="outline" className="bg-card border-border hover:bg-accent">
                      <Link href="/features">
                          {t("view_all_features")}
                          <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
          </div>
      </section>

       {/* How it works section */}
      <section className="py-16 md:py-20">
           <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold mb-10 text-center">{t("how_it_works_title")}</h2>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[1, 2, 3, 4].map((step) => (
                       <Card key={step} className="bg-card border-border shadow-sm text-center md:text-left">
                          <CardHeader>
                              <CardTitle className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">{step}</div>
                                  <span className="text-lg font-semibold">{t(`step${step}_title`)}</span>
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground">{t(`step${step}_text`)}</p>
                          </CardContent>
                       </Card>
                  ))}
              </div>
              <div className="mt-12 text-center">
                  <Button asChild variant="outline" className="bg-card border-border hover:bg-accent">
                      <Link href="/setup">
                         {t("setup_title")}
                          <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
           </div>
      </section>

      {/* Examples section (Личности) */}
      <section className="py-16 md:py-20 bg-muted border-t border-b border-border">
          <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold mb-10 text-center">{t("examples_title")}</h2>
               <div className="grid md:grid-cols-2 gap-8">
                   {/* Используем данные из currentContent */}
                   {displayedExamples.map((example) => (
                       <Card key={example.id} className="bg-card border-border shadow-sm h-full">
                          <CardHeader>
                              <CardTitle className="text-xl font-semibold">{example.personality}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                                  {example.content}
                              </pre>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

       {/* Privacy section (Кратко) */}
       <section className="py-16 md:py-20">
           <div className="container mx-auto px-4 max-w-3xl">
               <Card className="bg-card border-border shadow-md">
                   <CardHeader><CardTitle className="text-xl font-semibold">{t("privacy_title")}</CardTitle></CardHeader>
                   <CardContent>
                      <p className="text-muted-foreground mb-6">{t("privacy_text")}</p>
                      <Button asChild variant="outline" className="bg-card border-border hover:bg-accent">
                          <Link href="/privacy">
                             {t("privacy_policy_title")} <ChevronRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </CardContent>
              </Card>
          </div>
      </section>

       {/* Final CTA section */}
       <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold mb-4">
                   {t('final_cta_title')}
              </h2>
               <p className="mb-8 max-w-xl mx-auto text-lg text-indigo-100">
                  {t('final_cta_text')}
              </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                     <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                       {t("cta_button")}
                     </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 shadow-lg backdrop-blur-sm">
                      <Link href="/setup">
                          {t('final_cta_setup_button')}
                      </Link>
                  </Button>
              </div>
          </div>
      </section>

    </div> // Конец обертки страницы
  );
}