import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Portfolio Showcase | Modern Pinterest-Style Grid",
  description: "A modern Pinterest-inspired portfolio platform built with Next.js 15, MongoDB, and Cloudinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
