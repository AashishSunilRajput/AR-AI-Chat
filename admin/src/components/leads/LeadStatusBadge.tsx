interface LeadStatusBadgeProps {
    status:
        | "NEW"
        | "CONTACTED"
        | "QUALIFIED"
        | "CONVERTED"
        | "LOST";
}

export default function LeadStatusBadge({
    status,
}: LeadStatusBadgeProps) {

    const styles = {

        NEW:
            "bg-blue-100 text-blue-700",

        CONTACTED:
            "bg-yellow-100 text-yellow-700",

        QUALIFIED:
            "bg-purple-100 text-purple-700",

        CONVERTED:
            "bg-green-100 text-green-700",

        LOST:
            "bg-red-100 text-red-700",

    };

    return (

        <span
            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>

    );

}