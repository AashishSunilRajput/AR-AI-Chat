import { Visitor } from "@/services/visitor.service";

interface VisitorActivityCardProps {

    visitor: Visitor;

}

export default function VisitorActivityCard({

    visitor

}: VisitorActivityCardProps) {

    const totalConversations =
        visitor.conversations?.length || 0;

    const totalLeads =
        visitor.leads?.length || 0;

    const totalMessages =
        visitor.conversations?.reduce(

            (total, conversation) =>

                total +
                (conversation._count?.messages || 0),

            0

        ) || 0;

    const lastSeen =
        new Date(visitor.lastSeenAt);

    const isActive =
        (Date.now() - lastSeen.getTime()) <
        1000 * 60 * 5;

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white border rounded-xl p-6">

                <p className="text-sm text-slate-500">

                    Conversations

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {totalConversations}

                </h2>

            </div>

            <div className="bg-white border rounded-xl p-6">

                <p className="text-sm text-slate-500">

                    Leads

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {totalLeads}

                </h2>

            </div>

            <div className="bg-white border rounded-xl p-6">

                <p className="text-sm text-slate-500">

                    Messages

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {totalMessages}

                </h2>

            </div>

            <div className="bg-white border rounded-xl p-6">

                <p className="text-sm text-slate-500">

                    Status

                </p>

                <div className="mt-2">

                    <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                        }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>

            </div>

        </div>

    );

}