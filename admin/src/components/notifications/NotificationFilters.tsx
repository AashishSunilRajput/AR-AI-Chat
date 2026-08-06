"use client";

import ExportButton from "@/components/common/ExportButton";

interface Props {

    search: string;

    type: string;

    isRead: "ALL" | "true" | "false";

    onSearchChange: (value: string) => void;

    onTypeChange: (value: string) => void;

    onReadChange: (value: "ALL" | "true" | "false") => void;

}

export default function NotificationFilters({

    search,

    type,

    isRead,

    onSearchChange,

    onTypeChange,

    onReadChange

}: Props) {

    return (

        <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-1 flex-col gap-4 md:flex-row">

                {/* Search */}

                <input

                    type="text"

                    value={search}

                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }

                    placeholder="Search notifications..."

                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"

                />

                {/* Type */}

                <select

                    value={type}

                    onChange={(e) =>
                        onTypeChange(e.target.value)
                    }

                    className="rounded-lg border px-4 py-2"

                >

                    <option value="ALL">All Types</option>

                    <option value="NEW_LEAD">New Lead</option>

                    <option value="NEW_VISITOR">New Visitor</option>

                    <option value="NEW_CONVERSATION">New Conversation</option>

                    <option value="KNOWLEDGE_IMPORTED">Knowledge Imported</option>

                    <option value="KNOWLEDGE_FAILED">Knowledge Failed</option>

                    <option value="CHATBOT_UPDATED">Chatbot Updated</option>

                    <option value="CHATBOT_DISABLED">Chatbot Disabled</option>

                    <option value="USER_CREATED">User Created</option>

                    <option value="ORGANIZATION_CREATED">Organization Created</option>

                    <option value="SYSTEM">System</option>

                </select>

                {/* Read Status */}

                <select

                    value={isRead}

                    onChange={(e) =>
                        onReadChange(
                            e.target.value as "ALL" | "true" | "false"
                        )
                    }

                    className="rounded-lg border px-4 py-2"

                >

                    <option value="ALL">All</option>

                    <option value="false">Unread</option>

                    <option value="true">Read</option>

                </select>

            </div>

            {/* Export */}

            <ExportButton

                onExport={(format) => {

                    window.open(

                        `/api/export/notifications?format=${format}`,

                        "_blank"

                    );

                }}

            />

        </div>

    );

}