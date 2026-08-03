"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Activity {

    id: string;

    type: string;

    title: string;

    createdAt: string;

}

interface Props {

    activities: Activity[];

}

export default function ActivityTimeline({

    activities

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="mb-6 text-lg font-semibold">

                Activity Timeline

            </h3>

            <div className="space-y-6">

                {

                    activities.length === 0 ?

                        (

                            <div className="py-8 text-center text-slate-500">

                                No recent activity

                            </div>

                        )

                        :

                        activities.map((item) => (

                            <div

                                key={item.id}

                                className="flex gap-4"

                            >

                                <div

                                    className="mt-2 h-3 w-3 rounded-full bg-blue-600"

                                />

                                <div>

                                    <h4 className="font-medium">

                                        {item.title}

                                    </h4>

                                    <p className="text-sm text-slate-500">

                                        {dayjs(item.createdAt).fromNow()}

                                    </p>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}