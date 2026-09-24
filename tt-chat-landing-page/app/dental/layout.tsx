import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmileCare Dental Clinic | Modern Dental Care",
  description:
    "SmileCare Dental Clinic provides modern dental care, cosmetic dentistry, implants, orthodontics, and personalized treatment for you and your family.",
  keywords: ["dental clinic", "cosmetic dentistry", "dental implants", "orthodontics", "SmileCare Dental Clinic"],
  openGraph: {
    type: "website",
    title: "SmileCare Dental Clinic | Modern Dental Care",
    description: "Modern, compassionate dental care for you and your family.",
  },
};

export default function DentalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
