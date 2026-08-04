"use client";

import { useEffect, useRef, useState } from "react";
import {
    Download,
    FileSpreadsheet,
    FileText,
    FileType2,
    ChevronDown,
} from "lucide-react";

interface Props {

    onExport: (
        format: "csv" | "xlsx" | "pdf"
    ) => void | Promise<void>;

    loading?: boolean;

}

export default function ExportButton({

    onExport,

    loading = false,

}: Props) {

    const [open, setOpen] = useState(false);

    const dropdownRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        function handleClickOutside(
            event: MouseEvent
        ) {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(
                    event.target as Node
                )

            ) {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    async function handleExport(
        format: "csv" | "xlsx" | "pdf"
    ) {

        setOpen(false);

        await onExport(format);

    }

    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            <button

                type="button"

                disabled={loading}

                onClick={() =>
                    setOpen(!open)
                }

                className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-xl

                    bg-blue-600

                    px-4
                    py-2.5

                    text-sm
                    font-medium
                    text-white

                    shadow-sm

                    transition

                    hover:bg-blue-700

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "

            >

                <Download size={18} />

                Export

                <ChevronDown size={16} />

            </button>

            {

                open && (

                    <div

                        className="
                            absolute
                            right-0
                            z-50

                            mt-2

                            w-48

                            overflow-hidden

                            rounded-xl

                            border

                            bg-white

                            shadow-xl
                        "

                    >

                        <button

                            onClick={() =>
                                handleExport("csv")
                            }

                            className="
                                flex
                                w-full
                                items-center
                                gap-3

                                px-4
                                py-3

                                text-sm

                                transition

                                hover:bg-slate-100
                            "

                        >

                            <FileText
                                size={18}
                                className="text-green-600"
                            />

                            CSV

                        </button>

                        <button

                            onClick={() =>
                                handleExport("xlsx")
                            }

                            className="
                                flex
                                w-full
                                items-center
                                gap-3

                                px-4
                                py-3

                                text-sm

                                transition

                                hover:bg-slate-100
                            "

                        >

                            <FileSpreadsheet
                                size={18}
                                className="text-blue-600"
                            />

                            Excel

                        </button>

                        <button

                            onClick={() =>
                                handleExport("pdf")
                            }

                            className="
                                flex
                                w-full
                                items-center
                                gap-3

                                px-4
                                py-3

                                text-sm

                                transition

                                hover:bg-slate-100
                            "

                        >

                            <FileType2
                                size={18}
                                className="text-red-600"
                            />

                            PDF

                        </button>

                    </div>

                )

            }

        </div>

    );

}