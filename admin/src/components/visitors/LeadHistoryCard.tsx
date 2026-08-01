import Link from "next/link";
import { Visitor } from "@/services/visitor.service";

interface LeadHistoryCardProps {

    visitor: Visitor;

}

export default function LeadHistoryCard({

    visitor

}: LeadHistoryCardProps) {

    return (

        <div className="bg-white border rounded-xl p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">

                    Lead History

                </h2>

            </div>

            {

                visitor.leads?.length
                ?

                <div className="space-y-4">

                    {

                        visitor.leads.map(

                            (lead) => (

                                <div

                                    key={lead.id}

                                    className="flex items-center justify-between border rounded-lg p-4"

                                >

                                    <div>

                                        <p className="font-medium">

                                            {

                                                lead.name ||

                                                "Anonymous"

                                            }

                                        </p>

                                        <p className="text-sm text-slate-500">

                                            {

                                                lead.email ||

                                                "-"

                                            }

                                        </p>

                                        <p className="text-sm text-slate-500">

                                            {

                                                lead.status

                                            }

                                        </p>

                                    </div>

                                    <Link

                                        href={`/leads/${lead.id}`}

                                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"

                                    >

                                        View

                                    </Link>

                                </div>

                            )

                        )

                    }

                </div>

                :

                <p className="text-slate-500">

                    No leads found.

                </p>

            }

        </div>

    );

}