const leads = [

    {

        name: "Rahul Sharma",

        email: "rahul@gmail.com",

        company: "ABC Pvt Ltd"

    },

    {

        name: "Amit Patel",

        email: "amit@gmail.com",

        company: "XYZ Infotech"

    },

    {

        name: "Priya Shah",

        email: "priya@gmail.com",

        company: "Digital World"

    }

];

export default function RecentLeads() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold">

                Recent Leads

            </h3>

            <div className="space-y-4">

                {

                    leads.map((lead, index) => (

                        <div

                            key={index}

                            className="flex items-center justify-between border-b pb-3 last:border-none"

                        >

                            <div>

                                <h4 className="font-medium">

                                    {lead.name}

                                </h4>

                                <p className="text-sm text-slate-500">

                                    {lead.email}

                                </p>

                            </div>

                            <span className="text-sm text-slate-400">

                                {lead.company}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}