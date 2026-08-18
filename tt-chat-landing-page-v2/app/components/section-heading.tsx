import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: SectionHeadingProps) {
  return (
    <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-[2.3rem] lg:text-[2.7rem]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
      {children}
    </div>
  );
}
