"use client";

import { useRouter } from "next/navigation";
import {
    Database,
    Bot,
    Calendar,
    CheckCircle,
    XCircle,
    ExternalLink,
} from "lucide-react";

interface Props {
    knowledgeBases: any[];
}

export default function OrganizationKnowledgeBases({
    knowledgeBases,
}: Props) {

    const router = useRouter();

    return (

        <div className="rounded-2xl border bg-white shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">

                <div>

                    <h2 className="text-xl font-semibold">

                        Knowledge Bases

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Total Knowledge Bases : {knowledgeBases.length}

                    </p>

                </div>

            </div>

            {

                knowledgeBases.length === 0 ? (

                    <div className="p-10 text-center text-slate-500">

                        No Knowledge Base found.

                    </div>

                )

                :

                (

                    <div className="divide-y">

                        {

                            knowledgeBases.map((kb) => (

                                <div
                                    key={kb.id}
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
                                            bg-amber-100
                                            "
                                        >

                                            <Database className="h-6 w-6 text-amber-600" />

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-semibold">

                                                {kb.name}

                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">

                                                {kb.description || "-"}

                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">

                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">

                                                    ID #{kb.id}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Center */}

                                    <div className="space-y-2 text-sm">

                                        <div className="flex items-center gap-2">

                                            <Bot className="h-4 w-4 text-slate-500" />

                                            <span>

                                                Chatbot ID: {kb.chatbotId}

                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Calendar className="h-4 w-4 text-slate-500" />

                                            <span>

                                                {new Date(
                                                    kb.createdAt
                                                ).toLocaleDateString()}

                                            </span>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <div className="flex items-center gap-3">

                                        {

                                            kb.isActive ? (

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
                                                    `/knowledge-bases/${kb.id}`
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

                                            View

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