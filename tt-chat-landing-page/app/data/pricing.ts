import type { PricingPlan } from "../types/landing";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams launching their first AI assistant.",
    features: ["1 chatbot", "Up to 5,000 conversations", "Basic analytics", "Email support"],
  },
  {
    name: "Professional",
    price: "$149",
    description: "For growing companies that want richer automation and lead capture.",
    features: ["Unlimited conversations", "Advanced analytics", "Multi-site support", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced security and integration needs.",
    features: ["Security review", "Dedicated onboarding", "Custom integrations", "SLA support"],
  },
];
