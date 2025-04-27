// src/client/api.ts

// Типы данных, соответствующие ожидаемым от API
export type ContentItem = { id: string; key: string; valueRu: string; valueEn: string; };
export type Feature = { id: string; titleRu: string; titleEn: string; descriptionRu: string; descriptionEn: string; icon: string; order: number; };
export type Example = { id: string; personalityRu: string; personalityEn: string; contentRu: string; contentEn: string; order: number; };

export interface ApiData {
  content: ContentItem[];
  features: Feature[];
  examples: Example[];
}

// Функция для получения данных с нашего же API
async function getContent(): Promise<ApiData> {
  const response = await fetch('/api/content'); // Относительный путь к API Route
  if (!response.ok) {
    throw new Error(`Failed to fetch API data: ${response.statusText}`);
  }
  return await response.json();
}

// Экспортируем клиент
export const apiClient = {
  getContent,
};

// Тестовый код из вашего api.ts можно оставить здесь или перенести в отдельный тестовый файл
// Но его НЕ НУЖНО экспортировать в apiClient
// async function _runApiTests() { ... }