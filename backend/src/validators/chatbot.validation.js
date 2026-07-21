import { z } from "zod";

export const createChatbotSchema = z.object({

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100),

    slug: z
        .string()
        .min(3)
        .max(100),

    description: z
        .string()
        .optional()

});

export const updateChatbotSchema = createChatbotSchema.partial();