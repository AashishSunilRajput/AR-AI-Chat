"use client";

import { ChatbotSetting } from "@/services/chatbot-setting.service";

interface Props {

    form: ChatbotSetting;

    onChange: (
        e: React.ChangeEvent<
            HTMLTextAreaElement
        >
    ) => void;

    userRole: string;

}

export default function AdvancedSettingsCard({

    form,

    onChange,

    userRole

}: Props) {

    const isClientAdmin =
        userRole === "CLIENT_ADMIN";

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                Advanced Settings

            </h2>

            <div>

                <label className="mb-2 block text-sm font-medium">

                    System Prompt

                </label>

                <textarea

                    name="systemPrompt"

                    rows={10}

                    value={form.systemPrompt ?? ""}

                    onChange={onChange}

                    disabled={isClientAdmin}

                    className="
                        w-full
                        rounded-xl
                        border
                        p-3
                        disabled:bg-slate-100
                        disabled:cursor-not-allowed
                    "

                    placeholder="You are a helpful AI assistant..."

                />

                <p className="mt-2 text-sm text-slate-500">

                    This prompt controls how the AI behaves during conversations.

                </p>

            </div>

            {

                isClientAdmin &&

                <div
                    className="
                        mt-6
                        rounded-xl
                        border
                        border-yellow-200
                        bg-yellow-50
                        px-4
                        py-3
                        text-sm
                        text-yellow-700
                    "
                >

                    🔒 System Prompt can only be changed by Super Admin.

                </div>

            }

        </div>

    );

}