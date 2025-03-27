'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B3674',
      light: '#4318FF',
    },
    secondary: {
      main: '#A3AED0',
    },
    background: {
      default: '#F4F7FE',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export const metadata: Metadata = {
  title: "Stuffix ERP",
  description: "Эффективное управление персоналом и ресурсами предприятия",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            <div className="min-h-full">
              <Sidebar />
              <div className="lg:pl-72">
                <Header />
                <main className="py-10">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
