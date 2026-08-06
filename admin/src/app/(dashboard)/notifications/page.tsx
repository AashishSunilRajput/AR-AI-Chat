"use client";

import { useEffect, useState } from "react";

import notificationService, {
    Notification,
    NotificationStats as NotificationStatsType,
    Pagination,
} from "@/services/notification.service";

import NotificationStats from "@/components/notifications/NotificationStats";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationTable from "@/components/notifications/NotificationTable";
import PaginationComponent from "@/components/common/Pagination";

export default function NotificationsPage() {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    const [stats, setStats] =
        useState<NotificationStatsType>({
            total: 0,
            unread: 0,
            read: 0,
        });

    const [search, setSearch] =
        useState("");

    const [type, setType] =
        useState("ALL");

    const [isRead, setIsRead] =
    useState<"ALL" | "true" | "false">("ALL");

    const [page, setPage] =
        useState(1);

    const [pagination, setPagination] =
        useState<Pagination>({
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
        });

    // ======================================
    // Load Data
    // ======================================

    const loadData = async () => {

        try {

            setLoading(true);

            const [

                notificationsResponse,

                statsResponse,

            ] = await Promise.all([

                notificationService.getNotifications({

                    search,

                    type,

                    isRead,

                    page,

                    limit: 10,

                }),

                notificationService.getStats(),

            ]);
            

            setNotifications(
                notificationsResponse.data
            );

            setPagination(
                notificationsResponse.pagination
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

        type,

        isRead,

        page,

    ]);

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">

                    Notifications

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage all system notifications

                </p>

            </div>

            {/* Stats */}

            <NotificationStats

                stats={stats}

            />

            {/* Filters */}

            <NotificationFilters

                search={search}

                type={type}

                isRead={isRead}

                onSearchChange={(value) => {

                    setSearch(value);

                    setPage(1);

                }}

                onTypeChange={(value) => {

                    setType(value);

                    setPage(1);

                }}

                onReadChange={(value) => {

                    setIsRead(value);

                    setPage(1);

                }}

            />

            {/* Table */}

            <NotificationTable

                loading={loading}

                notifications={notifications}

                onRefresh={loadData}

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