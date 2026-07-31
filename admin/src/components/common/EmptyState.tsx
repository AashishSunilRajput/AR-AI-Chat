"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {

    title: string;

    description: string;

}

export default function EmptyState({

    title,

    description

}: EmptyStateProps) {

    return (

        <div

            className="
                rounded-2xl
                border
                bg-white
                p-12
                text-center
                shadow-sm
            "

        >

            <Inbox

                className="
                    mx-auto
                    mb-5
                    text-slate-300
                "

                size={60}

            />

            <h3

                className="
                    text-xl
                    font-semibold
                "

            >

                {title}

            </h3>

            <p

                className="
                    mt-2
                    text-slate-500
                "

            >

                {description}

            </p>

        </div>

    );

}