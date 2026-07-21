import { z } from "zod";

export const createKnowledgeBaseSchema = z.object({

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be less than 100 characters"),

    description: z
        .string()
        .max(500, "Description is too long")
        .optional(),

    chatbotId: z
        .number({
            required_error: "Chatbot is required"
        })
        .int()
        .positive()

});

export const updateKnowledgeBaseSchema = z.object({

    name: z
        .string()
        .min(3)
        .max(100)
        .optional(),

    description: z
        .string()
        .max(500)
        .optional(),

    isActive: z
        .boolean()
        .optional()

});