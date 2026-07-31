interface Props {
    status: string;
}

export default function ConversationStatusBadge({
    status,
}: Props) {

    const active = status === "ACTIVE";

    return (
        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                    active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }
            `}
        >
            {status}
        </span>
    );
}