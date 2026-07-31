"use client";

import { ChatbotSetting } from "@/services/chatbot-setting.service";

interface Props {

    form: ChatbotSetting;

    setForm: React.Dispatch<
        React.SetStateAction<ChatbotSetting | null>
    >;

    onChange: (

        e: React.ChangeEvent<

            HTMLInputElement |

            HTMLTextAreaElement

        >

    ) => void;

}

export default function SecuritySettingsCard({

    form,

    setForm,

    onChange

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                Security Settings

            </h2>

            <div className="space-y-6">

                {/* Public Chatbot */}

                <div className="flex items-center justify-between rounded-xl border p-4">

                    <div>

                        <h3 className="font-medium">

                            Public Chatbot

                        </h3>

                        <p className="text-sm text-slate-500">

                            Allow visitors to access this chatbot.

                        </p>

                    </div>

                    <input

                        type="checkbox"

                        checked={form.isPublic}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                isPublic:
                                    e.target.checked

                            })

                        }

                        className="h-5 w-5"

                    />

                </div>

                {/* Allowed Domains */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Allowed Domains

                    </label>

                    <textarea

                        name="allowedDomains"

                        rows={4}

                        placeholder="example.com&#10;demo.com"

                        value={form.allowedDomains ?? ""}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    />

                    <p className="mt-2 text-sm text-slate-500">

                        Enter one domain per line.

                    </p>

                </div>

            </div>

        </div>

    );

}