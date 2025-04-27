"use client"; // Этот компонент будет управлять клиентскими провайдерами

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Важно: Не используйте ReactQueryDevtools в продакшене без необходимости
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LanguageProvider } from './_components/LanguageProvider'; // Укажите правильный путь

// Создаем функцию для безопасного создания QueryClient только один раз
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Отключаем автоматический refetch при монтировании, если не нужно
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        retry: 1, // 1 попытка повтора по умолчанию
        staleTime: 1000 * 60 * 5, // 5 минут по умолчанию staleTime
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: всегда создаем новый клиент
    return makeQueryClient();
  } else {
    // Browser: используем существующий клиент или создаем новый
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}


export function Providers({ children }: { children: ReactNode }) {
  // Получаем или создаем экземпляр QueryClient безопасным способом
  const queryClient = getQueryClient();

  return (
    // Предоставляем queryClient для всего приложения
    <QueryClientProvider client={queryClient}>
      {/* LanguageProvider теперь находится внутри QueryClientProvider */}
      <LanguageProvider>
        {children}
      </LanguageProvider>
      {/* Опционально: Инструменты разработчика для React Query (только в разработке) */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}