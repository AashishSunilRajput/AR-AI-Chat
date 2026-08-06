import Image from "next/image";

type BrowserMockupProps = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function BrowserMockup({
  src,
  alt,
  title,
  subtitle,
  className = "",
}: BrowserMockupProps) {
  return (
    <div className={`overflow-hidden rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] ${className}`}>
      <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 h-8 flex-1 rounded-full border border-slate-200 bg-white px-3 text-left text-sm text-slate-400">
            {title ?? "Preview"}
          </div>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            priority={false}
          />
        </div>
      </div>
      {subtitle ? <p className="mt-3 px-1 text-sm text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
