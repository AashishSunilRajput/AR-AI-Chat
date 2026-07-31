"use client";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function ConversationFilters({
    search,
    onSearchChange,
}: Props) {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <input
                type="text"
                value={search}
                placeholder="Search by visitor, email or chatbot..."
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
                className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-blue-500
                "
            />

        </div>
    );
}