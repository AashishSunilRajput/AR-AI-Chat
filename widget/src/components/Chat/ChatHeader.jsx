import { Bot } from "lucide-react";
import { motion } from "framer-motion";

import { useWidget } from "../../context/WidgetContext";
import { API_BASE_URL } from "../../config/api";


function ChatHeader() {

    const { config } = useWidget();

    const primaryColor =
        config?.settings?.primaryColor || "#2563EB";

    const chatbotName =
        config?.chatbotName ||
        config?.name ||
        config?.settings?.chatbotName ||
        "AI Assistant";

    const organizationName =
        config?.organizationName ||
        config?.organization?.name ||
        config?.settings?.organizationName ||
        "TT AI";

    const avatar =
        config?.settings?.avatar ||
        config?.avatar ||
        config?.settings?.logo ||
        config?.logo ||
        null;

    const avatarUrl = avatar
        ? avatar.startsWith("http")
            ? avatar
            : `${API_BASE_URL.replace("/api", "")}${avatar.startsWith("/") ? "" : "/"}${avatar}`
        : null;


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
                background: `linear-gradient(
                    90deg,
                    ${primaryColor},
                    ${primaryColor}
                )`
            }}
        >

            {/* Background decoration */}

            <div className="absolute inset-0 opacity-10">

                <div className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-white" />

                <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/30" />

            </div>


            <div className="relative flex items-center gap-4">


                {/* Avatar */}

                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
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
                        overflow-hidden
                        flex-shrink-0
                    "
                >

                    {avatarUrl ? (

                        <img
                            src={avatarUrl}
                            alt={chatbotName}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                        />

                    ) : (

                        <Bot size={24} />

                    )}

                </motion.div>


                {/* Chatbot Information */}

                <div className="flex-1 min-w-0">

                    <h2 className="text-lg font-bold truncate">

                        {chatbotName}

                    </h2>


                    <p className="text-xs opacity-80 truncate">

                        {organizationName}

                    </p>


                    {/* Online Status */}

                    <div className="mt-1 flex items-center gap-2 text-sm">

                        <span className="relative flex h-3 w-3">

                            <span className="
                                absolute
                                inline-flex
                                h-full
                                w-full
                                animate-ping
                                rounded-full
                                bg-green-400
                                opacity-70
                            " />

                            <span className="
                                relative
                                inline-flex
                                h-3
                                w-3
                                rounded-full
                                bg-green-400
                            " />

                        </span>

                        Online

                    </div>

                </div>

            </div>

        </div>

    );

}


export default ChatHeader;