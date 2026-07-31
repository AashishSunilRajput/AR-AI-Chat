const timeline = [

    {

        title: "New Lead Received",

        time: "5 mins ago"

    },

    {

        title: "Chatbot Updated",

        time: "30 mins ago"

    },

    {

        title: "Knowledge Base Imported",

        time: "1 hour ago"

    },

    {

        title: "Organization Created",

        time: "Today"

    }

];

export default function ActivityTimeline() {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-6 text-lg font-semibold">

                Activity Timeline

            </h3>

            <div className="space-y-6">

                {

                    timeline.map((item, index) => (

                        <div

                            key={index}

                            className="flex gap-4"

                        >

                            <div

                                className="mt-1 h-3 w-3 rounded-full bg-blue-600"

                            />

                            <div>

                                <h4 className="font-medium">

                                    {item.title}

                                </h4>

                                <p className="text-sm text-slate-500">

                                    {item.time}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}