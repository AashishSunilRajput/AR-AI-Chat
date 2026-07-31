import {

    Bot,

    Plus,

    Users,

    BookOpen

} from "lucide-react";

const actions = [

    {

        title: "New Chatbot",

        icon: Bot

    },

    {

        title: "Add Knowledge",

        icon: BookOpen

    },

    {

        title: "Create Lead",

        icon: Users

    },

    {

        title: "New Organization",

        icon: Plus

    }

];

export default function QuickActions() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                Quick Actions

            </h3>

            <div className="grid grid-cols-2 gap-4">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <button

                                key={action.title}

                                className="rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"

                            >

                                <Icon

                                    size={28}

                                    className="mx-auto mb-3 text-blue-600"

                                />

                                <p className="text-sm font-medium">

                                    {action.title}

                                </p>

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

}