"use client";

import { useEffect, useState } from "react";

import conversationService, {
    Conversation,
    ConversationStats as ConversationStatsType,
    Pagination,
} from "@/services/conversation.service";

import ConversationStats from "@/components/conversations/ConversationStats";
import ConversationFilters from "@/components/conversations/ConversationFilters";
import ConversationTable from "@/components/conversations/ConversationTable";
import PaginationComponent from "@/components/common/Pagination";
import ExportButton from "@/components/common/ExportButton";

export default function ConversationsPage() {

    const [loading, setLoading] =
        useState(true);

    const [conversations, setConversations] =
        useState<Conversation[]>([]);

    const [stats, setStats] =
        useState<ConversationStatsType>({
            total: 0,
            active: 0,
            closed: 0,
            today: 0,
        });

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [pagination, setPagination] =
        useState<Pagination>({
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
        });
        const [exportLoading, setExportLoading] =
    useState(false);

    const handleExport = async (
    format: "csv" | "xlsx" | "pdf"
) => {

    try {

        setExportLoading(true);

        await conversationService.exportConversations(
            format,
            {
                search
            }
        );

    } catch (error) {

        console.error(error);

        alert("Export failed");

    } finally {

        setExportLoading(false);

    }

};

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

                conversationService.getConversations({

                    search,

                    page,

                    limit: 10,

                }),

                conversationService.getStats(),

            ]);

            setConversations(
                conversationsResponse.data
            );

            setPagination(
                conversationsResponse.pagination
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

    }, [

        search,

        page

    ]);

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

    <div>

        <h1 className="text-3xl font-bold">
            Conversations
        </h1>

        <p className="mt-2 text-slate-500">
            Manage all visitor conversations
        </p>

    </div>

    <ExportButton
        onExport={handleExport}
        loading={exportLoading}
    />

</div>

            {/* Stats */}

            <ConversationStats

                stats={stats}

            />

            {/* Search */}

            <ConversationFilters

                search={search}

                onSearchChange={(value) => {

                    setSearch(value);

                    setPage(1);

                }}

            />

            {/* Table */}

            <ConversationTable

                loading={loading}

                conversations={conversations}

            />

            {/* Pagination */}

            <PaginationComponent

                currentPage={pagination.page}

                totalPages={pagination.totalPages}

                onPageChange={setPage}

            />

        </div>

    );

}