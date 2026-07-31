import { createContext, useContext, useEffect, useState } from "react";

import { useWidget } from "./WidgetContext";

import messageService from "../services/message.service";

const MessagesContext = createContext();

export function MessagesProvider({ children }) {

    const { conversationId } = useWidget();

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [sending, setSending] = useState(false);

    useEffect(() => {

        if (!conversationId) return;

        loadMessages();

    }, [conversationId]);

    async function loadMessages() {

        try {

            setLoading(true);

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

    async function sendMessage(text) {

        if (!text.trim()) return null;

        try {

            setSending(true);

            const response =
                await messageService.sendMessage({

                    conversationId,

                    message: text

                });

            setMessages(prev => [

                ...prev,

                response.data.userMessage,

                response.data.assistantMessage

            ]);

            // Important

            return response.data;

        }

        catch (error) {

            console.error(error);

            return null;

        }

        finally {

            setSending(false);

        }

    }

    return (

        <MessagesContext.Provider

            value={{

                messages,

                loading,

                sending,

                sendMessage,

                reload: loadMessages

            }}

        >

            {children}

        </MessagesContext.Provider>

    );

}

export function useMessages() {

    return useContext(MessagesContext);

}