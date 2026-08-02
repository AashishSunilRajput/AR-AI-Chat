"use client";

import { useRouter } from "next/navigation";
import {
    Bot,
    ExternalLink,
    Globe,
    CheckCircle,
    XCircle,
} from "lucide-react";

interface Props {
    chatbots: any[];
}

export default function OrganizationChatbots({
    chatbots,
}: Props) {

    const router = useRouter();

    return (

        <div className="rounded-2xl border bg-white shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">

                <div>

                    <h2 className="text-xl font-semibold">

                        Chatbots

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Total Chatbots : {chatbots.length}

                    </p>

                </div>

            </div>

            {

                chatbots.length === 0 ? (

                    <div className="p-10 text-center text-slate-500">

                        No chatbots found.

                    </div>

                )

                :

                (

                    <div className="divide-y">

                        {

                            chatbots.map((bot) => (

                                <div
                                    key={bot.id}
                                    className="
                                    flex
                                    flex-col
                                    gap-5
                                    p-6
                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                    hover:bg-slate-50
                                    "
                                >

                                    {/* Left */}

                                    <div className="flex items-start gap-4">

                                        <div
                                            className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-blue-100
                                            "
                                        >

                                            <Bot className="h-6 w-6 text-blue-600" />

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-semibold">

                                                {bot.name}

                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">

                                                {bot.description || "-"}

                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">

                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">

                                                    ID #{bot.id}

                                                </span>

                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">

                                                    {bot.slug}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Center */}

                                    <div className="space-y-2 text-sm">

                                        <div className="flex items-center gap-2">

                                            <Globe className="h-4 w-4 text-slate-500" />

                                            <span>

                                                {bot.allowedDomains?.length || 0} Allowed Domains

                                            </span>

                                        </div>

                                        <div>

                                            <span className="font-medium">

                                                Widget Key:

                                            </span>

                                            <p className="max-w-xs truncate text-slate-500">

                                                {bot.widgetKey}

                                            </p>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <div className="flex items-center gap-3">

                                        {

                                            bot.isActive ? (

                                                <span
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    bg-green-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    text-green-700
                                                    "
                                                >

                                                    <CheckCircle className="h-4 w-4" />

                                                    Active

                                                </span>

                                            )

                                            :

                                            (

                                                <span
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    bg-red-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    text-red-700
                                                    "
                                                >

                                                    <XCircle className="h-4 w-4" />

                                                    Inactive

                                                </span>

                                            )

                                        }

                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/chatbots/${bot.id}/settings`
                                                )
                                            }
                                            className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-blue-600
                                            px-4
                                            py-2
                                            text-white
                                            hover:bg-blue-700
                                            "
                                        >

                                            <ExternalLink className="h-4 w-4" />

                                            Settings

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}