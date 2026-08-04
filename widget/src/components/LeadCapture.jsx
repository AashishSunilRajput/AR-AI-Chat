import { useState } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Loader2,
    X
} from "lucide-react";

import { createLead } from "../services/lead.service";
import { useWidget } from "../context/WidgetContext";


function LeadCapture({

    visitorId,

    conversationId,

    onSuccess

}) {


    const { config } = useWidget();


    const primaryColor =
        config?.settings?.primaryColor || "#2563EB";



    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        name: "",

        email: "",

        phone: "",

        company: ""

    });



    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }



    function closeForm() {

        localStorage.setItem(
            "arai_lead_closed",
            "true"
        );

        onSuccess?.();

    }



    async function submit() {

        setError("");


        if (
            !form.name ||
            !form.email ||
            !form.phone
        ) {

            setError(
                "Please fill all required fields."
            );

            return;

        }


        try {


            setLoading(true);


            await createLead({

                ...form,

                visitorId,

                conversationId

            });


            setSuccess(true);


            localStorage.setItem(
                "arai_lead_submitted",
                "true"
            );


            setTimeout(() => {

                onSuccess?.();

            }, 2000);


        }

        catch (err) {


            console.error(err);


            setError(
                "Unable to submit your request."
            );


        }

        finally {

            setLoading(false);

        }

    }



    function handleFocus(e) {

        e.target.style.borderColor = primaryColor;

    }


    function handleBlur(e) {

        e.target.style.borderColor = "#e2e8f0";

    }



    const inputClass = `

        w-full

        rounded-lg

        border

        px-3

        py-2

        text-sm

        outline-none

        transition

    `;



    if (success) {


        return (

            <motion.div

                initial={{
                    opacity: 0,
                    y: 30
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.30
                }}

                className="

                    border-t
                    border-slate-200

                    bg-white

                    p-6

                    text-center

                "

            >


                <CheckCircle2

                    size={54}

                    className="

                        mx-auto

                        text-green-600

                    "

                />


                <h3

                    className="

                        mt-4

                        text-xl

                        font-semibold

                    "

                >

                    Thank You!

                </h3>


                <p className="mt-2 text-sm text-slate-600">

                    Your information has been submitted successfully.

                </p>


                <p className="text-sm text-slate-600">

                    Our team will contact you shortly.

                </p>


            </motion.div>

        );

    }



    return (


        <motion.div


            initial={{
                opacity: 0,
                y: 40
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.30
            }}


            className="

                border-t
                border-slate-200

                bg-slate-50

                p-4

                space-y-4

            "

        >



            <div className="flex items-center justify-between">


                <div>


                    <h3 className="text-lg font-semibold">

                        Get in Touch

                    </h3>


                    <p className="text-sm text-slate-500">

                        Leave your details and we'll contact you.

                    </p>


                </div>



                <button

                    onClick={closeForm}

                    className="

                        rounded-full

                        p-2

                        text-slate-500

                        transition

                        hover:bg-slate-200

                        hover:text-black

                    "

                >

                    <X size={18} />

                </button>


            </div>




            <input

                name="name"

                placeholder="Full Name *"

                value={form.name}

                onChange={handleChange}

                onFocus={handleFocus}

                onBlur={handleBlur}

                className={inputClass}

            />




            <input

                name="email"

                type="email"

                placeholder="Email Address *"

                value={form.email}

                onChange={handleChange}

                onFocus={handleFocus}

                onBlur={handleBlur}

                className={inputClass}

            />




            <input

                name="phone"

                placeholder="Phone Number *"

                value={form.phone}

                onChange={handleChange}

                onFocus={handleFocus}

                onBlur={handleBlur}

                className={inputClass}

            />




            <input

                name="company"

                placeholder="Company"

                value={form.company}

                onChange={handleChange}

                onFocus={handleFocus}

                onBlur={handleBlur}

                className={inputClass}

            />




            {

                error && (

                    <p className="text-sm text-red-600">

                        {error}

                    </p>

                )

            }





            <button


                onClick={submit}

                disabled={loading}


                style={{

                    backgroundColor: primaryColor

                }}


                className="

                    flex

                    w-full

                    items-center

                    justify-center

                    gap-2

                    rounded-lg

                    py-3

                    text-white

                    font-medium

                    transition

                    hover:opacity-90

                    disabled:opacity-60

                "


            >


                {

                    loading

                    ?

                    <>

                        <Loader2

                            size={18}

                            className="animate-spin"

                        />

                        Submitting...

                    </>

                    :

                    "Submit"

                }


            </button>



        </motion.div>

    );

}


export default LeadCapture;
