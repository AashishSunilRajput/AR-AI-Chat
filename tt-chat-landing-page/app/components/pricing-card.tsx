import { Check } from "lucide-react";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[30px] border p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-2 ${
        highlighted
          ? "border-blue-500 bg-slate-950 text-white shadow-[0_35px_100px_-30px_rgba(37,99,235,0.35)]"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {highlighted ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400" />
      ) : null}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        {highlighted ? (
          <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
            Most Popular
          </span>
        ) : null}
      </div>
      <p className={`mt-5 text-sm leading-7 ${highlighted ? "text-slate-300" : "text-slate-600"}`}>
        {description}
      </p>
      <div className="mt-8 flex items-end gap-2">
        <span className="text-4xl font-semibold">{price}</span>
        <span className={`${highlighted ? "text-slate-400" : "text-slate-500"}`}>/month</span>
      </div>
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className={`mt-0.5 h-4 w-4 ${highlighted ? "text-blue-400" : "text-blue-600"}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          highlighted
            ? "bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            : "bg-slate-900 text-white shadow-sm hover:bg-slate-700"
        } ${highlighted ? "focus-visible:ring-offset-slate-950" : "focus-visible:ring-offset-white"}`}
      >
        Book Demo
      </button>
    </div>
  );
}
