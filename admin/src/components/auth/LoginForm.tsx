"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {

    Eye,

    EyeOff,

    Loader2

} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

    const router = useRouter();

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(

        e: React.FormEvent

    ) {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            await login({

                email,

                password

            });

            router.push("/dashboard");

        }

        catch (err: any) {

            setError(

                err?.response?.data?.message ||

                "Invalid email or password"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <form

            onSubmit={handleSubmit}

            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl"

        >

            <h2 className="text-3xl font-bold">

                Welcome Back

            </h2>

            <p className="mt-2 text-slate-500">

                Login to continue

            </p>

            <div className="mt-8 space-y-5">

                {

                    error && (

                        <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600">

                            {error}

                        </div>

                    )

                }

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Email

                    </label>

                    <input

                        type="email"

                        value={email}

                        onChange={(e) =>

                            setEmail(

                                e.target.value

                            )

                        }

                        placeholder="admin@example.com"

                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"

                        required

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Password

                    </label>

                    <div className="relative">

                        <input

                            type={

                                showPassword

                                    ? "text"

                                    : "password"

                            }

                            value={password}

                            onChange={(e) =>

                                setPassword(

                                    e.target.value

                                )

                            }

                            placeholder="••••••••"

                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"

                            required

                        />

                        <button

                            type="button"

                            onClick={() =>

                                setShowPassword(

                                    !showPassword

                                )

                            }

                            className="absolute right-4 top-1/2 -translate-y-1/2"

                        >

                            {

                                showPassword

                                    ?

                                    <EyeOff size={20} />

                                    :

                                    <Eye size={20} />

                            }

                        </button>

                    </div>

                </div>

                <button

                    type="submit"

                    disabled={loading}

                    className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"

                >

                    {

                        loading

                            ?

                            <Loader2

                                className="animate-spin"

                                size={20}

                            />

                            :

                            "Sign In"

                    }

                </button>

            </div>

        </form>

    );

}