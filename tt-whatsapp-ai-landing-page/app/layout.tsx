import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatsapp.tomartechworks.com"),
  title: "TT WhatsApp AI | WhatsApp AI Agent",
  description: "Turn WhatsApp conversations into automated customer experiences with business knowledge, lead qualification, and human handover.",
  keywords: ["WhatsApp AI", "WhatsApp AI Agent", "AI WhatsApp chatbot", "WhatsApp automation", "WhatsApp lead generation"],
  authors: [{ name: "Tomar Techworks", url: "https://tomartechworks.com" }],
  creator: "Tomar Techworks",
  alternates: { canonical: "https://whatsapp.tomartechworks.com/" },
  openGraph: {
    type: "website",
    url: "https://whatsapp.tomartechworks.com/",
    siteName: "TT WhatsApp AI",
    title: "TT WhatsApp AI | WhatsApp AI Agent",
    description: "A focused workspace for WhatsApp conversations, business knowledge, lead qualification, and human handover.",
  },
  twitter: { card: "summary_large_image", title: "TT WhatsApp AI | WhatsApp AI Agent", description: "A focused workspace for smarter WhatsApp customer conversations." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
