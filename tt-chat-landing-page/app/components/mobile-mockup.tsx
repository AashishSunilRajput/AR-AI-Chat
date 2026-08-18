import Image from "next/image";

type MobileMockupProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
};

export function MobileMockup({ src, alt, title, className = "" }: MobileMockupProps) {
  return (
    <div className={`mx-auto w-full max-w-[280px] rounded-[34px] border border-slate-200 bg-slate-950 p-2 shadow-[0_35px_90px_-30px_rgba(15,23,42,0.5)] ${className}`}>
      <div className="rounded-[30px] border border-slate-800 bg-white p-2">
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-20 rounded-full bg-slate-200" />
        </div>
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
          <Image src={src} alt={alt} width={800} height={1400} className="h-full w-full object-cover" />
        </div>
        {title ? <p className="mt-3 text-center text-sm font-medium text-slate-600">{title}</p> : null}
      </div>
    </div>
  );
}
