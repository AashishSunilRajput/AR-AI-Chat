interface Props {
    stats: {
        total: number;
        active: number;
        closed: number;
        today: number;
    };
}

export default function ConversationStats({
    stats,
}: Props) {

    const cards = [
        {
            title: "Total",
            value: stats.total,
        },
        {
            title: "Active",
            value: stats.active,
        },
        {
            title: "Closed",
            value: stats.closed,
        },
        {
            title: "Today",
            value: stats.today,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <p className="text-sm text-slate-500">
                        {card.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {card.value}
                    </h2>
                </div>

            ))}

        </div>
    );
}