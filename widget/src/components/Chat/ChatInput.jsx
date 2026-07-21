import { SendHorizontal } from "lucide-react";

function ChatInput() {

    return (

        <div className="border-t border-slate-200 bg-white p-4">

            <div className="flex items-center gap-3">

                <input

                    type="text"

                    placeholder="Type your message..."

                    className="flex-1 h-12 rounded-xl border border-slate-300 px-4 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"

                />

                <button

                    className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-105 transition flex items-center justify-center text-white"

                >

                    <SendHorizontal size={20} />

                </button>

            </div>

        </div>

    );

}

export default ChatInput;