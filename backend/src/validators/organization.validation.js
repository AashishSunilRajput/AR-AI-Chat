import { z } from "zod";


class OrganizationValidation {



    create = z.object({

        name: z
            .string()
            .min(
                2,
                "Organization name required"
            ),


        email: z
            .string()
            .email(),


        phone: z
            .string()
            .optional(),


        website: z
            .string()
            .optional(),


        plan: z
            .string()
            .optional(),



        adminName: z
            .string()
            .min(
                2,
                "Admin name required"
            ),


        adminEmail: z
            .string()
            .email(),


        password: z
            .string()
            .min(
                6,
                "Password minimum 6 characters"
            )


    });




    updateProfile = z.object({

        name: z.string(),

        phone: z.string().optional(),

        website: z.string().optional(),

        logo: z.string().optional(),

        timezone: z.string(),

        language: z.string(),

        companyAddress: z.string().optional(),

        companyCity: z.string().optional(),

        companyState: z.string().optional(),

        companyCountry: z.string().optional()

    });


}


export default new OrganizationValidation();