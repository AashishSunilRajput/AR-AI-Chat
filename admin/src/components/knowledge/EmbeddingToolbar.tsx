"use client";

import { Search, RefreshCw } from "lucide-react";

interface EmbeddingToolbarProps {

    search: string;

    onSearch: (value: string) => void;

    onRefresh: () => void;

}

export default function EmbeddingToolbar({

    search,

    onSearch,

    onRefresh

}: EmbeddingToolbarProps) {

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
                md:flex-row
                md:items-center
                md:justify-between
            "
        >

            {/* Search */}

            <div
                className="
                    relative
                    w-full
                    md:max-w-md
                "
            >

                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input

                    type="text"

                    placeholder="Search provider or model..."

                    value={search}

                    onChange={(e) =>
                        onSearch(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-xl
                        border
                        py-3
                        pl-10
                        pr-4
                        outline-none
                        transition
                        focus:border-violet-500
                    "

                />

            </div>

            {/* Refresh */}

            <button

                onClick={onRefresh}

                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-violet-600
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-violet-700
                "

            >

                <RefreshCw size={18} />

                Refresh

            </button>

        </div>

    );

}