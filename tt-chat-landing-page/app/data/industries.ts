import {
  BrainCircuit,
  Building2,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Landmark,
  Store,
  Zap,
} from "lucide-react";
import type { IndustryItem } from "../types/landing";

export const industries: IndustryItem[] = [
  { name: "Hospitals", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Restaurant", icon: Store },
  { name: "Hotels", icon: Building2 },
  { name: "Real Estate", icon: Landmark },
  { name: "Finance", icon: BrainCircuit },
  { name: "Law Firms", icon: ClipboardList },
  { name: "Manufacturing", icon: Zap },
  { name: "Restaurants", icon: Store },
];
