"use client";

type Stat = {
    title: string;
    value: string | number;
    subtitle?: string;
};

interface AnalyticsStatsProps {
    title: string;
    stats: Stat[];
}

export default function AnalyticsStats({

    title,

    stats

}: AnalyticsStatsProps) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white">

            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-4">

                <h2 className="text-lg font-semibold text-slate-900">

                    {title}

                </h2>

            </div>

            {/* Body */}

            <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-3 xl:grid-cols-5">

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >

                        <p className="text-sm text-slate-500">

                            {item.title}

                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-slate-900">

                            {item.value}

                        </h3>

                        {item.subtitle && (

                            <p className="mt-1 text-xs text-slate-500">

                                {item.subtitle}

                            </p>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}