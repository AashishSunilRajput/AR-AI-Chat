"use client";

import {
    FileText,
    Boxes,
    Brain,
    HardDrive
} from "lucide-react";

interface DocumentStatsProps {

    totalDocuments: number;

    totalChunks: number;

    totalEmbeddings: number;

    totalStorage: string;

}

export default function DocumentStats({

    totalDocuments,

    totalChunks,

    totalEmbeddings,

    totalStorage

}: DocumentStatsProps) {

    const stats = [

        {

            title: "Documents",

            value: totalDocuments,

            icon: FileText,

            color: "text-blue-600",

            bg: "bg-blue-100"

        },

        {

            title: "Chunks",

            value: totalChunks,

            icon: Boxes,

            color: "text-purple-600",

            bg: "bg-purple-100"

        },

        {

            title: "Embeddings",

            value: totalEmbeddings,

            icon: Brain,

            color: "text-green-600",

            bg: "bg-green-100"

        },

        {

            title: "Storage",

            value: totalStorage,

            icon: HardDrive,

            color: "text-orange-600",

            bg: "bg-orange-100"

        }

    ];

    return (

        <div
            className="
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            {

                stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div

                            key={item.title}

                            className="
                                rounded-2xl
                                border
                                bg-white
                                p-5
                                shadow-sm
                            "

                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">

                                        {item.value}

                                    </h2>

                                </div>

                                <div

                                    className={`
                                        rounded-xl
                                        p-3
                                        ${item.bg}
                                    `}

                                >

                                    <Icon

                                        className={item.color}

                                        size={24}

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