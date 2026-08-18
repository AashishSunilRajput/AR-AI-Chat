import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TT Chat | AI Customer Support & Lead Generation",
  description:
    "TT Chat helps businesses train AI chatbots with documents, websites, and FAQs to answer customer questions, capture leads, and support visitors 24/7.",
  keywords: [
    "TT Chat",
    "AI chatbot",
    "AI customer support",
    "lead generation chatbot",
    "website chatbot",
    "business AI chatbot",
  ],
  icons: {
    icon: "/tt-chat-icon.png",
    shortcut: "/tt-chat-icon.png",
    apple: "/tt-chat-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
