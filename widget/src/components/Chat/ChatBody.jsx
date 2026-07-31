import { useEffect, useRef } from "react";

import useMessages from "../../hooks/useMessages";
import MessageBubble from "./MessageBubble";

function ChatBody() {

    const {

        messages,

        loading,

        sending

    } = useMessages();

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages, sending]);

    if (loading) {

        return (

            <div className="flex-1 flex items-center justify-center bg-slate-50">

                <div className="flex flex-col items-center gap-3">

                    <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>

                    <div className="text-sm text-slate-500">

                        Loading conversation...

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div

            className="
                flex-1
                overflow-y-auto

                bg-slate-50

                px-5
                py-6

                space-y-2
            "

        >

            {

                messages.length === 0

                    ?

                    <div className="h-full flex flex-col items-center justify-center text-center">

                        <div className="text-6xl">

                            🤖

                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-700">

                            Welcome 👋

                        </h3>

                        <p className="mt-2 text-slate-500 max-w-xs leading-7">

                            Ask me anything about our services.

                            I'm here to help you.

                        </p>

                    </div>

                    :

                    messages.map(message => (

                        <MessageBubble

                            key={message.id}

                            role={message.role}

                            message={message.message}

                        />

                    ))

            }

            {

                sending &&

                <div className="flex gap-3 items-end">

                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white">

                        🤖

                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">

                        <div className="flex gap-1">

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"></span>

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]"></span>

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]"></span>

                        </div>

                    </div>

                </div>

            }

            <div ref={bottomRef} />

        </div>

    );

}

export default ChatBody;