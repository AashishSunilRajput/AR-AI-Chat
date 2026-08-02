import { z } from "zod";

// ==========================================
// Update Organization Settings
// ==========================================

export const updateOrganizationSettingsSchema = z.object({

    companyAddress: z.string()
        .max(255)
        .optional()
        .or(z.literal("")),

    companyCity: z.string()
        .max(100)
        .optional()
        .or(z.literal("")),

    companyState: z.string()
        .max(100)
        .optional()
        .or(z.literal("")),

    companyCountry: z.string()
        .max(100)
        .optional()
        .or(z.literal("")),

    timezone: z.string()
        .min(1, "Timezone is required"),

    language: z.string()
        .min(1, "Language is required")

});

// ==========================================
// Update Chatbot Settings
// ==========================================

export const updateChatbotSettingsSchema = z.object({

    aiProvider: z.enum([
        "OPENAI",
        "GEMINI",
        "CLAUDE"
    ]).optional(),

    model: z.string()
        .optional(),

    temperature: z.number()
        .min(0)
        .max(2)
        .optional(),

    maxTokens: z.number()
        .min(100)
        .max(16000)
        .optional(),

    systemPrompt: z.string()
        .optional(),

    welcomeMessage: z.string()
        .optional(),

    primaryColor: z.string()
        .optional(),

    theme: z.enum([
        "LIGHT",
        "DARK",
        "AUTO"
    ]).optional(),

    position: z.enum([
        "BOTTOM_RIGHT",
        "BOTTOM_LEFT"
    ]).optional(),

    avatar: z.string()
        .optional(),

    isPublic: z.boolean()
        .optional()

});