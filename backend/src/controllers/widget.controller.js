import widgetService from "../services/widget.service.js";

class WidgetController {

    // ==========================================
    // Widget Config
    // ==========================================

    async getConfig(req, res, next) {

        try {

            const data =
                await widgetService.getConfig(

                    req.chatbot

                );

            return res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new WidgetController();