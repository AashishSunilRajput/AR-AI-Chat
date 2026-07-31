import api from "./http";

export interface User {

    id: number;

    organizationId: number | null;

    name: string;

    email: string;

    role: string;

    isActive: boolean;

    organization?: {

        id: number;

        name: string;

    } | null;

    createdAt: string;

    updatedAt: string;

}

class UserService {

    // ==========================================
    // Get All Users
    // ==========================================

    async getUsers() {

        const response =
            await api.get("/users");

        return response.data;

    }

    // ==========================================
    // Get User By ID
    // ==========================================

    async getById(id: number) {

        const response =
            await api.get(
                `/users/${id}`
            );

        return response.data;

    }

    // ==========================================
    // Create User
    // ==========================================

    async create(data: any) {

        const response =
            await api.post(
                "/users",
                data
            );

        return response.data;

    }

    // ==========================================
    // Update User
    // ==========================================

    async update(
        id: number,
        data: any
    ) {

        const response =
            await api.put(
                `/users/${id}`,
                data
            );

        return response.data;

    }

    // ==========================================
    // Update User Status
    // ==========================================

    async updateStatus(
        id: number,
        isActive: boolean
    ) {

        const response =
            await api.patch(
                `/users/${id}/status`,
                {
                    isActive
                }
            );

        return response.data;

    }

    // ==========================================
    // Delete User
    // ==========================================

    async delete(id: number) {

        const response =
            await api.delete(
                `/users/${id}`
            );

        return response.data;

    }

}

export default new UserService();