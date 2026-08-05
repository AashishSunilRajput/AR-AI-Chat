"use client";

import notificationService, {
    Notification,
} from "@/services/notification.service";

interface Props {

    notification: Notification;

    onRefresh: () => void;

}

export default function NotificationActions({

    notification,

    onRefresh

}: Props) {

    // ==========================================
    // Mark As Read
    // ==========================================

    const handleMarkAsRead = async () => {

        try {

            await notificationService.markAsRead(

                notification.id

            );

            onRefresh();

        }

        catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Delete Notification
    // ==========================================

    const handleDelete = async () => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this notification?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await notificationService.deleteNotification(

                notification.id

            );

            onRefresh();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="flex items-center justify-end gap-2">

            {

                !notification.isRead && (

                    <button

                        onClick={handleMarkAsRead}

                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"

                    >

                        Read

                    </button>

                )

            }

            <button

                onClick={handleDelete}

                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"

            >

                Delete

            </button>

        </div>

    );

}