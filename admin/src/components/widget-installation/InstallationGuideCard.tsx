"use client";


export default function InstallationGuideCard() {


    const steps = [

        {
            title: "Copy Widget Script",

            description:
                "Copy the generated widget script from above."
        },

        {
            title: "Paste Script on Website",

            description:
                "Paste the script before the closing </body> tag of your website."
        },

        {
            title: "Add Allowed Domain",

            description:
                "Add your website domain in Allowed Domains section and save it."
        },

        {
            title: "Publish Website",

            description:
                "Deploy your website changes and open your website."
        },

        {
            title: "Widget is Ready",

            description:
                "Your AI chatbot widget will start working on your website."
        }

    ];



    return (

        <div className="
            rounded-2xl
            border
            bg-white
            p-6
            shadow-sm
        ">


            <h2 className="
                mb-6
                text-xl
                font-semibold
            ">

                Installation Guide

            </h2>



            <div className="space-y-5">


                {
                    steps.map(

                        (step,index)=>(


                            <div

                                key={index}

                                className="
                                    flex
                                    gap-4
                                "

                            >


                                {/* Number */}

                                <div className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-600
                                    text-sm
                                    font-semibold
                                    text-white
                                ">

                                    {
                                        index + 1
                                    }

                                </div>



                                {/* Content */}

                                <div>


                                    <h3 className="
                                        font-medium
                                    ">

                                        {
                                            step.title
                                        }

                                    </h3>


                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    ">

                                        {
                                            step.description
                                        }

                                    </p>


                                </div>


                            </div>


                        )

                    )
                }


            </div>


        </div>

    );

}