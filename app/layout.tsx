'use client';

import Navigation from '@/components/Navigation';
import FinanceContextProvider from '@/lib/store/finance-context';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FinanceContextProvider>
          <Navigation />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
