"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

interface WebsiteImportCardProps {

    importing: boolean;

    onImport: (
        url: string,
        type: "SINGLE" | "FULL"
    ) => void;

}


export default function WebsiteImportCard({

    importing,

    onImport

}: WebsiteImportCardProps) {


    const [url, setUrl] = useState("");

    const [type, setType] =
        useState<"SINGLE" | "FULL">(
            "SINGLE"
        );


    const handleImport = () => {


        if (!url.trim()) {

            alert(
                "Please enter website URL"
            );

            return;

        }


        onImport(
            url,
            type
        );


    };


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


            <div className="mb-5">

                <h2 className="text-xl font-semibold">

                    Import Website

                </h2>


                <p className="mt-2 text-sm text-slate-500">

                    Crawl a website and automatically create knowledge documents.

                </p>


            </div>



            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                "
            >


                <div className="relative flex-1">


                    <Globe

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

                        type="url"

                        value={url}

                        placeholder="https://example.com"

                        onChange={(e)=>
                            setUrl(
                                e.target.value
                            )
                        }


                        className="
                            w-full
                            rounded-xl
                            border
                            py-3
                            pl-11
                            pr-4
                            outline-none
                            focus:border-blue-500
                        "

                    />


                </div>



                <select

                    value={type}

                    onChange={(e)=>
                        setType(
                            e.target.value as
                            "SINGLE" | "FULL"
                        )
                    }

                    className="
                        rounded-xl
                        border
                        px-4
                        py-3
                        outline-none
                    "

                >

                    <option value="SINGLE">

                        Single Page

                    </option>


                    <option value="FULL">

                        Full Website

                    </option>


                </select>



                <button

                    onClick={handleImport}

                    disabled={importing}


                    className="
                        rounded-xl
                        bg-emerald-600
                        px-6
                        py-3
                        text-white
                        hover:bg-emerald-700
                        disabled:opacity-60
                    "

                >

                    {

                        importing

                        ? "Importing..."

                        : "Crawl Website"

                    }


                </button>



            </div>


        </div>

    );

}