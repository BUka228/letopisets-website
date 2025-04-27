// src/app/features/page.tsx
"use client";

import React from "react";
import { useLanguage, iconMap } from "../_components/LanguageProvider"; // Путь к вашим компонентам
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton"; // Импортируем Skeleton для лоадера

export default function FeaturesPage() {
  // Получаем данные и статус загрузки
  const { t, language, features, isLoadingContent } = useLanguage();

  // Отображение скелетонов во время загрузки
  if (isLoadingContent) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-10 w-1/2 md:w-1/3 mx-auto mb-12" /> {/* Скелетон для заголовка */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => ( // Рендерим 6 скелетонов карточек
            <Card key={index} className="border-border shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-2/4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Отображение реальных данных
  return (
    <div className="bg-muted border-t border-b border-border"> {/* Фон как у секции на главной */}
      <div className="container mx-auto px-4 py-16 md:py-20"> {/* Отступы */}
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t("features_title", "Key Features")} {/* Заголовок страницы */}
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"> {/* items-stretch чтобы карточки были одной высоты */}
          {features.length > 0 ? (
              features.map((feature) => (
               // Каждая фича в отдельной карточке
               <Card key={feature.id} className="bg-card border-border shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300">
                   <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        {/* Иконка фичи */}
                        <span className="text-primary"> {/* Цвет иконки */}
                          {iconMap[feature.icon] || iconMap.Default}
                        </span>
                        {/* Заголовок фичи */}
                        <CardTitle className="text-xl font-semibold">
                          {language === "ru" ? feature.titleRu : feature.titleEn}
                        </CardTitle>
                      </div>
                  </CardHeader>
                   <CardContent className="flex-grow"> {/* Контент занимает оставшееся место */}
                      {/* Описание фичи */}
                      <p className="text-muted-foreground leading-relaxed">
                        {language === "ru" ? feature.descriptionRu : feature.descriptionEn}
                      </p>
                  </CardContent>
               </Card>
              ))
          ) : (
              // Сообщение, если фичи не загружены
              <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3 py-10">
                 {t('features_not_loaded', language === 'ru' ? 'Возможности пока не загружены...' : 'Features not loaded yet...')}
              </p>
          )}
        </div>
      </div>
    </div>
  );
}