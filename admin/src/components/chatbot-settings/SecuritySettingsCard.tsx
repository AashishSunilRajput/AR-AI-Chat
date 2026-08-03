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

    userRole: string;

}

export default function SecuritySettingsCard({

    form,

    setForm,

    onChange,

    userRole

}: Props) {

    const isClientAdmin =
        userRole === "CLIENT_ADMIN";

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                Security Settings

            </h2>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* Public Chatbot */}
                {/* ========================================== */}

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

                        disabled={isClientAdmin}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                isPublic:
                                    e.target.checked

                            })

                        }

                        className="
                            h-5
                            w-5
                            disabled:cursor-not-allowed
                        "

                    />

                </div>

                {/* ========================================== */}
                {/* Allowed Domains */}
                {/* ========================================== */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Allowed Domains

                    </label>

                    <textarea

                        name="allowedDomains"

                        rows={4}

                        placeholder={`example.com
demo.com`}

                        value={form.allowedDomains ?? ""}

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

                    />

                    <p className="mt-2 text-sm text-slate-500">

                        Enter one domain per line.

                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* Client Admin Notice */}
            {/* ========================================== */}

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

                    🔒 Security settings can only be changed by Super Admin.

                </div>

            }

        </div>

    );

}