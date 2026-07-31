"use client";

import { Upload, FileText } from "lucide-react";
import { ChangeEvent } from "react";

interface UploadCardProps {

    file: File | null;

    uploading: boolean;

    onFileChange: (file: File | null) => void;

    onUpload: () => void;

}

export default function UploadCard({

    file,

    uploading,

    onFileChange,

    onUpload

}: UploadCardProps) {

    const handleChange = (

        e: ChangeEvent<HTMLInputElement>

    ) => {

        onFileChange(

            e.target.files?.[0] || null

        );

    };

    return (

        <div
            className="
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="mb-6">

                <h2 className="text-xl font-semibold">

                    Upload Knowledge Document

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                    Upload PDF, DOCX or TXT files to train your AI chatbot.

                </p>

            </div>

            <label
                className="
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border-2
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    p-10
                    transition
                    hover:border-blue-500
                    hover:bg-blue-50
                "
            >

                <Upload
                    className="mb-4 text-blue-600"
                    size={48}
                />

                <h3 className="text-lg font-semibold">

                    Drag & Drop Files

                </h3>

                <p className="mt-2 text-sm text-slate-500">

                    or click to browse

                </p>

                <p className="mt-4 text-xs text-slate-400">

                    Supported: PDF, DOCX, TXT

                </p>

                <input

                    type="file"

                    accept=".pdf,.doc,.docx,.txt"

                    className="hidden"

                    onChange={handleChange}

                />

            </label>

            {file && (

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        bg-slate-50
                        p-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <FileText
                            className="text-blue-600"
                            size={22}
                        />

                        <div>

                            <p className="font-medium">

                                {file.name}

                            </p>

                            <p className="text-sm text-slate-500">

                                {(
                                    file.size /
                                    1024 /
                                    1024
                                ).toFixed(2)} MB

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onUpload}

                        disabled={uploading}

                        className="
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-2
                            text-white
                            transition
                            hover:bg-blue-700
                            disabled:opacity-60
                        "
                    >

                        {

                            uploading

                                ? "Uploading..."

                                : "Upload"

                        }

                    </button>

                </div>

            )}

        </div>

    );

}