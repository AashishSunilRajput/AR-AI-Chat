interface Props {
  message: {
    role: string;
    message: string;
    createdAt: string;
  };
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "USER";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-2 text-xs opacity-80">
          <span className="font-semibold">
            {isUser ? "👤 Visitor" : "🤖 Assistant"}
          </span>

          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="whitespace-pre-wrap break-words">
          {message.message}
        </p>
      </div>
    </div>
  );
}