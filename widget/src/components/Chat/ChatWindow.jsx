import { motion } from "framer-motion";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import LeadCapture from "../LeadCapture";

import { useWidget } from "../../context/WidgetContext";

function ChatWindow({ onClose }) {

   const {

    showLeadForm,

    setShowLeadForm,

    setLeadSubmitted,

    visitor,

    conversationId,

    increaseUnread

} = useWidget();

    return (

       <motion.div

    initial={{
        opacity: 0,
        scale: 0.88,
        y: 35
    }}

    animate={{
        opacity: 1,
        scale: 1,
        y: 0
    }}

    exit={{
        opacity: 0,
        scale: 0.92,
        y: 20
    }}

    transition={{
        type: "spring",
        stiffness: 260,
        damping: 24
    }}

    className="
        relative

        w-[390px]
        h-[650px]

        max-w-[calc(100vw-20px)]
        max-h-[calc(100vh-110px)]

        bg-white

        rounded-3xl

        overflow-hidden

        border
        border-slate-200

        shadow-[0_25px_70px_rgba(15,23,42,0.20)]

        flex
        flex-col

        mb-4

        backdrop-blur-sm

        max-sm:w-[calc(100vw-20px)]
        max-sm:h-[calc(100vh-100px)]
        max-sm:rounded-2xl
    "
>

            <ChatHeader onClose={onClose} />

            <ChatBody />

            {

                showLeadForm && (

                    <LeadCapture

                        widgetKey={
                            window.ARAI_WIDGET_CONFIG?.widgetKey
                        }

                        visitorId={
                            visitor?.visitorId
                        }

                        conversationId={
                            conversationId
                        }

                        onSuccess={() => {

                            setLeadSubmitted(true);

                            setShowLeadForm(false);

                        }}

                    />

                )

            }

            <ChatInput />

        </motion.div>

    );

}

export default ChatWindow;