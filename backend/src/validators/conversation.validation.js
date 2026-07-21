import { z } from "zod";

export const startConversationSchema = z.object({

    visitorId: z.number(),

    chatbotId: z.number()

});