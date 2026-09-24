import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertex Precision Industries | Precision Manufacturing Solutions",
  description:
    "Vertex Precision Industries provides precision manufacturing, CNC machining, fabrication, custom components, and engineering solutions for global industries.",
  keywords: ["CNC machining", "precision manufacturing", "industrial components", "sheet metal fabrication", "engineering solutions"],
  openGraph: {
    type: "website",
    title: "Vertex Precision Industries | Precision Manufacturing Solutions",
    description: "Precision-engineered components and manufacturing solutions for demanding industries.",
  },
};

export default function ManufacturingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
