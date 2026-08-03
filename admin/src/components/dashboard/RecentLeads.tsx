interface Props {

    leads: any[];

}

export default function RecentLeads({

    leads

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold">

                Recent Leads

            </h3>

            <div className="space-y-4">

                {

                    leads.length === 0 ?

                    (

                        <div className="py-8 text-center text-slate-500">

                            No recent leads

                        </div>

                    )

                    :

                    leads.map((lead: any) => (

                        <div

                            key={lead.id}

                            className="flex items-center justify-between border-b pb-3 last:border-none"

                        >

                            <div>

                                <h4 className="font-medium">

                                    {lead.visitor?.name || "-"}

                                </h4>

                                <p className="text-sm text-slate-500">

                                    {lead.visitor?.email || "-"}

                                </p>

                            </div>

                            <span className="text-sm text-slate-400">

                                {lead.status}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}