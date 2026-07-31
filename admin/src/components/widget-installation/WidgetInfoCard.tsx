"use client";

import { useState } from "react";

import { WidgetInstallation } from "@/services/widget-installation.service";

interface Props {

    chatbot: WidgetInstallation;

}

export default function WidgetInfoCard({

    chatbot

}: Props) {

    const [copied, setCopied] = useState(false);


    const copyKey = async () => {

        await navigator.clipboard.writeText(

            chatbot.widgetKey

        );

        setCopied(true);


        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };


    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">


            <h2 className="mb-6 text-xl font-semibold">

                Widget Information

            </h2>


            <div className="space-y-5">


                {/* Chatbot Name */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Chatbot Name

                    </label>


                    <div className="rounded-xl bg-slate-50 p-3">

                        {chatbot.name}

                    </div>

                </div>



                {/* Widget Key */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Widget Key

                    </label>


                    <div className="flex gap-3">


                        <div className="flex-1 rounded-xl bg-slate-50 p-3 font-mono text-sm">

                            {chatbot.widgetKey}

                        </div>


                        <button

                            onClick={copyKey}

                            className="
                                rounded-xl
                                bg-blue-600
                                px-5
                                text-white
                                hover:bg-blue-700
                            "

                        >

                            {
                                copied
                                    ? "Copied"
                                    : "Copy"
                            }

                        </button>


                    </div>


                </div>



                {/* Status */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Status

                    </label>


                    <span

                        className={`
                            inline-flex
                            rounded-full
                            px-4
                            py-1
                            text-sm

                            ${
                                chatbot.isActive

                                ?

                                "bg-green-100 text-green-700"

                                :

                                "bg-red-100 text-red-700"
                            }
                        `}

                    >

                        {
                            chatbot.isActive
                                ? "Active"
                                : "Inactive"
                        }


                    </span>


                </div>


            </div>


        </div>

    );

}