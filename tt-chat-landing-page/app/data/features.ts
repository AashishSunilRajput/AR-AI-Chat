import {
  Database,
  MessagesSquare,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { FeatureItem } from "../types/landing";

export const features: FeatureItem[] = [
  {
    icon: Database,
    title: "Knowledge Base",
    description: "Train the assistant from PDFs, websites, FAQs, and internal documents in minutes.",
  },
  {
    icon: Sparkles,
    title: "Lead Generation",
    description: "Capture qualified leads automatically while answering questions in real time.",
  },
  {
    icon: MessagesSquare,
    title: "Live Chat",
    description: "Offer instant 24/7 support with a smooth, branded chat experience for visitors.",
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Understand intent, drop-off points, and conversion opportunities from one dashboard.",
  },
  {
  icon: MonitorSmartphone,
  title: "Website Integration",
  description:
    "Add your AI chatbot to your website with a simple integration and provide instant support to visitors.",
},
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Enterprise-grade privacy controls, role-based access, and safe content handling.",
  },
];
