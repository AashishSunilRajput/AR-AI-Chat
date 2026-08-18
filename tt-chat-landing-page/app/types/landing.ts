import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type IndustryItem = {
  name: string;
  icon: LucideIcon;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type DemoFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
  teamSize: string;
  details: string;
};

export type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
