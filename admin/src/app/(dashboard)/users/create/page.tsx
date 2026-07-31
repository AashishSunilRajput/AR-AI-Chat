"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import organizationService from "@/services/organization.service";

export default function CreateUserPage() {

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [organizations, setOrganizations] =
        useState<any[]>([]);

    const [form, setForm] = useState({

        organizationId: "",

        name: "",

        email: "",

        password: "",

        role: "MANAGER"

    });

    // ==========================================
    // Load Logged In User
    // ==========================================

    useEffect(() => {

        const user = authService.getUser();

        console.log("Current User:", user);

        setCurrentUser(user);

    }, []);

    // ==========================================
    // Load Organizations
    // ==========================================

    useEffect(() => {

        if (currentUser?.role === "SUPER_ADMIN") {

            loadOrganizations();

        }

    }, [currentUser]);

    const loadOrganizations = async () => {

        try {

            const response =
                await organizationService.getOrganizations();

            console.log("Organizations:", response);

            setOrganizations(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Handle Input
    // ==========================================

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

    // ==========================================
    // Submit
    // ==========================================

    const submit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            console.log("Form:", form);

            await userService.create(form);

            alert("User created successfully");

            router.push("/users");

        }
        catch (err: any) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "User creation failed"

            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-3xl space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Add User

                </h1>

                <p className="mt-2 text-slate-500">

                    Create a new user

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

                {
                    currentUser?.role === "SUPER_ADMIN" && (

                        <select

                            className="input"

                            name="organizationId"

                            value={form.organizationId}

                            onChange={handleChange}

                            required

                        >

                            <option value="">

                                Select Organization

                            </option>

                            {
                                organizations.map((org) => (

                                    <option

                                        key={org.id}

                                        value={org.id}

                                    >

                                        {org.name}

                                    </option>

                                ))
                            }

                        </select>

                    )
                }

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

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                    required

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

                <button

                    disabled={loading}

                    className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"

                >

                    {
                        loading
                            ? "Creating..."
                            : "Create User"
                    }

                </button>

            </form>

        </div>

    );

}