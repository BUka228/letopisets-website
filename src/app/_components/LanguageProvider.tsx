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
import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiData, ContentItem, Feature, Example } from "~/client/api"; // Убедитесь, что типы экспортируются из клиента API
import {
  BookOpen,
  UserCircle,
  Image,
  BarChart,
  Settings,
  LucideProps,
} from "lucide-react"; // Импортируем иконки и базовый тип

// --- Типы данных ---
// Можно вынести в отдельный файл src/types.ts

export type Language = "ru" | "en";

// Типы ContentItem, Feature, Example импортируются из клиента API

// --- Карта иконок ---
// Экспортируем, чтобы можно было использовать на страницах
export const iconMap: Record<string, React.ReactElement<LucideProps>> = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  UserCircle: <UserCircle className="h-6 w-6" />,
  Image: <Image className="h-6 w-6" />,
  BarChart: <BarChart className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
  // Добавьте другие иконки, если они используются в ваших данных Feature
  Default: <BookOpen className="h-6 w-6" />, // Иконка по умолчанию
};

// --- Тип для значения Контекста ---
interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: (key: string, fallback?: string) => string; // Добавим опциональный fallback
  content: ContentItem[];
  features: Feature[];
  examples: Example[];
  isLoadingContent: boolean; // Добавим флаг загрузки
  contentError: unknown; // Добавим информацию об ошибке
}

// --- Создание Контекста с начальными значениями ---
const LanguageContext = createContext<LanguageContextType>({
  language: "en", // Начальное значение по умолчанию
  setLanguage: () => {
    console.warn("setLanguage called outside of LanguageProvider");
  },
  t: (key, fallback) => fallback ?? `[${key}]`, // По умолчанию возвращает ключ или fallback
  content: [],
  features: [],
  examples: [],
  isLoadingContent: true, // Начинаем в состоянии загрузки
  contentError: null,
});

// --- Компонент Провайдера ---
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en"); // Начнем с 'en', useEffect обновит

  // Загрузка языка из localStorage или по браузеру при монтировании
  useEffect(() => {
    let initialLang: Language = "en"; // Значение по умолчанию
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage === "ru" || savedLanguage === "en") {
      initialLang = savedLanguage;
    } else {
      // Проверяем navigator только на клиенте
      if (typeof window !== "undefined") {
        const browserLang = navigator.language.toLowerCase();
        initialLang = browserLang.startsWith("ru") ? "ru" : "en";
      }
    }
    setLanguage(initialLang);
  }, []); // Пустой массив зависимостей - выполнится один раз

  // Сохранение языка в localStorage при изменении
  useEffect(() => {
    // Сохраняем только если язык уже был установлен (избегаем сохранения дефолтного 'en' до гидратации)
     if (language) {
      localStorage.setItem("preferredLanguage", language);
     }
  }, [language]);

  // Запрос данных контента с помощью React Query
  const {
    data,
    isLoading: isLoadingContent,
    error: contentError,
  } = useQuery<ApiData>({
    queryKey: ["websiteContent"],
    queryFn: apiClient.getContent,
    // Опции React Query v5:
    staleTime: 1000 * 60 * 60,           // Считать данные свежими 1 час
    gcTime: 1000 * 60 * 60 * 24,        // ЗАМЕНА: Время хранения в кеше (ранее cacheTime) 24 часа
    refetchOnWindowFocus: false,        // Не перезапрашивать при фокусе окна
    retry: 1,                           // Попробовать перезапросить 1 раз при ошибке
  }); 

  // Подготовка данных (или пустые массивы, если данных нет)
  const content = data?.content || [];
  const features = data?.features || [];
  const examples = data?.examples || [];

  // Функция перевода
  const t = (key: string, fallback?: string): string => {
    // Не ищем перевод, пока контент загружается
    if (isLoadingContent) return fallback ?? "..."; // Показываем троеточие или fallback во время загрузки

    const item = content.find((c) => c.key === key);
    if (!item) {
      console.warn(`Translation key not found: "${key}"`);
      return fallback ?? `[${key}]`; // Возвращаем fallback или ключ для отладки
    }
    // Проверяем наличие нужного языка перед возвратом
    if (language === "ru" && item.valueRu !== undefined && item.valueRu !== null) {
       return item.valueRu;
    }
     if (language === "en" && item.valueEn !== undefined && item.valueEn !== null) {
        return item.valueEn;
     }
     // Если для текущего языка значение пустое, пытаемся вернуть fallback или ключ
     console.warn(`Translation value missing for key: "${key}" in language: "${language}"`);
     return fallback ?? `[${key}]`;
  };

  // --- Обертка для QueryClientProvider ---
  // Обычно QueryClient создается выше и передается сюда,
  // но для простоты примера предположим, что он уже есть в RootLayout
  // Если нет, нужно создать queryClient и обернуть <LanguageContext.Provider> в <QueryClientProvider client={queryClient}>

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        content,
        features,
        examples,
        isLoadingContent,
        contentError,
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}