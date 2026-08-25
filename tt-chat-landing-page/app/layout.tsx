import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.tomartechworks.com"),

  title: {
    default: "TT AI Chat | AI Customer Support & Lead Generation",
    template: "%s | TT AI Chat",
  },

  description:
    "TT AI Chat helps businesses train AI chatbots with documents, websites, and FAQs to answer customer questions, capture leads, and support visitors 24/7.",

  keywords: [
    "TT AI Chat",
    "AI chatbot",
    "AI customer support",
    "AI lead generation",
    "lead generation chatbot",
    "website chatbot",
    "business AI chatbot",
    "AI chatbot for business",
    "knowledge base chatbot",
  ],

  authors: [
    {
      name: "Tomar Techworks",
      url: "https://tomartechworks.com",
    },
  ],

  creator: "Tomar Techworks",
  publisher: "Tomar Techworks",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://chat.tomartechworks.com/",
  },

  icons: {
    icon: "/tt-chat-icon.png",
    shortcut: "/tt-chat-icon.png",
    apple: "/tt-chat-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://chat.tomartechworks.com/",
    siteName: "TT AI Chat",
    title: "TT AI Chat | AI Customer Support & Lead Generation",
    description:
      "AI-powered customer support and lead generation for your business. Train your chatbot with your own documents, website content and FAQs.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "TT AI Chat | AI Customer Support & Lead Generation",
    description:
      "AI-powered customer support and lead generation for your business.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}