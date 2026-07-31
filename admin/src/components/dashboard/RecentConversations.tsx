const conversations = [

    {

        user: "Ashish",

        message: "How much does chatbot cost?"

    },

    {

        user: "Rahul",

        message: "Need CRM Integration."

    },

    {

        user: "Priya",

        message: "Can you build AI Assistant?"

    }

];

export default function RecentConversations() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold">

                Recent Conversations

            </h3>

            <div className="space-y-4">

                {

                    conversations.map((chat, index) => (

                        <div

                            key={index}

                            className="border-b pb-3 last:border-none"

                        >

                            <h4 className="font-medium">

                                {chat.user}

                            </h4>

                            <p className="text-sm text-slate-500">

                                {chat.message}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}