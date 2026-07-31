import prisma from "../config/prisma.js";


class WidgetService {


    // ==========================================
    // Get Widget Config
    // ==========================================

    async getConfig(chatbot) {


        return {


            chatbotId:
                chatbot.id,


            chatbotName:
                chatbot.name,


            widgetKey:
                chatbot.widgetKey,


            settings:{


                welcomeMessage:

                    chatbot.settings?.welcomeMessage ||

                    "Hi 👋 How can I help you today?",



                theme:

                    chatbot.settings?.theme ||

                    "LIGHT",



                primaryColor:

                    chatbot.settings?.primaryColor ||

                    "#2563EB",



                position:

                    chatbot.settings?.position ||

                    "BOTTOM_RIGHT",



                avatar:

                    chatbot.settings?.avatar ||

                    null,



                model:

                    chatbot.settings?.model ||

                    "gpt-5-mini",



                temperature:

                    chatbot.settings?.temperature ??

                    0.7,



                maxTokens:

                    chatbot.settings?.maxTokens ??

                    1000


            }


        };


    }




    // ==========================================
    // Create Lead
    // ==========================================
async createLead(chatbot,data){

    return await prisma.lead.create({

        data:{

            organizationId:
            chatbot.organizationId,


            visitorId:
            data.visitorId || null,


            conversationId:
            data.conversationId || null,


            name:
            data.name || null,


            email:
            data.email || null,


            phone:
            data.phone || null,


            company:
            data.company || null,


            source:"widget"

        }

    });

}



}



export default new WidgetService();