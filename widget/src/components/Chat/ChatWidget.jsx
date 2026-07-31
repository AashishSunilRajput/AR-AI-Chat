import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

function ChatWidget() {

    const [open, setOpen] = useState(false);

    return (

        <div

            className="
                fixed
                bottom-6
                right-6

                z-[2147483647]

                flex
                flex-col

                items-end

                pointer-events-none
            "

        >

            <AnimatePresence>

                {

                    open &&

                    <div className="pointer-events-auto">

                        <ChatWindow

                            onClose={() =>
                                setOpen(false)
                            }

                        />

                    </div>

                }

            </AnimatePresence>

            <div className="pointer-events-auto">

                <ChatButton

                    onClick={() =>
                        setOpen(!open)
                    }

                />

            </div>

        </div>

    );

}

export default ChatWidget;