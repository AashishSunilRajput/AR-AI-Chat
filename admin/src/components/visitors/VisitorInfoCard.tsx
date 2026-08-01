import { Visitor } from "@/services/visitor.service";

interface VisitorInfoCardProps {

    visitor: Visitor;

}

export default function VisitorInfoCard({

    visitor

}: VisitorInfoCardProps) {

    return (

        <div className="bg-white rounded-xl border p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">

                    Visitor Information

                </h2>

                <p className="text-sm text-slate-500">

                    Basic information about this visitor

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                    <p className="text-sm text-slate-500">

                        Name

                    </p>

                    <p className="font-medium">

                        {visitor.name || "Anonymous"}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Email

                    </p>

                    <p className="font-medium">

                        {visitor.email || "-"}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Chatbot

                    </p>

                    <p className="font-medium">

                        {visitor.chatbot?.name || "-"}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        IP Address

                    </p>

                    <p className="font-medium break-all">

                        {visitor.ipAddress || "-"}

                    </p>

                </div>

                <div className="md:col-span-2">

                    <p className="text-sm text-slate-500">

                        Session Token

                    </p>

                    <p className="font-mono text-sm break-all">

                        {visitor.sessionToken}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Created

                    </p>

                    <p className="font-medium">

                        {new Date(visitor.createdAt).toLocaleString()}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Last Seen

                    </p>

                    <p className="font-medium">

                        {new Date(visitor.lastSeenAt).toLocaleString()}
                    </p>

                </div>

            </div>

        </div>

    );

}