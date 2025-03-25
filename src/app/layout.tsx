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
    <html lang="ru" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full antialiased`}>
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
      </body>
    </html>
  );
}
