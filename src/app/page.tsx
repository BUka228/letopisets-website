// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLanguage, iconMap } from "./_components/LanguageProvider";

export default function HomePage() {
  const { t, language, features, examples, isLoadingContent } = useLanguage();
  const [showQrCode, setShowQrCode] = useState(false);

  // Берем фичи и примеры (можно ограничить slice(0, X))
  const displayedFeatures = features; //.slice(0, 3);
  const displayedExamples = examples; //.slice(0, 4);

  const botUsername = t("telegram_bot_username", "LetopisetsChatBot");
  const telegramLink = `https://t.me/${botUsername}?startgroup=true`;

  const botImageContent = useLanguage().content.find((c) => c.key === "bot_image");
  const botImageUrl = botImageContent
    ? (language === "ru" ? botImageContent.valueRu : botImageContent.valueEn) || '/images/hero-placeholder.png' // Добавим плейсхолдер
    : '/images/hero-placeholder.png';

    // Отображение загрузки
    if (isLoadingContent) {
       return (
         <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"> {/* Центрируем лоадер */}
           <p>{t('loading_content', 'Loading...')}</p> {/* Можно добавить спиннер */}
         </div>
       );
    }

  return (
    <div>
      {/* Hero section */}
      {/* Используем кастомный градиент из tailwind.config */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 bg-gradient-dark">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             {/* Текстовый блок */}
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
             >
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                 {t("hero_title")}
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                 {t("hero_subtitle")}
               </p>
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
                    className="flex items-center gap-2 bg-background/10 border-border hover:bg-background/20" // Стили для outline на темном фоне
                 >
                   <Smartphone className="h-5 w-5" />
                   {t('qr_code_button', language === "ru" ? "QR-код" : "QR Code")}
                 </Button>
               </div>
               {/* QR Code Popup */}
               {showQrCode && (
                  <motion.div
                     key="qrcode" // Ключ для анимации появления/исчезновения
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{ duration: 0.2 }}
                     className="mt-4 p-3 bg-white rounded-lg inline-block shadow-lg"
                   >
                   <QRCodeSVG value={telegramLink} size={128} level="M" includeMargin />
                   <p className="text-center text-xs text-black mt-2 font-medium">
                     {t('qr_code_scan_text', language === "ru" ? "Сканировать для добавления" : "Scan to add bot")}
                   </p>
                  </motion.div>
               )}
             </motion.div>

              {/* Блок с изображением */}
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                 className="flex justify-center md:justify-end" // Выравнивание по правому краю на десктопе
              >
                {/* Используйте next/image для оптимизации, если возможно */}
                <img
                  // Замените на ваше изображение!
                   src={botImageUrl}
                   alt={t('bot_image_alt', "Летописец Чата Демо")}
                   className="max-w-full h-auto rounded-lg shadow-2xl object-contain" // object-contain для сохранения пропорций
                   style={{ maxHeight: '500px' }} // Ограничение высоты
                 />
               </motion.div>
           </div>
         </div>
       </section>

      {/* Остальные секции (Problem/Solution, Features, How it works, Examples, Privacy, Final CTA) */}
       {/* Используйте код для этих секций из файла src/app/page.tsx */}
       {/* в предыдущем моем ответе, применяя классы Tailwind */}
       {/* для соответствия скриншотам (bg-muted, grid, card styling и т.д.) */}

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

        {/* Features section */}
        <section className="py-16 md:py-20 bg-muted border-t border-b border-border">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">{t("features_title")}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedFeatures.map((feature) => (
                        <Card key={feature.id} className="bg-card border-border shadow-sm h-full flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    {iconMap[feature.icon] || iconMap.Default}
                                    <CardTitle className="text-lg font-semibold">
                                        {language === "ru" ? feature.titleRu : feature.titleEn}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">
                                    {language === "ru" ? feature.descriptionRu : feature.descriptionEn}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                     <Button asChild variant="outline" className="bg-card border-border hover:bg-accent">
                        <Link href="/features">
                            {t("view_all_features", language === "ru" ? "Все возможности" : "View All Features")}
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
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">{step}</div>
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
                           {t("setup_title", language === "ru" ? "Инструкция по установке" : "Setup Instructions")}
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
             </div>
        </section>

        {/* Examples section */}
        <section className="py-16 md:py-20 bg-muted border-t border-b border-border">
            <div className="container mx-auto px-4">
                 <h2 className="text-3xl font-bold mb-10 text-center">{t("examples_title")}</h2>
                 <div className="grid md:grid-cols-2 gap-8">
                     {displayedExamples.map((example) => (
                         <Card key={example.id} className="bg-card border-border shadow-sm h-full">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">{language === "ru" ? example.personalityRu : example.personalityEn}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                                    {language === "ru" ? example.contentRu : example.contentEn}
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
         <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-primary-foreground"> {/* Пример градиента */}
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold mb-4">
                     {t('final_cta_title', language === "ru" ? "Готовы попробовать Летописца Чата?" : "Ready to try Chat Chronicler?")}
                </h2>
                 <p className="mb-8 max-w-xl mx-auto text-lg text-indigo-100">
                    {t('final_cta_text', language === "ru" ? "Добавьте бота в свою группу Telegram прямо сейчас и превратите общение в увлекательную хронику!" : "Add the bot to your Telegram group right now and turn communication into an engaging chronicle!")}
                </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                       <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                         {t("cta_button")}
                       </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 shadow-lg backdrop-blur-sm">
                        <Link href="/setup">
                            {t('final_cta_setup_button', language === "ru" ? "Инструкция по установке" : "Setup Instructions")}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

    </div>
  );
}