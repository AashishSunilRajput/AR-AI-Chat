"use client";

interface SystemStatusData {

    api: string;

    database: string;

    aiProvider: string;

    storage: string;

}

interface Props {

    status: SystemStatusData | null;

}


export default function SystemStatus({

    status

}: Props) {


    if (!status) {

        return (

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-lg font-semibold">

                    System Status

                </h3>

                <p className="text-slate-500">

                    Loading...

                </p>

            </div>

        );

    }


    const items = [

        {

            name: "API Server",

            value: status.api

        },

        {

            name: "AI Service",

            value: status.aiProvider

        },

        {

            name: "Database",

            value: status.database

        },

        {

            name: "Storage",

            value: status.storage

        }

    ];


    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                System Status

            </h3>


            <div className="space-y-4">


                {

                    items.map((item) => {


                        const online =

                            item.value === "ONLINE" ||

                            item.value === "CONFIGURED";


                        return (

                            <div

                                key={item.name}

                                className="flex items-center justify-between"

                            >

                                <span>

                                    {item.name}

                                </span>


                                <div className="flex items-center gap-2">


                                    <div

                                        className={`

                                            h-3

                                            w-3

                                            rounded-full

                                            ${

                                                online

                                                ? "bg-green-500"

                                                : "bg-red-500"

                                            }

                                        `}

                                    />


                                    <span className="text-sm text-slate-500">

                                        {item.value}

                                    </span>


                                </div>


                            </div>

                        );

                    })

                }


            </div>


        </div>

    );

}