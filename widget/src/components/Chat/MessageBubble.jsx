function MessageBubble({

    role,

    message

}) {

    const isUser =
        role === "USER";

    return (

        <div

            className={

                `flex mb-4 ${

                    isUser

                        ? "justify-end"

                        : "justify-start"

                }`

            }

        >

            <div

                className={

                    `max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-6 shadow-sm

                    ${

                        isUser

                        ?

                        "bg-blue-600 text-white rounded-br-md"

                        :

                        "bg-white border border-slate-200 rounded-bl-md"

                    }`

                }

            >

                {message}

            </div>

        </div>

    );

}

export default MessageBubble;