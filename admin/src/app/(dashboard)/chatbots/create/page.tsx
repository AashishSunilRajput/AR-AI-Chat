"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import chatbotService from "@/services/chatbot.service";
import organizationService from "@/services/organization.service";

export default function CreateChatbotPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [organizations, setOrganizations] =
        useState<any[]>([]);

    const [form, setForm] = useState({

        organizationId: "",

        name: "",

        slug: "",

        description: ""

    });

    useEffect(() => {

        loadOrganizations();

    }, []);

    const loadOrganizations = async () => {

        try {

            const response =
                await organizationService.getOrganizations();

            setOrganizations(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }

    };

    const generateSlug = (
        value: string
    ) => {

        return value

            .toLowerCase()

            .replace(/[^a-z0-9]+/g, "-")

            .replace(/^-|-$/g, "");

    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        if (name === "name") {

            setForm({

                ...form,

                name: value,

                slug: generateSlug(value)

            });

            return;

        }

        setForm({

            ...form,

            [name]: value

        });

    };

    const submit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            await chatbotService.create(form);

            alert(
                "Chatbot created successfully"
            );

            router.push(
                "/chatbots"
            );

        }
        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Failed to create chatbot"

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

                    Add Chatbot

                </h1>

                <p className="mt-2 text-slate-500">

                    Create a new AI Chatbot

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

                <input

                    className="input"

                    name="name"

                    placeholder="Chatbot Name"

                    value={form.name}

                    onChange={handleChange}

                    required

                />

                <input

                    className="input"

                    name="slug"

                    placeholder="Slug"

                    value={form.slug}

                    onChange={handleChange}

                    required

                />

                <textarea

                    className="input min-h-28"

                    name="description"

                    placeholder="Description"

                    value={form.description}

                    onChange={handleChange}

                />

                <button

                    disabled={loading}

                    className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"

                >

                    {

                        loading

                            ? "Creating..."

                            : "Create Chatbot"

                    }

                </button>

            </form>

        </div>

    );

}