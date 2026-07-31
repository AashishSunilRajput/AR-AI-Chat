"use client";

import { RefreshCw, Filter } from "lucide-react";
import ChunkSearch from "./ChunkSearch";

interface ChunkToolbarProps {

    search: string;

    onSearch: (value: string) => void;

    filter: string;

    onFilter: (value: string) => void;

    onRefresh: () => void;

}

export default function ChunkToolbar({

    search,

    onSearch,

    filter,

    onFilter,

    onRefresh

}: ChunkToolbarProps) {

    return (

        <div
            className="
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Search */}

                <div className="flex-1">

                    <ChunkSearch

                        value={search}

                        onChange={onSearch}

                    />

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                    "
                >

                    <div className="relative">

                        <Filter
                            size={16}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <select

                            value={filter}

                            onChange={(e) =>
                                onFilter(
                                    e.target.value
                                )
                            }

                            className="
                                rounded-xl
                                border
                                bg-white
                                py-2
                                pl-9
                                pr-8
                                text-sm
                                outline-none
                                focus:border-blue-500
                            "

                        >

                            <option value="all">

                                All

                            </option>

                            <option value="generated">

                                Generated

                            </option>

                            <option value="pending">

                                Pending

                            </option>

                        </select>

                    </div>

                    <button

                        onClick={onRefresh}

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            px-4
                            py-2
                            transition
                            hover:bg-slate-100
                        "

                    >

                        <RefreshCw size={16} />

                        Refresh

                    </button>

                </div>

            </div>

        </div>

    );

}