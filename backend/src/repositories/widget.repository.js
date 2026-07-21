import prisma from "../config/prisma.js";

class WidgetRepository {

    async findByWidgetKey(widgetKey) {

        return await prisma.chatbot.findUnique({

            where: {
                widgetKey
            },

            include: {
                settings: true
            }

        });

    }

}

export default new WidgetRepository();