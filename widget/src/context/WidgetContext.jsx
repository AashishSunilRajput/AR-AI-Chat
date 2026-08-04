import { createContext, useContext, useEffect, useState } from "react";

import widgetService from "../services/widget.service";
import visitorService from "../services/visitor.service";


const WidgetContext = createContext();



export function WidgetProvider({ children }) {


    const [loading, setLoading] = useState(true);


    const [config, setConfig] = useState(null);


    const [visitor, setVisitor] = useState(null);


    const [conversationId, setConversationId] = useState(null);



    // ==========================================
    // Unread Notification
    // ==========================================

    const [unreadCount, setUnreadCount] = useState(0);



    function increaseUnread(){

        setUnreadCount(
            prev => prev + 1
        );

    }



    function clearUnread(){

        setUnreadCount(0);

    }




    // ==========================================
    // Lead Capture
    // ==========================================

    const [showLeadForm, setShowLeadForm] = useState(false);


    const [leadSubmitted, setLeadSubmitted] = useState(

        localStorage.getItem(
            "arai_lead_submitted"
        ) === "true"

    );



    useEffect(() => {

        initialize();

    }, []);





    async function initialize() {


        try {


            // ==========================================
            // Widget Config
            // ==========================================

            const widgetResponse =
                await widgetService.getConfig();


            setConfig(
                widgetResponse.data
            );





            // ==========================================
            // Visitor Session
            // ==========================================

            const visitorResponse =
                await visitorService.startSession();



            setVisitor(
                visitorResponse.data
            );



            setConversationId(

                visitorResponse.data.conversationId

            );






            // ==========================================
            // Check Local Storage
            // ==========================================

            const submitted =
                localStorage.getItem(
                    "arai_lead_submitted"
                );



            if(submitted){

                setLeadSubmitted(true);

            }



        }


        catch(error){

            console.error(error);

        }


        finally{

            setLoading(false);

        }


    }





    return (

        <WidgetContext.Provider


            value={{


                loading,


                config,


                visitor,


                conversationId,



                // ==================================
                // Unread Notification
                // ==================================

                unreadCount,

                increaseUnread,

                clearUnread,





                // ==================================
                // Lead Capture
                // ==================================

                showLeadForm,

                setShowLeadForm,


                leadSubmitted,

                setLeadSubmitted



            }}



        >


            {children}


        </WidgetContext.Provider>


    );

}




export function useWidget(){

    return useContext(
        WidgetContext
    );

}