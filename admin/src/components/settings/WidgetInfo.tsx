"use client";

import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Props {
    chatbot: any;
}

export default function WidgetInfo({
    chatbot,
}: Props) {

    const [copied, setCopied] =
        useState(false);

    const copyWidgetKey = async () => {

        try {

            await navigator.clipboard.writeText(
                chatbot.widgetKey
            );

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Widget Information

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Chatbot */}

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Chatbot

                    </label>

                    <input
                        value={chatbot.name}
                        disabled
                        className="
                            w-full
                            rounded-lg
                            border
                            bg-slate-100
                            px-3
                            py-2
                        "
                    />

                </div>

                {/* Widget Key */}

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Widget Key

                    </label>

                    <div className="flex gap-2">

                        <input
                            value={chatbot.widgetKey}
                            disabled
                            className="
                                flex-1
                                rounded-lg
                                border
                                bg-slate-100
                                px-3
                                py-2
                                font-mono
                                text-sm
                            "
                        />

                        <button
                            onClick={copyWidgetKey}
                            className="
                                rounded-lg
                                border
                                px-3
                                hover:bg-slate-100
                            "
                        >

                            <Copy size={18} />

                        </button>

                    </div>

                </div>

            </div>

            {/* Status */}

            <div
                className="
                    mt-6
                    rounded-lg
                    border
                    border-green-200
                    bg-green-50
                    p-4
                "
            >

                <div className="flex items-center gap-2">

                    <CheckCircle
                        size={18}
                        className="text-green-600"
                    />

                    <span className="font-medium text-green-700">

                        Widget Ready

                    </span>

                </div>

                <p className="mt-2 text-sm text-slate-600">

                    Your chatbot widget is ready to use.
                    Install the widget using the Widget Key
                    in your website.

                </p>

            </div>

            {/* Copy Message */}

            {copied && (

                <p className="mt-4 text-sm text-green-600">

                    Widget key copied successfully.

                </p>

            )}

        </div>

    );

}