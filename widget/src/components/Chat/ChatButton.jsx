import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

function ChatButton({ onClick }) {

    return (

        <motion.button

            whileHover={{
                scale: 1.08
            }}

            whileTap={{
                scale: 0.95
            }}

            transition={{
                duration: 0.2
            }}

            onClick={onClick}

            className="
                h-16
                w-16

                rounded-full

                bg-gradient-to-br
                from-blue-600
                to-indigo-700

                text-white

                shadow-[0_12px_40px_rgba(37,99,235,0.45)]

                flex
                items-center
                justify-center

                relative
            "

        >

            <MessageCircle size={30} />

            <span

                className="
                    absolute
                    top-1
                    right-1

                    h-3
                    w-3

                    rounded-full

                    bg-green-400

                    border-2
                    border-white
                "

            />

        </motion.button>

    );

}

export default ChatButton;