import notificationService from "../services/notification.service.js";

class NotificationController {

    // ==========================================
    // Create Notification
    // ==========================================

    async create(req, res, next) {

        try {

            const notification =
                await notificationService.create(

                    req.body

                );

            return res.status(201).json({

                success: true,

                message:
                    "Notification created successfully",

                data: notification

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get All Notifications
    // ==========================================

    async getAll(req, res, next) {

        try {

            const filters = {

                search: req.query.search,

                type: req.query.type,

                isRead: req.query.isRead,

                page: req.query.page || 1,

                limit: req.query.limit || 10

            };

            const notifications =
                await notificationService.getAll(

                    req.user,

                    filters

                );

            return res.status(200).json({

                success: true,

                data: notifications.data,

                pagination:
                    notifications.pagination

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get Notification
    // ==========================================

    async get(req, res, next) {

        try {

            const notification =
                await notificationService.get(

                    req.params.id,

                    req.user

                );

            return res.status(200).json({

                success: true,

                data: notification

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Mark As Read
    // ==========================================

    async markAsRead(req, res, next) {

        try {

            const notification =
                await notificationService.markAsRead(

                    req.params.id,

                    req.user

                );

            return res.status(200).json({

                success: true,

                message:
                    "Notification marked as read",

                data: notification

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Mark All As Read
    // ==========================================

    async markAllAsRead(req, res, next) {

        try {

            await notificationService.markAllAsRead(

                req.user

            );

            return res.status(200).json({

                success: true,

                message:
                    "All notifications marked as read"

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Delete Notification
    // ==========================================

    async delete(req, res, next) {

        try {

            await notificationService.delete(

                req.params.id,

                req.user

            );

            return res.status(200).json({

                success: true,

                message:
                    "Notification deleted successfully"

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Notification Stats
    // ==========================================

    // ==========================================
// Notification Stats
// ==========================================

async getStats(req, res, next) {

    try {

        const stats =
            await notificationService.getStats(

                req.user

            );

        return res.status(200).json({

            success: true,

            data: stats

        });

    }

    catch (error) {

        next(error);

    }

}

}

export default new NotificationController();