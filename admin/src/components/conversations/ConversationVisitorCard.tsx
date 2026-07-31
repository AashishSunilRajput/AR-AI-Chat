interface Visitor {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    sessionToken?: string | null;
}

interface Props {
    visitor?: Visitor;
}

export default function ConversationVisitorCard({
    visitor,
}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">

                Visitor Details

            </h2>

            <div className="space-y-4 text-sm">

                <InfoRow
                    label="Name"
                    value={visitor?.name || "Anonymous"}
                />

                <InfoRow
                    label="Email"
                    value={visitor?.email || "-"}
                />

                <InfoRow
                    label="Phone"
                    value={visitor?.phone || "-"}
                />

                <InfoRow
                    label="IP Address"
                    value={visitor?.ipAddress || "-"}
                />

                <InfoRow
                    label="Browser"
                    value={visitor?.userAgent || "-"}
                />

                <InfoRow
                    label="Session"
                    value={visitor?.sessionToken || "-"}
                />

            </div>

        </div>

    );

}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {

    return (

        <div>

            <p className="text-xs text-slate-500">

                {label}

            </p>

            <p className="mt-1 break-all font-medium">

                {value}

            </p>

        </div>

    );

}