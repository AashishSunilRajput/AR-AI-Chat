import api from "@/lib/axios";

export interface WidgetInstallation {

    id: number;

    organizationId: number;

    name: string;

    slug: string;

    description: string;

    isActive: boolean;

    widgetKey: string;

    allowedDomains: string[];

    createdAt: string;

    updatedAt: string;

}

class WidgetInstallationService {

    // ==========================
    // Get Chatbot
    // ==========================

    async getChatbot(id: number) {

        const response = await api.get(

            `/chatbots/${id}`

        );

        return response.data;

    }

    // ==========================
    // Update Allowed Domains
    // ==========================

    async updateAllowedDomains(

        id: number,

        allowedDomains: string[]

    ) {

        const response = await api.put(

            `/chatbots/${id}`,

            {

                allowedDomains

            }

        );

        return response.data;

    }

}

export default new WidgetInstallationService();