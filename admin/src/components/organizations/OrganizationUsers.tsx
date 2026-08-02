"use client";

import { Shield, UserCheck, User } from "lucide-react";

interface Props {
    users: any[];
}

export default function OrganizationUsers({
    users,
}: Props) {

    const getRoleColor = (role: string) => {

        switch (role) {

            case "CLIENT_ADMIN":
                return "bg-purple-100 text-purple-700";

            case "MANAGER":
                return "bg-blue-100 text-blue-700";

            case "AGENT":
                return "bg-green-100 text-green-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    const getRoleIcon = (role: string) => {

        switch (role) {

            case "CLIENT_ADMIN":
                return (
                    <Shield className="h-4 w-4" />
                );

            case "MANAGER":
                return (
                    <UserCheck className="h-4 w-4" />
                );

            default:
                return (
                    <User className="h-4 w-4" />
                );

        }

    };

    return (

        <div className="rounded-2xl border bg-white shadow-sm">

            <div className="border-b p-6">

                <h2 className="text-xl font-semibold">

                    Organization Users

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                    Total Users : {users.length}

                </p>

            </div>

            {
                users.length === 0 ? (

                    <div className="p-10 text-center text-slate-500">

                        No users found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50">

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

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    users.map((user) => (

                                        <tr
                                            key={user.id}
                                            className="border-t hover:bg-slate-50"
                                        >

                                            <td className="p-4">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-slate-200
                                                        font-semibold
                                                        "
                                                    >

                                                        {
                                                            user.name
                                                                ?.charAt(0)
                                                                .toUpperCase()
                                                        }

                                                    </div>

                                                    <span className="font-medium">

                                                        {user.name}

                                                    </span>

                                                </div>

                                            </td>

                                            <td className="p-4">

                                                {user.email}

                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-sm
                                                        font-medium
                                                        ${getRoleColor(user.role)}
                                                    `}
                                                >

                                                    {getRoleIcon(user.role)}

                                                    {
                                                        user.role.replace(
                                                            "_",
                                                            " "
                                                        )
                                                    }

                                                </span>

                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-sm
                                                        font-medium

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

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}