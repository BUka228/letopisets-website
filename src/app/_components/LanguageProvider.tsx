// src/app/_components/LanguageProvider.tsx
"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
// Убрали useQuery и apiClient
import { ruContent } from '~/content/ru';
import { enContent } from '~/content/en';
import type { ContentData } from '~/content/types'; // Импорт типов
import {
  BookOpen,
  UserCircle,
  Image,
  BarChart,
  Settings,
  LucideProps, // Импортируем тип для иконок
} from "lucide-react";

export type Language = "ru" | "en";

// Карта иконок
// Добавляем aria-hidden="true", чтобы скринридеры игнорировали декоративные иконки
// Или можно добавить осмысленный <title> внутрь SVG, если иконка несет смысл
export const iconMap: Record<string, React.ReactElement<LucideProps>> = {
  BookOpen: <BookOpen className="h-6 w-6" aria-hidden="true" />,
  UserCircle: <UserCircle className="h-6 w-6" aria-hidden="true" />,
  Image: <Image className="h-6 w-6" aria-hidden="true" />,
  BarChart: <BarChart className="h-6 w-6" aria-hidden="true" />,
  Settings: <Settings className="h-6 w-6" aria-hidden="true" />,
  Default: <BookOpen className="h-6 w-6" aria-hidden="true" />,
};

// Тип для значения Контекста
interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  // --- ИЗМЕНЕНИЕ: t теперь возвращает только string или undefined ---
  t: (key: string, fallback?: string) => string | undefined;
  // Оставляем currentContent для доступа к массивам
  currentContent: ContentData;
}

// Создание Контекста
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  // --- ИЗМЕНЕНИЕ: Дефолтный t тоже возвращает string | undefined ---
  t: (key, fallback) => fallback ?? undefined,
  currentContent: enContent,
});

// Компонент Провайдера
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Загрузка языка
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
    // Установка языка только при необходимости
     if (initialLang !== language) { // Проверка, чтобы избежать лишнего ререндера
       setLanguage(initialLang);
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Оставляем пустым, т.к. language здесь не нужен и вызовет цикл

  // Сохранение языка
  useEffect(() => {
     if (language) {
       localStorage.setItem("preferredLanguage", language);
     }
  // --- ИСПРАВЛЕН МАССИВ ЗАВИСИМОСТЕЙ ---
  }, [language]); // Добавили language
  // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

  // Выбираем контент
  const currentContent = language === 'ru' ? ruContent : enContent;

  // Функция перевода
  // --- ИСПРАВЛЕН ТИП ВОЗВРАЩАЕМОГО ЗНАЧЕНИЯ и ЛОГИКА t ---
  const t = (key: string, fallback?: string): string | undefined => {
    if (key in currentContent) {
      const value = currentContent[key as keyof ContentData];
      // Проверяем, что значение является строкой
      if (typeof value === 'string') {
        return value; // Возвращаем строку
      } else {
         // Если значение не строка (массив или др.), логируем и возвращаем fallback/undefined
         console.warn(`Value for key "${key}" is not a string.`);
         return fallback;
      }
    }
    console.warn(`Translation key not found: "${key}" for language "${language}"`);
    return fallback;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentContent,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Хук для использования Контекста
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}