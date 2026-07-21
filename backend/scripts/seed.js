import "dotenv/config";

import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function seed() {

    try {

        console.log("=================================");
        console.log("Creating Super Admin...");
        console.log("=================================");

        const email = "admin@araichat.com";

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {

            console.log("✅ Super Admin already exists.");

            return;
        }

        const hashedPassword = await bcrypt.hash(
            "Admin@123",
            10
        );

        const superAdmin = await prisma.user.create({

            data: {

                name: "Super Admin",

                email,

                password: hashedPassword,

                role: "SUPER_ADMIN",

                organizationId: null,

                isActive: true

            }

        });

        console.log("=================================");
        console.log("✅ Super Admin Created");
        console.log("=================================");

        console.log(superAdmin);

    } catch (error) {

        console.error(error);

    } finally {

        await prisma.$disconnect();

    }

}

seed();