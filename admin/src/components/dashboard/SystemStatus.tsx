const status = [

    {

        name: "API Server",

        color: "bg-green-500"

    },

    {

        name: "AI Service",

        color: "bg-green-500"

    },

    {

        name: "Database",

        color: "bg-green-500"

    },

    {

        name: "Redis",

        color: "bg-yellow-500"

    }

];

export default function SystemStatus() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-semibold">

                System Status

            </h3>

            <div className="space-y-4">

                {

                    status.map((item) => (

                        <div

                            key={item.name}

                            className="flex items-center justify-between"

                        >

                            <span>

                                {item.name}

                            </span>

                            <div className="flex items-center gap-2">

                                <div

                                    className={`h-3 w-3 rounded-full ${item.color}`}

                                />

                                <span className="text-sm text-slate-500">

                                    Online

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}