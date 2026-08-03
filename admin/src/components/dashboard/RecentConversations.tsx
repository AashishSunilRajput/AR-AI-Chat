interface Props {

    conversations: any[];

}

export default function RecentConversations({

    conversations

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold">

                Recent Conversations

            </h3>

            <div className="space-y-4">

                {

                    conversations.length === 0 ?

                    (

                        <div className="py-8 text-center text-slate-500">

                            No recent conversations

                        </div>

                    )

                    :

                    conversations.map((chat: any) => (

                        <div

                            key={chat.id}

                            className="border-b pb-3 last:border-none"

                        >

                            <h4 className="font-medium">

                                {chat.visitor?.name || "Visitor"}

                            </h4>

                            <p className="text-sm text-slate-500">

                                {chat.chatbot?.name}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}