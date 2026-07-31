"use client";

import { useState } from "react";

import {
    Brain,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    Database,
    Hash
} from "lucide-react";

import { Embedding } from "@/services/embedding.service";

interface EmbeddingCardProps {

    embedding: Embedding;

}

export default function EmbeddingCard({

    embedding

}: EmbeddingCardProps) {

    const [expanded, setExpanded] =
        useState(false);

    const [copied, setCopied] =
        useState(false);

    const content =
        embedding.chunk?.content || "";

    const handleCopy = async () => {

        await navigator.clipboard.writeText(
            content
        );

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };

    return (

        <div
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

            {/* Header */}

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Brain
                            size={20}
                            className="text-violet-600"
                        />

                        <h3
                            className="
                                text-lg
                                font-semibold
                            "
                        >

                            Chunk #

                            {

                                embedding.chunk?.chunkIndex ?? "-"

                            }

                        </h3>

                    </div>

                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            gap-2
                        "
                    >

                        <span
                            className="
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-blue-700
                            "
                        >

                            <Database
                                size={12}
                                className="inline mr-1"
                            />

                            {embedding.provider}

                        </span>

                        <span
                            className="
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-green-700
                            "
                        >

                            {embedding.model}

                        </span>

                        <span
                            className="
                                rounded-full
                                bg-orange-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-orange-700
                            "
                        >

                            <Hash
                                size={12}
                                className="inline mr-1"
                            />

                            {embedding.tokenCount} Tokens

                        </span>

                    </div>

                </div>

                <div
                    className="
                        text-sm
                        text-slate-500
                    "
                >

                    {

                        new Date(
                            embedding.createdAt
                        ).toLocaleDateString()

                    }

                </div>

            </div>

            {/* Content */}

            <div
                className="
                    mt-5
                    rounded-xl
                    bg-slate-50
                    p-4
                "
            >

                <p
                    className="
                        whitespace-pre-wrap
                        text-sm
                        leading-7
                        text-slate-700
                    "
                >

                    {

                        expanded

                            ?

                            content

                            :

                            content.length > 250

                                ?

                                content.substring(
                                    0,
                                    250
                                ) + "..."

                                :

                                content

                    }

                </p>

            </div>

            {/* Footer */}

            <div
                className="
                    mt-5
                    flex
                    flex-wrap
                    gap-3
                "
            >

                <button

                    onClick={handleCopy}

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:bg-slate-100
                    "

                >

                    {

                        copied

                            ?

                            <Check size={16} />

                            :

                            <Copy size={16} />

                    }

                    {

                        copied

                            ?

                            "Copied"

                            :

                            "Copy"

                    }

                </button>

                {

                    content.length > 250 && (

                        <button

                            onClick={() =>
                                setExpanded(
                                    !expanded
                                )
                            }

                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                px-4
                                py-2
                                text-sm
                                transition
                                hover:bg-slate-100
                            "

                        >

                            {

                                expanded

                                    ?

                                    <ChevronUp size={16} />

                                    :

                                    <ChevronDown size={16} />

                            }

                            {

                                expanded

                                    ?

                                    "Show Less"

                                    :

                                    "Show More"

                            }

                        </button>

                    )

                }

            </div>

        </div>

    );

}