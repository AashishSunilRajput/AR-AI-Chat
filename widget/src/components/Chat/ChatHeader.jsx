import { X } from "lucide-react";
import Avatar from "../Common/Avatar";

function ChatHeader({ onClose }) {

    return (

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-[20px] px-5 py-4 text-white flex justify-between items-center">

            <div className="flex items-center gap-3">

                <Avatar />

                <div>

                    <h2 className="font-semibold text-lg">

                        AR AI Assistant

                    </h2>

                    <p className="text-sm text-blue-100">

                        Online

                    </p>

                </div>

            </div>

            <button

                onClick={onClose}

                className="h-9 w-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition"

            >

                <X size={20} />

            </button>

        </div>

    );

}

export default ChatHeader;