import Avatar from "../Common/Avatar";

function MessageBubble({

    role,

    message

}) {

    const isUser = role === "USER";

    return (

        <div

            className={`

                flex

                mb-5

                items-end

                gap-3

                ${

                    isUser

                        ? "justify-end"

                        : "justify-start"

                }

            `}

        >

            {

                !isUser &&

                <Avatar assistant />

            }

            <div

                className={`

                    max-w-[78%]

                    rounded-3xl

                    px-4

                    py-3

                    text-[15px]

                    leading-7

                    whitespace-pre-wrap

                    shadow-md

                    ${

                        isUser

                            ?

                            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"

                            :

                            "bg-white border border-slate-200 rounded-bl-md"

                    }

                `}

            >

                {message}

            </div>

            {

                isUser &&

                <Avatar />

            }

        </div>

    );

}

export default MessageBubble;