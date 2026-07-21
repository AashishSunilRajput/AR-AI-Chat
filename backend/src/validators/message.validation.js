import { z } from "zod";

export const sendMessageSchema = z.object({

    conversationId:

        z.number()

            .positive(),

    message:

        z.string()

            .min(1)

            .max(5000)

});