"use client";

import Link from "next/link";
import { Conversation } from "@/services/conversation.service";
import ConversationStatusBadge from "./ConversationStatusBadge";

interface Props {
    conversation: Conversation;
}

export default function ConversationRow({
    conversation,
}: Props) {
    return (
        <tr className="border-t hover:bg-slate-50 transition">

            <td className="px-6 py-4">

                <div className="font-medium">
                    {conversation.visitor?.name || "Anonymous"}
                </div>

                <div className="text-sm text-slate-500">
                    {conversation.visitor?.email || "-"}
                </div>

            </td>

            <td>
                {conversation.chatbot?.name}
            </td>

            <td>
                {conversation._count?.messages || 0}
            </td>

            <td>
                <ConversationStatusBadge
                    status={conversation.status}
                />
            </td>

            <td>
                {new Date(
                    conversation.startedAt
                ).toLocaleString()}
            </td>

            <td className="pr-6 text-right">

                <Link
                    href={`/conversations/${conversation.id}`}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                    "
                >
                    View
                </Link>

            </td>

        </tr>
    );
}