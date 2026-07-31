import { LucideIcon } from "lucide-react";

interface Props {

    title: string;

    value: string | number;

    subtitle: string;

    icon: LucideIcon;

    color: string;

}

export default function StatsCard({

    title,

    value,

    subtitle,

    icon: Icon,

    color

}: Props) {

    return (

        <div
            className="
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-3xl font-bold">

                        {value}

                    </h2>

                    <p className="mt-2 text-sm text-slate-400">

                        {subtitle}

                    </p>

                </div>

                <div

                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-xl
                        text-white
                        ${color}
                    `}

                >

                    <Icon size={28} />

                </div>

            </div>

        </div>

    );

}