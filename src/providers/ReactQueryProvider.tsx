'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 минут кеширования
    },
  },
});

// Персист сторадж

// Создание QueryClient
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 2000, // Данные считаются свежими 2 секунды
//       gcTime: 1000 * 60 * 5, // Данные хранятся в кэше 5 минут
//       refetchOnWindowFocus: false, // Не перезапрашивать при фокусе на окне
//       refetchOnReconnect: false, // Не перезапрашивать при переподключении
//     },
//   },
// });
//
// // Проверяем доступность `localStorage` на клиенте
// const createLocalStoragePersister = () => {
//   if (typeof window !== 'undefined') {
//     return createSyncStoragePersister({
//       storage: window.localStorage,
//     });
//   }
//   return null;
// };

export const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // React.useEffect(() => {
  //   const persister = createLocalStoragePersister();
  //   if (persister) {
  //     persistQueryClient({
  //       queryClient,
  //       persister,
  //     });
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
