import { useEffect, useRef } from "react";

import { useWidget } from "../../context/WidgetContext";

import useMessages from "../../hooks/useMessages";

import MessageBubble from "./MessageBubble";

function ChatBody() {

    const {

        conversationId

    } = useWidget();

    const {

        messages,

        loading

    } = useMessages(

        conversationId

    );

    const bottomRef =
        useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    if (loading) {

        return (

            <div className="flex-1 flex items-center justify-center">

                Loading...

            </div>

        );

    }

    if (!messages.length) {

        return (

            <div className="flex-1 flex items-center justify-center text-slate-400">

                No messages

            </div>

        );

    }

    return (

        <div className="flex-1 overflow-y-auto bg-slate-50 p-5">

            {

                messages.map(

                    message => (

                        <MessageBubble

                            key={message.id}

                            role={message.role}

                            message={message.message}

                        />

                    )

                )

            }

            <div

                ref={bottomRef}

            />

        </div>

    );

}

export default ChatBody;