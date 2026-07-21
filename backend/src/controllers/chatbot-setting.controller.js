import chatbotSettingService from "../services/chatbot-setting.service.js";

class ChatbotSettingController {

    async getSettings(req, res, next) {

        try {

            const data =
                await chatbotSettingService.getSettings(

                    req.params.chatbotId,

                    req.user

                );

            return res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            next(error);

        }

    }

    async updateSettings(req, res, next) {

        try {

            const data =
                await chatbotSettingService.updateSettings(

                    req.params.chatbotId,

                    req.user,

                    req.body

                );

            return res.status(200).json({

                success: true,

                message: "Settings updated successfully",

                data

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new ChatbotSettingController();