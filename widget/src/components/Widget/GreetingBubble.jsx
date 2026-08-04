import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useWidget } from "../../context/WidgetContext";

function GreetingBubble({

    open,

    onClick

}) {

    const { config } = useWidget();

    const [visible, setVisible] = useState(true);

    const primaryColor =
        config?.settings?.primaryColor ||
        "#2563EB";

    useEffect(() => {

        const timer = setTimeout(() => {

            setVisible(false);

        }, 8000);

        return () => clearTimeout(timer);

    }, []);

    if (open || !visible) {

        return null;

    }

    const welcomeMessage =

        config?.settings?.welcomeMessage ||

        "Hi 👋 How can I help you today?";

    return (

        <AnimatePresence>

            <motion.div

                initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}

                exit={{
                    opacity: 0,
                    y: 15
                }}

                transition={{
                    delay: 1,
                    duration: 0.35
                }}

                onClick={onClick}

                style={{

                    borderLeft: `4px solid ${primaryColor}`

                }}

                className="

                    mb-3

                    max-w-[260px]

                    cursor-pointer

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    px-4
                    py-3

                    shadow-xl

                    text-sm

                    text-slate-700

                    hover:shadow-2xl

                    transition

                "

            >

                <div className="font-semibold">

                    👋 {config?.chatbotName || "AI Assistant"}

                </div>

                <div className="mt-1 text-slate-500 leading-6">

                    {welcomeMessage.slice(0, 80)}

                    {

                        welcomeMessage.length > 80

                            ? "..."

                            : ""

                    }

                </div>

            </motion.div>

        </AnimatePresence>

    );

}

export default GreetingBubble;