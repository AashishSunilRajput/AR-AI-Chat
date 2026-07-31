import { Bot } from "lucide-react";
import { motion } from "framer-motion";

import { useWidget } from "../../context/WidgetContext";

function ChatHeader() {

    const { config } = useWidget();

    return (

        <div
 className="
 relative
 overflow-hidden
 text-white
 px-5
 py-4
 rounded-t-3xl
 "
 style={{
   background:
     "linear-gradient(90deg,#2563eb,#4f46e5,#7c3aed)"
 }}
>

            <div className="absolute inset-0 opacity-10">

                <div className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-white" />

                <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/30" />

            </div>

            <div className="relative flex items-center gap-4">

                <motion.div

                    animate={{
                        scale: [1, 1.08, 1]
                    }}

                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}

                    className="
                        h-12
                        w-12

                        rounded-full

                        bg-white/20

                        backdrop-blur

                        flex
                        items-center
                        justify-center
                    "

                >

                    <Bot size={24} />

                </motion.div>

                <div className="flex-1">

                    <h2 className="text-lg font-bold">

                        {

                            config?.chatbotName ||

                            "AI Assistant"

                        }

                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-sm">

                        <span className="relative flex h-3 w-3">

                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70"></span>

                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>

                        </span>

                        Online

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChatHeader;