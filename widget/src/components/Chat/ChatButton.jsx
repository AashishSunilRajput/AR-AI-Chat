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

            onClick={onClick}

            className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl text-white flex items-center justify-center"

        >

            <MessageCircle size={30} />

            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-green-400 border border-white"></span>

        </motion.button>

    );

}

export default ChatButton;