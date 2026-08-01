"use client";
import LeadStatusDropdown from "./LeadStatusDropdown";

interface LeadInfoCardProps {

    lead: {

        id: number;

        name?: string | null;

        email?: string | null;

        phone?: string | null;

        company?: string | null;

        source?: string | null;

       status:
    | "NEW"
    | "CONTACTED"
    | "QUALIFIED"
    | "CONVERTED"
    | "LOST";

        createdAt?: string;

    };

}



export default function LeadInfoCard({

    lead

}: LeadInfoCardProps) {


    return (

        <div className="bg-white rounded-xl border p-6 space-y-5">


            <div>

                <h2 className="text-xl font-semibold">

                    Lead Information

                </h2>

                <p className="text-sm text-slate-500">

                    Basic lead details

                </p>

            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                <InfoItem

                    label="Name"

                    value={lead.name}

                />


                <InfoItem

                    label="Email"

                    value={lead.email}

                />


                <InfoItem

                    label="Phone"

                    value={lead.phone}

                />


                <InfoItem

                    label="Company"

                    value={lead.company}

                />


                <InfoItem

                    label="Source"

                    value={lead.source}

                />


                <div>

    <p className="text-sm text-slate-500">
        Status
    </p>

    <LeadStatusDropdown

        leadId={lead.id}

        status={lead.status}

    />

</div>


                <InfoItem

                    label="Created Date"

                    value={
                        lead.createdAt
                        ?
                        new Date(
                            lead.createdAt
                        ).toLocaleString()
                        :
                        "-"
                    }

                />


            </div>


        </div>

    );

}





function InfoItem({

    label,

    value

}: {

    label:string;

    value?:string|null;

}) {


    return (

        <div>

            <p className="text-sm text-slate-500">

                {label}

            </p>


            <p className="font-medium text-slate-900">

                {value || "-"}

            </p>


        </div>

    );

}