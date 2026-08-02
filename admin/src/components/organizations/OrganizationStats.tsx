"use client";

import {
    Users,
    Bot,
    Database,
    Eye,
    Target,
    MessageSquare,
} from "lucide-react";

interface Props {
    stats: {
        users: number;
        chatbots: number;
        knowledgeBases: number;
        visitors: number;
        leads: number;
        conversations: number;
    };
}

export default function OrganizationStats({
    stats,
}: Props) {

    const cards = [

        {
            title: "Users",
            value: stats.users,
            icon: Users,
            color: "bg-blue-100 text-blue-600",
        },

        {
            title: "Chatbots",
            value: stats.chatbots,
            icon: Bot,
            color: "bg-violet-100 text-violet-600",
        },

        {
            title: "Knowledge Bases",
            value: stats.knowledgeBases,
            icon: Database,
            color: "bg-amber-100 text-amber-600",
        },

        {
            title: "Visitors",
            value: stats.visitors,
            icon: Eye,
            color: "bg-green-100 text-green-600",
        },

        {
            title: "Leads",
            value: stats.leads,
            icon: Target,
            color: "bg-red-100 text-red-600",
        },

        {
            title: "Conversations",
            value: stats.conversations,
            icon: MessageSquare,
            color: "bg-cyan-100 text-cyan-600",
        },

    ];

    return (

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="
                            rounded-2xl
                            border
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:shadow-md
                            "
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
                                    className={`
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${card.color}
                                    `}
                                >

                                    <Icon className="h-7 w-7" />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}