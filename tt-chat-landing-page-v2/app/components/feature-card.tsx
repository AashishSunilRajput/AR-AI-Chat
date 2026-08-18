import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_35px_90px_-35px_rgba(37,99,235,0.35)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 opacity-90" />
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:gap-3 group-hover:text-blue-600">
        Explore <ArrowUpRight className="h-4 w-4" />
      </div>
    </div>
  );
}
