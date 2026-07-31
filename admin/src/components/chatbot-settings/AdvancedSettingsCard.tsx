"use client";

import { ChatbotSetting } from "@/services/chatbot-setting.service";

interface Props {

    form: ChatbotSetting;

    onChange: (

        e: React.ChangeEvent<HTMLTextAreaElement>

    ) => void;

}

export default function AdvancedSettingsCard({

    form,

    onChange

}: Props) {

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

                    value={form.systemPrompt || ""}

                    onChange={onChange}

                    placeholder="You are a helpful AI assistant. Answer politely and accurately..."

                    className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-500"

                />

                <p className="mt-2 text-sm text-slate-500">

                    This prompt controls your AI assistant's behavior, tone,
                    personality, and response style.

                </p>

                <div className="mt-2 flex justify-end">

                    <span className="text-xs text-slate-400">

                        {(form.systemPrompt || "").length} Characters

                    </span>

                </div>

            </div>

        </div>

    );

}