import { z } from "zod";

class UserValidation {

    // ============================
    // Create User
    // ============================

    create = z.object({

        name: z
            .string()
            .min(2, "Name is required"),

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        role: z
            .enum([
                "CLIENT_ADMIN",
                "MANAGER",
                "AGENT",
                "USER"
            ])

    });

    // ============================
    // Update User
    // ============================

    update = z.object({

        name: z
            .string()
            .min(2, "Name is required"),

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .optional(),

        role: z
            .enum([
                "CLIENT_ADMIN",
                "MANAGER",
                "AGENT",
                "USER"
            ])

    });

    // ============================
    // Update Status
    // ============================

    updateStatus = z.object({

        isActive: z.boolean()

    });

}

export default new UserValidation();