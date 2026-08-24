"use client";

import { useState } from "react";
import {
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    Hash,
} from "lucide-react";

import ChunkStatusBadge from "./ChunkStatusBadge";
import { KnowledgeChunk } from "@/services/knowledge-chunk.service";

interface ChunkCardProps {
    chunk: KnowledgeChunk;
}

export default function ChunkCard({
    chunk,
}: ChunkCardProps) {

   const {
    chunkIndex,
    content = "",
    tokenCount = 0,
} = chunk;

const generated = (chunk.embeddings?.length ?? 0) > 0;

    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(content);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        } catch (error) {

            console.error("Copy failed:", error);

        }

    };

    const previewLength = 350;

    const shouldTruncate =
        content.length > previewLength;

    const displayContent =
        expanded || !shouldTruncate
            ? content
            : content.substring(0, previewLength) + "...";

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

                        <Hash
                            size={18}
                            className="text-blue-600"
                        />

                        <h3
                            className="
                                text-lg
                                font-semibold
                            "
                        >
                            Chunk #{chunkIndex}
                        </h3>

                    </div>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Tokens : {tokenCount}
                    </p>

                </div>

                <ChunkStatusBadge
                    generated={generated}
                />

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
                    {displayContent}
                </p>

            </div>

            {/* Footer */}

            <div
                className="
                    mt-5
                    flex
                    items-center
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

                    shouldTruncate && (

                        <button

                            onClick={() =>
                                setExpanded(!expanded)
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