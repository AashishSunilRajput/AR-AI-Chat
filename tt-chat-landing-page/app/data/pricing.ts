import type { PricingPlan } from "../types/landing";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹1,499",
    description:
      "Perfect for small businesses starting with AI-powered customer support.",
    features: [
      "1 website",
      "1 AI chatbot",
      "Up to 1,000 conversations/month",
      "Knowledge base",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "₹3,499",
    description:
      "For growing businesses that need higher usage, lead capture and better insights.",
    features: [
      "1 website",
      "1 AI chatbot",
      "Up to 5,000 conversations/month",
      "Knowledge base",
      "Lead capture",
      "Advanced analytics",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "For businesses with higher traffic, custom integrations and advanced requirements.",
    features: [
      "1 website",
      "1 AI chatbot",
      "Higher conversation limits",
      "Advanced knowledge base",
      "Custom integrations",
      "Dedicated onboarding",
      "Priority support",
    ],
  },
];