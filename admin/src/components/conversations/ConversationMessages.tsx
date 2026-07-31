import MessageBubble from "./MessageBubble";

interface Props {
  messages: any[];
}

export default function ChatHistory({
  messages,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Chat History
        </h2>
      </div>

      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No messages found.
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
            />
          ))
        )}
      </div>
    </div>
  );
}