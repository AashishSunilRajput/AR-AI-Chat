import {
    Users,
    UserPlus,
    PhoneCall,
    BadgeCheck,
    Trophy,
    XCircle,
} from "lucide-react";

interface LeadStatsProps {
    stats: {
        total: number;
        new: number;
        contacted: number;
        qualified: number;
        converted: number;
        lost: number;
    };
}

export default function LeadStats({
    stats,
}: LeadStatsProps) {

    const cards = [

        {
            title: "Total Leads",
            value: stats.total,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },

        {
            title: "New",
            value: stats.new,
            icon: UserPlus,
            color: "text-cyan-600",
            bg: "bg-cyan-50",
        },

        {
            title: "Contacted",
            value: stats.contacted,
            icon: PhoneCall,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
        },

        {
            title: "Qualified",
            value: stats.qualified,
            icon: BadgeCheck,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },

        {
            title: "Converted",
            value: stats.converted,
            icon: Trophy,
            color: "text-green-600",
            bg: "bg-green-50",
        },

        {
            title: "Lost",
            value: stats.lost,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50",
        },

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="bg-white rounded-xl border p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">

                                    {card.title}

                                </p>

                                <h2 className="mt-2 text-3xl font-bold">

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className={`h-12 w-12 rounded-lg flex items-center justify-center ${card.bg}`}
                            >

                                <Icon
                                    className={`h-6 w-6 ${card.color}`}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}