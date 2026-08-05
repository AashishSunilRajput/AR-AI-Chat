"use client";

import {

    Bell,

    BellRing,

    CheckCircle

} from "lucide-react";

import { NotificationStats as NotificationStatsType } from "@/services/notification.service";

interface Props {

    stats: NotificationStatsType;

}

export default function NotificationStats({

    stats

}: Props) {

    const cards = [

        {

            title: "Total Notifications",

            value: stats.total,

            icon: Bell,

            color: "bg-blue-100 text-blue-600"

        },

        {

            title: "Unread",

            value: stats.unread,

            icon: BellRing,

            color: "bg-amber-100 text-amber-600"

        },

        {

            title: "Read",

            value: stats.read,

            icon: CheckCircle,

            color: "bg-green-100 text-green-600"

        }

    ];

    return (

        <div className="grid gap-6 md:grid-cols-3">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div

                            key={card.title}

                            className="rounded-xl border bg-white p-6 shadow-sm"

                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">

                                        {card.title}

                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">

                                        {card.value}

                                    </h2>

                                </div>

                                <div

                                    className={`rounded-xl p-3 ${card.color}`}

                                >

                                    <Icon className="h-6 w-6" />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}