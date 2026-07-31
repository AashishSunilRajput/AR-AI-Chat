"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import knowledgeBaseService from "@/services/knowledge-base.service";

export default function EditKnowledgeBasePage() {

    const router = useRouter();

    const params = useParams();

    const id = Number(params.id);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [form, setForm] = useState({

        name: "",

        description: "",

        isActive: true

    });

    useEffect(() => {

        loadKnowledgeBase();

    }, []);

    const loadKnowledgeBase = async () => {

        try {

            const response =
                await knowledgeBaseService.getKnowledgeBase(
                    id
                );

            const kb = response.data;

            setForm({

                name:
                    kb.name,

                description:
                    kb.description || "",

                isActive:
                    kb.isActive

            });

        }
        catch (error) {

            console.error(error);

            alert(
                "Unable to load Knowledge Base"
            );

        }
        finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setSaving(true);

            await knowledgeBaseService.update(

                id,

                {

                    name:
                        form.name,

                    description:
                        form.description,

                    isActive:
                        form.isActive

                }

            );

            alert(
                "Knowledge Base updated successfully"
            );

            router.push(
                "/knowledge-bases"
            );

        }
        catch (error: any) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to update Knowledge Base"

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

        <div className="max-w-3xl">

            <h1 className="mb-6 text-3xl font-bold">

                Edit Knowledge Base

            </h1>

            <form

                onSubmit={handleSubmit}

                className="
                    space-y-6
                    rounded-2xl
                    border
                    bg-white
                    p-6
                    shadow-sm
                "

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

                        className="
                            w-full
                            rounded-xl
                            border
                            p-3
                        "

                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Description

                    </label>

                    <textarea

                        rows={5}

                        value={form.description}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                description:
                                    e.target.value

                            })

                        }

                        className="
                            w-full
                            rounded-xl
                            border
                            p-3
                        "

                    />

                </div>

                <div className="flex items-center gap-3">

                    <input

                        id="active"

                        type="checkbox"

                        checked={form.isActive}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                isActive:
                                    e.target.checked

                            })

                        }

                    />

                    <label
                        htmlFor="active"
                    >

                        Active

                    </label>

                </div>

                <div className="flex gap-3">

                    <button

                        type="submit"

                        disabled={saving}

                        className="
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-3
                            text-white
                            hover:bg-blue-700
                            disabled:opacity-50
                        "

                    >

                        {

                            saving

                                ? "Saving..."

                                : "Update"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() =>
                            router.back()
                        }

                        className="
                            rounded-xl
                            border
                            px-6
                            py-3
                        "

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}