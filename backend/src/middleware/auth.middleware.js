import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Access token is required"
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({

            where: {
                id: decoded.id
            },

            include: {
                organization: true
            }

        });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User not found"
            });

        }

        if (!user.isActive) {

            return res.status(403).json({
                success: false,
                message: "User account is inactive"
            });

        }

        // ============================================
        // SUPER ADMIN
        // ============================================

        if (user.role === "SUPER_ADMIN") {

            req.user = {

                id: user.id,

                organizationId: null,

                role: user.role,

                name: user.name,

                email: user.email

            };

            return next();

        }

        // ============================================
        // CLIENT ORGANIZATION
        // ============================================

        if (!user.organization) {

            return res.status(403).json({
                success: false,
                message: "Organization not found"
            });

        }

        if (user.organization.status !== "ACTIVE") {

            return res.status(403).json({
                success: false,
                message: "Organization is inactive"
            });

        }

        req.user = {

            id: user.id,

            organizationId: user.organizationId,

            role: user.role,

            name: user.name,

            email: user.email,

            organization: {
                id: user.organization.id,
                name: user.organization.name,
                slug: user.organization.slug,
                plan: user.organization.plan,
                status: user.organization.status
            }

        };

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token"

        });

    }

};

export default authMiddleware;