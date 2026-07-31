"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";

import userService, {
    User
} from "@/services/user.service";

export default function UsersPage() {

    const router = useRouter();
    const currentUser = authService.getUser();
    const [users, setUsers] =
        useState<User[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response =
                await userService.getUsers();

            setUsers(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const handleStatus = async (
        id: number,
        isActive: boolean
    ) => {

        try {

            await userService.updateStatus(
                id,
                isActive
            );

            loadUsers();

        }
        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        if (
            !confirm("Delete this user?")
        ) {
            return;
        }

        try {

            await userService.delete(id);

            loadUsers();

        }
        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="p-10">

                Loading Users...

            </div>

        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Users

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Manage all users

                    </p>

                </div>

                <button

                    onClick={() =>
                        router.push("/users/create")
                    }

                    className="
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-2
                        text-white
                        transition
                        hover:bg-blue-700
                    "

                >

                    + Add User

                </button>

            </div>

            {/* Table */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                "
            >

                <table className="w-full">

                    <thead
                        className="
                            border-b
                            bg-slate-50
                        "
                    >

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                           {
    currentUser?.role === "SUPER_ADMIN" && (

        <th className="p-4 text-left">

            Organization

        </th>

    )
}

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="
                                        border-b
                                        hover:bg-slate-50
                                    "
                                >

                                    <td className="p-4 font-medium">

                                        {user.name}

                                    </td>

                                    <td className="p-4">

                                        {user.email}

                                    </td>

                                    <td className="p-4">

                                        <span
                                            className="
                                                rounded-full
                                                bg-blue-100
                                                px-3
                                                py-1
                                                text-sm
                                                text-blue-700
                                            "
                                        >

                                            {user.role}

                                        </span>

                                    </td>

                                  {
    currentUser?.role === "SUPER_ADMIN" && (

        <td className="p-4">

            {
                user.organization?.name
                || "-"
            }

        </td>

    )
}

                                    <td className="p-4">

                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-sm
                                                ${
                                                    user.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >

                                            {
                                                user.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            <button

                                                onClick={() =>
                                                    router.push(
                                                        `/users/${user.id}/edit`
                                                    )
                                                }

                                                className="
                                                    rounded-lg
                                                    bg-blue-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    text-blue-700
                                                    hover:bg-blue-200
                                                "

                                            >

                                                Edit

                                            </button>

                                            <button

                                                onClick={() =>
                                                    handleStatus(
                                                        user.id,
                                                        !user.isActive
                                                    )
                                                }

                                                className={`
                                                    rounded-lg
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    ${
                                                        user.isActive
                                                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                            : "bg-green-100 text-green-700 hover:bg-green-200"
                                                    }
                                                `}

                                            >

                                                {
                                                    user.isActive
                                                        ? "Deactivate"
                                                        : "Activate"
                                                }

                                            </button>

                                            <button

                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }

                                                className="
                                                    rounded-lg
                                                    bg-red-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    text-red-700
                                                    hover:bg-red-200
                                                "

                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}