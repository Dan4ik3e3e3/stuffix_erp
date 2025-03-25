import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <Header />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
