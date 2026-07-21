import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

function ChatWindow({ onClose }) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                scale: 0.9,
                y: 40
            }}

            animate={{
                opacity: 1,
                scale: 1,
                y: 0
            }}

            exit={{
                opacity: 0,
                scale: 0.9,
                y: 40
            }}

            transition={{
                duration: 0.25
            }}

            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-32px)] h-[650px] max-h-[calc(100vh-110px)] bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col"

        >

            <ChatHeader onClose={onClose} />

            <ChatBody />

            <ChatInput />

        </motion.div>

    );

}

export default ChatWindow;