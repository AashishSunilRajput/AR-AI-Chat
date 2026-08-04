import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

import { useWidget } from "../../context/WidgetContext";
import GreetingBubble from "../Widget/GreetingBubble";


function ChatWidget() {

    const [open, setOpen] = useState(false);

   const { 
    config,
    unreadCount,
    clearUnread
} = useWidget();



    // ==========================================
    // Auto Open (Only First Time)
    // ==========================================

    useEffect(() => {

        const alreadyOpened =
            localStorage.getItem(
                "arai_widget_auto_open"
            );


        if (alreadyOpened) return;


        const timer = setTimeout(() => {

            setOpen(true);

            localStorage.setItem(
                "arai_widget_auto_open",
                "true"
            );


        }, 3500);


        return () =>
            clearTimeout(timer);


    }, []);



    // ==========================================
    // Reset unread when opened
    // ==========================================

   useEffect(() => {

    if(open){
        clearUnread();
    }

},[open]);



    const position =
        config?.settings?.position || "BOTTOM_RIGHT";



    const positionClass = {

        BOTTOM_RIGHT:
            "bottom-6 right-6 items-end",

        BOTTOM_LEFT:
            "bottom-6 left-6 items-start",

        TOP_RIGHT:
            "top-6 right-6 items-end",

        TOP_LEFT:
            "top-6 left-6 items-start"


    }[position] || "bottom-6 right-6 items-end";



    return (

        <div

            className={`
                fixed
                ${positionClass}

                z-[2147483647]

                flex
                flex-col

                pointer-events-none
            `}

        >



            <AnimatePresence>


                {
                    open &&

                    <motion.div

                        initial={{
                            opacity:0,
                            scale:0.9,
                            y:30
                        }}

                        animate={{
                            opacity:1,
                            scale:1,
                            y:0
                        }}

                        exit={{
                            opacity:0,
                            scale:0.9,
                            y:30
                        }}

                        transition={{
                            duration:0.25
                        }}

                        className="pointer-events-auto"

                    >

                        <ChatWindow

                            onClose={() =>
                                setOpen(false)
                            }

                        />


                    </motion.div>

                }


            </AnimatePresence>





            <GreetingBubble

                open={open}

                onClick={() =>
                    setOpen(true)
                }

            />






            <div className="relative pointer-events-auto">


                <ChatButton

                    onClick={() =>
                        setOpen(!open)
                    }

                />



                {

                    unreadCount > 0 &&

                    <span

                        className="
                            absolute
                            -top-1
                            -right-1

                            min-w-[22px]
                            h-[22px]

                            rounded-full

                            bg-red-500
                            text-white

                            text-xs
                            font-bold

                            flex
                            items-center
                            justify-center

                            shadow-lg
                        "

                    >

                        {unreadCount}

                    </span>

                }



            </div>


        </div>

    );

}


export default ChatWidget;