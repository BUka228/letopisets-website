// src/app/features/page.tsx
"use client";
import React from "react";
import { useLanguage, iconMap } from "../_components/LanguageProvider"; // Путь к вашим компонентам
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function FeaturesPage() {
  // Получаем весь объект контента
  const { currentContent } = useLanguage();
  // Берем фичи из объекта
  const features = currentContent.features || [];

  return (
    <div className="bg-muted border-t border-b border-border">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {currentContent.features_title || "Key Features"}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {features.length > 0 ? (
              features.map((feature) => (
               <Card key={feature.id} className="bg-card border-border shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300">
                   <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-primary">
                          {iconMap[feature.icon] || iconMap.Default}
                        </span>
                        <CardTitle className="text-xl font-semibold">
                          {feature.title} {/* Используем напрямую */}
                        </CardTitle>
                      </div>
                  </CardHeader>
                   <CardContent className="flex-grow">
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description} {/* Используем напрямую */}
                      </p>
                  </CardContent>
               </Card>
              ))
          ) : (
              <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3 py-10">
                 {currentContent.faq_loading_or_error || 'Features not loaded yet...'}
              </p>
          )}
        </div>
      </div>
    </div>
  );
}