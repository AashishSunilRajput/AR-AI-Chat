import api from "./api";

export interface Notification {

    id: number;

    organizationId: number | null;

    userId: number | null;

    title: string;

    message: string;

    type:
        | "NEW_LEAD"
        | "NEW_VISITOR"
        | "NEW_CONVERSATION"
        | "KNOWLEDGE_IMPORTED"
        | "KNOWLEDGE_FAILED"
        | "CHATBOT_UPDATED"
        | "CHATBOT_DISABLED"
        | "USER_CREATED"
        | "ORGANIZATION_CREATED"
        | "SYSTEM";

    entityType?:
        | "LEAD"
        | "CONVERSATION"
        | "VISITOR"
        | "KNOWLEDGE"
        | "CHATBOT"
        | "USER"
        | "ORGANIZATION"
        | "SYSTEM"
        | null;

    entityId?: number | null;

    isRead: boolean;

    createdAt: string;

    organization?: {

        id: number;

        name: string;

    };

    user?: {

        id: number;

        name: string;

        email: string;

    } | null;

}

export interface NotificationFilters {

    page?: number;

    limit?: number;

    search?: string;

    type?: string;

    isRead?: "ALL" | "true" | "false";

}

export interface NotificationStats {
    total: number;
    unread: number;
    read: number;
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


        console.log(
            "FILTERS:",
            filters
        );


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

    async markAsRead(id:number) {


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

    async deleteNotification(id:number) {


        const response =
            await api.delete(
                `/notifications/${id}`
            );


        return response.data;

    }


} // <-- ye class closing bracket hai


export default new NotificationService();

