import { useEffect, useState } from "react";

import messageService from "../services/message.service";

export default function useMessages(conversationId) {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!conversationId) return;

        loadMessages();

    }, [conversationId]);

    async function loadMessages() {

        try {

            const response =
                await messageService.getMessages(
                    conversationId
                );

            setMessages(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    }

    return {

        messages,

        loading,

        reload: loadMessages,

        setMessages

    };

}