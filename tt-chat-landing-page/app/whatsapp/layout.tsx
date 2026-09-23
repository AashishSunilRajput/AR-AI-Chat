import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TT WhatsApp AI | WhatsApp AI Agent for Customer Conversations",
  description:
    "TT WhatsApp AI helps businesses answer customer questions, use their own knowledge, qualify leads, and hand conversations to human teams.",
  keywords: [
    "WhatsApp AI",
    "WhatsApp AI Agent",
    "AI WhatsApp chatbot",
    "WhatsApp automation",
    "WhatsApp lead generation",
    "AI customer support",
  ],
  alternates: { canonical: "https://whatsapp.tomartechworks.com/" },
  openGraph: {
    type: "website",
    url: "https://whatsapp.tomartechworks.com/",
    siteName: "TT WhatsApp AI",
    title: "TT WhatsApp AI | WhatsApp AI Agent",
    description:
      "Connect WhatsApp conversations, business knowledge, AI replies, lead qualification, and human handover in one workspace.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TT WhatsApp AI | WhatsApp AI Agent",
    description: "A product workspace for smarter WhatsApp customer conversations.",
  },
};

export default function WhatsAppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
