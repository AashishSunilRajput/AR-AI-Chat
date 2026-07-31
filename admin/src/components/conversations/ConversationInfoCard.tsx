interface Props {
  conversation: {
    id: number;
    status: string;
    startedAt: string;
    endedAt: string | null;
    chatbot?: {
      name: string;
    };
    messages: any[];
  };
}

export default function ConversationInfoCard({
  conversation,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Conversation Details
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 gap-5">

        <div>
          <p className="text-sm text-gray-500">
            Conversation ID
          </p>
          <p className="font-medium">
            #{conversation.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Chatbot
          </p>
          <p className="font-medium">
            {conversation.chatbot?.name || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Started At
          </p>
          <p className="font-medium">
            {new Date(conversation.startedAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Ended At
          </p>
          <p className="font-medium">
            {conversation.endedAt
              ? new Date(conversation.endedAt).toLocaleString()
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Messages
          </p>
          <p className="font-medium">
          {conversation.messages?.length || 0}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              conversation.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {conversation.status}
          </span>
        </div>

      </div>
    </div>
  );
}