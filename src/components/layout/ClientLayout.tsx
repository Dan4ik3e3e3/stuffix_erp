'use client';

import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from "next/font/google";

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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
} 