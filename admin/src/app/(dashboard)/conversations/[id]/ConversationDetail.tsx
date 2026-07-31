"use client";

import { useEffect, useState } from "react";
import ConversationHeader from "@/components/conversations/ConversationHeader";
import VisitorCard from "@/components/conversations/VisitorCard";
import ConversationInfoCard from "@/components/conversations/ConversationInfoCard";
import ChatHistory from "@/components/conversations/ChatHistory";
import { toast } from "sonner";
import LeadCard from "@/components/conversations/LeadCard";

export default function ConversationDetail({
  id,
}: {
  id: string;
}) {
  const [conversation, setConversation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("ACTIVE");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    async function loadConversation() {
      const token = localStorage.getItem("arai_token");

      const res = await fetch(
        `http://localhost:5000/api/conversations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      setConversation(result.data);
      setStatus(result.data.status);
      setLoading(false);
    }

    loadConversation();
  }, [id]);

async function closeConversation() {
  try {
    setClosing(true);

    const token = localStorage.getItem("arai_token");

    const res = await fetch(
      `http://localhost:5000/api/conversations/${id}/close`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    setConversation(result.data);
    setStatus(result.data.status);

    toast.success(result.message);

  } catch (error: any) {
    toast.error(error.message || "Failed to close conversation");
  } finally {
    setClosing(false);
  }
}

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <ConversationHeader
        conversationId={conversation.id}
        status={status}
        onClose={closeConversation}
        loading={closing}
      />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <VisitorCard visitor={conversation.visitor} />

    <ConversationInfoCard
        conversation={{
            ...conversation,
            status,
        }}
    />

    <LeadCard
        leads={conversation.leads}
    />

</div>

      <ChatHistory
  messages={conversation?.messages || []}
/>

    </div>
  );
}