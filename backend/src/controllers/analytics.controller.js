import analyticsService from "../services/analytics.service.js";

class AnalyticsController {

    // ==========================================
    // Overview
    // ==========================================

    async getOverview(req, res, next) {

        try {

            const data =
                await analyticsService.getOverview(
                    req.user
                );

            res.json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Lead Analytics
    // ==========================================

    async getLeadAnalytics(req, res, next) {

        try {

            const data =
                await analyticsService.getLeadAnalytics(
                    req.user
                );

            res.json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
// Visitor Analytics
// ==========================================

async getVisitorAnalytics(req, res, next) {

    try {

        const data =
            await analyticsService.getVisitorAnalytics(
                req.user
            );


        res.json({

            success: true,

            data

        });

    }

    catch(error) {

        next(error);

    }

}

// ==========================================
// Conversation Analytics
// ==========================================

async getConversationAnalytics(req, res, next) {

    try {


        const data =
            await analyticsService.getConversationAnalytics(
                req.user
            );


        res.json({

            success: true,

            data

        });


    }

    catch(error) {

        next(error);

    }

}

}

export default new AnalyticsController();