import jwt from "jsonwebtoken";

export const generateToken = (user) => {

    return jwt.sign(
        {
            id: user.id,
            organizationId: user.organizationId,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

};

export const verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

};