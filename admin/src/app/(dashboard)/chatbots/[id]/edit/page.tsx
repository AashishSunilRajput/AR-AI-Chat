"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import chatbotService from "@/services/chatbot.service";

export default function EditChatbotPage() {

    const router = useRouter();

    const params = useParams();

    const id = Number(params.id);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        name: "",

        slug: "",

        description: ""

    });

    useEffect(() => {

        loadChatbot();

    }, []);

    const loadChatbot = async () => {

        try {

            const response =
                await chatbotService.getById(id);

            const chatbot =
                response.data;

            setForm({

                name: chatbot.name,

                slug: chatbot.slug,

                description:
                    chatbot.description || ""

            });

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (

        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
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

            await chatbotService.update(

                id,

                form

            );

            alert(
                "Chatbot updated successfully"
            );

            router.push(
                "/chatbots"
            );

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

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-3xl space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Edit Chatbot

                </h1>

                <p className="mt-2 text-slate-500">

                    Update chatbot details

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

                <div className="flex gap-3">

                    <button

                        type="submit"

                        disabled={saving}

                        className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"

                    >

                        {

                            saving

                                ? "Updating..."

                                : "Update Chatbot"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() =>
                            router.push("/chatbots")
                        }

                        className="rounded-xl border px-6 py-2"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}