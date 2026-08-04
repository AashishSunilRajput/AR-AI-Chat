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

    onSuggestedQuestionChange: (
        index: number,
        value: string
    ) => void;

    addSuggestedQuestion: () => void;

    removeSuggestedQuestion: (
        index: number
    ) => void;

}

export default function WidgetSettingsCard({

    form,

    onChange,

    onSuggestedQuestionChange,

    addSuggestedQuestion,

    removeSuggestedQuestion

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

                {/* Primary Color */}

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

                {/* Suggested Questions */}

                <div>

                    <div className="mb-3 flex items-center justify-between">

                        <label className="text-sm font-medium">

                            Suggested Questions

                        </label>

                        <button

                            type="button"

                            onClick={addSuggestedQuestion}

                            disabled={
                                (form.suggestedQuestions?.length || 0) >= 8
                            }

                            className="
                                rounded-lg
                                bg-blue-600
                                px-3
                                py-2
                                text-sm
                                text-white
                                hover:bg-blue-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "

                        >

                            + Add Question

                        </button>

                    </div>

                    <div className="space-y-3">

                        {

                            (form.suggestedQuestions || []).map(

                                (question, index) => (

                                    <div

                                        key={index}

                                        className="flex items-center gap-2"

                                    >

                                        <input

                                            type="text"

                                            value={question}

                                            placeholder={`Question ${index + 1}`}

                                            onChange={(e) =>

                                                onSuggestedQuestionChange(

                                                    index,

                                                    e.target.value

                                                )

                                            }

                                            className="
                                                flex-1
                                                rounded-xl
                                                border
                                                p-3
                                            "

                                        />

                                        <button

                                            type="button"

                                            onClick={() =>

                                                removeSuggestedQuestion(index)

                                            }

                                            className="
                                                rounded-xl
                                                border
                                                border-red-200
                                                px-4
                                                py-3
                                                text-red-600
                                                transition
                                                hover:bg-red-50
                                            "

                                        >

                                            ✕

                                        </button>

                                    </div>

                                )

                            )

                        }

                    </div>

                    <p className="mt-2 text-xs text-slate-500">

                        These questions will appear when the widget opens.
                        Maximum 8 questions.

                    </p>

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