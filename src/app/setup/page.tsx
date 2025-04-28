// src/app/setup/page.tsx
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLanguage } from "../_components/LanguageProvider";

export default function SetupPage() {
  const { t, language } = useLanguage();
  const [showQrEnlarged, setShowQrEnlarged] = useState(false);

  const botUsername = t("telegram_bot_username", "LetopisetsChatBot");
  const telegramLink = `https://t.me/${botUsername}?startgroup=true`;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        {t("setup_title", "Setup & Configuration")}
      </h1>
      <p className="text-lg mb-10 text-center text-muted-foreground max-w-2xl mx-auto">{t("setup_intro")}</p>

       {/* Секция с QR и копированием */}
       <div className="flex flex-col items-center mb-16"> {/* Центрируем все содержимое по горизонтали, увеличиваем нижний отступ */}

        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center">
          {t('qr_code_title_centered', language === "ru" ? "Быстрый старт с QR" : "Quick Start with QR")}
        </h2>
        <p className="text-center text-muted-foreground mb-6 max-w-md"> {/* Увеличиваем нижний отступ и максимальную ширину */}
          {t('qr_code_subtitle_centered', language === "ru" ? "Наведите камеру вашего телефона на QR-код, чтобы быстро добавить Летописца Чата в вашу Telegram-группу." : "Point your phone's camera at the QR code to quickly add Chat Chronicler to your Telegram group.")}
        </p>

        {/* Контейнер для QR-кода */}
        <div
          className="bg-white p-4 rounded-lg cursor-pointer mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300 inline-block" // Увеличиваем padding и тень
          onClick={() => setShowQrEnlarged(!showQrEnlarged)}
          title={t('qr_code_enlarge_title', language === 'ru' ? 'Нажмите для увеличения' : 'Click to enlarge')}
        >
          <QRCodeSVG
            value={telegramLink}
            size={showQrEnlarged ? 250 : 160} // Увеличиваем базовый размер
            level="H"
            includeMargin={false} // Убираем лишнюю рамку
            bgColor="#ffffff"
            fgColor="#0B1120" // Темный цвет модулей
          />
        </div>
        <p className="text-sm text-muted-foreground"> {/* Текст подсказки */}
          {t('qr_code_enlarge_hint', language === "ru" ? "(Нажмите для увеличения)" : "(Click to enlarge)")}
        </p>

      </div>


      {/* Пошаговая инструкция */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center"> {/* Увеличен отступ снизу */}
            {t('step_by_step_title', language === 'ru' ? 'Пошаговая инструкция' : 'Step-by-Step Guide')}
        </h2>
        <div className="space-y-6">
          {/* Шаг 1 */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-3">
               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">1</div>
               <span className="text-lg">{t("step1_title")}</span>
            </CardTitle></CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{t("step1_text")}</p>
              <Button asChild size="sm">
                 <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                   {t("cta_button")}
                 </a>
              </Button>
            </CardContent>
          </Card>
          {/* Шаг 2 */}
          <Card className="bg-card border-border shadow-sm">
             <CardHeader><CardTitle className="flex items-center gap-3">
               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">2</div>
                <span className="text-lg">{t("step2_title")}</span>
            </CardTitle></CardHeader>
            <CardContent>
               <p className="mb-4 text-muted-foreground">{t("step2_text")}</p>
               <div className="bg-muted/50 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 text-base">{t("setup_permissions_title")}</h3> {/* Уменьшил h3 */}
                 <p className="text-sm text-muted-foreground">{t("setup_permissions_text")}</p>
              </div>
            </CardContent>
          </Card>
           {/* Шаг 3 */}
          <Card className="bg-card border-border shadow-sm">
             <CardHeader><CardTitle className="flex items-center gap-3">
               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">3</div>
                 <span className="text-lg">{t("step3_title")}</span>
            </CardTitle></CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{t("step3_text")}</p>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg border inline-block">
                 <code className="font-mono text-sm">/story_settings</code>
              </div>
               <p className="text-xs text-muted-foreground mt-2 italic">{t('settings_admin_only', language === 'ru' ? '(Команда доступна только администраторам чата)' : '(Command available only to chat administrators)')}</p> {/* Уменьшил и сделал курсивом */}
            </CardContent>
          </Card>
           {/* Шаг 4 */}
          <Card className="bg-card border-border shadow-sm">
             <CardHeader><CardTitle className="flex items-center gap-3">
               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">4</div>
                 <span className="text-lg">{t("step4_title")}</span>
            </CardTitle></CardHeader>
            <CardContent>
               <p className="text-muted-foreground">{t("step4_text")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}