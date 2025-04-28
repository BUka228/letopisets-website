// src/app/_components/LanguageProvider.tsx (Версия БЕЗ Базы Данных)
"use client"; // Обязательно для хуков useState, useEffect, useContext и localStorage

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
// --- ИМПОРТ СТАТИЧЕСКОГО КОНТЕНТА ---
import { ruContent } from '~/content/ru'; // Путь к вашему русскому контенту
import { enContent } from '~/content/en'; // Путь к вашему английскому контенту
import type { ContentData, ExampleData, FaqItem, FeatureData } from '~/content/types'; // Путь к вашим типам
// --- КОНЕЦ ИМПОРТА КОНТЕНТА ---

// Импорты иконок (остаются)
import {
  BookOpen,
  UserCircle,
  Image,
  BarChart,
  Settings,
  LucideProps,
} from "lucide-react";

// --- Тип языка ---
export type Language = "ru" | "en";

// --- Карта иконок ---
export const iconMap: Record<string, React.ReactElement<LucideProps>> = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  UserCircle: <UserCircle className="h-6 w-6" />,
  Image: <Image className="h-6 w-6" />,
  BarChart: <BarChart className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
  Default: <BookOpen className="h-6 w-6" />,
};

// --- Тип для значения Контекста ---
interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: (key: keyof ContentData | string, fallback?: string) => any; // Ключ может быть из ContentData
  // Предоставляем весь объект контента для текущего языка
  currentContent: ContentData;
}

// --- Создание Контекста с начальными значениями ---
// ВАЖНО: начальное значение currentContent должно быть одним из реальных объектов контента
const LanguageContext = createContext<LanguageContextType>({
  language: "en", // Начинаем с английского
  setLanguage: () => {
    console.warn("setLanguage called outside of LanguageProvider");
  },
  t: (key, fallback) => fallback ?? `[${key}]`,
  currentContent: enContent, // Используем enContent как начальное значение
});

// --- Компонент Провайдера ---
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Начальное состояние

  // Эффект для загрузки языка из localStorage или определения по браузеру
  useEffect(() => {
    let initialLang: Language = "en";
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage === "ru" || savedLanguage === "en") {
      initialLang = savedLanguage;
    } else {
      if (typeof window !== "undefined") {
        const browserLang = navigator.language.toLowerCase();
        initialLang = browserLang.startsWith("ru") ? "ru" : "en";
      }
    }
    // Устанавливаем язык только если он отличается от начального,
    // чтобы избежать лишнего ререндера при гидратации
    if (initialLang !== language) {
        setLanguage(initialLang);
    }
  }, []); // Пустой массив зависимостей - выполнится один раз при монтировании

  // Эффект для сохранения языка в localStorage при его изменении
  useEffect(() => {
    // Сохраняем только если язык не равен начальному 'en' ИЛИ если он уже был загружен
    // (простая проверка, чтобы не сохранять дефолтное значение до первой установки)
    if (language !== 'en' || localStorage.getItem("preferredLanguage")) {
       localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);

  // --- УБРАЛИ useQuery ---

  // Выбираем нужный объект контента на основе текущего языка
  const currentContent = language === 'ru' ? ruContent : enContent;

  // --- Функция перевода (работает с currentContent) ---
  const t = (key: string, fallback?: string): string | FaqItem[] | FeatureData[] | ExampleData[] | undefined => {
    // Проверяем, является ли ключ валидным ключом интерфейса ContentData
    // Используем утверждение типа (type assertion) 'as keyof ContentData'
    if (key in currentContent) {
      // Утверждаем, что key - это ключ ContentData, чтобы получить доступ
      const value = currentContent[key as keyof ContentData];

      // Возвращаем значение, если оно определено и не null
      // Если null или undefined, возвращаем fallback (если есть), иначе undefined
      return (value !== undefined && value !== null) ? value : fallback;
    }

    // Если ключ не найден
    console.warn(`Translation key not found: "${key}" for language "${language}"`);
    // Возвращаем fallback (если есть), иначе undefined
    return fallback;
  };
  // --- Конец функции перевода ---

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentContent, // Передаем весь актуальный объект контента
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// --- Пользовательский Хук для использования Контекста ---
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Эта ошибка не должна возникать, если вы правильно обернули приложение в LanguageProvider
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}