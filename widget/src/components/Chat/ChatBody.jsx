import { useEffect, useRef } from "react";

import useMessages from "../../hooks/useMessages";
import MessageBubble from "./MessageBubble";
import Avatar from "../Common/Avatar";
import { useWidget } from "../../context/WidgetContext";

function ChatBody() {

    const {
        messages,
        loading,
        sending,
        sendMessage
    } = useMessages();

    const { config } = useWidget();

    const bottomRef = useRef(null);

    const chatbotName =
        config?.chatbotName || "AI Assistant";

    const organizationName =
        config?.organizationName || "Our Company";

    const avatar =
        config?.settings?.avatar || null;

    const suggestedQuestions =
        config?.settings?.suggestedQuestions || [];

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
                bg-gradient-to-b
                from-slate-50
                to-white
                px-5
                py-6
                space-y-3
                scroll-smooth
                scrollbar-thin
                scrollbar-thumb-slate-300
                scrollbar-track-transparent
            "

        >

            {

                messages.length === 0

                    ?

                    <div

                        className="
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "

                    >

                        <Avatar

                            assistant

                            avatar={avatar}

                        />

                        <h3

                            className="
                                mt-4
                                text-xl
                                font-bold
                                text-slate-800
                            "

                        >

                            Welcome 👋

                        </h3>

                        <h4

                            className="
                                mt-1
                                text-base
                                font-semibold
                                text-slate-700
                            "

                        >

                            {chatbotName}

                        </h4>

                        <p

                            className="
                                mt-2
                                text-sm
                                text-slate-500
                                max-w-xs
                                leading-7
                            "

                        >

                            {

                                config?.settings?.welcomeMessage ||

                                "Ask me anything about our services. I'm here to help you."

                            }

                        </p>

                        <span

                            className="
                                mt-3
                                text-xs
                                text-slate-400
                            "

                        >

                            {organizationName}

                        </span>

                        {

                            suggestedQuestions.length > 0 && (

                                <div className="mt-8 w-full max-w-sm">

                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">

                                        Suggested Questions

                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">

                                        {

                                            suggestedQuestions.map(

                                                (question, index) => (

                                                    <button

                                                        key={index}

                                                        onClick={() =>

                                                            sendMessage(question)

                                                        }

                                                        disabled={sending}

                                                        className="
                                                            rounded-full
                                                            border
                                                            border-slate-200
                                                            bg-white
                                                            px-4
                                                            py-2
                                                            text-sm
                                                            text-slate-700
                                                            shadow-sm
                                                            transition-all
                                                            hover:border-blue-500
                                                            hover:bg-blue-50
                                                            hover:text-blue-600
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "

                                                    >

                                                        {question}

                                                    </button>

                                                )

                                            )

                                        }

                                    </div>

                                </div>

                            )

                        }

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

                <div className="flex items-end gap-3">

                    <Avatar

                        assistant

                        avatar={avatar}

                    />

                    <div

                        className="
                            rounded-3xl
                            rounded-bl-md
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            shadow-sm
                        "

                    >

                        <div className="mb-2 text-xs text-slate-400">

                            {chatbotName} is typing...

                        </div>

                        <div className="flex gap-1">

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"></span>

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]"></span>

                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]"></span>

                        </div>

                    </div>

                </div>

            }

            <div ref={bottomRef} />

        </div>

    );

}

export default ChatBody;