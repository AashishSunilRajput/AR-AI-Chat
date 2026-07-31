"use client";

import { useState } from "react";

import {
    WidgetInstallation
} from "@/services/widget-installation.service";


interface Props {

    chatbot: WidgetInstallation;

}


export default function WidgetScriptCard({

    chatbot

}: Props) {


    const [copied, setCopied] = useState(false);



    const script = `

<script

src="https://your-domain.com/widget.js"

data-widget-key="${chatbot.widgetKey}"

></script>

`.trim();



    const copyScript = async () => {


        await navigator.clipboard.writeText(

            script

        );


        setCopied(true);



        setTimeout(() => {

            setCopied(false);

        }, 2000);


    };



    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">


            <h2 className="mb-6 text-xl font-semibold">

                Widget Script

            </h2>



            <p className="mb-4 text-sm text-slate-500">

                Copy this script and paste it before the

                closing <code>&lt;/body&gt;</code> tag

                of your website.

            </p>



            <div className="relative">


                <pre
                    className="
                        overflow-x-auto
                        rounded-xl
                        bg-slate-900
                        p-5
                        text-sm
                        text-white
                    "
                >

                    {script}

                </pre>



                <button

                    onClick={copyScript}

                    className="
                        absolute
                        right-4
                        top-4
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-sm
                        text-white
                        hover:bg-blue-700
                    "

                >

                    {
                        copied
                        ?
                        "Copied"
                        :
                        "Copy"
                    }


                </button>


            </div>



        </div>

    );

}