"use client";

import { useRouter } from "next/navigation";

import {
    Bot,
    Plus,
    Users,
    BookOpen,
    MessageSquare,
    Building2,
    Settings
} from "lucide-react";

interface Props {

    userRole: string;

}

export default function QuickActions({

    userRole

}: Props) {

    const router = useRouter();

    const actions =
        userRole === "SUPER_ADMIN"
            ? [
                {
                    title: "Organizations",
                    icon: Building2,
                    href: "/organizations"
                },
                {
                    title: "Users",
                    icon: Users,
                    href: "/users"
                },
                {
                    title: "Chatbots",
                    icon: Bot,
                    href: "/chatbots"
                },
                {
                    title: "Knowledge Bases",
                    icon: BookOpen,
                    href: "/knowledge-bases"
                },
                {
                    title: "Dashboard",
                    icon: Plus,
                    href: "/dashboard"
                }
            ]
            : [
                {
                    title: "Chatbots",
                    icon: Bot,
                    href: "/chatbots"
                },
                {
                    title: "Knowledge Bases",
                    icon: BookOpen,
                    href: "/knowledge-bases"
                },
                {
                    title: "Conversations",
                    icon: MessageSquare,
                    href: "/conversations"
                },
                {
                    title: "Leads",
                    icon: Users,
                    href: "/leads"
                },
                {
                    title: "Settings",
                    icon: Settings,
                    href: "/settings"
                }
            ];

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                Quick Actions

            </h3>

            <div className="grid grid-cols-2 gap-4">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button

                            key={action.title}

                            onClick={() => router.push(action.href)}

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

                })}

            </div>

        </div>

    );

}