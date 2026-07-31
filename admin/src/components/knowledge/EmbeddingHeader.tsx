"use client";

import { ArrowLeft, Brain } from "lucide-react";

interface EmbeddingHeaderProps {

    totalEmbeddings: number;

    onBack: () => void;

}

export default function EmbeddingHeader({

    totalEmbeddings,

    onBack

}: EmbeddingHeaderProps) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
            "
        >

            <div>

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <Brain
                        className="text-violet-600"
                        size={28}
                    />

                    <div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                            "
                        >

                            Embeddings

                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >

                            Total Embeddings :
                            {" "}
                            <span className="font-semibold">

                                {totalEmbeddings}

                            </span>

                        </p>

                    </div>

                </div>

            </div>

            <button

                onClick={onBack}

                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    hover:bg-slate-100
                "

            >

                <ArrowLeft size={18} />

                Back

            </button>

        </div>

    );

}