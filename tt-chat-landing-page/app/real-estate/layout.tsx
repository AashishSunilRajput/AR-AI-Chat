import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UrbanNest Realty | Find Your Dream Property",
  description:
    "Explore premium residential and commercial properties with UrbanNest Realty. Search properties, schedule visits, and connect with our real estate experts.",
  keywords: ["real estate", "properties for sale", "properties for rent", "Vadodara real estate", "UrbanNest Realty"],
  openGraph: {
    type: "website",
    title: "UrbanNest Realty | Find Your Dream Property",
    description: "Explore premium homes, apartments, and commercial properties with trusted real estate experts.",
  },
};

export default function RealEstateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
