import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {

    async login(data) {

        const { email, password } = data;

        // Find User
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                organization: true
            }
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Check Password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Check User Status
        if (!user.isActive) {
            throw new Error("User account is inactive");
        }

        // ===================================================
        // SUPER ADMIN LOGIN
        // ===================================================

        if (user.role === "SUPER_ADMIN") {

            const token = generateToken({
                id: user.id,
                organizationId: null,
                role: user.role
            });

            return {
                token,
                user: {
                    id: user.id,
                    organizationId: null,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                organization: null
            };

        }

        // ===================================================
        // CLIENT ORGANIZATION CHECK
        // ===================================================

        if (!user.organization) {
            throw new Error("Organization not found");
        }

        if (user.organization.status !== "ACTIVE") {
            throw new Error("Organization is inactive");
        }

        // Generate JWT
        const token = generateToken({
            id: user.id,
            organizationId: user.organizationId,
            role: user.role
        });

        return {

            token,

            user: {
                id: user.id,
                organizationId: user.organizationId,
                name: user.name,
                email: user.email,
                role: user.role
            },

            organization: {
                id: user.organization.id,
                name: user.organization.name,
                slug: user.organization.slug,
                plan: user.organization.plan
            }

        };

    }

}

export default new AuthService();