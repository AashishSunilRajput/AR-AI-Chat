"use client";

import { useRouter } from "next/navigation";


interface ConversationCardProps {

    conversation?: {

        id: number;

        status?: string;

        startedAt?: string;

        endedAt?: string | null;

        createdAt?: string;

    } | null;

}



export default function ConversationCard({

    conversation

}: ConversationCardProps) {


    const router = useRouter();



    if (!conversation) {

        return (

            <div className="bg-white rounded-xl border p-6">


                <h2 className="text-xl font-semibold">

                    Conversation

                </h2>


                <p className="text-slate-500 mt-3">

                    No conversation available

                </p>


            </div>

        );

    }



    return (

        <div className="bg-white rounded-xl border p-6 space-y-5">


            <div className="flex items-center justify-between">


                <div>

                    <h2 className="text-xl font-semibold">

                        Conversation

                    </h2>


                    <p className="text-sm text-slate-500">

                        Chat history details

                    </p>

                </div>



                <button

                    onClick={() =>
                        router.push(
                            `/conversations/${conversation.id}`
                        )
                    }

                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"

                >

                    Open Conversation

                </button>


            </div>




            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                <InfoItem

                    label="Conversation ID"

                    value={
                        String(
                            conversation.id
                        )
                    }

                />



                <InfoItem

                    label="Status"

                    value={
                        conversation.status
                    }

                />



                <InfoItem

                    label="Started At"

                    value={
                        conversation.startedAt
                        ?
                        new Date(
                            conversation.startedAt
                        ).toLocaleString()
                        :
                        "-"
                    }

                />



                <InfoItem

                    label="Ended At"

                    value={
                        conversation.endedAt
                        ?
                        new Date(
                            conversation.endedAt
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