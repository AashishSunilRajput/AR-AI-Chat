import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

class UserService {

    // ==============================
    // Create User
    // ==============================

    async create(user, data) {

        const {
            name,
            email,
            password,
            role
        } = data;

        // Check Email
        const emailExists = await userRepository.findByEmail(email);

        if (emailExists) {
            throw new Error("Email already exists");
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create User
        return await userRepository.create({

            organizationId: user.organizationId,

            name,

            email,

            password: hashedPassword,

            role,

            isActive: true

        });

    }

    // ==============================
    // Get All Users
    // ==============================

    async getAll(user) {

        return await userRepository.getAllUsers(
            user.organizationId
        );

    }

    // ==============================
    // Get User By Id
    // ==============================

    async getById(user, id) {

        const existingUser = await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );

        if (!existingUser) {
            throw new Error("User not found");
        }

        return existingUser;

    }

    // ==============================
    // Update User
    // ==============================

    async update(user, id, data) {

        const existingUser = await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );

        if (!existingUser) {
            throw new Error("User not found");
        }

        const updateData = {

            name: data.name,

            email: data.email,

            role: data.role

        };

        if (data.password && data.password.trim() !== "") {

            updateData.password = await bcrypt.hash(
                data.password,
                10
            );

        }

        return await userRepository.update(

            Number(id),

            updateData

        );

    }

    // ==============================
    // Update Status
    // ==============================

    async updateStatus(user, id, isActive) {

        const existingUser = await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );

        if (!existingUser) {
            throw new Error("User not found");
        }

        return await userRepository.updateStatus(

            Number(id),

            isActive

        );

    }

    // ==============================
    // Delete User
    // ==============================

    async delete(user, id) {

        const existingUser = await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );

        if (!existingUser) {
            throw new Error("User not found");
        }

        await userRepository.delete(
            Number(id)
        );

        return {
            message: "User deleted successfully"
        };

    }

}

export default new UserService();