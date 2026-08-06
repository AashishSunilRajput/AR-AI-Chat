"use client";

import NotificationTypeBadge from "./NotificationTypeBadge";
import NotificationActions from "./NotificationActions";

import { Notification } from "@/services/notification.service";
import Link from "next/link";

interface Props {

    loading: boolean;

    notifications: Notification[];

    onRefresh: () => void;

}

export default function NotificationTable({

    loading,

    notifications,

    onRefresh

}: Props) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-xl border bg-white p-10 text-center">

                Loading notifications...

            </div>

        );

    }

    // ==========================================
    // Empty
    // ==========================================

    if (notifications.length === 0) {

        return (

            <div className="rounded-xl border bg-white p-10 text-center text-slate-500">

                No notifications found.

            </div>

        );

    }

    return (

        <div className="overflow-x-auto rounded-xl border bg-white">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-3 text-left text-sm font-semibold">

                            Title

                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold">

                            Message

                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold">

                            Type

                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold">

                            Status

                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold">

                            Date

                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">
    Open
</th>

                        <th className="px-6 py-3 text-right text-sm font-semibold">

                            Actions

                        </th>
                        

                    </tr>

                </thead>

                <tbody>

                    {

                        notifications.map((notification) => (

                            <tr

                                key={notification.id}

                                className="border-t hover:bg-slate-50"

                            >

                                {/* Title */}

                                <td className="px-6 py-4">

                                    <div className="font-medium">

                                        {

                                            notification.title

                                        }

                                    </div>

                                </td>

                                {/* Message */}

                                <td className="px-6 py-4">

                                    <div className="max-w-md truncate text-slate-600">

                                        {

                                            notification.message

                                        }

                                    </div>

                                </td>

                                {/* Type */}

                                <td className="px-6 py-4 text-center">

                                    <NotificationTypeBadge

                                        type={notification.type}

                                    />

                                </td>

                                {/* Read Status */}

                                <td className="px-6 py-4 text-center">

                                    {

                                        notification.isRead ? (

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                                Read

                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                                                Unread

                                            </span>

                                        )

                                    }

                                </td>

                                {/* Date */}

                                <td className="px-6 py-4 whitespace-nowrap">

                                    {

                                        new Date(

                                            notification.createdAt

                                        ).toLocaleString()

                                    }

                                </td>
                             <td className="px-6 py-4 text-center">

    {notification.entityType === "LEAD" && (
        <Link
            href={`/leads/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "CONVERSATION" && (
        <Link
            href={`/conversations/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "VISITOR" && (
        <Link
            href={`/visitors/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "CHATBOT" && (
        <Link
            href={`/chatbots/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "KNOWLEDGE" && (
        <Link
            href={`/knowledge-documents/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "USER" && (
        <Link
            href={`/users/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {notification.entityType === "ORGANIZATION" && (
        <Link
            href={`/organizations/${notification.entityId}`}
            className="text-blue-600 hover:underline"
        >
            Open
        </Link>
    )}

    {!notification.entityType && (
        <span className="text-slate-400">-</span>
    )}

</td>

<td className="px-6 py-4 text-right">
    <NotificationActions
        notification={notification}
        onRefresh={onRefresh}
    />
</td>

                               

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}