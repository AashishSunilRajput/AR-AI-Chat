"use client";

import { useEffect, useState } from "react";

import conversationService, {
    Conversation,
    ConversationStats as ConversationStatsType,
} from "@/services/conversation.service";

import ConversationStats from "@/components/conversations/ConversationStats";
import ConversationFilters from "@/components/conversations/ConversationFilters";
import ConversationTable from "@/components/conversations/ConversationTable";

export default function ConversationsPage() {

    const [loading, setLoading] = useState(true);

    const [conversations, setConversations] = useState<Conversation[]>([]);

    const [stats, setStats] =
        useState<ConversationStatsType>({
            total: 0,
            active: 0,
            closed: 0,
            today: 0,
        });

    const [search, setSearch] = useState("");

    // ======================================
    // Load Data
    // ======================================

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                conversationsResponse,
                statsResponse,
            ] = await Promise.all([

                conversationService.getConversations(),

                conversationService.getStats(),

            ]);

            setConversations(
                conversationsResponse.data
            );

            setStats(
                statsResponse.data
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    // ======================================
    // Search
    // ======================================

    const filteredConversations =
        conversations.filter((conversation) => {

            const keyword =
                search.toLowerCase();

            return (

                conversation.visitor?.name
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                conversation.visitor?.email
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                conversation.chatbot?.name
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Conversations

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage all visitor conversations

                </p>

            </div>

            <ConversationStats
                stats={stats}
            />

            <ConversationFilters
                search={search}
                onSearchChange={setSearch}
            />

            <ConversationTable
                loading={loading}
                conversations={filteredConversations}
            />

        </div>

    );

}