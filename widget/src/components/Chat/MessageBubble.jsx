import { motion } from "framer-motion";

import Avatar from "../Common/Avatar";
import { useWidget } from "../../context/WidgetContext";

function MessageBubble({
    role,
    message
}) {

    const isUser = role === "USER";

    const { config } = useWidget();

    const primaryColor =
        config?.settings?.primaryColor || "#2563EB";

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
                scale: 0.98
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.25,
                ease: "easeOut"
            }}

            className={`
                flex
                mb-5
                items-end
                gap-3
                ${
                    isUser
                        ? "justify-end"
                        : "justify-start"
                }
            `}
        >

            {
                !isUser &&
                
                <Avatar
    assistant
    avatar={config?.settings?.avatar}
/>
            }

            <div

                style={
                    isUser
                        ? {
                              background: primaryColor
                          }
                        : undefined
                }

                className={`
                    max-w-[78%]

                    rounded-3xl

                    px-4
                    py-3

                    text-[15px]

                    leading-7

                    whitespace-pre-wrap

                    shadow-md

                    ${
                        isUser
                            ? "text-white rounded-br-md"
                            : "bg-white border border-slate-200 rounded-bl-md"
                    }
                `}
            >

                {message}

            </div>

            {
                isUser &&
                <Avatar />
            }

        </motion.div>

    );

}

export default MessageBubble;