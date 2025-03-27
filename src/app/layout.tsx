'use client';

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
      main: '#1e3c72',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
