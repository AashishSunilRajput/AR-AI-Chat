"use client";

import ExportButton from "@/components/common/ExportButton";

interface Props {

    search: string;

    type: string;

    isRead: string;

    onSearchChange: (value: string) => void;

    onTypeChange: (value: string) => void;

    onReadChange: (value: string) => void;

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

                        onSearchChange(

                            e.target.value

                        )

                    }

                    placeholder="Search notifications..."

                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"

                />

                {/* Type */}

                <select

                    value={type}

                    onChange={(e) =>

                        onTypeChange(

                            e.target.value

                        )

                    }

                    className="rounded-lg border px-4 py-2"

                >

                    <option value="ALL">

                        All Types

                    </option>

                    <option value="INFO">

                        Info

                    </option>

                    <option value="SUCCESS">

                        Success

                    </option>

                    <option value="WARNING">

                        Warning

                    </option>

                    <option value="ERROR">

                        Error

                    </option>

                </select>

                {/* Read Status */}

                <select

                    value={isRead}

                    onChange={(e) =>

                        onReadChange(

                            e.target.value

                        )

                    }

                    className="rounded-lg border px-4 py-2"

                >

                    <option value="ALL">

                        All

                    </option>

                    <option value="false">

                        Unread

                    </option>

                    <option value="true">

                        Read

                    </option>

                </select>

            </div>

            {/* Export */}

            <ExportButton

                title="Export"

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