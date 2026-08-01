import { VisitorStats } from "@/services/visitor.service";

interface VisitorStatsGridProps {

    stats: VisitorStats;

}

export default function VisitorStatsGrid({

    stats

}: VisitorStatsGridProps) {

    const cards = [

        {

            title: "Total Visitors",

            value: stats.total

        },

        {

            title: "Active Visitors",

            value: stats.active

        },

        {

            title: "Today's Visitors",

            value: stats.today

        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {

                cards.map((card) => (

                    <div

                        key={card.title}

                        className="bg-white border rounded-xl p-6"

                    >

                        <p className="text-sm text-slate-500">

                            {card.title}

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}