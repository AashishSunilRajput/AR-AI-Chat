"use client";


import { useState } from "react";


import widgetInstallationService
from "@/services/widget-installation.service";


import {

    WidgetInstallation

}
from "@/services/widget-installation.service";



interface Props {


    chatbot: WidgetInstallation;


    onUpdate: (

        domains:string[]

    ) => void;


    userRole:string;


}




export default function AllowedDomainsCard({

    chatbot,

    onUpdate,

    userRole


}:Props){



    const canEdit =
        userRole === "SUPER_ADMIN";



    const [domains,setDomains] =

        useState<string[]>(

            chatbot.allowedDomains || []

        );



    const [newDomain,setNewDomain] =

        useState("");



    const [saving,setSaving] =

        useState(false);





    const addDomain = () => {



        const domain =
            newDomain.trim();



        if(!domain){

            return;

        }



        if(domains.includes(domain)){

            return;

        }



        setDomains([

            ...domains,

            domain

        ]);



        setNewDomain("");

    };






    const removeDomain = (

        index:number

    ) => {



        const updated =

            domains.filter(

                (_,i)=>

                    i !== index

            );



        setDomains(updated);


    };







    const saveDomains = async()=>{



        try{


            setSaving(true);



            await widgetInstallationService.updateAllowedDomains(

                chatbot.id,

                domains

            );



            onUpdate(domains);



            alert(

                "Allowed domains updated successfully"

            );



        }

        catch(error){


            console.error(error);


            alert(

                "Unable to update domains"

            );


        }

        finally{


            setSaving(false);


        }


    };








    return (


        <div className="
            rounded-2xl
            border
            bg-white
            p-6
            shadow-sm
        ">


            <div className="
                mb-6
                flex
                items-center
                justify-between
            ">


                <h2 className="
                    text-xl
                    font-semibold
                ">

                    Allowed Domains

                </h2>



                {
                    !canEdit && (

                        <span className="
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-sm
                            text-slate-600
                        ">

                            View Only

                        </span>

                    )
                }


            </div>





            {
                canEdit && (

                    <div className="
                        mb-5
                        flex
                        gap-3
                    ">


                        <input

                            value={newDomain}

                            onChange={(e)=>

                                setNewDomain(

                                    e.target.value

                                )

                            }


                            placeholder="
                                https://example.com
                            "


                            className="
                                flex-1
                                rounded-xl
                                border
                                p-3
                            "

                        />



                        <button

                            onClick={addDomain}

                            className="
                                rounded-xl
                                bg-blue-600
                                px-5
                                text-white
                                hover:bg-blue-700
                            "

                        >

                            Add

                        </button>



                    </div>

                )
            }






            <div className="space-y-3">


                {
                    domains.length === 0 && (


                        <div className="
                            rounded-xl
                            bg-slate-50
                            p-4
                            text-sm
                            text-slate-500
                        ">

                            No domains added

                        </div>


                    )
                }






                {
                    domains.map(

                        (domain,index)=>(


                            <div

                                key={index}

                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    p-3
                                "

                            >



                                <span className="text-sm">

                                    {domain}

                                </span>





                                {
                                    canEdit && (

                                        <button

                                            onClick={()=>


                                                removeDomain(index)

                                            }


                                            className="
                                                rounded-lg
                                                bg-red-100
                                                px-3
                                                py-1
                                                text-sm
                                                text-red-700
                                                hover:bg-red-200
                                            "

                                        >

                                            Remove

                                        </button>

                                    )
                                }





                            </div>


                        )

                    )
                }



            </div>







            {
                canEdit && (


                    <div className="
                        mt-6
                        flex
                        justify-end
                    ">



                        <button


                            onClick={saveDomains}


                            disabled={saving}



                            className="
                                rounded-xl
                                bg-green-600
                                px-6
                                py-2
                                text-white
                                hover:bg-green-700
                                disabled:opacity-50
                            "


                        >


                            {
                                saving

                                ?

                                "Saving..."

                                :

                                "Save Domains"
                            }



                        </button>



                    </div>


                )
            }





        </div>


    );

}