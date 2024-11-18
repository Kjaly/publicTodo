import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

export const metadata = {
  description: 'Тестовое приложение TODO',
  title: 'TODO App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
          <ToastContainer autoClose={3000} position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
