import { useEffect, useRef, useState } from "react";
import {
    Loader2,
    SendHorizontal
} from "lucide-react";

import useMessages from "../../hooks/useMessages";
import { useWidget } from "../../context/WidgetContext";

function ChatInput() {

    const {

        sendMessage,

        sending

    } = useMessages();

    const {

        leadSubmitted,

        setShowLeadForm

    } = useWidget();

    const [text, setText] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {

        inputRef.current?.focus();

    }, []);

    async function submit() {

        const value = text.trim();

        if (!value) return;

        const response =
            await sendMessage(value);

        // ==========================================
        // Lead Detection
        // ==========================================

        const leadClosed =

            localStorage.getItem(

                "arai_lead_closed"

            );

        const leadSubmittedStorage =

            localStorage.getItem(

                "arai_lead_submitted"

            );

        if (

            response?.leadDetected &&

            !leadSubmitted &&

            !leadSubmittedStorage &&

            !leadClosed

        ) {

            setTimeout(() => {

                setShowLeadForm(true);

            }, 600);

        }

        setText("");

        inputRef.current.style.height = "48px";

        inputRef.current.focus();

    }

    function handleKeyDown(e) {

        if (

            e.key === "Enter" &&

            !e.shiftKey

        ) {

            e.preventDefault();

            submit();

        }

    }

    function autoResize(e) {

        e.target.style.height = "48px";

        e.target.style.height =

            e.target.scrollHeight + "px";

        setText(e.target.value);

    }

    return (

        <div

            className="

                border-t

                border-slate-200

                bg-white

                p-4

            "

        >

            <div

                className="

                    flex

                    items-end

                    gap-3

                "

            >

                <textarea

                    ref={inputRef}

                    rows={1}

                    value={text}

                    onChange={autoResize}

                    onKeyDown={handleKeyDown}

                    placeholder="Type your message..."

                    className="

                        flex-1

                        min-h-[48px]
                        max-h-[140px]

                        resize-none

                        rounded-2xl

                        border

                        border-slate-300

                        bg-slate-50

                        px-4
                        py-3

                        text-[15px]

                        outline-none

                        transition

                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-100

                    "

                />

                <button

                    disabled={

                        sending ||

                        !text.trim()

                    }

                    onClick={submit}

                    className="

                        h-12
                        w-12

                        rounded-2xl

                        bg-gradient-to-r

                        from-blue-600
                        to-indigo-600

                        text-white

                        shadow-lg

                        flex
                        items-center
                        justify-center

                        transition-all

                        hover:scale-105

                        disabled:opacity-50
                        disabled:hover:scale-100

                    "

                >

                    {

                        sending

                            ?

                            <Loader2

                                className="animate-spin"

                                size={20}

                            />

                            :

                            <SendHorizontal

                                size={20}

                            />

                    }

                </button>

            </div>

        </div>

    );

}

export default ChatInput;