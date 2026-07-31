"use client";

import { Search, X } from "lucide-react";

interface ChunkSearchProps {

    value: string;

    onChange: (value: string) => void;

}

export default function ChunkSearch({

    value,

    onChange

}: ChunkSearchProps) {

    return (

        <div className="relative w-full">

            <Search
                size={18}
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                "
            />

            <input

                type="text"

                value={value}

                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }

                placeholder="Search chunks..."

                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-11
                    pr-12
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                "

            />

            {

                value && (

                    <button

                        onClick={() =>
                            onChange("")
                        }

                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-full
                            p-1
                            text-slate-400
                            hover:bg-slate-100
                            hover:text-slate-600
                        "

                    >

                        <X size={16} />

                    </button>

                )

            }

        </div>

    );

}