"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import chatbotService from "@/services/chatbot.service";
import knowledgeBaseService from "@/services/knowledge-base.service";

export default function CreateKnowledgeBasePage() {

    const router = useRouter();

    const [chatbots, setChatbots] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        name: "",

        description: "",

        chatbotId: ""

    });

    useEffect(() => {

        loadChatbots();

    }, []);

    const loadChatbots = async () => {

        try {

            const response =
                await chatbotService.getChatbots();

            setChatbots(
                response.data
            );

        }
        catch (error) {

            console.error(error);

        }

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await knowledgeBaseService.create({

                name: form.name,

                description: form.description,

                chatbotId: Number(form.chatbotId)

            });

            alert(
                "Knowledge Base created successfully"
            );

            router.push(
                "/knowledge-bases"
            );

        }
        catch (error: any) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to create Knowledge Base"

            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-3xl">

            <h1 className="mb-6 text-3xl font-bold">

                Create Knowledge Base

            </h1>

            <form

                onSubmit={handleSubmit}

                className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"

            >

                <div>

                    <label className="mb-2 block font-medium">

                        Name

                    </label>

                    <input

                        value={form.name}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                name: e.target.value

                            })

                        }

                        required

                        className="w-full rounded-xl border p-3"

                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Description

                    </label>

                    <textarea

                        rows={4}

                        value={form.description}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                description: e.target.value

                            })

                        }

                        className="w-full rounded-xl border p-3"

                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Chatbot

                    </label>

                    <select

                        required

                        value={form.chatbotId}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                chatbotId: e.target.value

                            })

                        }

                        className="w-full rounded-xl border p-3"

                    >

                        <option value="">

                            Select Chatbot

                        </option>

                        {

                            chatbots.map((chatbot) => (

                                <option

                                    key={chatbot.id}

                                    value={chatbot.id}

                                >

                                    {chatbot.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="flex gap-3">

                    <button

                        type="submit"

                        disabled={loading}

                        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"

                    >

                        {

                            loading

                                ? "Saving..."

                                : "Create"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() =>

                            router.back()

                        }

                        className="rounded-xl border px-6 py-3"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}