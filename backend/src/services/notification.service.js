import notificationRepository from "../repositories/notification.repository.js";

class NotificationService {

    // ==========================================
    // Create Notification
    // ==========================================

    async create(data) {

        return await notificationRepository.create(

            data

        );

    }

    // ==========================================
    // Get Notification By Id
    // ==========================================

    async get(id, user) {

        const notification =
            await notificationRepository.findById(id);

        if (!notification) {

            throw new Error(
                "Notification not found"
            );

        }

        if (

            user.role !== "SUPER_ADMIN"

            &&

            notification.organizationId !==
            user.organizationId

        ) {

            throw new Error(
                "Unauthorized"
            );

        }

        return notification;

    }

    // ==========================================
    // Get All Notifications
    // ==========================================

    async getAll(

        user,

        filters = {}

    ) {

        if (

            user.role === "SUPER_ADMIN"

        ) {

            return await notificationRepository.findAll(

                filters

            );

        }

        return await notificationRepository.findByOrganization(

            user.organizationId,

            filters

        );

    }

    // ==========================================
    // Mark Notification Read
    // ==========================================

    async markAsRead(

        id,

        user

    ) {

        const notification =
            await this.get(

                id,

                user

            );

        return await notificationRepository.markAsRead(

            notification.id

        );

    }

    // ==========================================
    // Mark All Notifications Read
    // ==========================================

    async markAllAsRead(user) {

        if (

            user.role === "SUPER_ADMIN"

        ) {

            return await notificationRepository.markAllAsRead();

        }

        return await notificationRepository.markAllAsRead(

            user.organizationId

        );

    }

    // ==========================================
    // Delete Notification
    // ==========================================

    async delete(

        id,

        user

    ) {

        const notification =
            await this.get(

                id,

                user

            );

        return await notificationRepository.delete(

            notification.id

        );

    }

    // ==========================================
    // Notification Stats
    // ==========================================

    async getStats(user) {

        if (

            user.role === "SUPER_ADMIN"

        ) {

            return await notificationRepository.getStats();

        }

        return await notificationRepository.getStats(

            user.organizationId

        );

    }

}

export default new NotificationService();