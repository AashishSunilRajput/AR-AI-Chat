import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

function ChatWidget() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <AnimatePresence>

                {

                    open &&

                    <ChatWindow

                        onClose={() =>

                            setOpen(false)

                        }

                    />

                }

            </AnimatePresence>

            <div className="mt-4 flex justify-end">

                <ChatButton

                    onClick={() =>

                        setOpen(

                            !open

                        )

                    }

                />

            </div>

        </>

    );

}

export default ChatWidget;