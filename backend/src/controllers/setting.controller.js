import settingService from "../services/setting.service.js";

class SettingController {

    // ==========================================
    // Get Settings
    // ==========================================

    async getSettings(req, res, next) {
 
        try {
console.log(req.user);
            const data =
                await settingService.getSettings(
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
    // Update Organization Settings
    // ==========================================

    async updateOrganizationSettings(req, res, next) {

        try {

            const data =
                await settingService.updateOrganizationSettings(

                    req.user,

                    req.body

                );

            res.json({

                success: true,

                message: "Organization settings updated successfully.",

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Update Chatbot Settings
    // ==========================================

    async updateChatbotSettings(req, res, next) {

        try {

            const { chatbotId } = req.params;

            const data =
                await settingService.updateChatbotSettings(

                    Number(chatbotId),

                    req.body

                );

            res.json({

                success: true,

                message: "Chatbot settings updated successfully.",

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new SettingController();