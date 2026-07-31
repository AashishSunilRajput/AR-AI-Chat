"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import userService from "@/services/user.service";
import authService from "@/services/auth.service";

export default function EditUserPage() {

    const router = useRouter();

    const params = useParams();

    const id = Number(params.id);

    const currentUser = authService.getUser();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        role: "MANAGER"

    });

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const response =
                await userService.getById(id);

            setForm({

                name: response.data.name,

                email: response.data.email,

                password: "",

                role: response.data.role

            });

        }
        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Failed to load user"

            );

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (

        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >

    ) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };

    const submit = async (

        e: React.FormEvent

    ) => {

        e.preventDefault();

        try {

            setSaving(true);

            setError("");

            await userService.update(

                id,

                form

            );

            alert("User updated successfully");

            router.push("/users");

        }
        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Update failed"

            );

        }
        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="p-10">

                Loading User...

            </div>

        );

    }

    return (

        <div className="max-w-3xl space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Edit User

                </h1>

                <p className="mt-2 text-slate-500">

                    Update user details

                </p>

            </div>

            {
                error && (

                    <div className="rounded-xl bg-red-100 p-4 text-red-700">

                        {error}

                    </div>

                )
            }

            <form

                onSubmit={submit}

                className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"

            >

                <input

                    className="input"

                    name="name"

                    placeholder="Full Name"

                    value={form.name}

                    onChange={handleChange}

                    required

                />

                <input

                    className="input"

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />

                <input

                    className="input"

                    type="password"

                    name="password"

                    placeholder="Leave blank to keep current password"

                    value={form.password}

                    onChange={handleChange}

                />

                <select

                    className="input"

                    name="role"

                    value={form.role}

                    onChange={handleChange}

                >

                    {
                        currentUser?.role === "SUPER_ADMIN" && (

                            <option value="CLIENT_ADMIN">

                                Client Admin

                            </option>

                        )
                    }

                    <option value="MANAGER">

                        Manager

                    </option>

                    <option value="AGENT">

                        Agent

                    </option>

                </select>

                <div className="flex gap-3">

                    <button

                        type="submit"

                        disabled={saving}

                        className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"

                    >

                        {

                            saving

                                ? "Updating..."

                                : "Update User"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() => router.push("/users")}

                        className="rounded-xl border px-6 py-2 hover:bg-gray-100"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}