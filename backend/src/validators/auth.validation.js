import { z } from "zod";

class AuthValidation {

    // ============================
    // Register Validation
    // ============================

    register = z.object({

        name: z
            .string()
            .min(2, "Name is required"),

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters")

    });

    // ============================
    // Login Validation
    // ============================

    login = z.object({

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password is required")

    });

}

export default new AuthValidation();