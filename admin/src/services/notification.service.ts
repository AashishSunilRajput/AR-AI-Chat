import api from "./api";

export interface Notification {
    id: number;

    organizationId?: number | null;

    userId?: number | null;

    title: string;

    message: string;

    type:
        | "INFO"
        | "SUCCESS"
        | "WARNING"
        | "ERROR";

    isRead: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface NotificationStats {
    total: number;
    unread: number;
    read: number;
}

export interface NotificationFilters {
    page?: number;
    limit?: number;
    search?: string;
    isRead?: boolean;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface NotificationListResponse {
    data: Notification[];
    pagination: Pagination;
}

class NotificationService {

    // ======================================
    // Get Notifications
    // ======================================

    async getNotifications(
        filters?: NotificationFilters
    ): Promise<NotificationListResponse> {

        const response =
            await api.get(
                "/notifications",
                {
                    params: filters
                }
            );

        return response.data;
    }

    // ======================================
    // Notification Stats
    // ======================================

    async getStats(): Promise<{
        success: boolean;
        data: NotificationStats;
    }> {

        const response =
            await api.get(
                "/notifications/stats"
            );

        return response.data;
    }

    // ======================================
    // Mark As Read
    // ======================================

    async markAsRead(id: number) {

        const response =
            await api.patch(
                `/notifications/${id}/read`
            );

        return response.data;
    }

    // ======================================
    // Mark All As Read
    // ======================================

    async markAllAsRead() {

        const response =
            await api.patch(
                "/notifications/read-all"
            );

        return response.data;
    }

    // ======================================
    // Delete Notification
    // ======================================

    async deleteNotification(id: number) {

        const response =
            await api.delete(
                `/notifications/${id}`
            );

        return response.data;
    }

    
}

export default new NotificationService();