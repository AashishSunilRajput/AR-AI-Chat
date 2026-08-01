import Link from "next/link";
import { Visitor } from "@/services/visitor.service";

interface ConversationHistoryCardProps {

    visitor: Visitor;

}

export default function ConversationHistoryCard({

    visitor

}: ConversationHistoryCardProps) {

    return (

        <div className="bg-white border rounded-xl p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">

                    Conversation History

                </h2>

            </div>

            {

                visitor.conversations?.length
                ?

                <div className="space-y-4">

                    {

                        visitor.conversations.map(

                            (conversation) => (

                                <div

                                    key={conversation.id}

                                    className="flex items-center justify-between border rounded-lg p-4"

                                >

                                    <div>

                                        <p className="font-medium">

                                            Conversation #

                                            {conversation.id}

                                        </p>

                                        <p className="text-sm text-slate-500">

                                            Status:

                                            {" "}

                                            {conversation.status}

                                        </p>

                                        <p className="text-sm text-slate-500">

                                            Messages:

                                            {" "}

                                            {

                                                conversation._count?.messages ||

                                                0

                                            }

                                        </p>

                                    </div>

                                    <Link

                                        href={`/conversations/${conversation.id}`}

                                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"

                                    >

                                        View

                                    </Link>

                                </div>

                            )

                        )

                    }

                </div>

                :

                <p className="text-slate-500">

                    No conversations found.

                </p>

            }

        </div>

    );

}