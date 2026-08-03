"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend
} from "recharts";

interface Props {

    analytics: {

        leads: any[];

        conversations: any[];

    };

}

export default function AnalyticsChart({

    analytics

}: Props) {

    const chartData =
        analytics.leads.map((lead: any) => {

            const conversation =
                analytics.conversations.find(
                    (item: any) =>
                        item.month === lead.month
                );

            return {

                month: lead.month,

                leads: Number(lead.total),

                conversations: Number(
                    conversation?.total || 0
                )

            };

        });

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                Monthly Analytics

            </h3>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart
                    data={chartData}
                >

                    <defs>

                        <linearGradient
                            id="leadColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#2563eb"
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="95%"
                                stopColor="#2563eb"
                                stopOpacity={0}
                            />

                        </linearGradient>

                        <linearGradient
                            id="conversationColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#10b981"
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="95%"
                                stopColor="#10b981"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#2563eb"
                        fill="url(#leadColor)"
                        strokeWidth={3}
                    />

                    <Area
                        type="monotone"
                        dataKey="conversations"
                        stroke="#10b981"
                        fill="url(#conversationColor)"
                        strokeWidth={3}
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}