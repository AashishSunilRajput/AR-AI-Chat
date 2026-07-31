"use client";

import { ArrowLeft, Brain, Boxes } from "lucide-react";

interface ChunkHeaderProps {

    totalChunks: number;

    generating: boolean;

    onBack: () => void;

    onGenerate: () => void;

}

export default function ChunkHeader({

    totalChunks,

    generating,

    onBack,

    onGenerate

}: ChunkHeaderProps) {

    return (

        <div
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
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="flex items-start gap-4">

                    <button

                        onClick={onBack}

                        className="
                            rounded-xl
                            border
                            p-3
                            transition
                            hover:bg-slate-100
                        "

                    >

                        <ArrowLeft size={18} />

                    </button>

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                            "
                        >

                            Document Chunks

                        </h1>

                        <p
                            className="
                                mt-2
                                text-slate-500
                            "
                        >

                            View and manage processed document chunks.

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-blue-50
                            px-4
                            py-3
                        "
                    >

                        <Boxes
                            size={18}
                            className="text-blue-600"
                        />

                        <div>

                            <div
                                className="
                                    text-xs
                                    text-slate-500
                                "
                            >

                                Total Chunks

                            </div>

                            <div
                                className="
                                    font-semibold
                                    text-blue-700
                                "
                            >

                                {totalChunks}

                            </div>

                        </div>

                    </div>

                    <button

                        onClick={onGenerate}

                        disabled={generating}

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-green-600
                            px-5
                            py-3
                            text-white
                            transition
                            hover:bg-green-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "

                    >

                        <Brain size={18} />

                        {

                            generating

                                ? "Generating..."

                                : "Generate Embeddings"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}