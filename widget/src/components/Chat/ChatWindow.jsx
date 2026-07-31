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

        conversationId

    } = useWidget();

    return (

        <motion.div

            initial={{
                opacity: 0,
                scale: 0.92,
                y: 20
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
                duration: 0.25
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

                shadow-[0_20px_60px_rgba(0,0,0,0.18)]

                flex
                flex-col

                mb-4

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