import {
    Bot,
    Users,
    MessageSquare,
    Activity
} from "lucide-react";

import StatsCard from "./StatsCard";

interface Props {

    stats: {

        totalChatbots: number;

        totalLeads: number;

        totalConversations: number;

        totalUsers: number;

    };

}

export default function StatsGrid({

    stats

}: Props) {

    return (

        <div
            className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            <StatsCard
                title="Chatbots"
                value={stats?.totalChatbots || 0}
                subtitle="AI Assistants"
                icon={Bot}
                color="bg-blue-600"
            />

            <StatsCard
                title="Leads"
                value={stats?.totalLeads || 0}
                subtitle="Captured Leads"
                icon={Users}
                color="bg-green-600"
            />

            <StatsCard
                title="Conversations"
                value={stats?.totalConversations || 0}
                subtitle="Total Chats"
                icon={MessageSquare}
                color="bg-violet-600"
            />

            <StatsCard
                title="Users"
                value={stats?.totalUsers || 0}
                subtitle="Organization Users"
                icon={Activity}
                color="bg-orange-500"
            />

        </div>

    );

}