// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welth",
  description: "One stop finance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  afterSignOutUrl="/">
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-white">{children}</main>
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>made with love by Sudharshan</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
