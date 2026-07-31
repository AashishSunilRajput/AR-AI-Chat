"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CloseConversationButton from "./CloseConversationButton";

interface Props {
  conversationId: number;
  status: string;
  onClose?: () => Promise<void>;
  loading?: boolean;
}

export default function ConversationHeader({
  conversationId,
  status,
  onClose,
  loading,
}: Props) {
  const isClosed = status === "CLOSED";

  return (
    <div className="space-y-5">
      {/* Back Button */}
      <Link
        href="/conversations"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Back to Conversations
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Conversation #{conversationId}
          </h1>

          <p className="mt-1 text-gray-500">
            Live conversation with visitor
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              isClosed
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isClosed ? "🔴 CLOSED" : "🟢 ACTIVE"}
          </span>

          {!isClosed && onClose && (
            <CloseConversationButton
              onClose={onClose}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}