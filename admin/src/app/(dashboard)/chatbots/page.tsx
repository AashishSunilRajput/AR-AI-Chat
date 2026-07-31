"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import chatbotService, {
    Chatbot
} from "@/services/chatbot.service";

import authService from "@/services/auth.service";

export default function ChatbotsPage() {

    const router = useRouter();

    const [chatbots, setChatbots] =
        useState<Chatbot[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [currentUser, setCurrentUser] =
        useState<any>(null);

    useEffect(() => {

        setCurrentUser(
            authService.getUser()
        );

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
        finally {

            setLoading(false);

        }

    };

    const handleStatus = async (
        id: number,
        isActive: boolean
    ) => {

        try {

            await chatbotService.updateStatus(
                id,
                isActive
            );

            loadChatbots();

        }
        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        if (
            !confirm(
                "Delete this chatbot?"
            )
        ) {
            return;
        }

        try {

            await chatbotService.delete(id);

            loadChatbots();

        }
        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (
            <div className="p-10">
                Loading Chatbots...
            </div>
        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Chatbots

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Manage AI Chatbots

                    </p>

                </div>

                {
                    currentUser?.role ===
                    "SUPER_ADMIN" && (

                        <button

                            onClick={() =>
                                router.push(
                                    "/chatbots/create"
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

                            + Add Chatbot

                        </button>

                    )
                }

            </div>

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

                                Slug

                            </th>

                            {
                                currentUser?.role ===
                                "SUPER_ADMIN" && (

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
                            chatbots.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={
                                            currentUser?.role ===
                                            "SUPER_ADMIN"
                                                ? 5
                                                : 4
                                        }
                                        className="
                                            p-10
                                            text-center
                                            text-slate-500
                                        "
                                    >

                                        No Chatbots Found

                                    </td>

                                </tr>

                            )
                        }

                        {
                            chatbots.map((chatbot) => (

                                <tr

                                    key={chatbot.id}

                                    className="
                                        border-b
                                        hover:bg-slate-50
                                    "

                                >

                                    <td className="p-4 font-medium">

                                        {chatbot.name}

                                    </td>

                                    <td className="p-4">

                                        {chatbot.slug}

                                    </td>

                                    {
                                        currentUser?.role ===
                                        "SUPER_ADMIN" && (

                                            <td className="p-4">

                                                {
                                                    chatbot.organization?.name ||
                                                    "-"
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
                                                    chatbot.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >

                                            {
                                                chatbot.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }

                                        </span>

                                    </td>

                                    <td className="p-4">

    <div className="flex flex-wrap gap-2">


        {/* Settings */}

        <button

            onClick={() =>
                router.push(
                    `/chatbots/${chatbot.id}/settings`
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

            ⚙️ Settings

        </button>



        {/* Widget Installation */}

        <button

            onClick={() =>
                router.push(
                    `/chatbots/${chatbot.id}/widget`
                )
            }

            className="
                rounded-lg
                bg-indigo-100
                px-3
                py-1
                text-sm
                text-indigo-700
                hover:bg-indigo-200
            "

        >

            🧩 Widget

        </button>




        {/* Edit */}

        <button

            onClick={() =>
                router.push(
                    `/chatbots/${chatbot.id}/edit`
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

            ✏️ Edit

        </button>




        {/* Status */}

        <button

            onClick={() =>
                handleStatus(
                    chatbot.id,
                    !chatbot.isActive
                )
            }

            className={`

                rounded-lg
                px-3
                py-1
                text-sm

                ${
                    chatbot.isActive

                    ?

                    "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"

                    :

                    "bg-green-100 text-green-700 hover:bg-green-200"

                }

            `}

        >

            {
                chatbot.isActive
                ? "Deactivate"
                : "Activate"
            }

        </button>




        {/* Delete */}

        <button

            onClick={() =>
                handleDelete(
                    chatbot.id
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

            🗑 Delete

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