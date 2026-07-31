"use client";

interface VisitorInfoCardProps {

    visitor?: {

        id: number;

        name?: string | null;

        email?: string | null;

        ipAddress?: string | null;

        userAgent?: string | null;

        lastSeenAt?: string | null;

        createdAt?: string;

    } | null;

}



export default function VisitorInfoCard({

    visitor

}: VisitorInfoCardProps) {


    if (!visitor) {

        return (

            <div className="bg-white rounded-xl border p-6">

                <h2 className="text-xl font-semibold">

                    Visitor Information

                </h2>


                <p className="text-slate-500 mt-3">

                    No visitor data available

                </p>

            </div>

        );

    }



    return (

        <div className="bg-white rounded-xl border p-6 space-y-5">


            <div>

                <h2 className="text-xl font-semibold">

                    Visitor Information

                </h2>

                <p className="text-sm text-slate-500">

                    Visitor tracking details

                </p>

            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                <InfoItem

                    label="Visitor Name"

                    value={visitor.name}

                />


                <InfoItem

                    label="Visitor Email"

                    value={visitor.email}

                />


                <InfoItem

                    label="IP Address"

                    value={visitor.ipAddress}

                />


                <InfoItem

                    label="Created Date"

                    value={
                        visitor.createdAt
                        ?
                        new Date(
                            visitor.createdAt
                        ).toLocaleString()
                        :
                        "-"
                    }

                />


                <InfoItem

                    label="Last Seen"

                    value={
                        visitor.lastSeenAt
                        ?
                        new Date(
                            visitor.lastSeenAt
                        ).toLocaleString()
                        :
                        "-"
                    }

                />


                <InfoItem

                    label="Browser"

                    value={
                        getBrowser(
                            visitor.userAgent
                        )
                    }

                />


            </div>


        </div>

    );

}





function getBrowser(
    userAgent?: string | null
) {


    if (!userAgent) {

        return "-";

    }


    if(userAgent.includes("Chrome")){

        return "Chrome";

    }


    if(userAgent.includes("Firefox")){

        return "Firefox";

    }


    if(userAgent.includes("Safari")){

        return "Safari";

    }


    return "Unknown";


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