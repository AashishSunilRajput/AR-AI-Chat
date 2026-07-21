import { z } from "zod";

export const updateChatbotSettingSchema = z.object({

    aiProvider: z.enum([
        "OPENAI",
        "GEMINI",
        "CLAUDE"
    ]).optional(),

    model: z.string().optional(),

    temperature: z.number()
        .min(0)
        .max(2)
        .optional(),

    maxTokens: z.number()
        .min(100)
        .max(8000)
        .optional(),

    systemPrompt: z.string().optional(),

    welcomeMessage: z.string().optional(),

    primaryColor: z.string().optional(),

    avatar: z.string().optional(),

    theme: z.enum([
        "LIGHT",
        "DARK",
        "AUTO"
    ]).optional(),

    position: z.enum([
        "BOTTOM_RIGHT",
        "BOTTOM_LEFT"
    ]).optional(),

    allowedDomains: z.array(
        z.string()
    ).optional(),

    isPublic: z.boolean().optional()

});