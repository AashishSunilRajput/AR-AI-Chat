import { createContext, useContext, useEffect, useState } from "react";

import widgetService from "../services/widget.service";
import visitorService from "../services/visitor.service";

const WidgetContext = createContext();

export function WidgetProvider({ children }) {

    const [loading, setLoading] = useState(true);

    const [config, setConfig] = useState(null);

    const [visitor, setVisitor] = useState(null);

    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {

        initialize();

    }, []);

    async function initialize() {

        try {

            // Widget Config

            const widgetResponse =
                await widgetService.getConfig();

            setConfig(widgetResponse.data);

            // Visitor + Conversation

            const visitorResponse =
                await visitorService.startSession();

            setVisitor(visitorResponse.data);

            setConversationId(

                visitorResponse.data.conversationId

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <WidgetContext.Provider

            value={{

                loading,

                config,

                visitor,

                conversationId

            }}

        >

            {children}

        </WidgetContext.Provider>

    );

}

export function useWidget() {

    return useContext(WidgetContext);

}