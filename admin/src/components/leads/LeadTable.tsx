"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Lead } from "@/services/lead.service";
import LeadStatusBadge from "./LeadStatusBadge";

interface LeadTableProps {
    loading: boolean;
    leads: Lead[];
}

export default function LeadTable({
    loading,
    leads,
}: LeadTableProps) {

    if (loading) {

        return (
            <div className="bg-white rounded-xl border p-10 text-center">
                Loading leads...
            </div>
        );

    }

    if (leads.length === 0) {

        return (
            <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
                No leads found.
            </div>
        );

    }

    return (

        <div className="overflow-x-auto bg-white rounded-xl border">

            <table className="min-w-full">

                <thead className="bg-gray-50">

                    <tr className="text-left text-sm text-gray-600">

                        <th className="px-6 py-3">Name</th>

                        <th className="px-6 py-3">Email</th>

                        <th className="px-6 py-3">Phone</th>

                        <th className="px-6 py-3">Company</th>

                        <th className="px-6 py-3">Status</th>

                        <th className="px-6 py-3">Source</th>

                        <th className="px-6 py-3">Conversation</th>

                        <th className="px-6 py-3">Created</th>

                        <th className="px-6 py-3 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {leads.map((lead) => (

                        <tr
                            key={lead.id}
                            className="border-t hover:bg-gray-50"
                        >

                            <td className="px-6 py-4 font-medium">
                                {lead.name || "-"}
                            </td>

                            <td className="px-6 py-4">
                                {lead.email || "-"}
                            </td>

                            <td className="px-6 py-4">
                                {lead.phone || "-"}
                            </td>

                            <td className="px-6 py-4">
                                {lead.company || "-"}
                            </td>

                            <td className="px-6 py-4">
                                <LeadStatusBadge
                                    status={lead.status}
                                />
                            </td>

                            <td className="px-6 py-4 capitalize">
                                {lead.source}
                            </td>

                            <td className="px-6 py-4">

                                {lead.conversation ? (

                                    <Link
                                        href={`/conversations/${lead.conversation.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        #{lead.conversation.id}
                                    </Link>

                                ) : (

                                    "-"

                                )}

                            </td>

                            <td className="px-6 py-4">

                                {new Date(
                                    lead.createdAt
                                ).toLocaleDateString()}

                            </td>

                            <td className="px-6 py-4 text-center">

                                <Link
                                    href={`/leads/${lead.id}`}
                                    className="inline-flex items-center justify-center rounded-lg border p-2 hover:bg-gray-100"
                                >
                                    <Eye size={18} />
                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}