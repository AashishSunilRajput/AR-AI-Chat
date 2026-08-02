"use client";

import { useState } from "react";

import settingService from "@/services/setting.service";
import { toast } from "sonner";
interface Props {
    chatbot: any;
    onUpdated?: () => void;
}

export default function ChatbotSettings({
    chatbot,
    onUpdated,
}: Props) {

    const settings = chatbot.settings;

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({

        welcomeMessage:
            settings?.welcomeMessage || "",

        systemPrompt:
            settings?.systemPrompt || "",

        primaryColor:
            settings?.primaryColor || "#2563EB",

        theme:
            settings?.theme || "LIGHT",

        position:
            settings?.position || "BOTTOM_RIGHT",

    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSave = async () => {

        try {

            setLoading(true);

            await settingService.updateChatbotSettings(

                chatbot.id,

                form

            );

            toast.success(
    "Chatbot settings updated successfully."
);

            onUpdated?.();

        }

        catch (error) {

            console.error(error);

           toast.error(
    "Something went wrong."
);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Chatbot Settings

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* ============================= */}
                {/* View Only */}
                {/* ============================= */}

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Chatbot Name

                    </label>

                    <input
                        value={chatbot.name}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        AI Provider

                    </label>

                    <input
                        value={settings.aiProvider}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        AI Model

                    </label>

                    <input
                        value={settings.model}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Temperature

                    </label>

                    <input
                        value={settings.temperature}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Max Tokens

                    </label>

                    <input
                        value={settings.maxTokens}
                        disabled
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2"
                    />

                </div>

                {/* ============================= */}
                {/* Editable */}
                {/* ============================= */}

                <div className="md:col-span-2">

                    <label className="mb-1 block text-sm font-medium">

                        Welcome Message

                    </label>

                    <input
                        name="welcomeMessage"
                        value={form.welcomeMessage}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div className="md:col-span-2">

                    <label className="mb-1 block text-sm font-medium">

                        System Prompt

                    </label>

                    <textarea
                        rows={6}
                        name="systemPrompt"
                        value={form.systemPrompt}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Primary Color

                    </label>

                    <input
                        type="color"
                        name="primaryColor"
                        value={form.primaryColor}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border"
                    />

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Theme

                    </label>

                    <select
                        name="theme"
                        value={form.theme}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    >

                        <option value="LIGHT">

                            Light

                        </option>

                        <option value="DARK">

                            Dark

                        </option>

                        <option value="AUTO">

                            Auto

                        </option>

                    </select>

                </div>

                <div>

                    <label className="mb-1 block text-sm font-medium">

                        Widget Position

                    </label>

                    <select
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    >

                        <option value="BOTTOM_RIGHT">

                            Bottom Right

                        </option>

                        <option value="BOTTOM_LEFT">

                            Bottom Left

                        </option>

                    </select>

                </div>

            </div>

            <div className="mt-6 flex justify-end">

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >

                    {loading
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>

    );

}