"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import leadService from "@/services/lead.service";

import LeadInfoCard from "@/components/leads/LeadInfoCard";
import VisitorInfoCard from "@/components/leads/VisitorInfoCard";
import ConversationCard from "@/components/leads/ConversationCard";
import LeadNotesCard from "@/components/leads/LeadNotesCard";


export default function LeadDetailPage() {

    const params = useParams();
    const router = useRouter();

    const id = Number(params.id);


    const [loading, setLoading] = useState(true);

    const [lead, setLead] = useState<any>(null);



    const loadLead = async () => {

        try {

            setLoading(true);


            const response =
                await leadService.getLead(id);


            setLead(
                response.data
            );


        }

        catch(error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        if(id){

            loadLead();

        }

    },[id]);



    if(loading){

        return (

            <div className="p-6">

                Loading lead...

            </div>

        );

    }



    if(!lead){

        return (

            <div className="p-6">

                Lead not found

            </div>

        );

    }



    return (

        <div className="space-y-6">


            <div className="flex items-center justify-between">


                <div>

                    <h1 className="text-3xl font-bold">

                        Lead Detail

                    </h1>

                    <p className="text-slate-500 mt-1">

                        Manage lead information

                    </p>

                </div>



                <button

                    onClick={() => router.back()}

                    className="px-4 py-2 border rounded-lg"

                >

                    ← Back

                </button>


            </div>



            <LeadInfoCard
                lead={lead}
            />



            <VisitorInfoCard
                visitor={lead.visitor}
            />



            <ConversationCard
                conversation={lead.conversation}
            />



            <LeadNotesCard
                lead={lead}
            />


        </div>

    );

}