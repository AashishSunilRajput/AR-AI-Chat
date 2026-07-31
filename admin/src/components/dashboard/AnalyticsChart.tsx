"use client";

import {

    ResponsiveContainer,

    AreaChart,

    Area,

    CartesianGrid,

    Tooltip,

    XAxis,

    YAxis

} from "recharts";

const data = [

    { day: "Mon", conversations: 40 },

    { day: "Tue", conversations: 65 },

    { day: "Wed", conversations: 52 },

    { day: "Thu", conversations: 91 },

    { day: "Fri", conversations: 110 },

    { day: "Sat", conversations: 82 },

    { day: "Sun", conversations: 130 }

];

export default function AnalyticsChart() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                Weekly Conversations

            </h3>

            <ResponsiveContainer

                width="100%"

                height={320}

            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient

                            id="color"

                            x1="0"

                            y1="0"

                            x2="0"

                            y2="1"

                        >

                            <stop

                                offset="5%"

                                stopColor="#2563eb"

                                stopOpacity={0.4}

                            />

                            <stop

                                offset="95%"

                                stopColor="#2563eb"

                                stopOpacity={0}

                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Area

                        type="monotone"

                        dataKey="conversations"

                        stroke="#2563eb"

                        fill="url(#color)"

                        strokeWidth={3}

                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}