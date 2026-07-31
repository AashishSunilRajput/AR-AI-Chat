"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import knowledgeBaseService, {
    KnowledgeBase
} from "@/services/knowledge-base.service";

import authService from "@/services/auth.service";

export default function KnowledgeBasesPage() {

    const router = useRouter();

    const [knowledgeBases, setKnowledgeBases] =
        useState<KnowledgeBase[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [currentUser, setCurrentUser] =
        useState<any>(null);

    useEffect(() => {

        setCurrentUser(
            authService.getUser()
        );

        loadKnowledgeBases();

    }, []);

    const loadKnowledgeBases = async () => {

        try {

            const response =
                await knowledgeBaseService.getKnowledgeBases();

            setKnowledgeBases(
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

    const handleDelete = async (
        id: number
    ) => {

        if (
            !confirm(
                "Delete this Knowledge Base?"
            )
        ) {
            return;
        }

        try {

            await knowledgeBaseService.delete(id);

            loadKnowledgeBases();

        }
        catch (error) {

            console.error(error);

            alert(
                "Unable to delete Knowledge Base"
            );

        }

    };

    if (loading) {

        return (
            <div className="p-10">
                Loading Knowledge Bases...
            </div>
        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Knowledge Bases

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Manage chatbot knowledge sources

                    </p>

                </div>

                <button

                    onClick={() =>
                        router.push(
                            "/knowledge-bases/create"
                        )
                    }

                    className="
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-2
                        text-white
                        hover:bg-blue-700
                    "

                >

                    + Add Knowledge Base

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

                                Chatbot

                            </th>

                            <th className="p-4 text-left">

                                Documents

                            </th>

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
                            knowledgeBases.length === 0 && (

                                <tr>

                                    <td

                                        colSpan={5}

                                        className="
                                            p-10
                                            text-center
                                            text-slate-500
                                        "

                                    >

                                        No Knowledge Bases Found

                                    </td>

                                </tr>

                            )
                        }

                        {
                            knowledgeBases.map((kb) => (

                                <tr

                                    key={kb.id}

                                    className="
                                        border-b
                                        hover:bg-slate-50
                                    "

                                >

                                    <td className="p-4">

                                        <div className="font-medium">

                                            {kb.name}

                                        </div>

                                        <div className="text-sm text-slate-500">

                                            {kb.description || "-"}

                                        </div>

                                    </td>

                                    <td className="p-4">

                                        {kb.chatbot?.name || "-"}

                                    </td>

                                  <td className="p-4">
    {kb._count?.documents || 0}
</td>

                                    <td className="p-4">

                                        <span
                                            className={`

                                                rounded-full
                                                px-3
                                                py-1
                                                text-sm

                                                ${
                                                    kb.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }

                                            `}
                                        >

                                            {
                                                kb.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2 flex-wrap">

                                            <button

                                                onClick={() =>
                                                    router.push(
                                                        `/knowledge-bases/${kb.id}/edit`
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
                                                    router.push(
                                                        `/knowledge-bases/${kb.id}/documents`
                                                    )
                                                }

                                                className="
                                                    rounded-lg
                                                    bg-purple-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    text-purple-700
                                                    hover:bg-purple-200
                                                "

                                            >

                                                Documents

                                            </button>

                                            <button

                                                onClick={() =>
                                                    handleDelete(
                                                        kb.id
                                                    )
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