"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import WidgetInfoCard from "@/components/widget-installation/WidgetInfoCard";
import AllowedDomainsCard from "@/components/widget-installation/AllowedDomainsCard";
import WidgetScriptCard from "@/components/widget-installation/WidgetScriptCard";
import InstallationGuideCard from "@/components/widget-installation/InstallationGuideCard";

import widgetInstallationService, {
    WidgetInstallation
} from "@/services/widget-installation.service";

import authService from "@/services/auth.service";


export default function WidgetInstallationPage() {


    const params = useParams();

    const chatbotId = Number(params.id);


    const [chatbot, setChatbot] =
        useState<WidgetInstallation | null>(null);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    const currentUser =
        authService.getUser();



    useEffect(() => {

        loadChatbot();

    }, []);



    const loadChatbot = async () => {

        try {


            const response =
                await widgetInstallationService.getChatbot(
                    chatbotId
                );


            setChatbot(
                response.data
            );


        }
        catch(error:any){


            console.error(error);


            setError(

                error.response?.data?.message ||

                "Unable to load widget details"

            );


        }
        finally{

            setLoading(false);

        }

    };




    const updateDomains = (

        domains:string[]

    ) => {


        if(!chatbot)

            return;



        setChatbot({

            ...chatbot,

            allowedDomains: domains

        });


    };





    if(loading){

        return (

            <div className="p-10">

                Loading Widget Installation...

            </div>

        );

    }





    if(error){

        return (

            <div className="
                rounded-xl
                bg-red-100
                p-5
                text-red-700
            ">

                {error}

            </div>

        );

    }





    if(!chatbot){

        return null;

    }





    return (

        <div className="space-y-6">



            <div>


                <h1 className="
                    text-3xl
                    font-bold
                ">

                    Widget Installation

                </h1>


                <p className="
                    mt-2
                    text-slate-500
                ">

                    Install chatbot on your website

                </p>


            </div>




            <WidgetInfoCard

                chatbot={chatbot}

            />





            <AllowedDomainsCard

                chatbot={chatbot}

                onUpdate={updateDomains}

                userRole={
                    currentUser?.role
                }

            />





            <WidgetScriptCard

                chatbot={chatbot}

            />





            <InstallationGuideCard />



        </div>

    );

}