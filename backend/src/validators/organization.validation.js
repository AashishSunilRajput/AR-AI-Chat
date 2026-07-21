import { z } from "zod";

class OrganizationValidation {

    updateProfile = z.object({

        name: z
            .string()
            .min(2, "Organization name is required"),

        phone: z
            .string()
            .optional(),

        website: z
            .string()
            .optional(),

        logo: z
            .string()
            .optional(),

        timezone: z
            .string()
            .min(1, "Timezone is required"),

        language: z
            .string()
            .min(1, "Language is required"),

        companyAddress: z
            .string()
            .optional(),

        companyCity: z
            .string()
            .optional(),

        companyState: z
            .string()
            .optional(),

        companyCountry: z
            .string()
            .optional()

    });

}

export default new OrganizationValidation();