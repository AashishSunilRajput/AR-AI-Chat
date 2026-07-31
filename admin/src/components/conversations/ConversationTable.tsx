"use client";

import { Conversation } from "@/services/conversation.service";

import ConversationRow from "./ConversationRow";
import ConversationEmpty from "./ConversationEmpty";
import ConversationSkeleton from "./ConversationSkeleton";


interface Props {
    loading: boolean;
    conversations: Conversation[];
}

export default function ConversationTable({
    loading,
    conversations,
}: Props) {

    return (

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">
                            Visitor
                        </th>

                        <th className="text-left">
                            Chatbot
                        </th>

                        <th className="text-left">
                            Messages
                        </th>

                        <th className="text-left">
                            Status
                        </th>

                        <th className="text-left">
                            Started
                        </th>

                        <th className="pr-6 text-right">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <ConversationSkeleton />

                    ) : conversations.length === 0 ? (

                        <tr>

                            <td
                                colSpan={6}
                            >
                                <ConversationEmpty />
                            </td>

                        </tr>

                    ) : (

                        conversations.map(
                            (conversation) => (

                                <ConversationRow
                                    key={conversation.id}
                                    conversation={conversation}
                                />

                            )
                        )

                    )}

                </tbody>

            </table>

        </div>

    );

}