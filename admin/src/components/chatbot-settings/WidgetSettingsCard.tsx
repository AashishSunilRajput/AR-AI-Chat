"use client";

import { ChatbotSetting } from "@/services/chatbot-setting.service";

interface Props {

    form: ChatbotSetting;

    onChange: (

        e: React.ChangeEvent<

            HTMLInputElement |

            HTMLSelectElement |

            HTMLTextAreaElement

        >

    ) => void;

}

export default function WidgetSettingsCard({

    form,

    onChange

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                Widget Settings

            </h2>

            <div className="grid gap-6">

                {/* Welcome Message */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Welcome Message

                    </label>

                    <textarea

                        name="welcomeMessage"

                        rows={3}

                        value={form.welcomeMessage}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    />

                </div>

                {/* Color */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Primary Color

                    </label>

                    <div className="flex items-center gap-3">

                        <input

                            type="color"

                            name="primaryColor"

                            value={form.primaryColor}

                            onChange={onChange}

                            className="h-12 w-16 cursor-pointer rounded-lg border"

                        />

                        <input

                            type="text"

                            name="primaryColor"

                            value={form.primaryColor}

                            onChange={onChange}

                            className="flex-1 rounded-xl border p-3"

                        />

                    </div>

                </div>

                {/* Theme */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Theme

                    </label>

                    <select

                        name="theme"

                        value={form.theme}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    >

                        <option value="LIGHT">

                            Light

                        </option>

                        <option value="DARK">

                            Dark

                        </option>

                    </select>

                </div>

                {/* Position */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Widget Position

                    </label>

                    <select

                        name="position"

                        value={form.position}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

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

        </div>

    );

}