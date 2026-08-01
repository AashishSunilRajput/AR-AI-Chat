"use client";

import Link from "next/link";
import { Visitor } from "@/services/visitor.service";

interface VisitorTableProps {

    visitors: Visitor[];

}

export default function VisitorTable({

    visitors

}: VisitorTableProps) {

    if (visitors.length === 0) {

        return (

            <div className="bg-white rounded-xl border p-10 text-center text-slate-500">

                No visitors found.

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl border overflow-x-auto">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            Visitor
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            Chatbot
                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold">
                            Conversations
                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold">
                            Leads
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            Last Seen
                        </th>

                        <th className="px-6 py-3 text-right text-sm font-semibold">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        visitors.map((visitor) => (

                            <tr
                                key={visitor.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">

                                    <div className="font-medium">

                                        {

                                            visitor.name ||

                                            "Anonymous"

                                        }

                                    </div>

                                    <div className="text-sm text-slate-500">

                                        {

                                            visitor.email ||

                                            "-"

                                        }

                                    </div>

                                </td>

                                <td className="px-6 py-4">

                                    {

                                        visitor.chatbot?.name ||

                                        "-"

                                    }

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {

                                        visitor._count?.conversations ||

                                        0

                                    }

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {

                                        visitor._count?.leads ||

                                        0

                                    }

                                </td>

                                <td className="px-6 py-4">

                                    {

                                        new Date(

                                            visitor.lastSeenAt

                                        ).toLocaleString()

                                    }

                                </td>

                                <td className="px-6 py-4 text-right">

                                    <Link

                                        href={`/visitors/${visitor.id}`}

                                        className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                                    >

                                        View

                                    </Link>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}