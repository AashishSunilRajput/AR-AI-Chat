"use client";

import {
    Brain,
    Cpu,
    Database,
    Hash
} from "lucide-react";

interface EmbeddingStatsProps {

    totalEmbeddings: number;

    totalTokens: number;

    provider: string;

    model: string;

}

export default function EmbeddingStats({

    totalEmbeddings,

    totalTokens,

    provider,

    model

}: EmbeddingStatsProps) {

    const cards = [

        {
            title: "Total Embeddings",
            value: totalEmbeddings,
            icon: Brain,
            color: "text-violet-600",
            bg: "bg-violet-100"
        },

        {
            title: "Provider",
            value: provider,
            icon: Database,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },

        {
            title: "Model",
            value: model,
            icon: Cpu,
            color: "text-green-600",
            bg: "bg-green-100"
        },

        {
            title: "Total Tokens",
            value: totalTokens.toLocaleString(),
            icon: Hash,
            color: "text-orange-600",
            bg: "bg-orange-100"
        }

    ];

    return (

        <div
            className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

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
                            "

                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                        "
                                    >

                                        {card.title}

                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            break-all
                                        "
                                    >

                                        {card.value}

                                    </h3>

                                </div>

                                <div
                                    className={`
                                        ${card.bg}
                                        rounded-xl
                                        p-3
                                    `}
                                >

                                    <Icon
                                        size={24}
                                        className={card.color}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}