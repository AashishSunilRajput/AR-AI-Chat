"use client";

import {

    ResponsiveContainer,

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip

} from "recharts";

interface TrendData {

    month: string;

    count: number;

}

interface MonthlyTrendChartProps {

    title: string;

    data: TrendData[];

}

export default function MonthlyTrendChart({

    title,

    data

}: MonthlyTrendChartProps) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white p-6">

            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}

            <div className="mb-6">

                <h2 className="text-lg font-semibold text-slate-900">

                    {title}

                </h2>

                <p className="text-sm text-slate-500">

                    Last 6 Months

                </p>

            </div>

            {/* ========================================== */}
            {/* Chart */}
            {/* ========================================== */}

            <div className="h-80 w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={data}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis
                            allowDecimals={false}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#2563EB"
                            strokeWidth={3}
                            dot={{
                                r: 5
                            }}
                            activeDot={{
                                r: 7
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}