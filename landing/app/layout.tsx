import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TT AI Chat | AI Chatbot for Modern Businesses",
  description:
    "TT AI Chat helps businesses train AI chatbots with documents, websites, and FAQs to capture leads and support customers 24/7.",
  keywords: ["AI chatbot", "customer support", "lead generation", "SaaS landing page"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
