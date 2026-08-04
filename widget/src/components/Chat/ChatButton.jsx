import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useWidget } from "../../context/WidgetContext";

function ChatButton({ onClick }) {

    const { config } = useWidget();

    const primaryColor =
        config?.settings?.primaryColor || "#2563EB";

    return (

       <motion.button

    initial={{
        scale: 0
    }}

    animate={{
        scale: [1, 1.04, 1]
    }}

    whileHover={{
        scale: 1.10,
        rotate: -6
    }}

    whileTap={{
        scale: 0.92
    }}

    transition={{
        scale: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
        },
        rotate: {
            duration: 0.2
        }
    }}

    onClick={onClick}

    style={{
        background: primaryColor,
        boxShadow: `0 14px 45px ${primaryColor}66`
    }}

    className="
        relative

        h-16
        w-16

        rounded-full

        text-white

        flex
        items-center
        justify-center

        overflow-visible
    "
>

    {/* Glow Ring */}

    <span

        className="
            absolute
            inset-0
            rounded-full
            animate-ping
            opacity-20
        "

        style={{
            background: primaryColor
        }}

    />

    <MessageCircle
        size={30}
        className="relative z-10"
    />

    {/* Online Dot */}

    <span

        className="
            absolute
            top-1
            right-1

            flex
            h-3
            w-3
        "

    >

        <span
            className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-green-400
                opacity-70
            "
        />

        <span
            className="
                relative
                inline-flex
                h-3
                w-3
                rounded-full
                bg-green-400
                border-2
                border-white
            "
        />

    </span>

</motion.button>

    );

}

export default ChatButton;