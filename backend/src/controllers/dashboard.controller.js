import dashboardService from "../services/dashboard.service.js";


class DashboardController {


    // ===========================================
    // Dashboard
    // ===========================================

    async getDashboard(req, res, next) {

        try {

            const dashboard = await dashboardService.getDashboard(
                req.user
            );


            return res.status(200).json({

                success: true,

                message: "Dashboard fetched successfully",

                data: dashboard

            });


        } catch (error) {

            next(error);

        }

    }


}


export default new DashboardController();