"use client";

import { ChatbotSetting } from "@/services/chatbot-setting.service";

interface Props {

    form: ChatbotSetting;

    onChange: (

        e: React.ChangeEvent<

            HTMLInputElement |

            HTMLSelectElement

        >

    ) => void;

}

export default function AISettingsCard({

    form,

    onChange

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">

                AI Configuration

            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        AI Provider

                    </label>

                    <select

                        name="aiProvider"

                        value={form.aiProvider}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    >

                        <option value="OPENAI">

                            OpenAI

                        </option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Model

                    </label>

                    <input

                        name="model"

                        value={form.model}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Temperature

                    </label>

                    <input

                        type="number"

                        step="0.1"

                        min="0"

                        max="2"

                        name="temperature"

                        value={form.temperature}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Max Tokens

                    </label>

                    <input

                        type="number"

                        name="maxTokens"

                        value={form.maxTokens}

                        onChange={onChange}

                        className="w-full rounded-xl border p-3"

                    />

                </div>

            </div>

        </div>

    );

}